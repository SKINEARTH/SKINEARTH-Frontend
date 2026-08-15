import { useState } from "react";

import NavBar from "../components/NavBar";

import skin1 from "../assets/skin_1.svg";
import skin2 from "../assets/skin_2.svg";
import skin3 from "../assets/skin_3.svg";
import skin4 from "../assets/skin_4.svg";
import skin5 from "../assets/skin_5.svg";

import {
  Page,
  Content,
  Header,
  Title,
  Subtitle,
  Card,
  SectionTitle,
  FactorList,
  FactorItem,
  FactorLabel,
  Emoji,
  ScoreButtons,
  ScoreButton,
  SleepHeader,
  SleepValue,
  Slider,
  SkinOptions,
  SkinButton,
  SkinIcon,
  SkinLabels,
  SymptomOptions,
  SymptomButton,
  GuideCard,
  GuideBadge,
  GuideText,
  GuideParagraph,
  SaveButton,
} from "../styles/LogPage.styles";

const SCORE_OPTIONS = [1, 2, 3, 4, 5];

const SKIN_OPTIONS = [
  { value: 1, icon: skin1 },
  { value: 2, icon: skin2 },
  { value: 3, icon: skin3 },
  { value: 4, icon: skin4 },
  { value: 5, icon: skin5 },
];

const SYMPTOMS = [
  "건조함",
  "홍조",
  "트러블",
  "기름기",
  "민감성",
  "없음",
];

const LogPage = () => {
  const [heating, setHeating] = useState(null);
  const [screen, setScreen] = useState(null);
  const [sleep, setSleep] = useState(6);
  const [stress, setStress] = useState(null);
  const [meal, setMeal] = useState(null);

  const [skinCondition, setSkinCondition] = useState(null);
  const [symptoms, setSymptoms] = useState([]);

  const toggleSymptom = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((item) => item !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    const logData = {
      heating,
      screen,
      sleep,
      stress,
      meal,
      skinCondition,
      symptoms,
    };

    console.log("오늘의 궤도 기록:", logData);
  };

  return (
    <Page>
      <Content>
        <Header>
          <Title>궤도 관측 로그</Title>
          <Subtitle>오늘의 환경을 기록해 주세요</Subtitle>
        </Header>

        {/* 환경 요인 */}
        <Card>
          <SectionTitle>환경 요인</SectionTitle>

          <FactorList>
            <FactorItem>
              <FactorLabel>
                <Emoji>❄️</Emoji>
                냉난방 노출
              </FactorLabel>

              <ScoreButtons>
                {SCORE_OPTIONS.map((score) => (
                  <ScoreButton
                    key={score}
                    type="button"
                    $selected={heating === score}
                    onClick={() => setHeating(score)}
                  >
                    {score}
                  </ScoreButton>
                ))}
              </ScoreButtons>
            </FactorItem>

            <FactorItem>
              <FactorLabel>
                <Emoji>💻</Emoji>
                화면 노출
              </FactorLabel>

              <ScoreButtons>
                {SCORE_OPTIONS.map((score) => (
                  <ScoreButton
                    key={score}
                    type="button"
                    $selected={screen === score}
                    onClick={() => setScreen(score)}
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
                  수면 시간
                </FactorLabel>

                <SleepValue>{sleep}h</SleepValue>
              </SleepHeader>

              <Slider
                type="range"
                min="1"
                max="10"
                step="1"
                value={sleep}
                onChange={(e) => setSleep(Number(e.target.value))}
              />
            </FactorItem>

            <FactorItem>
              <FactorLabel>
                <Emoji>⚡</Emoji>
                스트레스
              </FactorLabel>

              <ScoreButtons>
                {SCORE_OPTIONS.map((score) => (
                  <ScoreButton
                    key={score}
                    type="button"
                    $selected={stress === score}
                    onClick={() => setStress(score)}
                  >
                    {score}
                  </ScoreButton>
                ))}
              </ScoreButtons>
            </FactorItem>

            <FactorItem>
              <FactorLabel>
                <Emoji>🍽️</Emoji>
                식사 규칙성
              </FactorLabel>

              <ScoreButtons>
                {SCORE_OPTIONS.map((score) => (
                  <ScoreButton
                    key={score}
                    type="button"
                    $selected={meal === score}
                    onClick={() => setMeal(score)}
                  >
                    {score}
                  </ScoreButton>
                ))}
              </ScoreButtons>
            </FactorItem>
          </FactorList>
        </Card>

        {/* 피부 상태 */}
        <Card>
          <SectionTitle $green>
            오늘의 피부 상태 *
          </SectionTitle>

          <SkinOptions>
            {SKIN_OPTIONS.map((item) => (
              <SkinButton
                key={item.value}
                type="button"
                $selected={skinCondition === item.value}
                onClick={() => setSkinCondition(item.value)}
              >
                <SkinIcon
                  src={item.icon}
                  alt={`피부 상태 ${item.value}`}
                />
              </SkinButton>
            ))}
          </SkinOptions>

          <SkinLabels>
            <span>매우 나쁨</span>
            <span>매우 좋음</span>
          </SkinLabels>
        </Card>

        {/* 오늘의 증상 */}
        <Card>
          <SectionTitle>
            오늘의 증상 (선택, 여러 개 선택 가능)
          </SectionTitle>

          <SymptomOptions>
            {SYMPTOMS.map((symptom) => (
              <SymptomButton
                key={symptom}
                type="button"
                $selected={symptoms.includes(symptom)}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
              </SymptomButton>
            ))}
          </SymptomOptions>
        </Card>

        {/* 기록 도우미 */}
        <GuideCard>
          <GuideBadge>🪐 기록 도우미</GuideBadge>

          <GuideText>
            <GuideParagraph>
              모든 기록은 여행자님의 체감 정도를 기준으로 해요.
            </GuideParagraph>

            <GuideParagraph>
              <strong>냉난방 노출, 화면 노출:</strong> 노출 시간이
              길었다면 5에 가깝게,
              <br />
              노출 시간이 적절했다면 1에 가깝게 기록해 주세요.
            </GuideParagraph>

            <GuideParagraph>
              <strong>스트레스:</strong> 스트레스를 많이 받는
              하루였다면 5에 가깝게,
              <br />
              스트레스가 거의 없었다면 1에 가깝게 기록해 주세요.
            </GuideParagraph>

            <GuideParagraph>
              <strong>식사 규칙성:</strong> 규칙적인 식사를 했다면
              5에 가깝게,
              <br />
              식사를 거르거나 미뤘다면 1에 가깝게 기록해 주세요.
            </GuideParagraph>
          </GuideText>
        </GuideCard>

        <SaveButton
          type="button"
          onClick={handleSave}
        >
          오늘의 궤도 저장
        </SaveButton>
      </Content>

      <NavBar />
    </Page>
  );
};

export default LogPage;