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

const OrbitHistoryPage = ({
  records = MOCK_SKIN_RECORDS,
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
      </Content>

      <NavBar />
    </Page>
  );
};

export default OrbitHistoryPage;
