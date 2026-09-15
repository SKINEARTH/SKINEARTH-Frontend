import {
  useEffect,
  useState,
  useRef,
} from "react";

import { useNavigate, useLocation } from "react-router-dom";

import NavBar from "../components/NavBar";

import { getForecast } from "../api/forecast";
import { RetryButton } from "../styles/PredictionResultPage.styles";

import {
  Page,
  Content,
  Header,
  Title,
  Subtitle,
  Card,
  CardHeader,
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
  const location = useLocation();
  const isEditing = location.state?.mode === "edit";
  const forecast = location.state?.forecast;
  const initialInputs = location.state?.requestData ?? (isEditing ? forecast : null);
  const submitted = useRef(false);

  const [heating, setHeating] =
    useState(initialInputs?.inputAc ?? null);

  const [screen, setScreen] =
    useState(initialInputs?.inputScreenTime ?? null);

  const [sleep, setSleep] =
    useState(initialInputs?.inputSleepHours ?? 6);

  const [stress, setStress] =
    useState(initialInputs?.inputStress ?? null);

  const [meal, setMeal] =
    useState(initialInputs?.inputMeal ?? null);

  const [isChecking, setIsChecking] =
    useState(!isEditing);

  /*
   * 예측 페이지 진입 시
   * 오늘 이미 생성한 내일 예측이 있는지 확인
   */
  useEffect(() => {
    if (isEditing) return;
    let active = true;
    const checkForecast = async () => {
      try {
        const result =
          await getForecast();

        console.log(
          "기존 예측 조회 성공:",
          result
        );

        /*
         * GET 성공 = 이미 오늘 예측 완료
         *
         * 기존 예측 데이터를 가지고
         * 결과 페이지로 바로 이동
         */
        if (active && result?.data) {
          navigate(
            "/prediction/result",
            {
              replace: true,
              state: {
                forecast:
                  result.data,
              },
            }
          );

          return;
        }
      } catch (error) {
        /*
         * 404 =
         * 아직 내일 예측을 생성하지 않은 상태
         *
         * 이 경우 현재 입력 페이지를
         * 그대로 보여주면 됨
         */
        console.log(
          "기존 예측 없음:",
          error
        );
      } finally {
        if (active) setIsChecking(false);
      }
    };

    checkForecast();
    return () => { active = false; };
  }, [navigate, isEditing]);

  const canPredict =
    heating !== null &&
    screen !== null &&
    sleep !== null &&
    stress !== null &&
    meal !== null;

  const handlePrediction = () => {
    if (!canPredict || submitted.current) {
      return;
    }

    const requestData = {
      inputAc: heating,
      inputScreenTime: screen,
      inputSleepHours: sleep,
      inputStress: stress,
      inputMeal: meal,
    };

    submitted.current = true;

    console.log(
      "예측 API 요청 데이터:",
      requestData
    );

    navigate("/prediction/loading", {
      state: {
        requestData,
        mode: isEditing ? "edit" : "create",
        forecast,
      },
    });
  };

  /*
   * 서버 확인 중 예측 입력 페이지가
   * 잠깐 보였다가 결과 페이지로 넘어가는
   * 깜빡임 방지
   */
  if (isChecking) {
    return (
      <Page>
        <Content>
          예측 정보를 확인하고 있어요...
        </Content>

        <NavBar />
      </Page>
    );
  }

  return (
    <Page>
      <Content>
        <Header>
          <Title>
            내일의 궤도 예보
          </Title>

          <Subtitle>
            {isEditing ? "기존 입력값을 확인하고 수정해 주세요" : "내일 예상되는 환경을 선택해 주세요"}
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
                {SCORE_OPTIONS.map(
                  (score) => (
                    <ScoreButton
                      key={score}
                      type="button"
                      $selected={
                        heating ===
                        score
                      }
                      onClick={() =>
                        setHeating(
                          score
                        )
                      }
                    >
                      {score}
                    </ScoreButton>
                  )
                )}
              </ScoreButtons>
            </FactorItem>

            <FactorItem>
              <FactorLabel>
                <Emoji>💻</Emoji>
                화면 노출 (예상)
              </FactorLabel>

              <ScoreButtons>
                {SCORE_OPTIONS.map(
                  (score) => (
                    <ScoreButton
                      key={score}
                      type="button"
                      $selected={
                        screen ===
                        score
                      }
                      onClick={() =>
                        setScreen(
                          score
                        )
                      }
                    >
                      {score}
                    </ScoreButton>
                  )
                )}
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
                min="0"
                max="24"
                step="1"
                value={sleep}
                onChange={(
                  event
                ) =>
                  setSleep(
                    Number(
                      event.target
                        .value
                    )
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
                {SCORE_OPTIONS.map(
                  (score) => (
                    <ScoreButton
                      key={score}
                      type="button"
                      $selected={
                        stress ===
                        score
                      }
                      onClick={() =>
                        setStress(
                          score
                        )
                      }
                    >
                      {score}
                    </ScoreButton>
                  )
                )}
              </ScoreButtons>
            </FactorItem>

            <FactorItem>
              <FactorLabel>
                <Emoji>🍽️</Emoji>
                식사 규칙성 (예상)
              </FactorLabel>

              <ScoreButtons>
                {SCORE_OPTIONS.map(
                  (score) => (
                    <ScoreButton
                      key={score}
                      type="button"
                      $selected={
                        meal ===
                        score
                      }
                      onClick={() =>
                        setMeal(
                          score
                        )
                      }
                    >
                      {score}
                    </ScoreButton>
                  )
                )}
              </ScoreButtons>
            </FactorItem>
          </FactorList>
        </Card>

        <PredictionButton
          type="button"
          disabled={!canPredict}
          onClick={handlePrediction}
        >
          {isEditing ? "수정 완료" : "예측 시작하기"}
        </PredictionButton>

        {isEditing && (
          <RetryButton type="button" onClick={() => navigate("/prediction/result", {
            replace: true, state: { forecast },
          })}>취소</RetryButton>
        )}

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
              내일 예상 노출 시간이 길다면 5에
              <br />
              가깝게, 적절하다면 1에 가깝게 기록해 주세요.
            </GuideParagraph>

            <GuideParagraph>
              <strong>
                스트레스:
              </strong>{" "}
              스트레스를 많이 받는 하루가 예상된다면
              5에
              <br />
              가깝게, 스트레스가 거의 없는 하루가
              예상된다면 1에 가깝게 기록해 주세요.
            </GuideParagraph>

            <GuideParagraph>
              <strong>
                식사 규칙성:
              </strong>{" "}
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
