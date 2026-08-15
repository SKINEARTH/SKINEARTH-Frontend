import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(1rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Page = styled.main`
  position: relative;

  width: 100%;
  min-height: 100dvh;

  background: var(--dark-navy);
  color: var(--white);

  padding-bottom: 7rem;
`;

export const Content = styled.div`
  width: 100%;

  padding: 4rem 1.75rem 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoGlow = styled.div`
  width: 8.5rem;
  height: 8.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(93, 217, 186, 0.18) 0%,
    rgba(93, 217, 186, 0.08) 48%,
    rgba(93, 217, 186, 0) 72%
  );

  animation: ${scaleIn} 0.6s
    cubic-bezier(0.22, 1, 0.36, 1)
    forwards;
`;

export const CompleteLogo = styled.img`
  width: 5.5rem;
  height: 5.5rem;

  object-fit: contain;
  display: block;
`;

export const Title = styled.h1`
  margin-top: 2rem;

  color: var(--white);

  font-family: "Paperlogy", sans-serif;

  font-size: 2rem;
  font-style: normal;
  font-weight: 800;

  line-height: 1.3;

  text-align: center;

  opacity: 0;

  animation: ${fadeUp}
    0.6s ease
    0.15s forwards;
`;

export const Description = styled.p`
  margin-top: 0.75rem;

  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 1rem;
  font-style: normal;
  font-weight: 400;

  line-height: 1.6;

  text-align: center;

  opacity: 0;

  animation: ${fadeUp}
    0.6s ease
    0.25s forwards;
`;

export const StreakCard = styled.section`
  width: 100%;

  margin-top: 2rem;

  padding: 1.5rem;

  border: 1px solid
    rgba(143, 173, 234, 0.2);

  border-radius: 1.5rem;

  background:
    rgba(143, 173, 234, 0.05);

  opacity: 0;

  animation: ${fadeUp}
    0.7s ease
    0.35s forwards;
`;

export const StreakTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;
`;

export const FireIcon = styled.div`
  font-size: 2.5rem;

  line-height: 1;

  filter: drop-shadow(
    0 0 0.6rem
    rgba(255, 220, 76, 0.45)
  );
`;

export const StreakInfo = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
`;

export const StreakCount = styled.strong`
  color: #ffed67;

  font-family: "Paperlogy", sans-serif;

  font-size: 2rem;
  font-weight: 800;

  line-height: 1.1;
`;

export const StreakText = styled.span`
  margin-top: 0.2rem;

  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.95rem;
  font-weight: 400;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;

  margin: 1.5rem 0;

  background:
    rgba(169, 180, 198, 0.2);
`;

export const ProgressHeader = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
`;

export const ProgressLabel = styled.span`
  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.9rem;
  font-weight: 400;
`;

export const ProgressCount = styled.strong`
  color: var(--light-blue);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 1rem;
  font-weight: 700;
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 0.45rem;

  margin-top: 0.8rem;

  border-radius: 999px;

  background:
    rgba(143, 173, 234, 0.15);

  overflow: hidden;
`;

export const ProgressBar = styled.div`
  width: 40%;
  height: 100%;

  border-radius: inherit;

  background: linear-gradient(
    90deg,
    var(--mint),
    var(--light-blue)
  );
`;

export const ProgressDescription = styled.p`
  margin-top: 0.65rem;

  color: var(--dark-gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.8rem;
  font-weight: 400;
`;

export const ButtonGroup = styled.div`
  width: 100%;

  margin-top: 1.75rem;

  display: flex;
  flex-direction: column;

  gap: 0.75rem;

  opacity: 0;

  animation: ${fadeUp}
    0.7s ease
    0.5s forwards;
`;

export const PredictionButton = styled.button`
  width: 100%;
  height: 3.75rem;

  border: none;
  border-radius: 999px;

  background: #416bc7;

  color: var(--white);

  font-family: "Pretendard Variable", "Pretendard", sans-serif;

  font-size: 1.1rem;
  font-weight: 700;

  cursor: pointer;

  box-shadow:
    0 0.5rem 1.5rem
    rgba(65, 107, 199, 0.25);

  transition:
    transform 0.15s ease,
    opacity 0.15s ease;

  &:active {
    transform: scale(0.98);
  }
`;

export const HomeButton = styled.button`
  width: 100%;
  height: 3.75rem;

  border: 1px solid
    rgba(143, 173, 234, 0.12);

  border-radius: 999px;

  background:
    rgba(143, 173, 234, 0.12);

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
      rgba(143, 173, 234, 0.18);
  }
`;