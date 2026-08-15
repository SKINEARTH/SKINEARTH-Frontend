import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";

import {
  Page,
  Content,
  Header,
  Title,
  Subtitle,
  Card,
  CardHeader,
  PredictionIcon,
  CardTitleGroup,
  SectionTitle,
  SectionDescription,
  FactorList,
  FactorItem,
  FactorLabel,
  Emoji,
  ScoreButtons,
  ScoreButton,
  SleepHeader,
  SleepValue,
  Slider,
  PredictionButton,
  GuideCard,
  GuideBadge,
  GuideText,
  GuideParagraph,
} from "../styles/PredictionPage.styles";

const SCORE_OPTIONS = [1, 2, 3, 4, 5];

const PredictionPage = () => {
  const navigate = useNavigate();

  // 목데이터 기준 기본값
  const [heating, setHeating] = useState();
  const [screen, setScreen] = useState();
  const [sleep, setSleep] = useState();
  const [stress, setStress] = useState();
  const [meal, setMeal] = useState();

  const handlePrediction = () => {
    const predictionData = {
      heating,
      screen,
      sleep,
      stress,
      meal,
    };

    console.log("내일 예측 조건:", predictionData);

    navigate("/prediction/loading");
  };

  return (
    <Page>
      <Content>
        <Header>
          <Title>내일의 궤도 예보</Title>
          <Subtitle>
            내일 예상되는 환경을 선택해 주세요
          </Subtitle>
        </Header>

        <Card>
          <CardHeader>
            <CardTitleGroup>
              <SectionTitle>
              🌀 내일의 예측 조건
              </SectionTitle>

              <SectionDescription>
                선택한 값으로 피부 기후를 예측합니다
              </SectionDescription>
            </CardTitleGroup>
          </CardHeader>

          <FactorList>
            <FactorItem>
              <FactorLabel>
                <Emoji>❄️</Emoji>
                냉난방 노출 (예상)
              </FactorLabel>

              <ScoreButtons>
                {SCORE_OPTIONS.map((score) => (
                  <ScoreButton
                    key={score}
                    type="button"
                    $selected={heating === score}
                    onClick={() =>
                      setHeating(score)
                    }
                  >
                    {score}
                  </ScoreButton>
                ))}
              </ScoreButtons>
            </FactorItem>

            <FactorItem>
              <FactorLabel>
                <Emoji>💻</Emoji>
                화면 노출 (예상)
              </FactorLabel>

              <ScoreButtons>
                {SCORE_OPTIONS.map((score) => (
                  <ScoreButton
                    key={score}
                    type="button"
                    $selected={screen === score}
                    onClick={() =>
                      setScreen(score)
                    }
                  >
                    {score}
                  </ScoreButton>
                ))}
              </ScoreButtons>
            </FactorItem>

            <FactorItem>
              <SleepHeader>
                <FactorLabel>
                  <Emoji>🌙</Emoji>
                  수면 시간 (예상)
                </FactorLabel>

                <SleepValue>
                  {sleep}h
                </SleepValue>
              </SleepHeader>

              <Slider
                type="range"
                min="1"
                max="10"
                step="1"
                value={sleep}
                onChange={(e) =>
                  setSleep(
                    Number(e.target.value)
                  )
                }
              />
            </FactorItem>

            <FactorItem>
              <FactorLabel>
                <Emoji>⚡</Emoji>
                스트레스 (예상)
              </FactorLabel>

              <ScoreButtons>
                {SCORE_OPTIONS.map((score) => (
                  <ScoreButton
                    key={score}
                    type="button"
                    $selected={stress === score}
                    onClick={() =>
                      setStress(score)
                    }
                  >
                    {score}
                  </ScoreButton>
                ))}
              </ScoreButtons>
            </FactorItem>

            <FactorItem>
              <FactorLabel>
                <Emoji>🍽️</Emoji>
                식사 규칙성 (예상)
              </FactorLabel>

              <ScoreButtons>
                {SCORE_OPTIONS.map((score) => (
                  <ScoreButton
                    key={score}
                    type="button"
                    $selected={meal === score}
                    onClick={() =>
                      setMeal(score)
                    }
                  >
                    {score}
                  </ScoreButton>
                ))}
              </ScoreButtons>
            </FactorItem>
          </FactorList>
        </Card>

        <PredictionButton
          type="button"
          onClick={handlePrediction}
        >
          예측 시작하기
        </PredictionButton>

        <GuideCard>
          <GuideBadge>
            🪐 기록 도우미
          </GuideBadge>

          <GuideText>
            <GuideParagraph>
              모든 기록은 여행자님의 체감 정도를
              기준으로 해요.
            </GuideParagraph>

            <GuideParagraph>
              <strong>
                냉난방 노출, 화면 노출:
              </strong>{" "}
              내일 예상 노출 시간이 길다면 5에 <br />
              가깝게, 적절하다면 1에 가깝게 기록해 주세요.
            </GuideParagraph>

            <GuideParagraph>
              <strong>스트레스:</strong>{" "}
              스트레스를 많이 받는 하루가 예상된다면
              5에 <br/> 가깝게,
              스트레스가 거의 없는 하루가
              예상된다면 1에 가깝게 기록해 주세요.
            </GuideParagraph>

            <GuideParagraph>
              <strong>식사 규칙성:</strong>{" "}
              규칙적인 식사를 할 수 있으면 5에
              가깝게,
              <br />
              식사를 거르거나 미룰 예정이라면 1에
              가깝게 기록해 주세요.
            </GuideParagraph>
          </GuideText>
        </GuideCard>
      </Content>

      <NavBar />
    </Page>
  );
};

export default PredictionPage;