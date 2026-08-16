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

  padding: 3rem 1.25rem 8.5rem;
`;

/* =========================
   HEADER
========================= */

export const HeaderRow = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 1rem;

  margin-bottom: 1.75rem;
`;

export const HeaderText = styled.div`
  min-width: 0;
`;

export const Title = styled.h1`
  margin: 0;

  color: var(--white);

  font-family: "Paperlogy", sans-serif;
  font-size: 1.375rem;
  font-weight: 800;
  line-height: 1.3;
`;

export const Subtitle = styled.p`
  margin-top: 0.25rem;

  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
`;

export const StreakBadge = styled.div`
  flex-shrink: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.55rem 0.85rem;

  border: 1px solid rgba(255, 226, 89, 0.35);
  border-radius: 999px;

  background: rgba(255, 226, 89, 0.08);

  color: #ffe259;

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.78rem;
  font-weight: 700;

  white-space: nowrap;
`;

/* =========================
   JOURNEY CARD
========================= */

export const JourneyCard = styled.section`
  width: 100%;

  margin-bottom: 1.5rem;
  padding: 1.5rem;

  border: 1px solid rgba(143, 173, 234, 0.2);
  border-radius: 1.5rem;

  background: rgba(143, 173, 234, 0.035);
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

export const JourneyContent = styled.div`
  display: flex;
  align-items: center;

  gap: 1.25rem;
`;

export const RobotArea = styled.div`
  width: 7rem;
  min-width: 7rem;
  height: 7rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(93, 217, 186, 0.14) 0%,
    rgba(93, 217, 186, 0.06) 48%,
    rgba(93, 217, 186, 0) 72%
  );
`;

export const RobotImage = styled.img`
  width: 12rem;
  height: 12rem;

  display: block;
  object-fit: contain;
`;

export const LevelInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LevelTitle = styled.h3`
  margin: 0 0 0.3rem;

  color: var(--mint);

  font-family: "Paperlogy", sans-serif;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.4;
`;

export const LevelDescription = styled.p`
  margin: 0;

  color: var(--white);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.55;
`;

export const NextLevelTitle = styled.h4`
  margin: 0.8rem 0 0.2rem;

  color: var(--mint);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.8rem;
  font-weight: 700;
`;

export const NextLevelDescription = styled.p`
  margin: 0;

  color: var(--white);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.72rem;
  font-weight: 400;
  line-height: 1.5;
`;

/* =========================
   PROGRESS
========================= */

export const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 0.8rem;
  margin-bottom: 0.35rem;
`;

export const ProgressLabel = styled.span`
  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.7rem;
  font-weight: 400;
`;

export const ProgressCount = styled.span`
  color: var(--light-blue);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.7rem;
  font-weight: 700;
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 0.3rem;

  overflow: hidden;

  border-radius: 999px;

  background: rgba(143, 173, 234, 0.15);
`;

export const ProgressBar = styled.div`
  width: ${({ $progress }) => `${$progress ?? 30}%`};
  height: 100%;

  border-radius: inherit;

  background: linear-gradient(
    90deg,
    var(--mint),
    var(--light-blue)
  );

  transition: width 0.3s ease;
`;

/* =========================
   CATEGORY CHIPS
========================= */

export const CategoryList = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  gap: 0.5rem;

  margin-bottom: 1.5rem;
`;

export const CategoryChip = styled.button`
  flex-shrink: 0;

  padding: 0.5rem 0.85rem;

  border: 1px solid
    ${({ $selected }) =>
      $selected
        ? "var(--mint)"
        : "rgba(143, 173, 234, 0.12)"};

  border-radius: 999px;

  background: ${({ $selected }) =>
    $selected
      ? "rgba(93, 217, 186, 0.06)"
      : "rgba(143, 173, 234, 0.1)"};

  color: ${({ $selected }) =>
    $selected
      ? "var(--mint)"
      : "var(--gray)"};

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.75rem;

  font-weight: ${({ $selected }) =>
    $selected ? 600 : 400};

  white-space: nowrap;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  &:active {
    transform: scale(0.96);
  }

  -webkit-tap-highlight-color: transparent;
`;

/* =========================
   MISSION CARD
========================= */

export const MissionCard = styled.section`
  width: 100%;

  padding: 1.5rem;

  border: 1px solid rgba(143, 173, 234, 0.2);
  border-radius: 1.5rem;

  background: rgba(143, 173, 234, 0.035);
`;

export const MissionTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1rem;

  margin-bottom: 1.25rem;
`;

export const MissionCategoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.4rem 0.8rem;

  border: 1px solid rgba(93, 217, 186, 0.45);
  border-radius: 999px;

  background: rgba(93, 217, 186, 0.1);

  color: var(--mint);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.75rem;
  font-weight: 700;
`;

export const MissionTime = styled.span`
  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.8rem;
  font-weight: 400;
`;

export const MissionTitle = styled.h2`
  margin: 0;

  color: var(--white);

  font-family: "Paperlogy", sans-serif;
  font-size: 1.375rem;
  font-weight: 800;
  line-height: 1.4;
`;

export const MissionDescription = styled.p`
  margin-top: 0.8rem;

  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.7;
`;

export const AiBadge = styled.div`
  width: fit-content;

  margin-top: 1.25rem;

  display: inline-flex;
  align-items: center;

  padding: 0.4rem 0.75rem;

  border: 1px solid rgba(225, 104, 195, 0.45);
  border-radius: 999px;

  background: rgba(225, 104, 195, 0.08);

  color: #e168c3;

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.75rem;
  font-weight: 700;
`;

/* =========================
   COMPLETE BUTTON
========================= */

export const CompleteButton = styled.button`
  width: 100%;
  height: 3.5rem;

  margin-top: 1.5rem;

  border: none;
  border-radius: 999px;

  background: var(--mint);

  color: var(--dark-navy);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 1.15rem;
  font-weight: 800;

  cursor: pointer;

  box-shadow:
    0 0.5rem 1.5rem
    rgba(93, 217, 186, 0.2);

  transition:
    transform 0.15s ease,
    opacity 0.15s ease;

  &:active {
    transform: scale(0.98);
  }
`;

/* =========================
   MISSION ADJUST
========================= */

export const MissionAdjustLabel = styled.p`
  margin: 1.5rem 0 0.75rem;

  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.8rem;
  font-weight: 400;
`;

export const ActionList = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.75rem;
`;

export const ActionButton = styled.button`
  width: 100%;

  padding: 1rem 1.25rem;

  display: flex;
  align-items: center;

  border: 1px solid rgba(143, 173, 234, 0.1);
  border-radius: 999px;

  background: rgba(143, 173, 234, 0.12);

  color: var(--gray);

  text-align: left;

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.875rem;
  font-weight: 400;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  &:active {
    transform: scale(0.98);
    background: rgba(143, 173, 234, 0.18);
  }

  -webkit-tap-highlight-color: transparent;
`;

/* =========================
   OTHER MISSION MODE
========================= */

export const MissionSelectionArea = styled.section`
  width: 100%;
`;

export const PPMessageRow = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  gap: 1rem;

  margin-bottom: 1.5rem;
`;

export const MiniRobot = styled.img`
  width: 4.5rem;
  height: 4.5rem;

  flex-shrink: 0;

  object-fit: contain;

  display: block;
`;

export const PPBubble = styled.div`
  position: relative;

  flex: 1;

  padding: 0.9rem 1rem;

  border: 1px solid rgba(143, 173, 234, 0.35);
  border-radius: 1rem;

  background: rgba(143, 173, 234, 0.12);

  color: var(--white);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.6;
`;

export const MissionList = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 1rem;
`;

export const AlternativeMissionCard = styled.section`
  width: 100%;

  padding: 1.5rem;

  border: 1px solid rgba(143, 173, 234, 0.2);
  border-radius: 1.5rem;

  background: rgba(143, 173, 234, 0.035);
`;

export const SelectMissionButton = styled.button`
  width: 100%;
  height: 3.5rem;

  margin-top: 1.5rem;

  border: none;
  border-radius: 999px;

  background: var(--light-blue);

  color: var(--dark-navy);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 1rem;
  font-weight: 800;

  cursor: pointer;

  box-shadow:
    0 0.5rem 1.5rem
    rgba(143, 173, 234, 0.18);

  transition:
    transform 0.15s ease,
    opacity 0.15s ease;

  &:active {
    transform: scale(0.98);
  }

  -webkit-tap-highlight-color: transparent;
`;