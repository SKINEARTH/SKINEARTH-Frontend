import {
  useEffect,
  useMemo,
  useState,
} from "react";

import NavBar from "../components/NavBar";
import OrbitTrendChart from "../components/OrbitTrendChart";
import PpJourneyCard from "../components/PpJourneyCard";

import {
  getHistory,
  getCauseTimeline,
} from "../api/history";

import {
  getMissionHistory,
} from "../api/mission";

import {
  getUserStage,
} from "../api/badge";

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
  MissionRateCard,
  MissionRateTitle,
  MissionRateBody,
  MissionRateCircle,
  MissionRateValue,
  MissionRateInfo,
  MissionRateCount,
  MissionRateLabel,
  MissionRateMessage,
} from "../styles/OrbitHistoryPage.styles";

const RISK_THEMES = {
  낮음: {
    color: "#6bd2b0",
    rgb: "107, 210, 176",
  },

  중간: {
    color: "#fbf079",
    rgb: "251, 240, 121",
  },

  높음: {
    color: "#f2684b",
    rgb: "242, 104, 75",
  },
};

const getMissionRateTheme = (
  percentage
) => {
  if (percentage >= 70) {
    return {
      color: "#6bd2b0",
      message: "🔥 거의 다 왔어요!",
    };
  }

  if (percentage >= 40) {
    return {
      color: "#f9cf6e",
      message: "👍 좋은 페이스예요!",
    };
  }

  return {
    color: "#f2684b",
    message: "🫧 조금만 더 노력해 봐요!",
  };
};

const formatShortDate = (date) => {
  if (!date) {
    return "";
  }

  const [, month, day] =
    date.split("-");

  return `${month}/${day}`;
};

const formatCausePeriod = ({
  startDate,
  endDate,
}) => {
  if (!startDate || !endDate) {
    return "";
  }

  const start =
    formatShortDate(startDate);

  const end =
    formatShortDate(endDate);

  const [startMonth] =
    start.split("/");

  const [endMonth, endDay] =
    end.split("/");

  return startMonth === endMonth
    ? `${start}–${endDay}`
    : `${start}–${end}`;
};

const OrbitHistoryPage = () => {
  const [period, setPeriod] =
    useState("WEEKLY");

  const [
    historyData,
    setHistoryData,
  ] = useState(null);

  const [
    causeTimeline,
    setCauseTimeline,
  ] = useState([]);

  const [
    missionHistory,
    setMissionHistory,
  ] = useState(null);

  const [
    stageData,
    setStageData,
  ] = useState(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const [
          historyResult,
          causeResult,
          missionResult,
          stageResult,
        ] = await Promise.all([
          getHistory(period),
          getCauseTimeline(period),
          getMissionHistory(period),
          getUserStage(),
        ]);

        console.log(
          "히스토리:",
          historyResult
        );

        console.log(
          "원인 타임라인:",
          causeResult
        );

        console.log(
          "미션 히스토리:",
          missionResult
        );

        console.log(
          "PP 단계:",
          stageResult
        );

        setHistoryData(
          historyResult.data
        );

        setCauseTimeline(
          causeResult.data || []
        );

        setMissionHistory(
          missionResult.data
        );

        setStageData(
          stageResult.data
        );
      } catch (error) {
        console.error(
          "히스토리 페이지 로딩 실패:",
          error
        );

        setErrorMessage(
          error.message ||
            "히스토리를 불러오지 못했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [period]);

  const chartRecords = useMemo(() => {
    if (!historyData?.points) {
      return [];
    }

    return historyData.points.map(
      (point) => ({
        date: point.date,

        score:
          point.skinCondition === null
            ? null
            : point.skinCondition,
      })
    );
  }, [historyData]);

  const visibleCauseChanges =
    useMemo(() => {
      return [...causeTimeline]
        .sort(
          (first, second) =>
            new Date(
              `${second.startDate}T00:00:00`
            ) -
            new Date(
              `${first.startDate}T00:00:00`
            )
        )
        .slice(0, 3);
    }, [causeTimeline]);

  const missionPercentage =
    missionHistory
      ? Math.round(
          missionHistory
            .completionRatePercent
        )
      : 0;

  const missionRateTheme =
    getMissionRateTheme(
      missionPercentage
    );

  const averageSkinCondition =
    historyData
      ?.averageSkinCondition ??
    null;

  if (isLoading) {
    return (
      <Page>
        <Content>
          <PageTitle>
            궤도 히스토리
          </PageTitle>

          <TrendCard>
            <TrendHeader>
              <TrendTitle>
                기록을 불러오는 중...
              </TrendTitle>
            </TrendHeader>
          </TrendCard>
        </Content>

        <NavBar />
      </Page>
    );
  }

  if (errorMessage) {
    return (
      <Page>
        <Content>
          <PageTitle>
            궤도 히스토리
          </PageTitle>

          <TrendCard>
            <TrendHeader>
              <TrendTitle>
                {errorMessage}
              </TrendTitle>
            </TrendHeader>
          </TrendCard>
        </Content>

        <NavBar />
      </Page>
    );
  }

  return (
    <Page>
      <Content
        data-period={period}
        data-record-count={
          historyData?.recordCount ?? 0
        }
        data-average-score={
          averageSkinCondition ?? ""
        }
      >
        <PageTitle>
          궤도 히스토리
        </PageTitle>

        <PeriodToggle
          aria-label="조회 기간 선택"
        >
          <PeriodButton
            type="button"
            $active={
              period === "WEEKLY"
            }
            aria-pressed={
              period === "WEEKLY"
            }
            onClick={() =>
              setPeriod("WEEKLY")
            }
          >
            주간
          </PeriodButton>

          <PeriodButton
            type="button"
            $active={
              period === "MONTHLY"
            }
            aria-pressed={
              period === "MONTHLY"
            }
            onClick={() =>
              setPeriod("MONTHLY")
            }
          >
            월간
          </PeriodButton>
        </PeriodToggle>

        <TrendCard>
          <TrendHeader>
            <TrendTitle>
              피부 온도 지수 추이
            </TrendTitle>

            <TrendDescription>
              {averageSkinCondition ===
              null
                ? "아직 기록이 없어요."
                : `평균 피부 상태 ${averageSkinCondition}`}
            </TrendDescription>
          </TrendHeader>

          <OrbitTrendChart
            records={chartRecords}
            period={
              period === "WEEKLY"
                ? "week"
                : "month"
            }
          />
        </TrendCard>

        <CauseCard>
          <CauseCardTitle>
            주요 원인 변화
          </CauseCardTitle>

          {visibleCauseChanges.length >
          0 ? (
            <CauseTimeline>
              {visibleCauseChanges.map(
                (item, index) => {
                  const riskTheme =
                    RISK_THEMES[
                      item.level
                    ] ||
                    RISK_THEMES.중간;

                  return (
                    <CauseItem
                      key={`${item.startDate}-${item.factorName}-${index}`}
                    >
                      <TimelineMarker
                        $last={
                          index ===
                          visibleCauseChanges.length -
                            1
                        }
                      >
                        <TimelineDot
                          $riskTheme={
                            riskTheme
                          }
                        />
                      </TimelineMarker>

                      <CauseInfo>
                        <CausePeriod>
                          {formatCausePeriod(
                            item
                          )}
                        </CausePeriod>

                        <CauseName>
                          {
                            item.factorName
                          }
                        </CauseName>
                      </CauseInfo>

                      <CauseRiskBadge
                        $riskTheme={
                          riskTheme
                        }
                      >
                        <CauseRiskDot
                          $riskTheme={
                            riskTheme
                          }
                        />

                        {item.level}
                      </CauseRiskBadge>
                    </CauseItem>
                  );
                }
              )}
            </CauseTimeline>
          ) : (
            <EmptyCauseTimeline>
              선택한 기간에 주요 원인
              변화가 없어요.
            </EmptyCauseTimeline>
          )}
        </CauseCard>

        <MissionRateCard>
          <MissionRateTitle>
            미션 완료율
          </MissionRateTitle>

          <MissionRateBody>
            <MissionRateCircle
              $percentage={
                missionPercentage
              }
              $color={
                missionRateTheme.color
              }
              role="img"
              aria-label={`미션 완료율 ${missionPercentage}%`}
            >
              <MissionRateValue
                $color={
                  missionRateTheme.color
                }
              >
                {missionPercentage}%
              </MissionRateValue>
            </MissionRateCircle>

            <MissionRateInfo>
              <MissionRateCount>
                {
                  missionHistory
                    ?.completedCount ??
                  0
                }
                /
                {
                  missionHistory
                    ?.targetCount ??
                  0
                }{" "}
                완료
              </MissionRateCount>

              <MissionRateLabel>
                이번{" "}
                {period === "WEEKLY"
                  ? "주"
                  : "달"}{" "}
                미션 달성률
              </MissionRateLabel>

              <MissionRateMessage
                $color={
                  missionRateTheme.color
                }
              >
                {
                  missionRateTheme.message
                }
              </MissionRateMessage>
            </MissionRateInfo>
          </MissionRateBody>
        </MissionRateCard>

        <PpJourneyCard
          stageData={stageData}
        />
      </Content>

      <NavBar />
    </Page>
  );
};

export default OrbitHistoryPage;