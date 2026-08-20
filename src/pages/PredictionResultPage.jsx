import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import NavBar from "../components/NavBar";

import {
  Page,
  Content,
  TopRow,
  Title,
  DataBadge,
  ScoreCard,
  ScoreLabel,
  Score,
  StatusBadge,
  FactorsCard,
  SectionTitle,
  FactorRow,
  FactorLeft,
  FactorEmoji,
  FactorName,
  LevelBadge,
  Divider,
  AiCard,
  AiBadge,
  AiText,
  MissionButton,
} from "../styles/PredictionResultPage.styles";

const FACTOR_NAME_MAP = {
  AC: "냉난방 노출",
  AIR_CONDITIONER: "냉난방 노출",
  SCREEN: "화면 노출",
  SCREEN_TIME: "화면 노출",
  SLEEP: "수면 시간",
  SLEEP_HOURS: "수면 시간",
  STRESS: "스트레스",
  MEAL: "식사 규칙성",
  MEAL_REGULARITY: "식사 규칙성",
};

const FACTOR_EMOJI_MAP = {
  AC: "❄️",
  AIR_CONDITIONER: "❄️",
  SCREEN: "💻",
  SCREEN_TIME: "💻",
  SLEEP: "🌙",
  SLEEP_HOURS: "🌙",
  STRESS: "⚡",
  MEAL: "🍽️",
  MEAL_REGULARITY: "🍽️",
};

const getRiskText = (riskLevel) => {
  switch (riskLevel) {
    case "LOW":
      return "🟢 안정";

    case "MEDIUM":
      return "⚠️ 주의";

    case "HIGH":
      return "🔴 위험";

    default:
      return riskLevel || "분석 완료";
  }
};

const getLevelText = (level) => {
  switch (level) {
    case "LOW":
      return "낮음";

    case "MEDIUM":
      return "중간";

    case "HIGH":
      return "높음";

    default:
      return level || "-";
  }
};

const getLevelStyle = (level) => {
  switch (level) {
    case "LOW":
      return "low";

    case "MEDIUM":
      return "medium";

    case "HIGH":
      return "high";

    default:
      return "medium";
  }
};

const PredictionResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const forecast =
    location.state?.forecast;

  /*
   * 결과 데이터를 가지고 있지 않은 상태에서
   * URL을 직접 입력한 경우
   */
  if (!forecast) {
    return (
      <Page>
        <Content>
          <TopRow>
            <Title>
              내일 예측 결과
            </Title>
          </TopRow>

          <AiCard>
            <AiText>
              예측 결과를 찾을 수 없습니다.
              다시 예측을 진행해 주세요.
            </AiText>
          </AiCard>

          <MissionButton
            type="button"
            onClick={() =>
              navigate(
                "/prediction",
                {
                  replace: true,
                }
              )
            }
          >
            다시 예측하기
          </MissionButton>
        </Content>

        <NavBar />
      </Page>
    );
  }

  const primaryFactors =
    forecast.primaryFactors || [];

  return (
    <Page>
      <Content>
        <TopRow>
          <Title>
            내일 예측 결과
          </Title>

          <DataBadge>
            데이터 기반
          </DataBadge>
        </TopRow>

        <ScoreCard>
          <ScoreLabel>
            내일 예측 피부 온도 지수
          </ScoreLabel>

          <Score>
            {forecast.riskScore}
          </Score>

          <StatusBadge>
            {getRiskText(
              forecast.riskLevel
            )}
          </StatusBadge>
        </ScoreCard>

        <FactorsCard>
          <SectionTitle>
            주요 원인
          </SectionTitle>

          {primaryFactors.length > 0 ? (
            primaryFactors.map(
              (factor, index) => (
                <div
                  key={`${factor.name}-${factor.rank}-${index}`}
                >
                  <FactorRow>
                    <FactorLeft>
                      <FactorEmoji>
                        {FACTOR_EMOJI_MAP[
                          factor.name
                        ] || "🪐"}
                      </FactorEmoji>

                      <FactorName>
                        {FACTOR_NAME_MAP[
                          factor.name
                        ] ||
                          factor.name}
                      </FactorName>
                    </FactorLeft>

                    <LevelBadge
                      $level={getLevelStyle(
                        factor.level
                      )}
                    >
                      {getLevelText(
                        factor.level
                      )}
                    </LevelBadge>
                  </FactorRow>

                  {index <
                    primaryFactors.length -
                      1 && (
                    <Divider />
                  )}
                </div>
              )
            )
          ) : (
            <AiText>
              주요 원인 데이터가 없습니다.
            </AiText>
          )}
        </FactorsCard>

        <AiCard>
          <AiBadge>
            ✦ AI 분석
          </AiBadge>

          <AiText>
            {forecast.aiComment ||
              "AI 분석 결과가 없습니다."}
          </AiText>
        </AiCard>

        <MissionButton
          type="button"
          onClick={() =>
            navigate("/mission")
          }
        >
          🚀 오늘의 탐험 미션 보기
        </MissionButton>
      </Content>

      <NavBar />
    </Page>
  );
};

export default PredictionResultPage;