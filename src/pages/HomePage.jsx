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
  GaugeSvg,
  GaugeTrack,
  GaugeProgress,
  GaugeCenter,
  GaugeScore,
  GaugeLabel,
  GaugeLevel,

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


/* =========================================
   PP LEVEL IMAGE
========================================= */

const PROFILE_IMAGES = {
  1: profileLevel1,
  2: profileLevel2,
  3: profileLevel3,
};


/* =========================================
   RISK THEME
========================================= */

const RISK_THEMES = {
  안정: {
    color: "#6bd2b0",
    background: "rgba(107, 210, 176, 0.15)",
    border: "rgba(107, 210, 176, 0.5)",
    shadow: "rgba(107, 210, 176, 0.25)",
  },

  보통: {
    color: "#8fadea",
    background: "rgba(143, 173, 234, 0.15)",
    border: "rgba(143, 173, 234, 0.5)",
    shadow: "rgba(143, 173, 234, 0.25)",
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
};


/* =========================================
   PLANET LEVEL COLOR
========================================= */

const PLANET_LEVEL_COLORS = {
  안정: "#6bd2b0",
  보통: "#8fadea",
  주의: "#ffe259",
  위험: "#f2684b",
  "데이터 없음": "#a9b4c6",
};


/* =========================================
   DATE FORMAT
========================================= */

const formatKoreanDate = (dateString) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
};


/* =========================================
   HOME PAGE
========================================= */

const HomePage = () => {
  const navigate = useNavigate();

  const [homeData, setHomeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeMilestone, setActiveMilestone] = useState(null);


  /* =========================================
     HOME API
  ========================================= */

  useEffect(() => {
    const loadHome = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = await getHome();

        console.log("홈 데이터 조회 성공:", result);

        setHomeData(result.data);

        /*
         * 백엔드에서
         * 데이터 기반 예보 전환 시점에 도달했는지 확인
         */
        if (
          result.data?.forecastProgress?.forecastTransitionReached
        ) {
          setActiveMilestone("record-10");
        }
      } catch (error) {
        console.error("홈 데이터 조회 실패:", error);

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


  /* =========================================
     PRIMARY FORECAST FACTOR
  ========================================= */

  const primaryCause = useMemo(() => {
    const factors =
      homeData?.tomorrowForecast?.primaryFactors;

    if (!factors || factors.length === 0) {
      return null;
    }

    const sortedFactors = [...factors].sort(
      (first, second) =>
        (first.rank ?? 999) -
        (second.rank ?? 999)
    );

    return sortedFactors[0]?.name || null;
  }, [homeData]);


  /* =========================================
     LOADING
  ========================================= */

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


  /* =========================================
     ERROR
  ========================================= */

  if (errorMessage || !homeData) {
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


  /* =========================================
     HOME DATA
  ========================================= */

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


  /* =========================================
     PLANET TEMPERATURE
  ========================================= */

  const rawScore = planetTemperature?.score;

  const hasPlanetScore =
    typeof rawScore === "number";

  /*
   * 혹시 백엔드에서 범위를 벗어난 값이 와도
   * 게이지가 깨지지 않도록 0~100으로 제한
   */
  const score = hasPlanetScore
    ? Math.min(
        Math.max(rawScore, 0),
        100
      )
    : 0;

  const planetLevel =
    planetTemperature?.level ||
    "데이터 없음";

  const planetLevelColor =
    PLANET_LEVEL_COLORS[planetLevel] ||
    PLANET_LEVEL_COLORS["데이터 없음"];


  /* =========================================
     TODAY RECORD
  ========================================= */

  const hasTodayRecord =
    todayRecord?.recorded ?? false;


  /* =========================================
     FORECAST PROGRESS
  ========================================= */

  const validRecordCount =
    forecastProgress?.validRecordCount ?? 0;

  const targetRecordCount =
    forecastProgress?.targetRecordCount ?? 10;

  const remainingRecordCount =
    forecastProgress?.remainingRecordCount ??
    Math.max(
      targetRecordCount - validRecordCount,
      0
    );

  const progressPercent =
    forecastProgress?.progressPercent ?? 0;

  const forecastReady =
    forecastProgress?.dataBasedForecastReady ??
    false;

  const forecastMode =
    forecastProgress?.forecastMode;

  const forecastType =
    forecastMode === "DATA_BASED"
      ? "데이터 기반"
      : "추정값";


  /* =========================================
     TOMORROW FORECAST
  ========================================= */

  const forecastScore =
    tomorrowForecast?.riskScore;

  const riskStatus =
    tomorrowForecast?.riskLevel;

  const riskTheme =
    RISK_THEMES[riskStatus] ||
    RISK_THEMES.주의;


  /* =========================================
     PP BADGE
  ========================================= */

  const profileImage =
    PROFILE_IMAGES[badge?.stage] ||
    PROFILE_IMAGES[1];


  /* =========================================
     RENDER
  ========================================= */

  return (
    <Page>
      <Content>

        {/* =====================================
            GREETING
        ===================================== */}

        <GreetingHeader>
          <ProfileImage
            src={profileImage}
            alt={`PP 레벨 ${badge?.stage ?? 1}`}
          />

          <GreetingText>
            <DateText>
              {formatKoreanDate(date)}
            </DateText>

            <Greeting>
              안녕하세요, {nickname}님 👋
            </Greeting>
          </GreetingText>
        </GreetingHeader>


        {/* =====================================
            PLANET TEMPERATURE
        ===================================== */}

        <PlanetSection>
          <SectionTitle>
            오늘 나의 행성은?
          </SectionTitle>

          <Gauge
            aria-label={
              hasPlanetScore
                ? `피부 온도 지수 ${score}, ${planetLevel}`
                : "피부 온도 지수 데이터 없음"
            }
          >

            {/* ================================
                SVG GAUGE
            ================================ */}

            <GaugeSvg
              viewBox="0 0 240 240"
              aria-hidden="true"
            >
              <defs>

                {/* 민트 → 보라 그라데이션 */}

                <linearGradient
                  id="planetGaugeGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="#00E3C1"
                  />

                  <stop
                    offset="45%"
                    stopColor="#6ED9C5"
                  />

                  <stop
                    offset="72%"
                    stopColor="#B8C4E7"
                  />

                  <stop
                    offset="100%"
                    stopColor="#E4A8DB"
                  />
                </linearGradient>


                {/* 게이지 Glow */}

                <filter
                  id="planetGaugeGlow"
                  x="-40%"
                  y="-40%"
                  width="180%"
                  height="180%"
                >
                  <feGaussianBlur
                    stdDeviation="3.5"
                    result="blur"
                  />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

              </defs>


              {/* ================================
                  DARK NAVY TRACK
              ================================ */}

              <GaugeTrack
                cx="120"
                cy="120"
                r="96"
                pathLength="100"
              />


              {/* ================================
                  SCORE PROGRESS
              ================================ */}

              <GaugeProgress
                cx="120"
                cy="120"
                r="96"
                pathLength="100"
                $score={score}
                filter="url(#planetGaugeGlow)"
              />

            </GaugeSvg>


            {/* ================================
                CENTER
            ================================ */}

            <GaugeCenter>

              <GaugeScore>
                {hasPlanetScore
                  ? score
                  : "-"}
              </GaugeScore>

              <GaugeLabel>
                피부 온도 지수
              </GaugeLabel>

              <GaugeLevel
                $level={planetLevel}
                $color={planetLevelColor}
              >
                {planetLevel}
              </GaugeLevel>

            </GaugeCenter>

          </Gauge>
        </PlanetSection>


        {/* =====================================
            TODAY RECORD
        ===================================== */}

        {!hasTodayRecord && (
          <RecordStatusCard>

            <RecordStatusIcon>
              <span aria-hidden="true">
                ✏️
              </span>
            </RecordStatusIcon>

            <RecordStatusContent>

              <RecordStatusTitle>
                오늘 기록이 아직 없어요
              </RecordStatusTitle>

              <RecordStatusDescription>
                15초면 충분해요. 오늘의 로그를
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


        {/* =====================================
            ORBIT HISTORY
        ===================================== */}

        <RecordStatusCard>

          <RecordStatusIcon $recorded>

            <RecordStatusIconImage
              src={orbitHistoryIcon}
              alt=""
              aria-hidden="true"
            />

          </RecordStatusIcon>

          <RecordStatusContent>

            <RecordStatusTitle>
              나의 궤도 상황을 확인하세요
            </RecordStatusTitle>

            <RecordStatusDescription>
              궤도 히스토리에서 확인할 수 있어요.
            </RecordStatusDescription>

          </RecordStatusContent>

          <RecordStatusButton
            type="button"
            onClick={() =>
              navigate("/orbit-history")
            }
          >
            기록
          </RecordStatusButton>

        </RecordStatusCard>


        {/* =====================================
            FORECAST PROGRESS
        ===================================== */}

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
                $percentage={progressPercent}
              />

            </ForecastProgressTrack>


            <ForecastProgressHint>
              {remainingRecordCount}개 더 기록하면
              나만의 예측이 시작돼요
            </ForecastProgressHint>

          </ForecastProgressCard>
        )}


        {/* =====================================
            TOMORROW FORECAST
        ===================================== */}

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
                  $riskTheme={riskTheme}
                >

                  <RiskDot
                    $riskTheme={riskTheme}
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
              navigate("/prediction")
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
                  아직 생성된 예보가 없어요
                </ForecastScoreLabel>

              </ForecastScoreGroup>


              <ForecastDetails>

                <ForecastCause>
                  내일 예상 환경을 입력해
                  예보를 만들어 보세요.
                </ForecastCause>

              </ForecastDetails>

            </ForecastSummaryBody>

          </ForecastSummaryCard>

        )}


        {/* =====================================
            TODAY MISSION
        ===================================== */}

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
                {todayMission.title}
              </MissionTitle>

              <MissionDuration>
                예상 소요{" "}
                {todayMission.estimatedMinutes}분
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


      {/* =====================================
          NAVIGATION
      ===================================== */}

      <NavBar />


      {/* =====================================
          RECORD 10 MILESTONE
      ===================================== */}

      {activeMilestone === "record-10" && (

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
                  궤도를 {targetRecordCount}건
                  기록했어요.
                </p>

                <p>
                  이제 데이터 기반 예보를
                  확인할 수 있습니다.
                </p>

                <p>
                  지금 바로 확인해 보세요.
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
                    navigate("/mission")
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