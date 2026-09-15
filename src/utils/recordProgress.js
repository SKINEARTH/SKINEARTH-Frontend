// Keep the cumulative API count unchanged; only the displayed cycle repeats.
export const getRecordProgress = (recordCount = 0, targetCount = 10) => {
  const count = Number.isFinite(recordCount)
    ? Math.max(0, Math.floor(recordCount))
    : 0;
  const targetRecordCount = Number.isFinite(targetCount) && targetCount >= 1
    ? Math.floor(targetCount)
    : 10;
  const remainder = count % targetRecordCount;
  const displayedRecordCount = count === 0
    ? 0
    : remainder === 0 ? targetRecordCount : remainder;

  return {
    targetRecordCount,
    displayedRecordCount,
    progressPercent: (displayedRecordCount / targetRecordCount) * 100,
    // Forecast readiness is a one-time threshold, not a repeating cycle.
    remainingRecordCount: Math.max(targetRecordCount - count, 0),
  };
};
