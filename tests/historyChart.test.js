import assert from "node:assert/strict";
import { before, after, test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { normalizeRiskScore, getAverageRiskScore, getScoreScale, splitChartSegments } from "../src/utils/historyChart.js";

const records = (scores) => scores.map((score, index) => ({
  date: new Date(Date.UTC(2026, 8, index + 1)).toISOString().slice(0, 10), score,
}));
test("clustered scores use a zoomed axis with padding", () => {
  assert.deepEqual(getScoreScale([32, 35, 41, 47]), { min: 20, max: 60, ticks: [60, 50, 40, 30, 20] });
});
for (const scores of [[0], [100], [40, 40], [0, 100], [5, 95], [99, 100]]) {
  test(`scale preserves ${scores} without clipping or division by zero`, () => {
    const scale = getScoreScale(scores);
    assert.ok(scale.min >= 0 && scale.max <= 100);
    assert.ok(scale.max - scale.min >= 20);
    assert.ok(scale.min <= Math.min(...scores) && scale.max >= Math.max(...scores));
    assert.equal(scale.ticks[0], scale.max);
    assert.equal(scale.ticks.at(-1), scale.min);
  });
}
test("missing and invalid scores are not coerced to zero", () => {
  for (const value of [null, undefined, "", " ", false, NaN, Infinity, -1, 101, "invalid"]) {
    assert.equal(normalizeRiskScore(value), null);
  }
  assert.equal(normalizeRiskScore(0), 0);
  assert.equal(normalizeRiskScore("42"), 42);
  assert.equal(getAverageRiskScore(records([null, 0, 42, 35])), 25.7);
  assert.equal(getAverageRiskScore(records([null, undefined])), null);
});
test("segments stop at missing days and keep isolated points", () => {
  assert.deepEqual(splitChartSegments(records([32, 35, null, 41, 47, null, 50])).map((segment) => segment.length), [2, 2, 1]);
  assert.equal(splitChartSegments([{ date: "2026-09-01", score: 32 }, { date: "2026-09-03", score: 41 }]).length, 2);
});

let server, OrbitTrendChart;
before(async () => {
  server = await createServer({
    server: { middlewareMode: true, ws: false }, appType: "custom",
    optimizeDeps: { noDiscovery: true, include: [] },
    plugins: [{ name: "chart-test-style-interop", enforce: "pre", transform(code, id) {
      if (!id.includes("/src/styles/")) return null;
      return code.replace('import styled from "styled-components";', 'import { styled } from "styled-components";')
        .replace('import styled, {', 'import { styled,');
    } }],
  });
  ({ default: OrbitTrendChart } = await server.ssrLoadModule("/src/components/OrbitTrendChart.jsx"));
});
after(async () => { await server?.close(); });
const render = (scores, period = "week") => renderToStaticMarkup(React.createElement(OrbitTrendChart, { records: records(scores), period }));

test("render retains missing date labels and positions without drawing a connecting line", () => {
  const markup = render([32, null, 48]);
  assert.equal((markup.match(/<circle/g) ?? []).length, 2);
  assert.equal((markup.match(/<path/g) ?? []).length, 0);
  assert.ok(markup.includes('cx="40"') && markup.includes('cx="322"'));
  assert.ok(markup.includes("09/02"));
  assert.ok(!markup.includes("NaN"));
});
test("render draws separate line and area paths for contiguous segments", () => {
  const markup = render([32, 35, null, 41, 47]);
  assert.equal((markup.match(/<path/g) ?? []).length, 4);
  assert.ok(markup.includes("Y축 20~60"));
});
test("single point and empty forecast states render safely", () => {
  assert.equal((render([40]).match(/<circle/g) ?? []).length, 1);
  assert.equal((render([40]).match(/<path/g) ?? []).length, 0);
  assert.ok(render([null, null]).includes("예측 데이터가"));
});
test("monthly labels are bounded but include first and last day", () => {
  const markup = render(Array.from({ length: 31 }, (_, index) => index === 1 ? null : 40), "month");
  assert.ok(markup.includes("09/01") && markup.includes("10/01"));
  assert.ok((markup.match(/(?:09|10)\/\d\d<\/text>/g) ?? []).length <= 7);
});
