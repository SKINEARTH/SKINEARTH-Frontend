import { useMemo, useState } from "react";

import NavBar from "../components/NavBar";

import {
  Page,
  Content,
  PageTitle,
  PeriodToggle,
  PeriodButton,
} from "../styles/OrbitHistoryPage.styles";

const MOCK_SKIN_RECORDS = [
  { date: "2025-01-09", score: 45 },
  { date: "2025-01-10", score: 52 },
  { date: "2025-01-11", score: 48 },
  { date: "2025-01-12", score: 67 },
  { date: "2025-01-13", score: 71 },
  { date: "2025-01-14", score: 62 },
  { date: "2025-01-15", score: 58 },
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
      </Content>

      <NavBar />
    </Page>
  );
};

export default OrbitHistoryPage;
