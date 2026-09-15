import assert from "node:assert/strict";
import { before, after, test } from "node:test";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { getPlanetTemperatureDisplay } from "../src/utils/planetTemperature.js";

test("daily record score is displayed with its source without recalculation", () => {
  const temperature = { source: "DAILY_RECORD", score: 42, level: "주의" };
  assert.deepEqual(getPlanetTemperatureDisplay(temperature), {
    hasScore: true, score: 42, level: "주의", label: "오늘 기록 기반 온도",
  });
  assert.deepEqual(temperature, { source: "DAILY_RECORD", score: 42, level: "주의" });
});
test("forecast and legacy responses keep the existing label", () => {
  for (const source of ["FORECAST", undefined]) {
    assert.equal(getPlanetTemperatureDisplay({ source, score: 50 }).label, "피부 온도 지수");
  }
});
test("NO_DATA overrides a stale score and level", () => {
  assert.deepEqual(getPlanetTemperatureDisplay({ source: "NO_DATA", score: 42, level: "주의" }), {
    hasScore: false, score: 0, level: "데이터 없음", label: "피부 온도 지수",
  });
});
test("null, missing and nonfinite scores produce a safe empty gauge", () => {
  for (const score of [null, undefined, NaN, Infinity, -Infinity, "42"]) {
    const display = getPlanetTemperatureDisplay({ source: "DAILY_RECORD", score, level: "주의" });
    assert.equal(display.hasScore, false);
    assert.equal(display.score, 0);
    assert.equal(display.level, "데이터 없음");
  }
  assert.equal(getPlanetTemperatureDisplay(null).hasScore, false);
});
test("zero is valid and out-of-range scores stay within gauge bounds", () => {
  for (const [score, expected] of [[0, 0], [100, 100], [-1, 0], [101, 100]]) {
    const display = getPlanetTemperatureDisplay({ source: "FORECAST", score });
    assert.equal(display.hasScore, true);
    assert.equal(display.score, expected);
  }
});

let server, fixture, HomePage;
before(async () => {
  server = await createServer({ server: { middlewareMode: true, ws: false }, appType: "custom",
    optimizeDeps: { noDiscovery: true, include: [] },
    plugins: [{ name: "home-temperature-fixtures", enforce: "pre", transform(code, id) {
      if (id.endsWith("/src/pages/HomePage.jsx")) {
        return code.replace('} from "react";', '} from "/tests/fixtures/homeTemperatureState.js";');
      }
      if (id.includes("/src/styles/")) return code.replace('import styled from "styled-components";',
        'import { styled } from "styled-components";').replace('import styled, {', 'import { styled,');
      return null;
    } }],
  });
  fixture = await server.ssrLoadModule("/tests/fixtures/homeTemperatureState.js");
  ({ default: HomePage } = await server.ssrLoadModule("/src/pages/HomePage.jsx"));
});
after(async () => { await server?.close(); });
for (const [source, score, label] of [
  ["DAILY_RECORD", 42, "오늘 기록 기반 온도 42, 주의"],
  ["FORECAST", 42, "피부 온도 지수 42, 주의"],
  ["NO_DATA", null, "피부 온도 지수 데이터 없음"],
  ["DAILY_RECORD", null, "피부 온도 지수 데이터 없음"],
  ["FORECAST", 0, "피부 온도 지수 0, 주의"],
]) {
  test(`home renders ${source} score=${score} safely`, () => {
    fixture.configure({ source, score, level: "주의" });
    const markup = renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(HomePage)));
    assert.ok(markup.includes(`aria-label="${label}"`));
    assert.ok(!markup.includes("NaN") && !markup.includes("Infinity"));
    if (score === null) assert.match(markup, />-<\/strong>/);
  });
}
