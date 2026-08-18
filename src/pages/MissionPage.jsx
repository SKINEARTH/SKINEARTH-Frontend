import {
  useEffect,
  useState,
} from "react";

import NavBar from "../components/NavBar";
import ppRobot from "../assets/third_OnboardingPage.svg";

import {
  getTodayMission,
  completeMission,
  regenerateMission,
  adjustMissionIntensity,
  excludeMissionCategory,
  confirmMission,
} from "../api/mission";

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

  Toast,
  ToastTitle,
  ToastDescription,
} from "../styles/MissionPage.styles";

const MissionPage = () => {
  const [
    currentMission,
    setCurrentMission,
  ] = useState(null);

  const [
    alternativeMission,
    setAlternativeMission,
  ] = useState(null);

  const [
    showMissionList,
    setShowMissionList,
  ] = useState(false);

  const [
    excludedCategory,
    setExcludedCategory,
  ] = useState(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isProcessing,
    setIsProcessing,
  ] = useState(false);

  const [
    toast,
    setToast,
  ] = useState(null);

  /*
   * =========================
   * 오늘 미션 조회
   * =========================
   */
  useEffect(() => {
    const loadTodayMission =
      async () => {
        try {
          setIsLoading(true);

          const result =
            await getTodayMission();

          console.log(
            "오늘 미션 조회 성공:",
            result
          );

          setCurrentMission(
            result.data
          );
        } catch (error) {
          console.error(
            "오늘 미션 조회 실패:",
            error
          );

          /*
           * 오늘 발급된 미션 없음
           */
          if (
            error.status === 404
          ) {
            setCurrentMission(
              null
            );

            return;
          }

          /*
           * 개인화 설문 미완료
           */
          if (
            error.status === 400
          ) {
            setToast({
              type:
                "personalizationRequired",
            });

            return;
          }

          setToast({
            type: "error",
            message:
              error.message,
          });
        } finally {
          setIsLoading(false);
        }
      };

    loadTodayMission();
  }, []);

  /*
   * =========================
   * 토스트 자동 종료
   * =========================
   */
  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer =
      setTimeout(() => {
        setToast(null);
      }, 2800);

    return () => {
      clearTimeout(timer);
    };
  }, [toast]);

  /*
   * =========================
   * 미션 완료
   * =========================
   */
  const handleCompleteMission =
    async () => {
      if (
        !currentMission?.id ||
        currentMission.isCompleted ||
        isProcessing
      ) {
        return;
      }

      try {
        setIsProcessing(true);

        /*
         * 1. 완료 API 호출
         */
        await completeMission(
          currentMission.id
        );

        /*
         * 2. 완료 후 최신 상태 조회
         */
        const refreshed =
          await getTodayMission();

        console.log(
          "미션 완료 후 최신 상태:",
          refreshed
        );

        setCurrentMission(
          refreshed.data
        );

        setToast({
          type:
            "completeMission",
        });
      } catch (error) {
        console.error(
          "미션 완료 실패:",
          error
        );

        setToast({
          type: "error",
          message:
            error.message,
        });
      } finally {
        setIsProcessing(false);
      }
    };

  /*
   * =========================
   * 다른 미션 보기
   * =========================
   */
  const handleShowOtherMissions =
    async () => {
      if (isProcessing) {
        return;
      }

      try {
        setIsProcessing(true);

        const result =
          await regenerateMission();

        console.log(
          "대체 미션 생성:",
          result
        );

        /*
         * regenerate는 후보 미션만 반환
         */
        setAlternativeMission(
          result.data
        );

        setShowMissionList(true);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        console.error(
          "다른 미션 조회 실패:",
          error
        );

        if (
          error.status ===
            409 &&
          error.code ===
            "MISSION_CANDIDATE_NOT_FOUND"
        ) {
          setToast({
            type:
              "noCandidateMission",
          });

          return;
        }

        setToast({
          type: "error",
          message:
            error.message,
        });
      } finally {
        setIsProcessing(false);
      }
    };

  /*
   * =========================
   * 대체 미션 확정
   *
   * 핵심 수정:
   * confirm 결과만 바로 쓰지 않고
   * GET today를 다시 호출해서
   * 새 미션의 isCompleted 값을
   * 서버 기준으로 다시 반영
   * =========================
   */
  const handleSelectMission =
    async () => {
      if (
        !alternativeMission ||
        isProcessing
      ) {
        return;
      }

      try {
        setIsProcessing(true);

        /*
         * 1. 후보 미션 확정
         */
        const confirmResult =
          await confirmMission();

        console.log(
          "대체 미션 확정:",
          confirmResult
        );

        /*
         * 2. 확정된 현재 미션
         * 최신 상태 다시 조회
         *
         * 이전 미션의 완료 상태가
         * 다음 미션으로 넘어오는 문제 방지
         */
        const refreshed =
          await getTodayMission();

        console.log(
          "대체 미션 확정 후 최신 상태:",
          refreshed
        );

        setCurrentMission(
          refreshed.data
        );

        /*
         * 후보 관련 상태 초기화
         */
        setAlternativeMission(
          null
        );

        setShowMissionList(
          false
        );

        setExcludedCategory(
          null
        );

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        console.error(
          "대체 미션 확정 실패:",
          error
        );

        setToast({
          type: "error",
          message:
            error.message,
        });
      } finally {
        setIsProcessing(false);
      }
    };

  /*
   * =========================
   * 더 쉬운 미션
   * =========================
   */
  const handleEasyMission =
    async () => {
      if (isProcessing) {
        return;
      }

      try {
        setIsProcessing(true);

        const result =
          await adjustMissionIntensity();

        console.log(
          "쉬운 미션 후보:",
          result
        );

        /*
         * 성공해도 아직 후보 상태
         */
        setAlternativeMission(
          result.data
        );

        setShowMissionList(true);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        console.error(
          "쉬운 미션 변경 실패:",
          error
        );

        if (
          error.status ===
            409 &&
          error.code ===
            "MISSION_ALREADY_LIGHT"
        ) {
          setToast({
            type:
              "noEasierMission",
          });

          return;
        }

        if (
          error.status ===
            409 &&
          error.code ===
            "MISSION_CANDIDATE_NOT_FOUND"
        ) {
          setToast({
            type:
              "noCandidateMission",
          });

          return;
        }

        setToast({
          type: "error",
          message:
            error.message,
        });
      } finally {
        setIsProcessing(false);
      }
    };

  /*
   * =========================
   * 카테고리 제외
   * =========================
   */
  const handleHideCategory =
    async () => {
      if (
        !currentMission?.category ||
        isProcessing
      ) {
        return;
      }

      try {
        setIsProcessing(true);

        const result =
          await excludeMissionCategory();

        console.log(
          "카테고리 제외 성공:",
          result
        );

        const category =
          result.data
            ?.category ||
          currentMission.category;

        setExcludedCategory(
          category
        );

        setToast({
          type:
            "hideCategory",
          category,
        });

        setShowMissionList(
          false
        );

        setAlternativeMission(
          null
        );
      } catch (error) {
        console.error(
          "카테고리 제외 실패:",
          error
        );

        if (
          error.status ===
            409 &&
          error.code ===
            "MISSION_CANDIDATE_NOT_FOUND"
        ) {
          setToast({
            type:
              "noCandidateMission",
          });

          return;
        }

        setToast({
          type: "error",
          message:
            error.message,
        });
      } finally {
        setIsProcessing(false);
      }
    };

  /*
   * =========================
   * 카테고리 다시 보기
   *
   * 현재 백엔드에
   * 제외 취소 API가 없기 때문에
   * 프론트 화면에서만 복구
   * =========================
   */
  const handleRestoreCategory =
    () => {
      setExcludedCategory(
        null
      );

      setToast({
        type:
          "restoreCategory",
      });
    };

  /*
   * =========================
   * 후보 화면 닫기
   * =========================
   */
  const handleReturnCurrentMission =
    () => {
      setShowMissionList(
        false
      );

      setAlternativeMission(
        null
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  /*
   * =========================
   * LOADING
   * =========================
   */
  if (isLoading) {
    return (
      <Page>
        <Content>
          <HeaderRow>
            <HeaderText>
              <Title>
                탐사 미션
              </Title>

              <Subtitle>
                오늘의 미션을
                불러오는 중이에요
              </Subtitle>
            </HeaderText>
          </HeaderRow>
        </Content>

        <NavBar />
      </Page>
    );
  }

  return (
    <Page>
      {/* =========================
          TOAST
      ========================= */}

      {toast && (
        <Toast>
          {toast.type ===
            "hideCategory" && (
            <>
              <ToastTitle>
                {
                  toast.category
                }{" "}
                카테고리를 그만
                볼게요.
              </ToastTitle>

              <ToastDescription>
                오늘은 이
                카테고리가
                추천되지 않아요.
              </ToastDescription>
            </>
          )}

          {toast.type ===
            "restoreCategory" && (
            <>
              <ToastTitle>
                카테고리를 다시
                볼게요.
              </ToastTitle>

              <ToastDescription>
                기존 미션을 다시
                확인할 수 있어요.
              </ToastDescription>
            </>
          )}

          {toast.type ===
            "noEasierMission" && (
            <>
              <ToastTitle>
                더 쉬운 미션으로
                조정할 수 없어요.
              </ToastTitle>

              <ToastDescription>
                미션 수행이
                어렵다면,
                <br />
                ‘다른 미션 보기’를
                클릭해 보세요.
              </ToastDescription>
            </>
          )}

          {toast.type ===
            "noCandidateMission" && (
            <>
              <ToastTitle>
                다른 미션을 찾지
                못했어요.
              </ToastTitle>

              <ToastDescription>
                현재 선택할 수 있는
                대체 미션이 없어요.
              </ToastDescription>
            </>
          )}

          {toast.type ===
            "completeMission" && (
            <>
              <ToastTitle>
                미션 완료!
              </ToastTitle>

              <ToastDescription>
                오늘의 탐사 미션을
                완료했어요.
              </ToastDescription>
            </>
          )}

          {toast.type ===
            "personalizationRequired" && (
            <>
              <ToastTitle>
                개인화 설문이
                필요해요.
              </ToastTitle>

              <ToastDescription>
                미션을 추천받으려면
                개인화 설문을 먼저
                완료해 주세요.
              </ToastDescription>
            </>
          )}

          {toast.type ===
            "error" && (
            <>
              <ToastTitle>
                요청을 처리하지
                못했어요.
              </ToastTitle>

              <ToastDescription>
                {toast.message}
              </ToastDescription>
            </>
          )}
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
              오늘의 피부 기후 개선
              미션
            </Subtitle>
          </HeaderText>

          <StreakBadge>
            🔥{" "}
            {currentMission
              ?.streak ?? 0}
            일 연속 수행 중
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
                    src={
                      ppRobot
                    }
                    alt="PP"
                  />
                </RobotArea>

                <LevelInfo>
                  <LevelTitle>
                    Lv.1 관측자
                  </LevelTitle>

                  <LevelDescription>
                    가장 기본적인
                    형태의 신입사원
                    PP입니다.
                    <br />
                    좋아하는 음료는
                    아메리카노라고
                    해요.
                  </LevelDescription>

                  <NextLevelTitle>
                    다음 레벨까지
                    남은 조건
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
                      $progress={
                        30
                      }
                    />
                  </ProgressTrack>
                </LevelInfo>
              </JourneyContent>
            </JourneyCard>

            {/* =========================
                EXCLUDED CATEGORY
            ========================= */}

            {excludedCategory ? (
              <>
                <HiddenMissionCard>
                  <MissionTopRow>
                    <MissionCategoryBadge
                      $hidden
                    >
                      {
                        excludedCategory
                      }
                    </MissionCategoryBadge>
                  </MissionTopRow>

                  <HiddenPlanetIcon>
                    🪐
                  </HiddenPlanetIcon>

                  <HiddenMissionTitle>
                    이 카테고리의
                    미션은
                    <br />
                    그만 보기 했어요
                  </HiddenMissionTitle>

                  <HiddenMissionDescription>
                    오늘은 이
                    카테고리가 더 이상
                    추천되지 않아요.
                  </HiddenMissionDescription>
                </HiddenMissionCard>

                <MissionAdjustLabel>
                  미션 조정
                </MissionAdjustLabel>

                <ActionList>
                  <ActionButton
                    type="button"
                    disabled={
                      isProcessing
                    }
                    onClick={
                      handleRestoreCategory
                    }
                  >
                    ↩ 이 카테고리
                    다시 보기
                  </ActionButton>
                </ActionList>
              </>
            ) : currentMission ? (
              <>
                {/* =========================
                    CURRENT MISSION
                ========================= */}

                <MissionCard>
                  <MissionTopRow>
                    <MissionCategoryBadge>
                      {
                        currentMission
                          .category
                      }
                    </MissionCategoryBadge>

                    <MissionTime>
                      예상{" "}
                      {
                        currentMission
                          .estimatedMinutes
                      }
                      분
                    </MissionTime>
                  </MissionTopRow>

                  <MissionTitle>
                    {
                      currentMission
                        .title
                    }
                  </MissionTitle>

                  <MissionDescription>
                    {
                      currentMission
                        .description
                    }
                  </MissionDescription>

                  <AiBadge>
                    ✦ AI 추천
                  </AiBadge>

                  <CompleteButton
                    type="button"
                    disabled={
                      currentMission
                        .isCompleted ||
                      isProcessing
                    }
                    onClick={
                      handleCompleteMission
                    }
                  >
                    {currentMission
                      .isCompleted
                      ? "✓ 완료한 미션"
                      : "미션 완료하기"}
                  </CompleteButton>
                </MissionCard>

                <MissionAdjustLabel>
                  미션 조정
                </MissionAdjustLabel>

                <ActionList>
                  <ActionButton
                    type="button"
                    disabled={
                      isProcessing
                    }
                    onClick={
                      handleShowOtherMissions
                    }
                  >
                    🔄 다른 미션 보기
                  </ActionButton>

                  <ActionButton
                    type="button"
                    disabled={
                      isProcessing
                    }
                    onClick={
                      handleEasyMission
                    }
                  >
                    ✨ 더 쉬운
                    미션으로 바꾸기
                  </ActionButton>

                  <ActionButton
                    type="button"
                    disabled={
                      isProcessing
                    }
                    onClick={
                      handleHideCategory
                    }
                  >
                    🚫 이 카테고리
                    그만 보기
                  </ActionButton>
                </ActionList>
              </>
            ) : (
              <HiddenMissionCard>
                <HiddenPlanetIcon>
                  🪐
                </HiddenPlanetIcon>

                <HiddenMissionTitle>
                  오늘 발행된
                  미션이 없어요
                </HiddenMissionTitle>

                <HiddenMissionDescription>
                  미션이 발행되면
                  이곳에서 확인할 수
                  있어요.
                </HiddenMissionDescription>
              </HiddenMissionCard>
            )}
          </>
        ) : (
          /* =========================
             ALTERNATIVE MISSION
          ========================= */

          <MissionSelectionArea>
            <PPMessageRow>
              <MiniRobot
                src={
                  ppRobot
                }
                alt="PP"
              />

              <PPBubble>
                PP가 새로운 미션을
                가져왔어요!
                <br />
                수행할 미션을
                선택해 주세요.
              </PPBubble>
            </PPMessageRow>

            <MissionList>
              {alternativeMission && (
                <AlternativeMissionCard>
                  <MissionTopRow>
                    <MissionCategoryBadge>
                      {
                        alternativeMission
                          .category
                      }
                    </MissionCategoryBadge>

                    <MissionTime>
                      예상{" "}
                      {
                        alternativeMission
                          .estimatedMinutes
                      }
                      분
                    </MissionTime>
                  </MissionTopRow>

                  <MissionTitle>
                    {
                      alternativeMission
                        .title
                    }
                  </MissionTitle>

                  <MissionDescription>
                    {
                      alternativeMission
                        .description
                    }
                  </MissionDescription>

                  <AiBadge>
                    ✦ AI 추천
                  </AiBadge>

                  <SelectMissionButton
                    type="button"
                    disabled={
                      isProcessing
                    }
                    onClick={
                      handleSelectMission
                    }
                  >
                    ✓ 이 미션 선택
                  </SelectMissionButton>
                </AlternativeMissionCard>
              )}
            </MissionList>

            <MissionAdjustLabel>
              미션 조정
            </MissionAdjustLabel>

            <ActionList>
              <ActionButton
                type="button"
                disabled={
                  isProcessing
                }
                onClick={
                  handleReturnCurrentMission
                }
              >
                ↩ 현재 미션으로
                돌아가기
              </ActionButton>

              <ActionButton
                type="button"
                disabled={
                  isProcessing
                }
                onClick={
                  handleEasyMission
                }
              >
                ✨ 더 쉬운 미션으로
                바꾸기
              </ActionButton>

              <ActionButton
                type="button"
                disabled={
                  isProcessing
                }
                onClick={
                  handleHideCategory
                }
              >
                🚫 이 카테고리
                그만 보기
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