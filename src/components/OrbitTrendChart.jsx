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

const MIN_SCORE = 30;
const MAX_SCORE = 90;

const Y_TICKS = [
  90,
  75,
  60,
  45,
  30,
];

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
  recordCount
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
        MIN_SCORE
      ),
      MAX_SCORE
    );

  const normalizedScore =
    (safeScore -
      MIN_SCORE) /
    (MAX_SCORE -
      MIN_SCORE);

  const y =
    PLOT.top +
    plotHeight *
      (1 - normalizedScore);

  return {
    ...record,
    x,
    y,
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
  records,
  period,
}) => {
  /*
   * 핵심 수정
   *
   * score가 null / undefined인 날짜는
   * 실제 피부 온도 지수 데이터가 없는 날짜이므로
   * 그래프 점으로 그리지 않는다.
   */
  const validRecords =
    records.filter(
      (record) =>
        record.score !==
          null &&
        record.score !==
          undefined &&
        Number.isFinite(
          Number(
            record.score
          )
        )
    );

  if (
    validRecords.length === 0
  ) {
    return (
      <EmptyChart>
        선택한 기간에 기록이
        없어요.
      </EmptyChart>
    );
  }

  const points =
    validRecords.map(
      (
        record,
        index
      ) =>
        getPoint(
          {
            ...record,
            score: Number(
              record.score
            ),
          },
          index,
          validRecords.length
        )
    );

  const linePath =
    createSmoothPath(
      points
    );

  const baselineY =
    HEIGHT -
    PLOT.bottom;

  const areaPath =
    points.length > 1
      ? `${linePath} L ${
          points.at(-1).x
        } ${baselineY} L ${
          points[0].x
        } ${baselineY} Z`
      : "";

  const visibleLabelIndexes =
    getVisibleLabelIndexes(
      validRecords.length,
      period
    );

  return (
    <Chart
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label={`피부 온도 지수 ${validRecords.length}건의 추이 그래프`}
    >
      <defs>
        <linearGradient
          id="orbit-line-gradient"
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
          id="orbit-area-gradient"
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

      {Y_TICKS.map(
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
                  MIN_SCORE) /
                  (MAX_SCORE -
                    MIN_SCORE));

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

      {points.length > 1 && (
        <>
          <path
            d={areaPath}
            fill="url(#orbit-area-gradient)"
          />

          <path
            d={linePath}
            fill="none"
            stroke="url(#orbit-line-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}

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
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#8fadea"
            />

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