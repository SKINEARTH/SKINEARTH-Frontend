import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SurveyProgress from "../components/SurveyProgress";
import { createPersonalization } from "../api/personalization";

import {
  SurveyContainer,
  SurveyContent,
  SurveyHeader,
  SurveyTitle,
  SurveyDescription,
  SurveyForm,
  FieldGroup,
  FieldLabel,
  NicknameInput,
  Section,
  SectionTitle,
  StatusOptions,
  StatusButton,
  ConcernOptions,
  ConcernButton,
  MoveButton,
} from "../styles/PersonalizationSurveyPage.styles";

const STATUS_OPTIONS = ["직장인", "학생", "기타"];

const SKIN_CONCERNS = [
  "건조함",
  "민감성",
  "트러블",
  "칙칙함",
  "모공",
  "기름기",
];

const STATUS_MAP = {
  직장인: "EMPLOYEE",
  학생: "STUDENT",
  기타: "OTHER",
};

const SKIN_CONCERN_MAP = {
  건조함: "DRYNESS",
  민감성: "SENSITIVITY",
  트러블: "TROUBLE",
  칙칙함: "DULLNESS",
  모공: "PORES",
  기름기: "OILINESS",
};

const PersonalizationSurveyPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [status, setStatus] = useState("");
  const [skinConcerns, setSkinConcerns] = useState([]);

  const trimmedNickname = nickname.trim();

  const canMoveNext = trimmedNickname.length > 0;

  const canComplete =
    canMoveNext &&
    status !== "" &&
    skinConcerns.length > 0;

  const handleNext = () => {
    if (!canMoveNext) {
      return;
    }

    setStep(2);
  };

  const handleConcernToggle = (concern) => {
    setSkinConcerns((previous) =>
      previous.includes(concern)
        ? previous.filter((item) => item !== concern)
        : [...previous, concern]
    );
  };

  const handleComplete = async () => {
    if (!canComplete) {
      return;
    }

    try {
      const requestData = {
        nickname: trimmedNickname,
        userStatus: STATUS_MAP[status],
        skinConcerns: skinConcerns.map(
          (concern) => SKIN_CONCERN_MAP[concern]
        ),
        skinConcernSelectionUnique: true,
      };

      const result = await createPersonalization(requestData);

      console.log("개인화 저장 성공:", result);

      // 개인화 설문 완료 후 바로 홈으로 가지 않고
      // 첫 기록 유도 페이지로 이동
      navigate("/first-record", {
        replace: true,
      });
    } catch (error) {
      console.error("개인화 저장 실패:", error);
      alert(error.message);
    }
  };

  return (
    <SurveyContainer>
      <SurveyContent>
        <SurveyProgress step={step} />

        {step === 1 ? (
          <>
            <SurveyHeader>
              <SurveyTitle>
                여행자님을 환영합니다!
              </SurveyTitle>

              <SurveyDescription>
                여행자님을 부를 이름을 알려 주세요.
              </SurveyDescription>
            </SurveyHeader>

            <SurveyForm
              onSubmit={(event) => event.preventDefault()}
            >
              <FieldGroup>
                <FieldLabel htmlFor="survey-nickname-step-one">
                  닉네임
                </FieldLabel>

                <NicknameInput
                  id="survey-nickname-step-one"
                  value={nickname}
                  onChange={(event) =>
                    setNickname(event.target.value)
                  }
                  placeholder="닉네임을 입력하세요"
                  autoComplete="nickname"
                />
              </FieldGroup>
            </SurveyForm>

            <MoveButton
              type="button"
              disabled={!canMoveNext}
              onClick={handleNext}
            >
              다음으로
            </MoveButton>
          </>
        ) : (
          <>
            <SurveyHeader>
              <SurveyTitle>
                여행자님에 대해 알려 주세요
              </SurveyTitle>

              <SurveyDescription>
                더 정확한 분석을 위해 필요한 정보입니다.
              </SurveyDescription>
            </SurveyHeader>

            <SurveyForm
              onSubmit={(event) => event.preventDefault()}
            >
              <Section>
                <SectionTitle>
                  현재 나의 상태
                </SectionTitle>

                <StatusOptions>
                  {STATUS_OPTIONS.map((option) => (
                    <StatusButton
                      key={option}
                      type="button"
                      $selected={status === option}
                      aria-pressed={status === option}
                      onClick={() => setStatus(option)}
                    >
                      {option}
                    </StatusButton>
                  ))}
                </StatusOptions>
              </Section>

              <Section>
                <SectionTitle>
                  가장 큰 피부 고민 (여러 개 선택 가능)
                </SectionTitle>

                <ConcernOptions>
                  {SKIN_CONCERNS.map((concern) => {
                    const isSelected =
                      skinConcerns.includes(concern);

                    return (
                      <ConcernButton
                        key={concern}
                        type="button"
                        $selected={isSelected}
                        aria-pressed={isSelected}
                        onClick={() =>
                          handleConcernToggle(concern)
                        }
                      >
                        {concern}
                      </ConcernButton>
                    );
                  })}
                </ConcernOptions>
              </Section>

              <FieldGroup>
                <FieldLabel htmlFor="survey-nickname-step-two">
                  닉네임
                </FieldLabel>

                <NicknameInput
                  id="survey-nickname-step-two"
                  value={nickname}
                  onChange={(event) =>
                    setNickname(event.target.value)
                  }
                  placeholder="닉네임을 입력하세요"
                  autoComplete="nickname"
                />
              </FieldGroup>
            </SurveyForm>

            <MoveButton
              type="button"
              disabled={!canComplete}
              onClick={handleComplete}
            >
              완료
            </MoveButton>
          </>
        )}
      </SurveyContent>
    </SurveyContainer>
  );
};

export default PersonalizationSurveyPage;