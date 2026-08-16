import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";

import profileImage from "../assets/home-profile.png";
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

const RISK_THEMES = {
  안정: {
    color: "#6bd2b0",
    background: "rgba(107, 210, 176, 0.15)",
    border: "rgba(107, 210, 176, 0.5)",
    shadow: "rgba(107, 210, 176, 0.25)",
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

const formatKoreanDate = (date) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);

const HomePage = ({
  nickname = "여행자",
  score = 62,
  status = "주의",
  date = new Date(),
  hasTodayRecord = false,
  recordCount = 3,
  hasForecast = false,
  forecastScore = 68,
  riskStatus = "주의",
  mainCause = "냉난방",
  missionTitle = "실내 습도 체크하기",
  missionDuration = 3,
}) => {
  const navigate = useNavigate();
  const normalizedRecordCount = Math.min(Math.max(recordCount, 0), 10);
  const remainingRecordCount = 10 - normalizedRecordCount;
  const [showRecordMilestone] = useState(normalizedRecordCount >= 10);
  const forecastType = normalizedRecordCount >= 10 ? "데이터 기반" : "추정값";
  const riskTheme = RISK_THEMES[riskStatus] ?? RISK_THEMES.주의;

  return (
    <Page>
      <Content>
        <GreetingHeader>
          <ProfileImage src={profileImage} alt="탐사 파트너 PP" />

          <GreetingText>
            <DateText>{formatKoreanDate(date)}</DateText>
            <Greeting>안녕하세요, {nickname}님 👋</Greeting>
          </GreetingText>
        </GreetingHeader>

        <PlanetSection>
          <SectionTitle>오늘 나의 행성은?</SectionTitle>

          <Gauge aria-label={`피부 온도 지수 ${score}, ${status}`}>
            <PlanetGaugeImage
              src={planetGaugeImage}
              alt=""
              aria-hidden="true"
            />
          </Gauge>
        </PlanetSection>

        {!hasTodayRecord && (
          <RecordStatusCard>
            <RecordStatusIcon>
              <span aria-hidden="true">✏️</span>
            </RecordStatusIcon>

            <RecordStatusContent>
              <RecordStatusTitle>오늘 기록이 아직 없어요</RecordStatusTitle>
              <RecordStatusDescription>
                15초면 충분해요. 오늘의 로그를 남겨보세요.
              </RecordStatusDescription>
            </RecordStatusContent>

            <RecordStatusButton type="button" onClick={() => navigate("/log")}>
              기록
            </RecordStatusButton>
          </RecordStatusCard>
        )}

        <RecordStatusCard>
          <RecordStatusIcon $recorded>
            <RecordStatusIconImage
              src={orbitHistoryIcon}
              alt=""
              aria-hidden="true"
            />
          </RecordStatusIcon>

          <RecordStatusContent>
            <RecordStatusTitle>나의 궤도 상황을 확인하세요</RecordStatusTitle>
            <RecordStatusDescription>
              궤도 히스토리에서 확인할 수 있어요.
            </RecordStatusDescription>
          </RecordStatusContent>

          <RecordStatusButton
            type="button"
            onClick={() => navigate("/orbit-history")}
          >
            기록
          </RecordStatusButton>
        </RecordStatusCard>

        {normalizedRecordCount < 10 && (
          <ForecastProgressCard>
            <ForecastProgressHeader>
              <span>맞춤 예측까지</span>
              <ForecastProgressCount>
                {normalizedRecordCount}/10
              </ForecastProgressCount>
            </ForecastProgressHeader>

            <ForecastProgressTrack>
              <ForecastProgressBar $recordCount={normalizedRecordCount} />
            </ForecastProgressTrack>

            <ForecastProgressHint>
              {remainingRecordCount}개 더 기록하면 나만의 예측이 시작돼요
            </ForecastProgressHint>
          </ForecastProgressCard>
        )}

        <ForecastSummaryCard
          type="button"
          onClick={() => navigate("/prediction/result")}
        >
          <ForecastSummaryHeader>
            <ForecastSummaryTitle>내일 예측</ForecastSummaryTitle>
            <ForecastTypeBadge>{forecastType}</ForecastTypeBadge>
          </ForecastSummaryHeader>

          <ForecastSummaryBody>
            <ForecastScoreGroup>
              <ForecastScore>{forecastScore}</ForecastScore>
              <ForecastScoreLabel>예측 지수</ForecastScoreLabel>
            </ForecastScoreGroup>

            <ForecastDetails>
              <RiskBadge $riskTheme={riskTheme}>
                <RiskDot $riskTheme={riskTheme} />
                {riskStatus}
              </RiskBadge>

              <ForecastCause>
                주요 원인: <strong>{mainCause}</strong>
              </ForecastCause>
            </ForecastDetails>
          </ForecastSummaryBody>
        </ForecastSummaryCard>

        <MissionCard type="button" onClick={() => navigate("/mission")}>
          <MissionIcon aria-hidden="true">🚀</MissionIcon>

          <MissionContent>
            <MissionLabel>오늘의 탐험 미션</MissionLabel>
            <MissionTitle>{missionTitle}</MissionTitle>
            <MissionDuration>예상 소요 {missionDuration}분</MissionDuration>
          </MissionContent>

          <MissionArrow aria-hidden="true">›</MissionArrow>
        </MissionCard>
      </Content>

      <NavBar />

      {showRecordMilestone && (
        <MilestoneOverlay role="dialog" aria-modal="true">
          <MilestoneGroup>
            <MilestonePpImage
              src={profileImage}
              alt="레벨업한 탐사 파트너 PP"
            />

            <MilestoneModal>
              <MilestoneTitle>여행자님의 궤도가 완성되었습니다!</MilestoneTitle>

              <MilestoneDescription>
                <p>궤도를 10건 기록했어요.</p>
                <p>
                  이제 데이터 기반 예보를 확인할 수 있습니다.
                  <br />
                  PP가 Lv.2 탐사자로 레벨업했어요!
                </p>
                <p>지금 바로 확인해 보세요.</p>
              </MilestoneDescription>

              <MilestoneButtons>
                <ForecastButton
                  type="button"
                  onClick={() =>
                    navigate(hasForecast ? "/prediction/result" : "/prediction")
                  }
                >
                  예보 확인하기
                </ForecastButton>

                <PpButton type="button" onClick={() => navigate("/mission")}>
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
