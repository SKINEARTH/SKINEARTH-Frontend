// The API owns score calculation. This helper only prepares the home display.
export const getPlanetTemperatureDisplay = (temperature) => {
  const rawScore = temperature?.score;
  const hasScore = temperature?.source !== "NO_DATA"
    && typeof rawScore === "number" && Number.isFinite(rawScore);

  return {
    hasScore,
    score: hasScore ? Math.min(Math.max(rawScore, 0), 100) : 0,
    level: hasScore ? temperature?.level || "데이터 없음" : "데이터 없음",
    label: hasScore && temperature?.source === "DAILY_RECORD"
      ? "오늘 기록 기반 온도" : "피부 온도 지수",
  };
};
