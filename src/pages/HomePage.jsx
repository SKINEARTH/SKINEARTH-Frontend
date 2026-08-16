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
}) => {
  const navigate = useNavigate();

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
      </Content>

      <NavBar />
    </Page>
  );
};

export default HomePage;
