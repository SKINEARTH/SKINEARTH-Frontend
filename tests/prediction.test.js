import assert from "node:assert/strict";
import { before, after, test } from "node:test";
import React from "react";
import { createServer } from "vite";

let server, fixture, Input, Loading, Result;
const forecast = { inputAc: 2, inputScreenTime: 3, inputSleepHours: 0,
  inputStress: 4, inputMeal: 5, riskScore: 62 };
const buttons = (node) => !React.isValidElement(node) ? [] : [
  ...(node.props.onClick ? [node] : []),
  ...React.Children.toArray(node.props.children).flatMap(buttons),
];
const settle = () => new Promise((resolve) => setImmediate(resolve));
before(async () => {
  server = await createServer({ server: { middlewareMode: true, ws: false }, appType: "custom",
    optimizeDeps: { noDiscovery: true, include: [] },
    plugins: [{ name: "prediction-fixtures", enforce: "pre", transform(code, id) {
      if (/\/src\/pages\/Prediction(?:Page|LoadingPage|ResultPage)\.jsx$/.test(id)) {
        return code.replace(/from "react"/g, 'from "/tests/fixtures/predictionState.js"')
          .replace(/from "react-router-dom"/g, 'from "/tests/fixtures/predictionState.js"')
          .replace(/from "..\/api\/forecast"/g, 'from "/tests/fixtures/predictionState.js"');
      }
      if (id.includes("/src/styles/")) return code.replace('import styled from "styled-components";',
        'import { styled } from "styled-components";').replace('import styled, {', 'import { styled,');
      return null;
    } }],
  });
  fixture = await server.ssrLoadModule("/tests/fixtures/predictionState.js");
  ({ default: Input } = await server.ssrLoadModule("/src/pages/PredictionPage.jsx"));
  ({ default: Loading } = await server.ssrLoadModule("/src/pages/PredictionLoadingPage.jsx"));
  ({ default: Result } = await server.ssrLoadModule("/src/pages/PredictionResultPage.jsx"));
});
after(async () => { await server?.close(); });
test("result button retains planned label and passes existing forecast", () => {
  fixture.configure({ forecast });
  buttons(Result()).find((button) => button.props.children === "다시 예측하기").props.onClick();
  assert.deepEqual(fixture.calls[0], { path: "/prediction", state: { mode: "edit", forecast } });
});
test("edit form prefills all inputs including zero sleep and skips redirect", async () => {
  fixture.configure({ mode: "edit", forecast });
  const tree = Input();
  assert.deepEqual(fixture.values.slice(0, 5), [2, 3, 0, 4, 5]);
  fixture.effects[0](); await settle();
  assert.deepEqual(fixture.calls, []);
  const save = buttons(tree).find((button) => button.props.children === "수정 완료");
  save.props.onClick(); save.props.onClick();
  assert.equal(fixture.calls.length, 1);
  assert.equal(fixture.calls[0].state.mode, "edit");
  assert.equal(fixture.calls[0].state.requestData.inputSleepHours, 0);
});
test("cancel preserves original result without a write", () => {
  fixture.configure({ mode: "edit", forecast });
  buttons(Input()).find((button) => button.props.children === "취소").props.onClick();
  assert.deepEqual(fixture.calls, [{ path: "/prediction/result", replace: true, state: { forecast } }]);
});
for (const [mode, method] of [["edit", "PUT"], ["create", "POST"]]) {
  test(`${mode} submits ${method} once even during effect replay`, async () => {
    fixture.configure({ mode, forecast, requestData: forecast });
    Loading(); const cleanup = fixture.effects[0](); cleanup(); fixture.effects[0]();
    await settle();
    assert.equal(fixture.calls.filter((call) => call.method === method).length, 1);
    assert.equal(fixture.calls.filter((call) => call.path === "/prediction/result").length, 1);
  });
}
test("failed update returns to editing with attempted inputs and original result", async (context) => {
  context.mock.method(console, "error", () => {});
  const originalAlert = globalThis.alert;
  globalThis.alert = () => {};
  context.after(() => {
    if (originalAlert === undefined) delete globalThis.alert;
    else globalThis.alert = originalAlert;
  });
  const requestData = { ...forecast, inputAc: 5 };
  fixture.configure({ mode: "edit", forecast, requestData }, true);
  Loading(); fixture.effects[0](); await settle();
  assert.deepEqual(fixture.calls.at(-1), { path: "/prediction", replace: true,
    state: { mode: "edit", forecast, requestData } });
  fixture.configure(fixture.calls.at(-1).state);
  Input(); assert.equal(fixture.values[0], 5);
});
