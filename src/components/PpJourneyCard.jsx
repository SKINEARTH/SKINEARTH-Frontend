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

const LEVEL_CONTENT = {
  1: {
    image: levelOneImage,
    name: "Lv.1 관측자",
    description: [
      "가장 기본적인 형태의 신입사원 PP입니다.",
      "좋아하는 음료는 아메리카노라고 해요.",
    ],
    condition: "궤도를 10건 이상 기록하세요.",
  },
  2: {
    image: levelTwoImage,
    name: "Lv.2 탐사자",
    description: [
      "정직원이 된 사회인 PP입니다.",
      "야근이 늘어 숙면을 취하지 못해 고민이라고 해요.",
    ],
    condition: "궤도를 7일 연속 기록하거나, 탐사 미션을 10회 완료하세요.",
  },
  3: {
    image: levelThreeImage,
    name: "Lv.3 여행자",
    description: [
      "어느덧 베테랑이 된 부장님 PP입니다.",
      "승진의 비결은 피부 관리를 잊지 않는 것이라고 해요.",
    ],
    condition: "최고 레벨을 달성했어요! 축하합니다.",
  },
};

const clampProgress = (current, target) =>
  Math.min(Math.max(current / target, 0), 1) * 100;

const ProgressRow = ({ label, current, target }) => (
  <JourneyProgress>
    <JourneyProgressHeader>
      <span>{label}</span>
      <JourneyProgressCount>
        {Math.min(current, target)}/{target}
      </JourneyProgressCount>
    </JourneyProgressHeader>

    <JourneyProgressTrack>
      <JourneyProgressBar $percentage={clampProgress(current, target)} />
    </JourneyProgressTrack>
  </JourneyProgress>
);

const PpJourneyCard = ({
  validRecordCount = 3,
  consecutiveRecordDays = 4,
  completedMissionCount = 3,
}) => {
  const level =
    consecutiveRecordDays >= 7 || completedMissionCount >= 10
      ? 3
      : validRecordCount >= 10
        ? 2
        : 1;
  const content = LEVEL_CONTENT[level];

  return (
    <JourneyCard $level={level}>
      <JourneyCardTitle>PP의 여행 단계</JourneyCardTitle>

      <JourneyBody>
        <JourneyImage src={content.image} alt={`${content.name} PP`} />

        <JourneyContent>
          <JourneyLevel>{content.name}</JourneyLevel>
          <JourneyDescription>
            {content.description.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </JourneyDescription>

          <JourneyConditionTitle>다음 레벨까지 남은 조건</JourneyConditionTitle>
          <JourneyCondition>{content.condition}</JourneyCondition>

          {level === 1 && (
            <JourneyProgressList>
              <ProgressRow
                label="궤도를 기록하기"
                current={validRecordCount}
                target={10}
              />
            </JourneyProgressList>
          )}

          {level === 2 && (
            <JourneyProgressList>
              <ProgressRow
                label="궤도 연속 기록하기"
                current={consecutiveRecordDays}
                target={7}
              />
              <ProgressRow
                label="탐사 미션 완료하기"
                current={completedMissionCount}
                target={10}
              />
            </JourneyProgressList>
          )}
        </JourneyContent>
      </JourneyBody>
    </JourneyCard>
  );
};

export default PpJourneyCard;
