export const normalizeRiskScore = (score) => {
  if (score === null || score === undefined ||
      (typeof score !== "number" && typeof score !== "string") ||
      (typeof score === "string" && !score.trim())) return null;
  const value = Number(score);
  return Number.isFinite(value) && value >= 0 && value <= 100 ? value : null;
};

export const getAverageRiskScore = (records = []) => {
  const scores = records.map((record) => normalizeRiskScore(record.score)).filter((score) => score !== null);
  return scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length * 10) / 10 : null;
};

export const getScoreScale = (scores) => {
  if (!scores.length) return { min: 0, max: 100, ticks: [100, 80, 60, 40, 20, 0] };
  const low = Math.min(...scores);
  const high = Math.max(...scores);
  const step = high - low <= 10 ? 5 : high - low <= 40 ? 10 : 20;
  let min = Math.max(0, Math.floor((low - 5) / step) * step);
  let max = Math.min(100, Math.ceil((high + 5) / step) * step);
  if (max - min < 20) {
    min = Math.max(0, min - step);
    max = Math.min(100, min + 20);
    min = Math.max(0, max - 20);
  }
  const ticks = [];
  for (let tick = max; tick >= min; tick -= step) ticks.push(tick);
  return { min, max, ticks };
};

export const splitChartSegments = (points) => {
  const segments = [];
  let segment = [];
  for (const point of points) {
    const previous = segment.at(-1);
    if (point.score === null || (previous && Date.parse(point.date) - Date.parse(previous.date) > 86400000)) {
      if (segment.length) segments.push(segment);
      segment = [];
    }
    if (point.score !== null) segment.push(point);
  }
  if (segment.length) segments.push(segment);
  return segments;
};
