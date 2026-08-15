import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import logo from "../assets/logo_SplashPage.svg";

import {
  Page,
  Content,
  LogoGlow,
  CompleteLogo,
  Title,
  Description,
  StreakCard,
  StreakTop,
  FireIcon,
  StreakInfo,
  StreakCount,
  StreakText,
  Divider,
  ProgressHeader,
  ProgressLabel,
  ProgressCount,
  ProgressTrack,
  ProgressBar,
  ProgressDescription,
  ButtonGroup,
  PredictionButton,
  HomeButton,
} from "../styles/LogCompletePage.styles";

const LogCompletePage = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Content>
        <LogoGlow>
          <CompleteLogo
            src={logo}
            alt="SKINEARTH"
          />
        </LogoGlow>

        <Title>
          기록 완료!
        </Title>

        <Description>
          오늘의 궤도가 기록됐어요.
        </Description>

        <StreakCard>
          <StreakTop>
            <FireIcon>
              🔥
            </FireIcon>

            <StreakInfo>
              <StreakCount>
                4일 연속
              </StreakCount>

              <StreakText>
                스트릭 유지 중!
              </StreakText>
            </StreakInfo>
          </StreakTop>

          <Divider />

          <ProgressHeader>
            <ProgressLabel>
              맞춤 예측까지
            </ProgressLabel>

            <ProgressCount>
              4/10
            </ProgressCount>
          </ProgressHeader>

          <ProgressTrack>
            <ProgressBar />
          </ProgressTrack>

          <ProgressDescription>
            6개 더 기록하면 나만의 예측 시작!
          </ProgressDescription>
        </StreakCard>

        <ButtonGroup>
          <PredictionButton
            type="button"
            onClick={() =>
              navigate("/prediction")
            }
          >
            내일 예측 보기
          </PredictionButton>

          <HomeButton
            type="button"
            onClick={() =>
              navigate("/home")
            }
          >
            홈으로 돌아가기
          </HomeButton>
        </ButtonGroup>
      </Content>

      <NavBar />
    </Page>
  );
};

export default LogCompletePage;