import assert from "node:assert/strict";
import test from "node:test";
import { getRecordProgress } from "../src/utils/recordProgress.js";

for (const [count, displayed, percent] of [
  [0, 0, 0], [9, 9, 90], [10, 10, 100], [11, 1, 10],
  [13, 3, 30], [20, 10, 100], [21, 1, 10], [30, 10, 100],
]) {
  test(`${count} cumulative records display ${displayed}/10 at ${percent}%`, () => {
    const result = getRecordProgress(count);
    assert.equal(result.displayedRecordCount, displayed);
    assert.equal(result.progressPercent, percent);
    assert.equal(result.remainingRecordCount, Math.max(10 - count, 0));
  });
}

test("uses the API target rather than hardcoding ten", () => {
  assert.deepEqual(getRecordProgress(7, 5), {
    targetRecordCount: 5,
    displayedRecordCount: 2,
    progressPercent: 40,
    remainingRecordCount: 0,
  });
});

test("handles missing and invalid counts and targets without NaN or overflow", () => {
  for (const count of [undefined, null, -1, NaN, Infinity]) {
    const result = getRecordProgress(count, 0);
    assert.equal(result.displayedRecordCount, 0);
    assert.equal(result.progressPercent, 0);
    assert.equal(result.targetRecordCount, 10);
  }
  for (const target of [null, -1, NaN, Infinity, 0.5]) {
    assert.equal(getRecordProgress(13, target).displayedRecordCount, 3);
  }
});

test("display stays bounded across repeated cycles and does not mutate API data", () => {
  const record = { validRecordCount: 13, targetRecordCount: 10, forecastReady: true };
  getRecordProgress(record.validRecordCount, record.targetRecordCount);
  assert.deepEqual(record, { validRecordCount: 13, targetRecordCount: 10, forecastReady: true });
  for (let count = 0; count <= 1000; count += 1) {
    const result = getRecordProgress(count);
    assert.ok(result.displayedRecordCount >= 0 && result.displayedRecordCount <= 10);
    assert.ok(result.progressPercent >= 0 && result.progressPercent <= 100);
    if (count >= 10) assert.equal(result.remainingRecordCount, 0);
  }
});
