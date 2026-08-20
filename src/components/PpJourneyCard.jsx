import levelOneImage from "../assets/profile_level_1.svg";
import levelTwoImage from "../assets/profile_level_2.svg";
import levelThreeImage from "../assets/profile_level_3.svg";

import {
  JourneyCard,
  JourneyCardTitle,
  JourneyBody,
  JourneyImage,
  JourneyContent,
  JourneyLevel,
  JourneyDescription,
  JourneyConditionTitle,
  JourneyCondition,
  JourneyProgressList,
  JourneyProgress,
  JourneyProgressHeader,
  JourneyProgressCount,
  JourneyProgressTrack,
  JourneyProgressBar,
} from "../styles/OrbitHistoryPage.styles";

const LEVEL_IMAGES = {
  1: levelOneImage,
  2: levelTwoImage,
  3: levelThreeImage,
};

const clampProgress = (current, target) => {
  if (!target || target <= 0) {
    return 0;
  }

  return (
    Math.min(
      Math.max(current / target, 0),
      1
    ) * 100
  );
};

const ProgressRow = ({
  label,
  current,
  target,
}) => (
  <JourneyProgress>
    <JourneyProgressHeader>
      <span>{label}</span>

      <JourneyProgressCount>
        {Math.min(current, target)}/{target}
      </JourneyProgressCount>
    </JourneyProgressHeader>

    <JourneyProgressTrack>
      <JourneyProgressBar
        $percentage={clampProgress(
          current,
          target
        )}
      />
    </JourneyProgressTrack>
  </JourneyProgress>
);

const PpJourneyCard = ({
  stageData,
}) => {
  if (!stageData) {
    return null;
  }

  const {
    stage,
    name,
    description,
    conditionDescription,
    progressList = [],
  } = stageData;

  const level =
    stage >= 1 && stage <= 3
      ? stage
      : 1;

  const image =
    LEVEL_IMAGES[level];

  /*
   * 백엔드 description은 하나의 문자열로 내려오므로
   * 문장 단위로 나눠 기존 디자인처럼 줄바꿈
   */
  const descriptionLines =
    description
      ?.split(/(?<=\.)\s+/)
      .filter(Boolean) || [];

  return (
    <JourneyCard $level={level}>
      <JourneyCardTitle>
        PP의 여행 단계
      </JourneyCardTitle>

      <JourneyBody>
        <JourneyImage
          src={image}
          alt={`Lv.${level} ${name} PP`}
        />

        <JourneyContent>
          <JourneyLevel>
            Lv.{level} {name}
          </JourneyLevel>

          <JourneyDescription>
            {descriptionLines.map(
              (line, index) => (
                <span
                  key={`${line}-${index}`}
                >
                  {line}
                </span>
              )
            )}
          </JourneyDescription>

          <JourneyConditionTitle>
            {level === 3
              ? "현재 여행 단계"
              : "다음 레벨까지 남은 조건"}
          </JourneyConditionTitle>

          <JourneyCondition>
            {conditionDescription}
          </JourneyCondition>

          {progressList.length > 0 && (
            <JourneyProgressList>
              {progressList.map(
                (progress, index) => (
                  <ProgressRow
                    key={`${progress.label}-${index}`}
                    label={
                      progress.label
                    }
                    current={
                      progress.current
                    }
                    target={
                      progress.target
                    }
                  />
                )
              )}
            </JourneyProgressList>
          )}
        </JourneyContent>
      </JourneyBody>
    </JourneyCard>
  );
};

export default PpJourneyCard;