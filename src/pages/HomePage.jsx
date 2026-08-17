import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";

import { getHome } from "../api/home";

import profileLevel1 from "../assets/profile_level_1.svg";
import profileLevel2 from "../assets/profile_level_2.svg";
import profileLevel3 from "../assets/profile_level_3.svg";

import planetGaugeImage from "../assets/PlanetGauge.png";
import orbitHistoryIcon from "../assets/home-orbit-history.svg";

import {
  Page,
  Content,
  GreetingHeader,
  ProfileImage,
  GreetingText,
  DateText,
  Greeting,
  PlanetSection,
  SectionTitle,
  Gauge,
  PlanetGaugeImage,
  RecordStatusCard,
  RecordStatusIcon,
  RecordStatusIconImage,
  RecordStatusContent,
  RecordStatusTitle,
  RecordStatusDescription,
  RecordStatusButton,
  ForecastProgressCard,
  ForecastProgressHeader,
  ForecastProgressCount,
  ForecastProgressTrack,
  ForecastProgressBar,
  ForecastProgressHint,
  ForecastSummaryCard,
  ForecastSummaryHeader,
  ForecastSummaryTitle,
  ForecastTypeBadge,
  ForecastSummaryBody,
  ForecastScoreGroup,
  ForecastScore,
  ForecastScoreLabel,
  ForecastDetails,
  RiskBadge,
  RiskDot,
  ForecastCause,
  MissionCard,
  MissionIcon,
  MissionContent,
  MissionLabel,
  MissionTitle,
  MissionDuration,
  MissionArrow,
  MilestoneOverlay,
  MilestoneGroup,
  MilestonePpImage,
  MilestoneModal,
  MilestoneTitle,
  MilestoneDescription,
  MilestoneButtons,
  ForecastButton,
  PpButton,
} from "../styles/HomePage.styles";

const PROFILE_IMAGES = {
  1: profileLevel1,
  2: profileLevel2,
  3: profileLevel3,
};

const RISK_THEMES = {
  안정: {
    color: "#6bd2b0",
    background: "rgba(107, 210, 176, 0.15)",
    border: "rgba(107, 210, 176, 0.5)",
    shadow: "rgba(107, 210, 176, 0.25)",
  },

  보통: {
    color: "#fbf079",
    background: "rgba(251, 240, 121, 0.15)",
    border: "rgba(251, 240, 121, 0.5)",
    shadow: "rgba(251, 240, 121, 0.25)",
  },

  주의: {
    color: "#fbf079",
    background: "rgba(251, 240, 121, 0.15)",
    border: "rgba(251, 240, 121, 0.5)",
    shadow: "rgba(251, 240, 121, 0.25)",
  },

  위험: {
    color: "#f2684b",
    background: "rgba(242, 104, 75, 0.15)",
    border: "rgba(242, 104, 75, 0.5)",
    shadow: "rgba(242, 104, 75, 0.25)",
  },

  "데이터 없음": {
    color: "#a9b4c6",
    background: "rgba(169, 180, 198, 0.15)",
    border: "rgba(169, 180, 198, 0.5)",
    shadow: "rgba(169, 180, 198, 0.2)",
  },
};

const formatKoreanDate = (dateString) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(
    `${dateString}T00:00:00`
  );

  return new Intl.DateTimeFormat(
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }
  ).format(date);
};

const HomePage = () => {
  const navigate = useNavigate();

  const [
    homeData,
    setHomeData,
  ] = useState(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    activeMilestone,
    setActiveMilestone,
  ] = useState(null);

  useEffect(() => {
    const loadHome = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result =
          await getHome();

        console.log(
          "홈 데이터 조회 성공:",
          result
        );

        setHomeData(result.data);

        /*
         * 서버가 데이터 기반 예보
         * 전환 시점을 알려주는 경우
         */
        if (
          result.data
            ?.forecastProgress
            ?.forecastTransitionReached
        ) {
          setActiveMilestone(
            "record-10"
          );
        }
      } catch (error) {
        console.error(
          "홈 데이터 조회 실패:",
          error
        );

        setErrorMessage(
          error.message ||
            "홈 정보를 불러오지 못했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadHome();
  }, []);

  const primaryCause =
    useMemo(() => {
      const factors =
        homeData
          ?.tomorrowForecast
          ?.primaryFactors;

      if (
        !factors ||
        factors.length === 0
      ) {
        return null;
      }

      const sorted = [
        ...factors,
      ].sort(
        (first, second) =>
          (first.rank ?? 999) -
          (second.rank ?? 999)
      );

      return sorted[0]?.name || null;
    }, [homeData]);

  if (isLoading) {
    return (
      <Page>
        <Content>
          홈 정보를 불러오는 중입니다...
        </Content>

        <NavBar />
      </Page>
    );
  }

  if (
    errorMessage ||
    !homeData
  ) {
    return (
      <Page>
        <Content>
          {errorMessage ||
            "홈 정보를 찾을 수 없습니다."}
        </Content>

        <NavBar />
      </Page>
    );
  }

  const {
    date,
    nickname,
    planetTemperature,
    todayRecord,
    forecastProgress,
    tomorrowForecast,
    todayMission,
    badge,
  } = homeData;

  const score =
    planetTemperature?.score;

  const planetLevel =
    planetTemperature?.level ||
    "데이터 없음";

  const hasTodayRecord =
    todayRecord?.recorded ?? false;

  const validRecordCount =
    forecastProgress
      ?.validRecordCount ?? 0;

  const targetRecordCount =
    forecastProgress
      ?.targetRecordCount ?? 10;

  const remainingRecordCount =
    forecastProgress
      ?.remainingRecordCount ??
    Math.max(
      targetRecordCount -
        validRecordCount,
      0
    );

  const progressPercent =
    forecastProgress
      ?.progressPercent ?? 0;

  const forecastReady =
    forecastProgress
      ?.dataBasedForecastReady ??
    false;

  const forecastMode =
    forecastProgress
      ?.forecastMode;

  const forecastType =
    forecastMode === "DATA_BASED"
      ? "데이터 기반"
      : "추정값";

  const forecastScore =
    tomorrowForecast?.riskScore;

  const riskStatus =
    tomorrowForecast?.riskLevel;

  const riskTheme =
    RISK_THEMES[riskStatus] ||
    RISK_THEMES.주의;

  const profileImage =
    PROFILE_IMAGES[
      badge?.stage
    ] ||
    PROFILE_IMAGES[1];

  return (
    <Page>
      <Content>
        {/* =========================
            GREETING
        ========================= */}

        <GreetingHeader>
          <ProfileImage
            src={profileImage}
            alt={`PP 레벨 ${badge?.stage ?? 1}`}
          />

          <GreetingText>
            <DateText>
              {formatKoreanDate(
                date
              )}
            </DateText>

            <Greeting>
              안녕하세요,{" "}
              {nickname}님 👋
            </Greeting>
          </GreetingText>
        </GreetingHeader>

        {/* =========================
            PLANET
        ========================= */}

        <PlanetSection>
          <SectionTitle>
            오늘 나의 행성은?
          </SectionTitle>

          <Gauge
            aria-label={
              score === null
                ? "피부 온도 지수 데이터 없음"
                : `피부 온도 지수 ${score}, ${planetLevel}`
            }
          >
            <PlanetGaugeImage
              src={
                planetGaugeImage
              }
              alt=""
              aria-hidden="true"
            />
          </Gauge>
        </PlanetSection>

        {/* =========================
            TODAY RECORD
        ========================= */}

        {!hasTodayRecord && (
          <RecordStatusCard>
            <RecordStatusIcon>
              <span
                aria-hidden="true"
              >
                ✏️
              </span>
            </RecordStatusIcon>

            <RecordStatusContent>
              <RecordStatusTitle>
                오늘 기록이 아직 없어요
              </RecordStatusTitle>

              <RecordStatusDescription>
                15초면 충분해요.
                오늘의 로그를
                남겨보세요.
              </RecordStatusDescription>
            </RecordStatusContent>

            <RecordStatusButton
              type="button"
              onClick={() =>
                navigate("/log")
              }
            >
              기록
            </RecordStatusButton>
          </RecordStatusCard>
        )}

        {/* =========================
            HISTORY
        ========================= */}

        <RecordStatusCard>
          <RecordStatusIcon
            $recorded
          >
            <RecordStatusIconImage
              src={
                orbitHistoryIcon
              }
              alt=""
              aria-hidden="true"
            />
          </RecordStatusIcon>

          <RecordStatusContent>
            <RecordStatusTitle>
              나의 궤도 상황을
              확인하세요
            </RecordStatusTitle>

            <RecordStatusDescription>
              궤도 히스토리에서
              확인할 수 있어요.
            </RecordStatusDescription>
          </RecordStatusContent>

          <RecordStatusButton
            type="button"
            onClick={() =>
              navigate(
                "/orbit-history"
              )
            }
          >
            기록
          </RecordStatusButton>
        </RecordStatusCard>

        {/* =========================
            FORECAST PROGRESS
        ========================= */}

        {!forecastReady && (
          <ForecastProgressCard>
            <ForecastProgressHeader>
              <span>
                맞춤 예측까지
              </span>

              <ForecastProgressCount>
                {validRecordCount}/
                {targetRecordCount}
              </ForecastProgressCount>
            </ForecastProgressHeader>

            <ForecastProgressTrack>
              <ForecastProgressBar
                $percentage={
                  progressPercent
                }
              />
            </ForecastProgressTrack>

            <ForecastProgressHint>
              {remainingRecordCount}개
              더 기록하면 나만의
              예측이 시작돼요
            </ForecastProgressHint>
          </ForecastProgressCard>
        )}

        {/* =========================
            FORECAST
        ========================= */}

        {tomorrowForecast ? (
          <ForecastSummaryCard
            type="button"
            onClick={() =>
              navigate(
                "/prediction/result",
                {
                  state: {
                    forecast:
                      tomorrowForecast,
                  },
                }
              )
            }
          >
            <ForecastSummaryHeader>
              <ForecastSummaryTitle>
                내일 예측
              </ForecastSummaryTitle>

              <ForecastTypeBadge>
                {forecastType}
              </ForecastTypeBadge>
            </ForecastSummaryHeader>

            <ForecastSummaryBody>
              <ForecastScoreGroup>
                <ForecastScore>
                  {forecastScore}
                </ForecastScore>

                <ForecastScoreLabel>
                  예측 지수
                </ForecastScoreLabel>
              </ForecastScoreGroup>

              <ForecastDetails>
                <RiskBadge
                  $riskTheme={
                    riskTheme
                  }
                >
                  <RiskDot
                    $riskTheme={
                      riskTheme
                    }
                  />

                  {riskStatus}
                </RiskBadge>

                <ForecastCause>
                  주요 원인:{" "}
                  <strong>
                    {primaryCause ||
                      "분석 중"}
                  </strong>
                </ForecastCause>
              </ForecastDetails>
            </ForecastSummaryBody>
          </ForecastSummaryCard>
        ) : (
          <ForecastSummaryCard
            type="button"
            onClick={() =>
              navigate(
                "/prediction"
              )
            }
          >
            <ForecastSummaryHeader>
              <ForecastSummaryTitle>
                내일 예측
              </ForecastSummaryTitle>

              <ForecastTypeBadge>
                {forecastType}
              </ForecastTypeBadge>
            </ForecastSummaryHeader>

            <ForecastSummaryBody>
              <ForecastScoreGroup>
                <ForecastScore>
                  -
                </ForecastScore>

                <ForecastScoreLabel>
                  아직 생성된 예보가
                  없어요
                </ForecastScoreLabel>
              </ForecastScoreGroup>

              <ForecastDetails>
                <ForecastCause>
                  내일 예상 환경을
                  입력해 예보를
                  만들어 보세요.
                </ForecastCause>
              </ForecastDetails>
            </ForecastSummaryBody>
          </ForecastSummaryCard>
        )}

        {/* =========================
            TODAY MISSION
        ========================= */}

        {todayMission && (
          <MissionCard
            type="button"
            onClick={() =>
              navigate("/mission")
            }
          >
            <MissionIcon
              aria-hidden="true"
            >
              🚀
            </MissionIcon>

            <MissionContent>
              <MissionLabel>
                오늘의 탐험 미션
              </MissionLabel>

              <MissionTitle>
                {
                  todayMission.title
                }
              </MissionTitle>

              <MissionDuration>
                예상 소요{" "}
                {
                  todayMission
                    .estimatedMinutes
                }
                분
              </MissionDuration>
            </MissionContent>

            <MissionArrow
              aria-hidden="true"
            >
              ›
            </MissionArrow>
          </MissionCard>
        )}
      </Content>

      <NavBar />

      {/* =========================
          10 RECORD MILESTONE
      ========================= */}

      {activeMilestone ===
        "record-10" && (
        <MilestoneOverlay
          role="dialog"
          aria-modal="true"
        >
          <MilestoneGroup>
            <MilestonePpImage
              src={profileImage}
              alt="탐사 파트너 PP"
            />

            <MilestoneModal>
              <MilestoneTitle>
                여행자님의 궤도가
                완성되었습니다!
              </MilestoneTitle>

              <MilestoneDescription>
                <p>
                  궤도를{" "}
                  {targetRecordCount}건
                  기록했어요.
                </p>

                <p>
                  이제 데이터 기반
                  예보를 확인할 수
                  있습니다.
                </p>

                <p>
                  지금 바로 확인해
                  보세요.
                </p>
              </MilestoneDescription>

              <MilestoneButtons>
                <ForecastButton
                  type="button"
                  onClick={() =>
                    navigate(
                      tomorrowForecast
                        ? "/prediction/result"
                        : "/prediction",
                      tomorrowForecast
                        ? {
                            state: {
                              forecast:
                                tomorrowForecast,
                            },
                          }
                        : undefined
                    )
                  }
                >
                  예보 확인하기
                </ForecastButton>

                <PpButton
                  type="button"
                  onClick={() =>
                    navigate(
                      "/mission"
                    )
                  }
                >
                  PP 보러가기
                </PpButton>
              </MilestoneButtons>
            </MilestoneModal>
          </MilestoneGroup>
        </MilestoneOverlay>
      )}
    </Page>
  );
};

export default HomePage;