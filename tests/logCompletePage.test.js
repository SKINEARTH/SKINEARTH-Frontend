import assert from "node:assert/strict";
import { before, after, test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { ServerStyleSheet } from "styled-components";
import { createServer } from "vite";

let server;
let LogCompletePage;
before(async () => {
  server = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    plugins: [{
      name: "test-styled-components-cjs-interop",
      enforce: "pre",
      // Node SSR sees the CJS default as an object; its named styled export
      // uses the same instance as ServerStyleSheet without changing app code.
      transform(code, id) {
        if (!id.includes("/src/styles/")) return null;
        return code
          .replace('import styled from "styled-components";', 'import { styled } from "styled-components";')
          .replace('import styled, {', 'import { styled,');
      },
    }],
  });
  ({ default: LogCompletePage } = await server.ssrLoadModule("/src/pages/LogCompletePage.jsx"));
});
after(async () => { await server?.close(); });

for (const [count, display, percentage] of [
  [0, 0, 0], [9, 9, 90], [10, 10, 100], [11, 1, 10], [13, 3, 30], [20, 10, 100],
]) {
  test(`record completion renders ${count} records correctly`, () => {
    const sheet = new ServerStyleSheet();
    try {
      const markup = renderToStaticMarkup(sheet.collectStyles(
        React.createElement(MemoryRouter, {
          initialEntries: [{ pathname: "/log-complete", state: {
            record: { validRecordCount: count, targetRecordCount: 10, forecastReady: count >= 10 },
          } }],
        }, React.createElement(LogCompletePage))
      ));
      assert.ok(markup.includes(`${display}/10`));
      assert.ok(sheet.getStyleTags().includes(`width:${percentage}%`));
      assert.ok(markup.includes(count >= 10 ? "기록 진행 현황" : "맞춤 예측까지"));
      assert.ok(markup.includes(count >= 10
        ? "맞춤 예측이 준비됐어요!"
        : `${10 - count}개 더 기록하면 나만의 예측 시작!`));
    } finally {
      sheet.seal();
    }
  });
}
