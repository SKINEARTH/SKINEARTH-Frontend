import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";

import {
  createTodayRecord,
  getTodayRecord,
  updateTodayRecord,
} from "../api/dailyRecord";

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

const SCORE_OPTIONS = [
  1,
  2,
  3,
  4,
  5,
];

const SKIN_OPTIONS = [
  {
    value: 1,
    icon: skin1,
  },
  {
    value: 2,
    icon: skin2,
  },
  {
    value: 3,
    icon: skin3,
  },
  {
    value: 4,
    icon: skin4,
  },
  {
    value: 5,
    icon: skin5,
  },
];

const SYMPTOMS = [
  "건조함",
  "홍조",
  "트러블",
  "기름기",
  "민감성",
  "없음",
];

const SYMPTOM_MAP = {
  건조함: "DRYNESS",
  홍조: "REDNESS",
  트러블: "TROUBLE",
  기름기: "OILINESS",
  민감성: "SENSITIVITY",
  없음: "NONE",
};

const REVERSE_SYMPTOM_MAP = {
  DRYNESS: "건조함",
  REDNESS: "홍조",
  TROUBLE: "트러블",
  OILINESS: "기름기",
  SENSITIVITY: "민감성",
  NONE: "없음",
};

const LogPage = () => {
  const navigate = useNavigate();

  const [heating, setHeating] =
    useState(null);

  const [screen, setScreen] =
    useState(null);

  const [sleep, setSleep] =
    useState(6);

  const [stress, setStress] =
    useState(null);

  const [meal, setMeal] =
    useState(null);

  const [
    skinCondition,
    setSkinCondition,
  ] = useState(null);

  const [symptoms, setSymptoms] =
    useState([]);

  const [
    hasTodayRecord,
    setHasTodayRecord,
  ] = useState(false);

  /*
   * GET으로 처음 불러온 기존 기록 저장
   *
   * 수정 화면에서 현재 입력값과 비교해서
   * 변경 여부를 판단할 때 사용
   */
  const [
    originalRecord,
    setOriginalRecord,
  ] = useState(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  useEffect(() => {
    const loadTodayRecord = async () => {
      try {
        const result =
          await getTodayRecord();

        const record = result.data;

        const loadedSymptoms =
          (record.symptoms || [])
            .map(
              (symptom) =>
                REVERSE_SYMPTOM_MAP[
                  symptom
                ]
            )
            .filter(Boolean);

        setHeating(
          record.acLevel ?? null
        );

        setScreen(
          record.screenTime ?? null
        );

        setSleep(
          record.sleepHours ?? 6
        );

        setStress(
          record.stressLevel ?? null
        );

        setMeal(
          record.mealRegularity ?? null
        );

        setSkinCondition(
          record.skinCondition ?? null
        );

        setSymptoms(
          loadedSymptoms
        );

        /*
         * 최초 서버 데이터 저장
         *
         * 이후 사용자가 입력값을 바꿨는지
         * 비교하는 기준
         */
        setOriginalRecord({
          heating:
            record.acLevel ?? null,

          screen:
            record.screenTime ?? null,

          sleep:
            record.sleepHours ?? 6,

          stress:
            record.stressLevel ?? null,

          meal:
            record.mealRegularity ??
            null,

          skinCondition:
            record.skinCondition ??
            null,

          symptoms:
            loadedSymptoms,
        });

        setHasTodayRecord(true);
      } catch (error) {
        /*
         * 오늘 기록이 없다면
         * 새 기록 작성 모드
         */
        if (error.status === 404) {
          setHasTodayRecord(false);
          setOriginalRecord(null);

          return;
        }

        console.error(
          "오늘 기록 조회 실패:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadTodayRecord();
  }, []);

  const toggleSymptom = (
    symptom
  ) => {
    /*
     * "없음" 선택 시
     * 다른 증상 제거
     */
    if (symptom === "없음") {
      setSymptoms((previous) =>
        previous.includes("없음")
          ? []
          : ["없음"]
      );

      return;
    }

    /*
     * 다른 증상 선택 시
     * "없음" 제거
     */
    setSymptoms((previous) => {
      const withoutNone =
        previous.filter(
          (item) =>
            item !== "없음"
        );

      if (
        withoutNone.includes(symptom)
      ) {
        return withoutNone.filter(
          (item) =>
            item !== symptom
        );
      }

      return [
        ...withoutNone,
        symptom,
      ];
    });
  };

  /*
   * 증상 배열 비교
   *
   * 선택 순서가 달라도
   * 같은 증상을 선택했다면
   * 동일한 상태로 판단
   */
  const normalizeSymptoms = (
    symptomList
  ) => {
    return [...symptomList].sort();
  };

  /*
   * 기존 기록과 현재 입력값 비교
   *
   * 하나라도 달라지면 true
   */
  const hasChanges =
    hasTodayRecord &&
    originalRecord
      ? heating !==
          originalRecord.heating ||
        screen !==
          originalRecord.screen ||
        sleep !==
          originalRecord.sleep ||
        stress !==
          originalRecord.stress ||
        meal !== originalRecord.meal ||
        skinCondition !==
          originalRecord.skinCondition ||
        JSON.stringify(
          normalizeSymptoms(symptoms)
        ) !==
          JSON.stringify(
            normalizeSymptoms(
              originalRecord.symptoms
            )
          )
      : false;

  /*
   * 오늘 기록이 없다면
   * 저장 버튼은 기존처럼 활성화
   *
   * 오늘 기록이 있다면
   * 변경된 경우에만 활성화
   */
  const isSaveDisabled =
    isSaving ||
    (hasTodayRecord &&
      !hasChanges);

  const handleSave = async () => {
    if (isSaveDisabled) {
      return;
    }

    if (skinCondition === null) {
      alert(
        "오늘의 피부 상태를 선택해 주세요."
      );

      return;
    }

    const requestData = {
      acLevel: heating,
      screenTime: screen,
      sleepHours: sleep,
      stressLevel: stress,
      mealRegularity: meal,
      skinCondition,

      symptoms: symptoms.map(
        (item) =>
          SYMPTOM_MAP[item]
      ),
    };

    console.log(
      "서버로 전송할 기록:",
      requestData
    );

    try {
      setIsSaving(true);

      let result;

      /*
       * 기존 기록 존재 → PUT
       * 기존 기록 없음 → POST
       */
      if (hasTodayRecord) {
        result =
          await updateTodayRecord(
            requestData
          );
      } else {
        result =
          await createTodayRecord(
            requestData
          );
      }

      console.log(
        "오늘 기록 저장 성공:",
        result
      );

      navigate(
        "/log/complete",
        {
          replace: true,
          state: {
            record: result.data,
          },
        }
      );
    } catch (error) {
      console.error(
        "오늘 기록 저장 실패:",
        error
      );

      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Page>
        <Content>
          <Header>
            <Title>
              궤도 관측 로그
            </Title>

            <Subtitle>
              오늘의 기록을 불러오는
              중입니다...
            </Subtitle>
          </Header>
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
            궤도 관측 로그
          </Title>

          <Subtitle>
            오늘의 환경을 기록해 주세요
          </Subtitle>
        </Header>

        {/* 환경 요인 */}
        <Card>
          <SectionTitle $blue>
            환경 요인
          </SectionTitle>

          <FactorList>
            {/* 냉난방 노출 */}
            <FactorItem>
              <FactorLabel>
                <Emoji>
                  ❄️
                </Emoji>

                냉난방 노출
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

            {/* 화면 노출 */}
            <FactorItem>
              <FactorLabel>
                <Emoji>
                  💻
                </Emoji>

                화면 노출
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

            {/* 수면 시간 */}
            <FactorItem>
              <SleepHeader>
                <FactorLabel>
                  <Emoji>
                    🌙
                  </Emoji>

                  수면 시간
                </FactorLabel>

                <SleepValue>
                  {sleep}h
                </SleepValue>
              </SleepHeader>

              <Slider
                type="range"
                min="1"
                max="12"
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

            {/* 스트레스 */}
            <FactorItem>
              <FactorLabel>
                <Emoji>
                  ⚡
                </Emoji>

                스트레스
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

            {/* 식사 규칙성 */}
            <FactorItem>
              <FactorLabel>
                <Emoji>
                  🍽️
                </Emoji>

                식사 규칙성
              </FactorLabel>

              <ScoreButtons>
                {SCORE_OPTIONS.map(
                  (score) => (
                    <ScoreButton
                      key={score}
                      type="button"
                      $selected={
                        meal === score
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

        {/* 피부 상태 */}
        <Card>
          <SectionTitle $mint>
            오늘의 피부 상태 *
          </SectionTitle>

          <SkinOptions>
            {SKIN_OPTIONS.map(
              (item) => (
                <SkinButton
                  key={item.value}
                  type="button"
                  $selected={
                    skinCondition ===
                    item.value
                  }
                  onClick={() =>
                    setSkinCondition(
                      item.value
                    )
                  }
                >
                  <SkinIcon
                    src={item.icon}
                    alt={`피부 상태 ${item.value}`}
                  />
                </SkinButton>
              )
            )}
          </SkinOptions>

          <SkinLabels>
            <span>
              매우 나쁨
            </span>

            <span>
              매우 좋음
            </span>
          </SkinLabels>
        </Card>

        {/* 오늘의 증상 */}
        <Card>
          <SectionTitle>
            오늘의 증상 (선택,
            여러 개 선택 가능)
          </SectionTitle>

          <SymptomOptions>
            {SYMPTOMS.map(
              (symptom) => (
                <SymptomButton
                  key={symptom}
                  type="button"
                  $selected={symptoms.includes(
                    symptom
                  )}
                  onClick={() =>
                    toggleSymptom(
                      symptom
                    )
                  }
                >
                  {symptom}
                </SymptomButton>
              )
            )}
          </SymptomOptions>
        </Card>

        {/* 기록 도우미 */}
        <GuideCard>
          <GuideBadge>
            🪐 기록 도우미
          </GuideBadge>

          <GuideText>
            <GuideParagraph>
              모든 기록은 여행자님의
              체감 정도를 기준으로 해요.
            </GuideParagraph>

            <GuideParagraph>
              <strong>
                냉난방 노출, 화면 노출:
              </strong>{" "}
              노출 시간이 길었다면 5에
              가깝게,
              <br />
              노출 시간이 적절했다면 1에
              가깝게 기록해 주세요.
            </GuideParagraph>

            <GuideParagraph>
              <strong>
                스트레스:
              </strong>{" "}
              스트레스를 많이 받는
              하루였다면 5에 가깝게,
              <br />
              스트레스가 거의 없었다면
              1에 가깝게 기록해 주세요.
            </GuideParagraph>

            <GuideParagraph>
              <strong>
                식사 규칙성:
              </strong>{" "}
              규칙적인 식사를 했다면
              5에 가깝게,
              <br />
              식사를 거르거나 미뤘다면
              1에 가깝게 기록해 주세요.
            </GuideParagraph>
          </GuideText>
        </GuideCard>

        <SaveButton
          type="button"
          onClick={handleSave}
          disabled={
            isSaveDisabled
          }
        >
          {isSaving
            ? "저장 중..."
            : hasTodayRecord
              ? "오늘의 궤도 수정"
              : "오늘의 궤도 저장"}
        </SaveButton>
      </Content>

      <NavBar />
    </Page>
  );
};

export default LogPage;