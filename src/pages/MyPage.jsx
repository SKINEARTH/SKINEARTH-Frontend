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
} from "../styles/MyPage.styles";


const PROFILE_IMAGES = {
  1: profileLevel1,
  2: profileLevel2,
  3: profileLevel3,
};


const MyPage = () => {
  const navigate = useNavigate();

  /* =========================
     USER MOCK DATA
  ========================= */

  const [user, setUser] = useState({
    nickname: "박수현",
    status: "직장인",
    skinConcern: "건조함",

    level: 1,

    streak: 4,

    email: "id@email.com",
    joinedAt: "2026. 08. 14.",
  });


  /* =========================
     NOTIFICATION
  ========================= */

  const [notifications, setNotifications] =
    useState({
      dailyLog: true,
      mission: true,
      prediction: false,
    });


  /* =========================
     CURRENT PROFILE IMAGE
  ========================= */

  const currentProfileImage =
    PROFILE_IMAGES[user.level] ||
    PROFILE_IMAGES[1];


  /* =========================
     TOGGLE
  ========================= */

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };


  /* =========================
     PROFILE EDIT
  ========================= */

  const handleEditNickname = () => {
    console.log("닉네임 편집");

    // TODO:
    // 추후 프로필 수정 모달 또는
    // 별도의 EditProfilePage 연결
  };


  const handleEditStatus = () => {
    console.log("현재 상태 편집");
  };


  const handleEditSkinConcern = () => {
    console.log("피부 고민 편집");
  };


  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    console.log("로그아웃");

    // TODO:
    // 로그인 API 연동 후
    // accessToken / refreshToken 삭제

    navigate("/login");
  };


  /* =========================
     RESET DATA
  ========================= */

  const handleReset = () => {
    const confirmed =
      window.confirm(
        "모든 기록 데이터를 초기화할까요?"
      );

    if (!confirmed) {
      return;
    }

    console.log("데이터 초기화");

    // TODO:
    // 백엔드 데이터 초기화 API 연동
  };


  return (
    <Page>
      <Content>

        {/* =========================
            PROFILE HEADER
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

            <EditButton
              type="button"
              onClick={handleEditNickname}
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
              {user.status}
            </RowValue>

            <EditButton
              type="button"
              onClick={handleEditStatus}
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
              {user.skinConcern}
            </RowValue>

            <EditButton
              type="button"
              onClick={handleEditSkinConcern}
            >
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
              $active={
                notifications.dailyLog
              }
              onClick={() =>
                handleNotificationToggle(
                  "dailyLog"
                )
              }
              aria-label="일일 기록 알림"
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
              aria-label="미션 알림"
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
              aria-label="예측 업데이트 알림"
            >
              <ToggleThumb
                $active={
                  notifications.prediction
                }
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
            onClick={handleReset}
          >
            데이터 초기화
          </ResetButton>

        </Card>

      </Content>


      <NavBar />
    </Page>
  );
};


export default MyPage;