import NavBar from "../components/NavBar";

import profileImage from "../assets/home-profile.png";
import planetGaugeImage from "../assets/PlanetGauge.png";

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
}) => {
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
      </Content>

      <NavBar />
    </Page>
  );
};

export default HomePage;
