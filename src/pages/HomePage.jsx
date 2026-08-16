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
}) => {
  const navigate = useNavigate();
  const normalizedRecordCount = Math.min(Math.max(recordCount, 0), 10);
  const remainingRecordCount = 10 - normalizedRecordCount;
  const [showRecordMilestone] = useState(normalizedRecordCount >= 10);

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
