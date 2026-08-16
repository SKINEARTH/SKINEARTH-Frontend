import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";

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


const MyPage = () => {
  const navigate = useNavigate();

  const [user] = useState({
    nickname: "박수현",
    status: "직장인",
    skinConcern: "건조함",
    level: 1,
    streak: 4,
    email: "id@email.com",
    joinedAt: "2026. 08. 14.",
  });

  const [notifications, setNotifications] =
    useState({
      dailyLog: true,
      mission: true,
      prediction: false,
    });

  const [showResetModal, setShowResetModal] =
    useState(false);


  const currentProfileImage =
    PROFILE_IMAGES[user.level] ||
    PROFILE_IMAGES[1];


  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };


  const handleLogout = () => {
    navigate("/login");
  };


  const handleOpenResetModal = () => {
    setShowResetModal(true);
  };


  const handleCloseResetModal = () => {
    setShowResetModal(false);
  };


  const handleResetConfirm = () => {
    console.log("데이터 초기화 실행");

    // TODO:
    // 백엔드 연동 후 초기화 API 호출

    setShowResetModal(false);
  };


  return (
    <Page>
      <Content>

        {/* =========================
            PROFILE
        ========================= */}

        <ProfileHeader>
          <ProfileImageWrapper>
            <ProfileImage
              src={currentProfileImage}
              alt={`PP 레벨 ${user.level}`}
            />
          </ProfileImageWrapper>

          <ProfileInfo>
            <UserName>
              {user.nickname}
            </UserName>

            <UserCondition>
              {user.status} · {user.skinConcern}
            </UserCondition>

            <StreakText>
              {user.streak}일 연속 기록 중 🔥
            </StreakText>
          </ProfileInfo>
        </ProfileHeader>


        {/* =========================
            PROFILE EDIT
        ========================= */}

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

            <EditButton type="button">
              편집
            </EditButton>
          </ProfileRow>

          <Divider />

          <ProfileRow>
            <RowLabel>
              현재 상태
            </RowLabel>

            <RowValue>
              {user.status}
            </RowValue>

            <EditButton type="button">
              편집
            </EditButton>
          </ProfileRow>

          <Divider />

          <ProfileRow>
            <RowLabel>
              주요 피부 고민
            </RowLabel>

            <RowValue>
              {user.skinConcern}
            </RowValue>

            <EditButton type="button">
              편집
            </EditButton>
          </ProfileRow>
        </Card>


        {/* =========================
            NOTIFICATION
        ========================= */}

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
              $active={notifications.dailyLog}
              onClick={() =>
                handleNotificationToggle(
                  "dailyLog"
                )
              }
            >
              <ToggleThumb
                $active={notifications.dailyLog}
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
              $active={notifications.mission}
              onClick={() =>
                handleNotificationToggle(
                  "mission"
                )
              }
            >
              <ToggleThumb
                $active={notifications.mission}
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
              $active={notifications.prediction}
              onClick={() =>
                handleNotificationToggle(
                  "prediction"
                )
              }
            >
              <ToggleThumb
                $active={notifications.prediction}
              />
            </Toggle>
          </NotificationRow>
        </Card>


        {/* =========================
            ACCOUNT
        ========================= */}

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
              {user.joinedAt}
            </AccountValue>
          </AccountRow>

          <Divider />

          <LogoutButton
            type="button"
            onClick={handleLogout}
          >
            로그아웃
          </LogoutButton>

          <ResetButton
            type="button"
            onClick={handleOpenResetModal}
          >
            데이터 초기화
          </ResetButton>
        </Card>

      </Content>

      <NavBar />


      {/* =========================
          RESET MODAL
      ========================= */}

      {showResetModal && (
        <ModalOverlay
          onClick={handleCloseResetModal}
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
              모든 기록, 예측 데이터, 배지가
              <br />
              삭제됩니다. 이 작업은 되돌릴 수 없어요.
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
                스트릭 카운트 초기화
              </ResetListItem>
            </ResetList>

            <ResetConfirmButton
              type="button"
              onClick={handleResetConfirm}
            >
              초기화 확인
            </ResetConfirmButton>

            <ResetCancelButton
              type="button"
              onClick={handleCloseResetModal}
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