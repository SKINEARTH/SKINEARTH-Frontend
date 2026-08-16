import { useState } from "react";

import NavBar from "../components/NavBar";
import ppRobot from "../assets/third_OnboardingPage.svg";

import {
  missionCategories,
  missionData,
} from "../data/missionData";

import {
  Page,
  Content,
  HeaderRow,
  HeaderText,
  Title,
  Subtitle,
  StreakBadge,

  JourneyCard,
  SectionTitle,
  JourneyContent,
  RobotArea,
  RobotImage,
  LevelInfo,
  LevelTitle,
  LevelDescription,
  NextLevelTitle,
  NextLevelDescription,
  ProgressHeader,
  ProgressLabel,
  ProgressCount,
  ProgressTrack,
  ProgressBar,

  CategoryList,
  CategoryChip,

  MissionCard,
  MissionTopRow,
  MissionCategoryBadge,
  MissionTime,
  MissionTitle,
  MissionDescription,
  AiBadge,
  CompleteButton,

  MissionAdjustLabel,
  ActionList,
  ActionButton,
} from "../styles/MissionPage.styles";

const MissionPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState("수분 보충");

  const [missionIndex, setMissionIndex] =
    useState(0);

  const [completed, setCompleted] =
    useState(false);

  const currentMissionList =
    missionData[selectedCategory] || [];

  const currentMission =
    currentMissionList[missionIndex];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setMissionIndex(0);
    setCompleted(false);
  };

  const handleNextMission = () => {
    if (currentMissionList.length <= 1) {
      return;
    }

    setMissionIndex((prev) => {
      const nextIndex =
        (prev + 1) %
        currentMissionList.length;

      return nextIndex;
    });

    setCompleted(false);
  };

  const handleEasyMission = () => {
    const easyMissionIndex =
      currentMissionList.findIndex(
        (mission) =>
          mission.difficulty === "easy"
      );

    if (easyMissionIndex === -1) {
      return;
    }

    setMissionIndex(easyMissionIndex);
    setCompleted(false);
  };

  const handleComplete = () => {
    setCompleted((prev) => !prev);
  };

  return (
    <Page>
      <Content>
        {/* 상단 */}
        <HeaderRow>
          <HeaderText>
            <Title>
              탐사 미션
            </Title>

            <Subtitle>
              오늘의 피부 기후 개선 미션
            </Subtitle>
          </HeaderText>

          <StreakBadge>
            🔥 7일 연속 수행 중
          </StreakBadge>
        </HeaderRow>

        {/* PP 여행 단계 */}
        <JourneyCard>
          <SectionTitle $blue>
            PP의 여행 단계
          </SectionTitle>

          <JourneyContent>
            <RobotArea>
              <RobotImage
                src={ppRobot}
                alt="PP"
              />
            </RobotArea>

            <LevelInfo>
              <LevelTitle>
                Lv.1 관측자
              </LevelTitle>

              <LevelDescription>
                가장 기본적인 형태의
                신입사원 PP입니다.
                좋아하는 음료는
                아메리카노라고 해요.
              </LevelDescription>

              <NextLevelTitle>
                다음 레벨까지 남은 조건
              </NextLevelTitle>

              <NextLevelDescription>
                궤도를 10건 이상
                기록하세요.
              </NextLevelDescription>

              <ProgressHeader>
                <ProgressLabel>
                  궤도 기록하기
                </ProgressLabel>

                <ProgressCount>
                  3/10
                </ProgressCount>
              </ProgressHeader>

              <ProgressTrack>
                <ProgressBar />
              </ProgressTrack>
            </LevelInfo>
          </JourneyContent>
        </JourneyCard>

        {/* 카테고리 */}
        <CategoryList>
          {missionCategories.map(
            (category) => (
              <CategoryChip
                key={category}
                type="button"
                $selected={
                  selectedCategory ===
                  category
                }
                onClick={() =>
                  handleCategoryChange(
                    category
                  )
                }
              >
                {category}
              </CategoryChip>
            )
          )}
        </CategoryList>

        {/* 미션 */}
        {currentMission && (
          <MissionCard>
            <MissionTopRow>
              <MissionCategoryBadge>
                {selectedCategory}
              </MissionCategoryBadge>

              <MissionTime>
                {currentMission.time}
              </MissionTime>
            </MissionTopRow>

            <MissionTitle>
              {currentMission.title}
            </MissionTitle>

            <MissionDescription>
              {currentMission.description}
            </MissionDescription>

            {currentMission.aiRecommended !==
              false && (
              <AiBadge>
                ✦ AI 추천
              </AiBadge>
            )}

            <CompleteButton
              type="button"
              $completed={completed}
              onClick={handleComplete}
            >
              {completed
                ? "✓ 미션 완료!"
                : "미션 완료하기"}
            </CompleteButton>
          </MissionCard>
        )}

        {/* 미션 조정 */}
        <MissionAdjustLabel>
          미션 조정
        </MissionAdjustLabel>

        <ActionList>
          <ActionButton
            type="button"
            onClick={handleNextMission}
          >
            🔄 다른 미션 보기
          </ActionButton>

          <ActionButton
            type="button"
            onClick={handleEasyMission}
          >
            ✨ 더 쉬운 미션으로 바꾸기
          </ActionButton>

          <ActionButton
            type="button"
          >
            🚫 이 카테고리 그만 보기
          </ActionButton>
        </ActionList>
      </Content>

      <NavBar />
    </Page>
  );
};

export default MissionPage;