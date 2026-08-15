import { useNavigate } from "react-router-dom";

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
} from "../styles/LogCompletePage.styles";

const LogCompletePage = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Content>
        <TopRow>
          <Title>내일 예측 결과</Title>

          <DataBadge>
            데이터 기반
          </DataBadge>
        </TopRow>

        <ScoreCard>
          <ScoreLabel>
            내일 예측 피부 온도 지수
          </ScoreLabel>

          <Score>
            68
          </Score>

          <StatusBadge>
            ⚠️ 주의
          </StatusBadge>
        </ScoreCard>

        <FactorsCard>
          <SectionTitle>
            주요 원인
          </SectionTitle>

          <FactorRow>
            <FactorLeft>
              <FactorEmoji>❄️</FactorEmoji>
              <FactorName>
                에어컨 노출
              </FactorName>
            </FactorLeft>

            <LevelBadge $level="high">
              높음
            </LevelBadge>
          </FactorRow>

          <Divider />

          <FactorRow>
            <FactorLeft>
              <FactorEmoji>💻</FactorEmoji>
              <FactorName>
                화면 노출
              </FactorName>
            </FactorLeft>

            <LevelBadge $level="medium">
              중간
            </LevelBadge>
          </FactorRow>
        </FactorsCard>

        <AiCard>
          <AiBadge>
            ✦ AI 분석
          </AiBadge>

          <AiText>
            내일은 에어컨 환경에 오랜 시간 노출될 것으로 보입니다.
            피부 장벽이 약해질 수 있으니 수분 공급에 특히 신경 써보세요.
            가습기 사용을 추천드려요.
          </AiText>
        </AiCard>

        <MissionButton
          type="button"
          onClick={() => navigate("/mission")}
        >
          🚀 오늘의 탐험 미션 보기
        </MissionButton>
      </Content>

      <NavBar />
    </Page>
  );
};

export default LogCompletePage;