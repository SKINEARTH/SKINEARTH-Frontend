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

  // Header
  HeaderRow,
  HeaderText,
  Title,
  Subtitle,
  StreakBadge,

  // Journey
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

  // Progress
  ProgressHeader,
  ProgressLabel,
  ProgressCount,
  ProgressTrack,
  ProgressBar,

  // Category
  CategoryList,
  CategoryChip,

  // Mission
  MissionCard,
  MissionTopRow,
  MissionCategoryBadge,
  MissionTime,
  MissionTitle,
  MissionDescription,
  AiBadge,
  CompleteButton,

  // Mission Adjust
  MissionAdjustLabel,
  ActionList,
  ActionButton,

  // Other Mission
  MissionSelectionArea,
  PPMessageRow,
  MiniRobot,
  PPBubble,
  MissionList,
  AlternativeMissionCard,
  SelectMissionButton,
} from "../styles/MissionPage.styles";


const MissionPage = () => {
  /* =========================
     STATE
  ========================= */

  const [selectedCategory, setSelectedCategory] =
    useState(missionCategories[0]);

  const [selectedMissionIndex, setSelectedMissionIndex] =
    useState(0);

  const [showMissionList, setShowMissionList] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);


  /* =========================
     CURRENT DATA
  ========================= */

  const categoryMissions =
    missionData[selectedCategory] || [];

  const currentMission =
    categoryMissions[selectedMissionIndex] ||
    categoryMissions[0];


  /* =========================
     CATEGORY
  ========================= */

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedMissionIndex(0);
    setCompleted(false);
  };


  /* =========================
     COMPLETE
  ========================= */

  const handleCompleteMission = () => {
    setCompleted(true);
  };


  /* =========================
     OTHER MISSIONS
  ========================= */

  const handleShowOtherMissions = () => {
    setShowMissionList(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =========================
     SELECT MISSION
  ========================= */

  const handleSelectMission = (index) => {
    setSelectedMissionIndex(index);

    setCompleted(false);

    setShowMissionList(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =========================
     EASY MISSION
  ========================= */

  const handleEasyMission = () => {
    if (categoryMissions.length <= 1) {
      return;
    }

    const nextIndex =
      (selectedMissionIndex + 1) %
      categoryMissions.length;

    setSelectedMissionIndex(nextIndex);

    setCompleted(false);

    setShowMissionList(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =========================
     HIDE CATEGORY
  ========================= */

  const handleHideCategory = () => {
    console.log(
      `${selectedCategory} 카테고리 그만 보기`
    );

    // TODO:
    // 백엔드 연동 후 사용자별
    // 숨김 카테고리 저장
  };


  return (
    <Page>
      <Content>

        {/* =========================
            HEADER
            두 화면 모두 유지
        ========================= */}

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


        {/* =================================================
            기본 미션 화면
        ================================================= */}

        {!showMissionList ? (
          <>

            {/* =========================
                PP 여행 단계
            ========================= */}

            <JourneyCard>

              <SectionTitle>
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
                    <br />
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

                    <ProgressBar
                      $progress={30}
                    />

                  </ProgressTrack>

                </LevelInfo>

              </JourneyContent>

            </JourneyCard>


            {/* =========================
                CATEGORY CHIPS
            ========================= */}

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


            {/* =========================
                CURRENT MISSION
            ========================= */}

            {currentMission && (
              <>

                <MissionCard>

                  <MissionTopRow>

                    <MissionCategoryBadge>
                      {selectedCategory}
                    </MissionCategoryBadge>


                    <MissionTime>
                      예상 {currentMission.time}
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
                    onClick={
                      handleCompleteMission
                    }
                  >
                    {completed
                      ? "✓ 미션 완료!"
                      : "✓ 미션 완료!"}
                  </CompleteButton>

                </MissionCard>


                {/* =========================
                    MISSION ADJUST
                ========================= */}

                <MissionAdjustLabel>
                  미션 조정
                </MissionAdjustLabel>


                <ActionList>

                  <ActionButton
                    type="button"
                    onClick={
                      handleShowOtherMissions
                    }
                  >
                    🔄 다른 미션 보기
                  </ActionButton>


                  <ActionButton
                    type="button"
                    onClick={
                      handleEasyMission
                    }
                  >
                    ✨ 더 쉬운 미션으로 바꾸기
                  </ActionButton>


                  <ActionButton
                    type="button"
                    onClick={
                      handleHideCategory
                    }
                  >
                    🚫 이 카테고리 그만 보기
                  </ActionButton>

                </ActionList>

              </>
            )}

          </>
        ) : (

          /* =================================================
             다른 미션 보기 화면
             
             중요:
             여기에는 JourneyCard와 CategoryList가
             아예 존재하지 않음
          ================================================= */

          <MissionSelectionArea>

            {/* =========================
                PP MESSAGE
            ========================= */}

            <PPMessageRow>

              <MiniRobot
                src={ppRobot}
                alt="PP"
              />


              <PPBubble>
                PP가 새로운 미션을 가져왔어요!
                <br />
                수행할 미션을 선택해 주세요.
              </PPBubble>

            </PPMessageRow>


            {/* =========================
                OTHER MISSIONS
            ========================= */}

            <MissionList>

              {categoryMissions.map(
                (mission, index) => {

                  /*
                   * 현재 보고 있던 미션은
                   * 후보에서 제외
                   */

                  if (
                    index ===
                    selectedMissionIndex
                  ) {
                    return null;
                  }


                  return (
                    <AlternativeMissionCard
                      key={
                        mission.id ??
                        `${selectedCategory}-${index}`
                      }
                    >

                      <MissionTopRow>

                        <MissionCategoryBadge>
                          {selectedCategory}
                        </MissionCategoryBadge>


                        <MissionTime>
                          예상 {mission.time}
                        </MissionTime>

                      </MissionTopRow>


                      <MissionTitle>
                        {mission.title}
                      </MissionTitle>


                      <MissionDescription>
                        {mission.description}
                      </MissionDescription>


                      {mission.aiRecommended !==
                        false && (
                        <AiBadge>
                          ✦ AI 추천
                        </AiBadge>
                      )}


                      <SelectMissionButton
                        type="button"

                        onClick={() =>
                          handleSelectMission(
                            index
                          )
                        }
                      >
                        ✓ 이 미션 선택
                      </SelectMissionButton>

                    </AlternativeMissionCard>
                  );
                }
              )}

            </MissionList>


            {/* =========================
                MISSION ADJUST
            ========================= */}

            <MissionAdjustLabel>
              미션 조정
            </MissionAdjustLabel>


            <ActionList>

              <ActionButton
                type="button"

                onClick={() => {
                  setShowMissionList(false);

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                ↩ 현재 미션으로 돌아가기
              </ActionButton>


              <ActionButton
                type="button"
                onClick={
                  handleEasyMission
                }
              >
                ✨ 더 쉬운 미션으로 바꾸기
              </ActionButton>


              <ActionButton
                type="button"
                onClick={
                  handleHideCategory
                }
              >
                🚫 이 카테고리 그만 보기
              </ActionButton>

            </ActionList>

          </MissionSelectionArea>
        )}

      </Content>


      {/* =========================
          NAVBAR
      ========================= */}

      <NavBar />

    </Page>
  );
};


export default MissionPage;