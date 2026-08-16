import { useMemo, useState } from "react";

import NavBar from "../components/NavBar";
import OrbitTrendChart from "../components/OrbitTrendChart";

import {
  Page,
  Content,
  PageTitle,
  PeriodToggle,
  PeriodButton,
  TrendCard,
  TrendHeader,
  TrendTitle,
  TrendDescription,
  CauseCard,
  CauseCardTitle,
  CauseTimeline,
  CauseItem,
  TimelineMarker,
  TimelineDot,
  CauseInfo,
  CausePeriod,
  CauseName,
  CauseRiskBadge,
  CauseRiskDot,
  EmptyCauseTimeline,
} from "../styles/OrbitHistoryPage.styles";

const MOCK_SKIN_RECORDS = [
  { date: "2025-01-13", score: 45 },
  { date: "2025-01-14", score: 52 },
  { date: "2025-01-15", score: 48 },
  { date: "2025-01-16", score: 67 },
  { date: "2025-01-17", score: 71 },
  { date: "2025-01-18", score: 62 },
  { date: "2025-01-19", score: 58 },
];

const MOCK_CAUSE_CHANGES = [
  {
    startDate: "2025-01-18",
    endDate: "2025-01-19",
    cause: "에어컨 노출",
    risk: "위험",
  },
  {
    startDate: "2025-01-16",
    endDate: "2025-01-17",
    cause: "스트레스",
    risk: "주의",
  },
  {
    startDate: "2025-01-13",
    endDate: "2025-01-15",
    cause: "수면 부족",
    risk: "안정",
  },
];

const RISK_THEMES = {
  안정: { color: "#6bd2b0", rgb: "107, 210, 176" },
  주의: { color: "#fbf079", rgb: "251, 240, 121" },
  위험: { color: "#f2684b", rgb: "242, 104, 75" },
};

const parseRecordDate = (date) => new Date(`${date}T00:00:00`);

const getPeriodRange = (period, referenceDate) => {
  const start = new Date(referenceDate);
  start.setHours(0, 0, 0, 0);

  if (period === "week") {
    const daysFromMonday = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - daysFromMonday);
  } else {
    start.setDate(1);
  }

  const end = new Date(start);

  if (period === "week") {
    end.setDate(start.getDate() + 6);
  } else {
    end.setMonth(start.getMonth() + 1, 0);
  }

  end.setHours(23, 59, 59, 999);

  return { start, end };
};

const formatShortDate = (date) => {
  const [, month, day] = date.split("-");
  return `${month}/${day}`;
};

const formatCausePeriod = ({ startDate, endDate }) => {
  const start = formatShortDate(startDate);
  const end = formatShortDate(endDate);
  const [startMonth] = start.split("/");
  const [endMonth, endDay] = end.split("/");

  return startMonth === endMonth ? `${start}–${endDay}` : `${start}–${end}`;
};

const OrbitHistoryPage = ({
  records = MOCK_SKIN_RECORDS,
  causeChanges = MOCK_CAUSE_CHANGES,
  referenceDate = new Date("2025-01-15T00:00:00"),
}) => {
  const [period, setPeriod] = useState("week");

  const periodSummary = useMemo(() => {
    const { start, end } = getPeriodRange(period, referenceDate);
    const periodRecords = records.filter(({ date }) => {
      const recordDate = parseRecordDate(date);
      return recordDate >= start && recordDate <= end;
    });
    const scoreTotal = periodRecords.reduce(
      (total, record) => total + record.score,
      0,
    );

    return {
      records: periodRecords,
      averageScore: periodRecords.length
        ? Math.round(scoreTotal / periodRecords.length)
        : null,
    };
  }, [period, records, referenceDate]);

  const visibleCauseChanges = useMemo(() => {
    const { start, end } = getPeriodRange(period, referenceDate);

    return causeChanges
      .filter((item) => {
        const itemStart = parseRecordDate(item.startDate);
        const itemEnd = parseRecordDate(item.endDate);
        return itemStart <= end && itemEnd >= start;
      })
      .sort(
        (first, second) =>
          parseRecordDate(second.startDate) - parseRecordDate(first.startDate),
      )
      .slice(0, 3);
  }, [causeChanges, period, referenceDate]);

  return (
    <Page>
      <Content
        data-period={period}
        data-record-count={periodSummary.records.length}
        data-average-score={periodSummary.averageScore ?? ""}
      >
        <PageTitle>궤도 히스토리</PageTitle>

        <PeriodToggle aria-label="조회 기간 선택">
          <PeriodButton
            type="button"
            $active={period === "week"}
            aria-pressed={period === "week"}
            onClick={() => setPeriod("week")}
          >
            주간
          </PeriodButton>

          <PeriodButton
            type="button"
            $active={period === "month"}
            aria-pressed={period === "month"}
            onClick={() => setPeriod("month")}
          >
            월간
          </PeriodButton>
        </PeriodToggle>

        <TrendCard>
          <TrendHeader>
            <TrendTitle>피부 온도 지수 추이</TrendTitle>
            <TrendDescription>낮을수록 안정적인 피부 상태</TrendDescription>
          </TrendHeader>

          <OrbitTrendChart records={periodSummary.records} period={period} />
        </TrendCard>

        <CauseCard>
          <CauseCardTitle>주요 원인 변화</CauseCardTitle>

          {visibleCauseChanges.length > 0 ? (
            <CauseTimeline>
              {visibleCauseChanges.map((item, index) => {
                const riskTheme = RISK_THEMES[item.risk] ?? RISK_THEMES.주의;

                return (
                  <CauseItem key={`${item.startDate}-${item.cause}`}>
                    <TimelineMarker $last={index === visibleCauseChanges.length - 1}>
                      <TimelineDot $riskTheme={riskTheme} />
                    </TimelineMarker>

                    <CauseInfo>
                      <CausePeriod>{formatCausePeriod(item)}</CausePeriod>
                      <CauseName>{item.cause}</CauseName>
                    </CauseInfo>

                    <CauseRiskBadge $riskTheme={riskTheme}>
                      <CauseRiskDot $riskTheme={riskTheme} />
                      {item.risk}
                    </CauseRiskBadge>
                  </CauseItem>
                );
              })}
            </CauseTimeline>
          ) : (
            <EmptyCauseTimeline>
              선택한 기간에 주요 원인 변화가 없어요.
            </EmptyCauseTimeline>
          )}
        </CauseCard>
      </Content>

      <NavBar />
    </Page>
  );
};

export default OrbitHistoryPage;
