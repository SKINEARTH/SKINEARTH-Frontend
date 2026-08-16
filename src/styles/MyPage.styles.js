import styled from "styled-components";


/* =========================
   PAGE
========================= */

export const Page = styled.main`
  width: 100%;
  min-height: 100dvh;

  background: var(--dark-navy);
  color: var(--white);
`;


export const Content = styled.div`
  width: 100%;

  padding: 4rem 1.25rem 8.5rem;
`;


/* =========================
   PROFILE HEADER
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

  box-shadow:
    0 0 1.5rem
    rgba(143, 173, 234, 0.08);
`;


export const ProfileImage = styled.img`
  width: 4rem;
  height: 4rem;

  display: block;

  object-fit: contain;
`;


export const ProfileInfo = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
`;


export const UserName = styled.h1`
  margin: 0;

  color: var(--white);

  font-family:
    "Paperlogy",
    sans-serif;

  font-size: 1.5rem;
  font-weight: 800;

  line-height: 1.3;
`;


export const UserCondition = styled.p`
  margin-top: 0.25rem;

  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.95rem;
  font-weight: 400;

  line-height: 1.5;
`;


export const StreakText = styled.p`
  margin-top: 0.5rem;

  color: var(--light-blue);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.8rem;
  font-weight: 500;

  line-height: 1.5;
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
  margin: 0 0 1.5rem;

  color: var(--light-blue);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.95rem;
  font-weight: 700;

  line-height: 1.4;
`;


/* =========================
   PROFILE ROW
========================= */

export const ProfileRow = styled.div`
  width: 100%;

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
  font-weight: 400;
`;


export const RowValue = styled.span`
  color: var(--white);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.9rem;
  font-weight: 500;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
`;


export const EditButton = styled.button`
  padding: 0;

  border: none;

  background: transparent;

  color: var(--light-blue);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.85rem;
  font-weight: 500;

  cursor: pointer;

  -webkit-tap-highlight-color:
    transparent;
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
  width: 100%;

  min-height: 4rem;

  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 1rem;
`;


export const NotificationLabel = styled.span`
  color: var(--white);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.95rem;
  font-weight: 400;
`;


/* =========================
   TOGGLE
========================= */

export const Toggle = styled.button`
  position: relative;

  width: 3rem;
  height: 1.75rem;

  flex-shrink: 0;

  padding: 0;

  border: 1px solid
    ${({ $active }) =>
      $active
        ? "var(--light-blue)"
        : "rgba(143, 173, 234, 0.12)"};

  border-radius: 999px;

  background:
    ${({ $active }) =>
      $active
        ? "#416bc7"
        : "rgba(143, 173, 234, 0.10)"};

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  -webkit-tap-highlight-color:
    transparent;
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

  transition:
    left 0.22s
    cubic-bezier(
      0.22,
      1,
      0.36,
      1
    );
`;


/* =========================
   ACCOUNT
========================= */

export const AccountRow = styled.div`
  width: 100%;

  min-height: 3.5rem;

  display: grid;

  grid-template-columns:
    5rem
    minmax(0, 1fr);

  align-items: center;

  gap: 1rem;
`;


export const AccountLabel = styled.span`
  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.875rem;
  font-weight: 400;
`;


export const AccountValue = styled.span`
  color: var(--white);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.9rem;
  font-weight: 400;
`;


/* =========================
   LOGOUT
========================= */

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
  font-weight: 400;

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.15s ease;

  &:active {
    transform: scale(0.98);

    background:
      rgba(143, 173, 234, 0.05);
  }

  -webkit-tap-highlight-color:
    transparent;
`;


/* =========================
   RESET
========================= */

export const ResetButton = styled.button`
  width: 100%;

  margin-top: 1.5rem;

  padding: 0;

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

  -webkit-tap-highlight-color:
    transparent;
`;