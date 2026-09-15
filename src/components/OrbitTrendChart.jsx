import { useId } from "react";
import { normalizeRiskScore, getScoreScale, splitChartSegments } from "../utils/historyChart";
import {
  Chart,
  EmptyChart,
} from "../styles/OrbitHistoryPage.styles";

const WIDTH = 332;
const HEIGHT = 168;

const PLOT = {
  left: 40,
  right: 10,
  top: 8,
  bottom: 30,
};

const formatDateLabel = (date) => {
  if (!date) {
    return "";
  }

  const [, month, day] =
    date.split("-");

  return `${month}/${day}`;
};

const getPoint = (
  record,
  index,
  recordCount,
  scale
) => {
  const plotWidth =
    WIDTH -
    PLOT.left -
    PLOT.right;

  const plotHeight =
    HEIGHT -
    PLOT.top -
    PLOT.bottom;

  const x =
    recordCount === 1
      ? PLOT.left +
        plotWidth / 2
      : PLOT.left +
        (plotWidth * index) /
          (recordCount - 1);

  const safeScore =
    Math.min(
      Math.max(
        record.score,
        scale.min
      ),
      scale.max
    );

  const normalizedScore =
    (safeScore -
      scale.min) /
    (scale.max -
      scale.min);

  const y =
    PLOT.top +
    plotHeight *
      (1 - normalizedScore);

  return {
    ...record,
    x,
    y: record.score === null ? null : y,
  };
};

const createSmoothPath = (
  points
) => {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  return points
    .slice(1)
    .reduce(
      (
        path,
        point,
        index
      ) => {
        const previous =
          points[index];

        const controlX =
          (previous.x +
            point.x) /
          2;

        return `${path} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
      },
      `M ${points[0].x} ${points[0].y}`
    );
};

const getVisibleLabelIndexes = (
  recordCount,
  period
) => {
  if (
    period === "week" ||
    recordCount <= 7
  ) {
    return new Set(
      Array.from(
        {
          length:
            recordCount,
        },
        (_, index) =>
          index
      )
    );
  }

  const indexes =
    new Set();

  const interval =
    Math.ceil(
      (recordCount - 1) /
        6
    );

  for (
    let index = 0;
    index < recordCount;
    index += interval
  ) {
    indexes.add(index);
  }

  indexes.add(
    recordCount - 1
  );

  return indexes;
};

const OrbitTrendChart = ({
  records = [],
  period,
}) => {
  const id = useId();
  const lineId = `orbit-line-${id}`;
  const areaId = `orbit-area-${id}`;
  const normalizedRecords = records.map((record) => ({
    ...record, score: normalizeRiskScore(record.score),
  }));
  const validRecords = normalizedRecords.filter((record) => record.score !== null);
  const scale = getScoreScale(validRecords.map((record) => record.score));

  if (
    validRecords.length === 0
  ) {
    return (
      <EmptyChart>
        선택한 기간에 예측 데이터가
        없어요.
      </EmptyChart>
    );
  }

  const points =
    normalizedRecords.map(
      (
        record,
        index
      ) =>
        getPoint(
          record,
          index,
          normalizedRecords.length,
          scale
        )
    );

  const segments = splitChartSegments(points);

  const baselineY =
    HEIGHT -
    PLOT.bottom;

  const visibleLabelIndexes =
    getVisibleLabelIndexes(
      normalizedRecords.length,
      period
    );

  return (
    <Chart
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label={`피부 온도 지수 ${validRecords.length}건의 추이 그래프, Y축 ${scale.min}~${scale.max}`}
    >
      <title>예측 대상일별 피부 온도 지수 (0~100, 높을수록 위험)</title>
      <defs>
        <linearGradient
          id={lineId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop
            offset="0%"
            stopColor="#6bd2b0"
          />

          <stop
            offset="50%"
            stopColor="#fbf079"
          />

          <stop
            offset="100%"
            stopColor="#f2684b"
          />
        </linearGradient>

        <linearGradient
          id={areaId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#8fadea"
            stopOpacity="0.22"
          />

          <stop
            offset="100%"
            stopColor="#8fadea"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      {scale.ticks.map(
        (tick) => {
          const plotHeight =
            HEIGHT -
            PLOT.top -
            PLOT.bottom;

          const y =
            PLOT.top +
            plotHeight *
              (1 -
                (tick -
                  scale.min) /
                  (scale.max -
                    scale.min));

          return (
            <text
              key={tick}
              x={
                PLOT.left -
                17
              }
              y={y + 4}
              fill="#6c7a8e"
              fontSize="10"
              textAnchor="end"
            >
              {tick}
            </text>
          );
        }
      )}

      {segments.filter((segment) => segment.length > 1).map((segment) => {
        const linePath = createSmoothPath(segment);
        const areaPath = `${linePath} L ${segment.at(-1).x} ${baselineY} L ${segment[0].x} ${baselineY} Z`;
        return <g key={segment[0].date}>
          <path
            d={areaPath}
            fill={`url(#${areaId})`}
          />

          <path
            d={linePath}
            fill="none"
            stroke={`url(#${lineId})`}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>;
      })}

      {points.map(
        (
          point,
          index
        ) => (
          <g
            key={
              point.date
            }
          >
            {point.score !== null && <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#8fadea"
            ><title>{`${point.date}: ${point.score}`}</title></circle>}

            {visibleLabelIndexes.has(
              index
            ) && (
              <text
                x={
                  point.x
                }
                y={
                  HEIGHT -
                  8
                }
                fill="#6c7a8e"
                fontSize="10"
                textAnchor="middle"
              >
                {formatDateLabel(
                  point.date
                )}
              </text>
            )}
          </g>
        )
      )}
    </Chart>
  );
};

export default OrbitTrendChart;
