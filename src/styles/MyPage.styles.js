import styled, { keyframes } from "styled-components";


/* =========================
   ANIMATION
========================= */

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;


/* =========================
   PAGE
========================= */

export const Page = styled.main`
  width: 100%;
  min-height: 100dvh;

  display: flex;
  justify-content: center;

  background: var(--dark-navy);
  color: var(--white);
`;

export const Content = styled.div`
  width: 100%;
  max-width: 390px;
  min-height: 100dvh;

  margin: 0 auto;

  padding: 4rem 1.25rem 8.5rem;
`;


/* =========================
   PROFILE
========================= */

export const ProfileHeader = styled.header`
  width: 100%;

  display: flex;
  align-items: center;

  gap: 1.25rem;

  margin-bottom: 1.75rem;
`;

export const ProfileImageWrapper = styled.div`
  width: 5.5rem;
  height: 5.5rem;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid
    rgba(143, 173, 234, 0.35);

  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(143, 173, 234, 0.12) 0%,
    rgba(143, 173, 234, 0.04) 60%,
    rgba(143, 173, 234, 0) 100%
  );
`;

export const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;

  object-fit: contain;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.h1`
  color: var(--white);

  font-family: "Paperlogy", sans-serif;

  font-size: 1.5rem;
  font-weight: 800;
`;

export const UserCondition = styled.p`
  margin-top: 0.25rem;

  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.95rem;
`;

export const StreakText = styled.p`
  margin-top: 0.5rem;

  color: var(--light-blue);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.8rem;
`;


/* =========================
   CARD
========================= */

export const Card = styled.section`
  width: 100%;

  margin-bottom: 1rem;
  padding: 1.5rem;

  border: 1px solid
    rgba(143, 173, 234, 0.2);

  border-radius: 1.5rem;

  background:
    rgba(143, 173, 234, 0.035);
`;

export const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;

  color: var(--light-blue);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.95rem;
  font-weight: 700;
`;


/* =========================
   PROFILE ROW
========================= */

export const ProfileRow = styled.div`
  min-height: 3.3rem;

  display: grid;

  grid-template-columns:
    minmax(5.5rem, 1fr)
    minmax(0, 1.5fr)
    auto;

  align-items: center;

  gap: 0.75rem;
`;

export const RowLabel = styled.span`
  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.875rem;
`;

export const RowValue = styled.span`
  color: var(--white);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.9rem;
`;

export const EditButton = styled.button`
  border: none;

  background: transparent;

  color: var(--light-blue);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.85rem;

  cursor: pointer;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;

  background:
    rgba(143, 173, 234, 0.08);
`;


/* =========================
   NOTIFICATION
========================= */

export const NotificationRow = styled.div`
  min-height: 4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NotificationLabel = styled.span`
  color: var(--white);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.95rem;
`;

export const Toggle = styled.button`
  position: relative;

  width: 3rem;
  height: 1.75rem;

  border: 1px solid
    ${({ $active }) =>
      $active
        ? "var(--light-blue)"
        : "rgba(143,173,234,0.12)"};

  border-radius: 999px;

  background:
    ${({ $active }) =>
      $active
        ? "#416bc7"
        : "rgba(143,173,234,0.10)"};

  cursor: pointer;
`;

export const ToggleThumb = styled.span`
  position: absolute;

  top: 50%;

  left:
    ${({ $active }) =>
      $active
        ? "calc(100% - 1.45rem)"
        : "0.2rem"};

  width: 1.35rem;
  height: 1.35rem;

  border-radius: 50%;

  background: var(--white);

  transform: translateY(-50%);

  transition: left 0.2s ease;
`;


/* =========================
   ACCOUNT
========================= */

export const AccountRow = styled.div`
  min-height: 3.5rem;

  display: grid;

  grid-template-columns:
    5rem
    minmax(0, 1fr);

  align-items: center;
`;

export const AccountLabel = styled.span`
  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.875rem;
`;

export const AccountValue = styled.span`
  color: var(--white);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.9rem;
`;

export const LogoutButton = styled.button`
  width: 100%;
  height: 3.25rem;

  margin-top: 1rem;

  border: 1px solid
    rgba(143, 173, 234, 0.15);

  border-radius: 0.75rem;

  background: transparent;

  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.9rem;

  cursor: pointer;
`;

export const ResetButton = styled.button`
  width: 100%;

  margin-top: 1.5rem;

  border: none;

  background: transparent;

  color: #ff674c;

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.875rem;
  font-weight: 500;

  cursor: pointer;
`;


/* =========================
   RESET MODAL
========================= */

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  z-index: 9999;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  padding: 0 1.5rem;

  background: rgba(0, 0, 0, 0.55);

  backdrop-filter: blur(0.15rem);

  animation: ${fadeIn} 0.25s ease forwards;
`;

export const ResetSheet = styled.section`
  width: 100%;
  max-width: 390px;

  padding: 2rem 1.5rem 2.5rem;

  box-sizing: border-box;

  border: 1px solid rgba(143, 173, 234, 0.2);

  border-radius:
    1.75rem
    1.75rem
    0
    0;

  background: rgba(20, 35, 68, 0.98);

  box-shadow:
    0 -1rem 3rem
    rgba(0, 0, 0, 0.35);

  animation:
    ${slideUp}
    0.45s
    cubic-bezier(0.22, 1, 0.36, 1)
    forwards;
`;

export const WarningIcon = styled.div`
  width: 4rem;
  height: 4rem;

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid rgba(255, 103, 76, 0.55);
  border-radius: 50%;

  background: rgba(255, 103, 76, 0.08);

  color: var(--white);

  font-size: 2rem;

  box-shadow:
    0 0 1.5rem
    rgba(255, 103, 76, 0.15);
`;

export const ResetTitle = styled.h2`
  margin-top: 1.5rem;

  color: var(--white);

  text-align: center;

  font-family: "Paperlogy", sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.4;
`;

export const ResetDescription = styled.p`
  margin-top: 1rem;

  color: var(--gray);

  text-align: center;

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.7;
`;

export const ResetList = styled.div`
  width: 100%;

  margin-top: 1.5rem;
  padding: 1.25rem;

  display: flex;
  flex-direction: column;

  gap: 1rem;

  box-sizing: border-box;

  border: 1px solid rgba(255, 103, 76, 0.35);
  border-radius: 1rem;

  background: rgba(255, 103, 76, 0.05);
`;

export const ResetListItem = styled.div`
  display: flex;
  align-items: center;

  gap: 0.7rem;

  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
`;

export const ResetX = styled.span`
  flex-shrink: 0;

  color: #ff674c;

  font-size: 1.3rem;
  line-height: 1;
`;

export const ResetConfirmButton = styled.button`
  width: 100%;
  height: 3.5rem;

  margin-top: 1.5rem;

  border: none;
  border-radius: 999px;

  background: #ff674c;

  color: var(--white);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 1.05rem;
  font-weight: 800;

  cursor: pointer;

  box-shadow:
    0 0.5rem 1.5rem
    rgba(255, 103, 76, 0.2);

  transition:
    transform 0.15s ease,
    opacity 0.15s ease;

  &:active {
    transform: scale(0.98);
  }

  -webkit-tap-highlight-color: transparent;
`;

export const ResetCancelButton = styled.button`
  width: 100%;
  height: 3.5rem;

  margin-top: 0.75rem;

  border: 1px solid rgba(143, 173, 234, 0.12);
  border-radius: 999px;

  background: rgba(143, 173, 234, 0.08);

  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 1rem;
  font-weight: 400;

  cursor: pointer;

  transition:
    transform 0.15s ease,
    background 0.15s ease;

  &:active {
    transform: scale(0.98);

    background:
      rgba(143, 173, 234, 0.12);
  }

  -webkit-tap-highlight-color: transparent;
`;