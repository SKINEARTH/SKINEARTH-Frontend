import assert from "node:assert/strict";
import { before, after, test } from "node:test";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { createServer } from "vite";

let server, MissionPage, fixture;
before(async () => {
  server = await createServer({
    server: { middlewareMode: true, ws: false }, appType: "custom",
    optimizeDeps: { noDiscovery: true, include: [] },
    plugins: [{ name: "mission-test-fixtures", enforce: "pre", transform(code, id) {
      if (id.endsWith("/src/pages/MissionPage.jsx")) {
        return code.replace('} from "react";', '} from "/tests/fixtures/missionState.js";')
          .replace('from "../api/mission";', 'from "/tests/fixtures/missionState.js";');
      }
      if (id.includes("/src/styles/")) {
        return code.replace('import styled from "styled-components";', 'import { styled } from "styled-components";')
          .replace('import styled, {', 'import { styled,');
      }
      return null;
    } }],
  });
  fixture = await server.ssrLoadModule("/tests/fixtures/missionState.js");
  ({ default: MissionPage } = await server.ssrLoadModule("/src/pages/MissionPage.jsx"));
});
after(async () => { await server?.close(); });

const buttons = (element) => {
  if (!React.isValidElement(element)) return [];
  return [ ...(element.props.onClick ? [element] : []),
    ...React.Children.toArray(element.props.children).flatMap(buttons) ];
};
const actions = (tree) => buttons(tree).filter((button) =>
  ["handleShowOtherMissions", "handleEasyMission", "handleHideCategory"].includes(button.props.onClick.name));

for (const [completed, processing] of [[false, false], [true, false], [false, true]]) {
  test(`adjustment buttons: completed=${completed}, processing=${processing}`, async () => {
    fixture.configure(completed, processing);
    const tree = MissionPage();
    const targets = actions(tree);
    assert.equal(targets.length, 3);
    for (const button of targets) assert.equal(button.props.disabled, completed || processing);
    if (completed || processing) {
      // Invoke handlers directly as well as checking native disabled props.
      for (const button of targets) await button.props.onClick();
      assert.deepEqual(fixture.calls, []);
    }
    const sheet = new ServerStyleSheet();
    try {
      const markup = renderToStaticMarkup(sheet.collectStyles(
        React.createElement(MemoryRouter, null, tree)));
      assert.ok(markup.includes(completed ? "✓ 완료한 미션" : "미션 완료하기"));
      assert.ok(sheet.getStyleTags().includes("cursor:not-allowed"));
    } finally { sheet.seal(); }
  });
}

test("uncompleted mission adjustment still calls the API", async (context) => {
  context.mock.method(console, "log", () => {});
  fixture.configure(false);
  const tree = MissionPage();
  const originalWindow = globalThis.window;
  globalThis.window = { scrollTo() {} };
  try {
    for (const button of actions(tree)) await button.props.onClick();
    assert.deepEqual(fixture.calls, ["regenerate", "adjust", "exclude"]);
  } finally { globalThis.window = originalWindow; }
});

test("completed mission cannot confirm an already-open alternative", async () => {
  fixture.configure(true);
  fixture.snapshot()[3] = true;
  const tree = MissionPage();
  const select = buttons(tree).find((button) => button.props.onClick.name === "handleSelectMission");
  assert.ok(select);
  assert.equal(select.props.disabled, true);
  await select.props.onClick();
  for (const button of actions(tree)) await button.props.onClick();
  assert.deepEqual(fixture.calls, []);
});

test("successful completion stays locked when refresh fails", async (context) => {
  context.mock.method(console, "error", () => {});
  fixture.configure(false, false, true);
  const complete = buttons(MissionPage()).find((button) => button.props.onClick.name === "handleCompleteMission");
  await complete.props.onClick();
  assert.equal(fixture.snapshot()[0].isCompleted, true);
  assert.equal(fixture.snapshot()[2], null);
  assert.equal(fixture.snapshot()[3], false);
  assert.equal(fixture.snapshot()[6], false);
  assert.deepEqual(fixture.calls, ["complete", "refresh"]);
});
