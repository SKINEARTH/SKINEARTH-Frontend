import { useEffect, useState } from "react";

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

  MissionSelectionArea,
  PPMessageRow,
  MiniRobot,
  PPBubble,
  MissionList,
  AlternativeMissionCard,
  SelectMissionButton,

  HiddenMissionCard,
  HiddenPlanetIcon,
  HiddenMissionTitle,
  HiddenMissionDescription,
  RestoreCategoryButton,

  Toast,
  ToastTitle,
  ToastDescription,
} from "../styles/MissionPage.styles";


const MissionPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState(missionCategories[0]);

  const [selectedMissionIndex, setSelectedMissionIndex] =
    useState(0);

  const [showMissionList, setShowMissionList] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);

  const [hiddenCategories, setHiddenCategories] =
    useState([]);

  const [toast, setToast] =
    useState(null);


  /* =========================
     CURRENT DATA
  ========================= */

  const categoryMissions =
    missionData[selectedCategory] || [];

  const currentMission =
    categoryMissions[selectedMissionIndex] ||
    categoryMissions[0];

  const isCurrentCategoryHidden =
    hiddenCategories.includes(
      selectedCategory
    );


  /* =========================
     TOAST TIMER
  ========================= */

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = setTimeout(() => {
      setToast(null);
    }, 2800);

    return () => {
      clearTimeout(timer);
    };
  }, [toast]);


  /* =========================
     CATEGORY
  ========================= */

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    setSelectedMissionIndex(0);

    setCompleted(false);

    setShowMissionList(false);
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
    if (categoryMissions.length === 0) {
      return;
    }

    const easyMissionIndex =
      categoryMissions.findIndex(
        (mission) =>
          mission.difficulty === "easy"
      );

    if (easyMissionIndex !== -1) {
      setSelectedMissionIndex(
        easyMissionIndex
      );
    } else {
      const nextIndex =
        (selectedMissionIndex + 1) %
        categoryMissions.length;

      setSelectedMissionIndex(
        nextIndex
      );
    }

    setCompleted(false);

    setShowMissionList(false);
  };


  /* =========================
     HIDE CATEGORY
  ========================= */

  const handleHideCategory = () => {
    setHiddenCategories((prev) => {
      if (
        prev.includes(
          selectedCategory
        )
      ) {
        return prev;
      }

      return [
        ...prev,
        selectedCategory,
      ];
    });

    /*
      클릭 당시 카테고리명을
      Toast에 저장한다.

      이후 selectedCategory가 바뀌어도
      토스트 문구는 유지됨.
    */
    setToast({
      category: selectedCategory,
    });

    setCompleted(false);

    setShowMissionList(false);
  };


  /* =========================
     RESTORE CATEGORY
  ========================= */

  const handleRestoreCategory = () => {
    setHiddenCategories((prev) =>
      prev.filter(
        (category) =>
          category !==
          selectedCategory
      )
    );

    setSelectedMissionIndex(0);

    setCompleted(false);

    setShowMissionList(false);
  };


  return (
    <Page>

      {/* =========================
          TOAST
      ========================= */}

      {toast && (
        <Toast>
          <ToastTitle>
            {toast.category} 카테고리를
            그만 볼게요.
          </ToastTitle>

          <ToastDescription>
            오늘은 이 카테고리가 추천되지 않아요.
          </ToastDescription>
        </Toast>
      )}


      <Content>

        {/* =========================
            HEADER
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
                CATEGORY
            ========================= */}

            <CategoryList>

              {missionCategories.map(
                (category) => {
                  const isHidden =
                    hiddenCategories.includes(
                      category
                    );

                  return (
                    <CategoryChip
                      key={category}
                      type="button"

                      $selected={
                        selectedCategory ===
                        category
                      }

                      $hidden={isHidden}

                      onClick={() =>
                        handleCategoryChange(
                          category
                        )
                      }
                    >
                      {category}
                    </CategoryChip>
                  );
                }
              )}

            </CategoryList>


            {/* =========================
                HIDDEN CATEGORY
            ========================= */}

            {isCurrentCategoryHidden ? (
              <>

                <HiddenMissionCard>

                  <MissionTopRow>

                    <MissionCategoryBadge
                      $hidden
                    >
                      {selectedCategory}
                    </MissionCategoryBadge>

                  </MissionTopRow>

                  <HiddenPlanetIcon>
                    🪐
                  </HiddenPlanetIcon>

                  <HiddenMissionTitle>
                    이 카테고리의 미션은
                    <br />
                    그만 보기 했어요
                  </HiddenMissionTitle>

                  <HiddenMissionDescription>
                    다른 카테고리의 미션을
                    선택하거나,
                    <br />
                    다시 보기를 통해 돌아올 수
                    있어요.
                  </HiddenMissionDescription>

                  <RestoreCategoryButton
                    type="button"
                    onClick={
                      handleRestoreCategory
                    }
                  >
                    ⟳ 이 카테고리 다시 보기
                  </RestoreCategoryButton>

                </HiddenMissionCard>


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

                </ActionList>

              </>
            ) : (

              currentMission && (
                <>

                  <MissionCard>

                    <MissionTopRow>

                      <MissionCategoryBadge>
                        {selectedCategory}
                      </MissionCategoryBadge>

                      <MissionTime>
                        예상{" "}
                        {currentMission.time}
                      </MissionTime>

                    </MissionTopRow>


                    <MissionTitle>
                      {currentMission.title}
                    </MissionTitle>


                    <MissionDescription>
                      {
                        currentMission.description
                      }
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
              )
            )}

          </>
        ) : (

          /* =========================
             OTHER MISSION MODE
          ========================= */

          <MissionSelectionArea>

            <PPMessageRow>

              <MiniRobot
                src={ppRobot}
                alt="PP"
              />

              <PPBubble>
                PP가 새로운 미션을
                가져왔어요!
                <br />
                수행할 미션을 선택해
                주세요.
              </PPBubble>

            </PPMessageRow>


            <MissionList>

              {categoryMissions.map(
                (mission, index) => {

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
                          예상{" "}
                          {mission.time}
                        </MissionTime>

                      </MissionTopRow>


                      <MissionTitle>
                        {mission.title}
                      </MissionTitle>


                      <MissionDescription>
                        {
                          mission.description
                        }
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

      <NavBar />

    </Page>
  );
};


export default MissionPage;