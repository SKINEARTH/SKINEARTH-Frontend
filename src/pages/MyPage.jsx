import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";

import { getMyPage } from "../api/myPage";
import { resetUserData } from "../api/dataReset";

import profileLevel1 from "../assets/profile_level_1.svg";
import profileLevel2 from "../assets/profile_level_2.svg";
import profileLevel3 from "../assets/profile_level_3.svg";

import {
  Page,
  Content,

  ProfileHeader,
  ProfileImageWrapper,
  ProfileImage,
  ProfileInfo,
  UserName,
  UserCondition,
  StreakText,

  Card,
  SectionTitle,

  ProfileRow,
  RowLabel,
  RowValue,
  EditButton,
  Divider,

  NotificationRow,
  NotificationLabel,
  Toggle,
  ToggleThumb,

  AccountRow,
  AccountLabel,
  AccountValue,

  LogoutButton,
  ResetButton,

  ModalOverlay,
  ResetSheet,
  WarningIcon,
  ResetTitle,
  ResetDescription,
  ResetList,
  ResetListItem,
  ResetX,
  ResetConfirmButton,
  ResetCancelButton,
} from "../styles/MyPage.styles";

const PROFILE_IMAGES = {
  1: profileLevel1,
  2: profileLevel2,
  3: profileLevel3,
};

const STATUS_MAP = {
  EMPLOYEE: "직장인",
  STUDENT: "학생",
  OTHER: "기타",
};

const SKIN_CONCERN_MAP = {
  DRYNESS: "건조함",
  REDNESS: "홍조",
  TROUBLE: "트러블",
  OILINESS: "기름기",
  SENSITIVITY: "민감성",
  DULLNESS: "칙칙함",
  PORES: "모공",
  NONE: "없음",
};

const formatJoinedDate = (date) => {
  if (!date) {
    return "-";
  }

  const [year, month, day] =
    date.split("-");

  return `${year}. ${month}. ${day}.`;
};

const MyPage = () => {
  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    notifications,
    setNotifications,
  ] = useState({
    dailyLog: true,
    mission: true,
    prediction: false,
  });

  const [
    showResetModal,
    setShowResetModal,
  ] = useState(false);

  const [
    isResetting,
    setIsResetting,
  ] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result =
          await getMyPage();

        console.log(
          "마이페이지 조회 성공:",
          result
        );

        setUser(result.data);
      } catch (error) {
        console.error(
          "마이페이지 조회 실패:",
          error
        );

        setErrorMessage(
          error.message ||
            "사용자 정보를 불러오지 못했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleNotificationToggle = (
    key
  ) => {
    setNotifications(
      (previous) => ({
        ...previous,
        [key]:
          !previous[key],
      })
    );
  };

  const handleLogout = () => {
    localStorage.removeItem(
      "accessToken"
    );

    navigate("/login", {
      replace: true,
    });
  };

  const handleOpenResetModal = () => {
    setShowResetModal(true);
  };

  const handleCloseResetModal = () => {
    if (isResetting) {
      return;
    }

    setShowResetModal(false);
  };

  const handleResetConfirm = async () => {
    if (isResetting) {
      return;
    }

    try {
      setIsResetting(true);

      const result =
        await resetUserData();

      console.log(
        "데이터 초기화 성공:",
        result
      );

      alert(
        "데이터가 초기화되었습니다."
      );

      setShowResetModal(false);

      /*
       * 개인화 정보도 초기화되므로
       * 다시 개인화 설문으로 이동
       *
       * accessToken은 삭제하지 않음
       */
      navigate("/personalization", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "데이터 초기화 실패:",
        error
      );

      alert(error.message);
    } finally {
      setIsResetting(false);
    }
  };

  if (isLoading) {
    return (
      <Page>
        <Content>
          사용자 정보를 불러오는 중입니다...
        </Content>

        <NavBar />
      </Page>
    );
  }

  if (errorMessage || !user) {
    return (
      <Page>
        <Content>
          {errorMessage ||
            "사용자 정보를 찾을 수 없습니다."}
        </Content>

        <NavBar />
      </Page>
    );
  }

  const currentProfileImage =
    PROFILE_IMAGES[user.stage] ||
    PROFILE_IMAGES[1];

  const userStatus =
    STATUS_MAP[
      user.userStatus
    ] ||
    user.userStatus ||
    "-";

  const skinConcernText =
    user.skinConcerns?.length
      ? user.skinConcerns
          .map(
            (concern) =>
              SKIN_CONCERN_MAP[
                concern
              ] || concern
          )
          .join(", ")
      : "없음";

  const joinedDate =
    formatJoinedDate(
      user.joinedDate
    );

  return (
    <Page>
      <Content>
        <ProfileHeader>
          <ProfileImageWrapper>
            <ProfileImage
              src={
                currentProfileImage
              }
              alt={`PP 레벨 ${user.stage}`}
            />
          </ProfileImageWrapper>

          <ProfileInfo>
            <UserName>
              {user.nickname}
            </UserName>

            <UserCondition>
              {userStatus} ·{" "}
              {skinConcernText}
            </UserCondition>

            <StreakText>
              {user.currentStreak}일
              연속 기록 중 🔥
            </StreakText>
          </ProfileInfo>
        </ProfileHeader>

        <Card>
          <SectionTitle>
            프로필 편집
          </SectionTitle>

          <ProfileRow>
            <RowLabel>
              닉네임
            </RowLabel>

            <RowValue>
              {user.nickname}
            </RowValue>

            <EditButton
              type="button"
            >
              편집
            </EditButton>
          </ProfileRow>

          <Divider />

          <ProfileRow>
            <RowLabel>
              현재 상태
            </RowLabel>

            <RowValue>
              {userStatus}
            </RowValue>

            <EditButton
              type="button"
            >
              편집
            </EditButton>
          </ProfileRow>

          <Divider />

          <ProfileRow>
            <RowLabel>
              주요 피부 고민
            </RowLabel>

            <RowValue>
              {skinConcernText}
            </RowValue>

            <EditButton
              type="button"
            >
              편집
            </EditButton>
          </ProfileRow>
        </Card>

        <Card>
          <SectionTitle>
            알림 설정
          </SectionTitle>

          <NotificationRow>
            <NotificationLabel>
              일일 기록 알림
            </NotificationLabel>

            <Toggle
              type="button"
              $active={
                notifications.dailyLog
              }
              onClick={() =>
                handleNotificationToggle(
                  "dailyLog"
                )
              }
            >
              <ToggleThumb
                $active={
                  notifications.dailyLog
                }
              />
            </Toggle>
          </NotificationRow>

          <Divider />

          <NotificationRow>
            <NotificationLabel>
              미션 알림
            </NotificationLabel>

            <Toggle
              type="button"
              $active={
                notifications.mission
              }
              onClick={() =>
                handleNotificationToggle(
                  "mission"
                )
              }
            >
              <ToggleThumb
                $active={
                  notifications.mission
                }
              />
            </Toggle>
          </NotificationRow>

          <Divider />

          <NotificationRow>
            <NotificationLabel>
              예측 업데이트
            </NotificationLabel>

            <Toggle
              type="button"
              $active={
                notifications.prediction
              }
              onClick={() =>
                handleNotificationToggle(
                  "prediction"
                )
              }
            >
              <ToggleThumb
                $active={
                  notifications.prediction
                }
              />
            </Toggle>
          </NotificationRow>
        </Card>

        <Card>
          <SectionTitle>
            계정
          </SectionTitle>

          <AccountRow>
            <AccountLabel>
              이메일
            </AccountLabel>

            <AccountValue>
              {user.email}
            </AccountValue>
          </AccountRow>

          <Divider />

          <AccountRow>
            <AccountLabel>
              가입일
            </AccountLabel>

            <AccountValue>
              {joinedDate}
            </AccountValue>
          </AccountRow>

          <Divider />

          <LogoutButton
            type="button"
            onClick={
              handleLogout
            }
          >
            로그아웃
          </LogoutButton>

          <ResetButton
            type="button"
            onClick={
              handleOpenResetModal
            }
          >
            데이터 초기화
          </ResetButton>
        </Card>
      </Content>

      <NavBar />

      {showResetModal && (
        <ModalOverlay
          onClick={
            handleCloseResetModal
          }
        >
          <ResetSheet
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <WarningIcon>
              ⚠
            </WarningIcon>

            <ResetTitle>
              데이터를 초기화할까요?
            </ResetTitle>

            <ResetDescription>
              모든 기록, 예측 데이터,
              배지가
              <br />
              삭제됩니다. 이 작업은
              되돌릴 수 없어요.
            </ResetDescription>

            <ResetList>
              <ResetListItem>
                <ResetX>×</ResetX>
                모든 궤도 삭제
              </ResetListItem>

              <ResetListItem>
                <ResetX>×</ResetX>
                예측 기록 초기화
              </ResetListItem>

              <ResetListItem>
                <ResetX>×</ResetX>
                달성한 미션 삭제
              </ResetListItem>

              <ResetListItem>
                <ResetX>×</ResetX>
                개인화 정보 초기화
              </ResetListItem>

              <ResetListItem>
                <ResetX>×</ResetX>
                배지 및 단계 초기화
              </ResetListItem>

              <ResetListItem>
                <ResetX>×</ResetX>
                스트릭 카운트 초기화
              </ResetListItem>
            </ResetList>

            <ResetConfirmButton
              type="button"
              onClick={
                handleResetConfirm
              }
              disabled={
                isResetting
              }
            >
              {isResetting
                ? "초기화 중..."
                : "초기화 확인"}
            </ResetConfirmButton>

            <ResetCancelButton
              type="button"
              onClick={
                handleCloseResetModal
              }
              disabled={
                isResetting
              }
            >
              취소
            </ResetCancelButton>
          </ResetSheet>
        </ModalOverlay>
      )}
    </Page>
  );
};

export default MyPage;