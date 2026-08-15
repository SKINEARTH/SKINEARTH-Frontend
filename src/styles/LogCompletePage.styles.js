import styled from "styled-components";

export const Page = styled.main`
  width: 100%;
  min-height: 100dvh;

  background: var(--dark-navy);
  color: var(--white);

  padding-bottom: 7rem;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 30rem;

  margin: 0 auto;

  padding: 3rem 1.5rem 2.5rem;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1.75rem;
`;

export const Title = styled.h1`
  color: var(--white);

  font-family: "Paperlogy", sans-serif;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.2;
`;

export const DataBadge = styled.div`
  padding: 0.55rem 1rem;

  border: 2px solid var(--light-blue);
  border-radius: 999px;

  color: var(--light-blue);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.9rem;
  font-weight: 500;
`;

export const ScoreCard = styled.section`
  width: 100%;

  padding: 2.75rem 1.5rem 2.5rem;

  border: 1px solid rgba(143, 173, 234, 0.18);
  border-radius: 1.75rem;

  background: linear-gradient(
    180deg,
    rgba(143, 173, 234, 0.06) 0%,
    rgba(143, 173, 234, 0.03) 100%
  );

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  box-shadow:
    inset 0 0 2rem rgba(143, 173, 234, 0.03),
    0 0 1.5rem rgba(0, 0, 0, 0.08);
`;

export const ScoreLabel = styled.p`
  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 1rem;
  font-weight: 400;
`;

export const Score = styled.div`
  margin-top: 0.85rem;

  color: #ffeb63;

  font-family: "Paperlogy", sans-serif;
  font-size: 4.5rem;
  font-weight: 900;
  line-height: 1;
`;

export const StatusBadge = styled.div`
  margin-top: 1rem;

  padding: 0.5rem 1.1rem;

  border: 1px solid rgba(255, 235, 99, 0.65);
  border-radius: 999px;

  background: rgba(255, 235, 99, 0.07);

  color: #ffeb63;

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.95rem;
  font-weight: 700;

  box-shadow:
    0 0 1rem rgba(255, 235, 99, 0.12);
`;

export const FactorsCard = styled.section`
  width: 100%;

  margin-top: 1.25rem;
  padding: 1.5rem;

  border: 1px solid rgba(143, 173, 234, 0.18);
  border-radius: 1.75rem;

  background: rgba(143, 173, 234, 0.035);
`;

export const SectionTitle = styled.h2`
  margin-bottom: 1.4rem;

  color: var(--light-blue);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 1rem;
  font-weight: 700;
`;

export const FactorRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FactorLeft = styled.div`
  display: flex;
  align-items: center;

  gap: 0.8rem;
`;

export const FactorEmoji = styled.span`
  width: 2rem;
  height: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  font-size: 1.5rem;
  line-height: 1;
`;

export const FactorName = styled.span`
  display: flex;
  align-items: center;

  height: 2rem;

  color: var(--white);

  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
`;

export const LevelBadge = styled.span`
  min-width: 3.25rem;

  padding: 0.45rem 0.75rem;

  border-radius: 999px;

  text-align: center;

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.85rem;
  font-weight: 700;

  color: ${({ $level }) =>
    $level === "high"
      ? "#ff6b4a"
      : "#f2e45e"};

  border: 1px solid
    ${({ $level }) =>
      $level === "high"
        ? "rgba(255, 107, 74, 0.6)"
        : "rgba(242, 228, 94, 0.6)"};

  background:
    ${({ $level }) =>
      $level === "high"
        ? "rgba(255, 107, 74, 0.08)"
        : "rgba(242, 228, 94, 0.08)"};
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;

  margin: 1.25rem 0;

  background: rgba(169, 180, 198, 0.12);
`;

export const AiCard = styled.section`
  width: 100%;

  margin-top: 1.25rem;
  padding: 1.5rem;

  border: 1px solid rgba(222, 108, 191, 0.45);
  border-radius: 1.75rem;

  background: rgba(222, 108, 191, 0.06);
`;

export const AiBadge = styled.div`
  display: inline-flex;
  align-items: center;

  padding: 0.4rem 0.85rem;

  margin-bottom: 1.25rem;

  border: 1px solid rgba(222, 108, 191, 0.65);
  border-radius: 999px;

  color: #e77ac7;

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.8rem;
  font-weight: 700;
`;

export const AiText = styled.p`
  color: #e77ac7;

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.95;
`;

export const MissionButton = styled.button`
  width: 100%;
  height: 4rem;

  margin-top: 1.5rem;

  border: none;
  border-radius: 999px;

  background: #416bc7;

  color: var(--white);

  font-family: "Paperlogy", sans-serif;
  font-size: 1.15rem;
  font-weight: 700;

  cursor: pointer;

  box-shadow:
    0 0.6rem 1.5rem rgba(65, 107, 199, 0.25);

  transition:
    transform 0.15s ease,
    opacity 0.15s ease;

  &:active {
    transform: scale(0.98);
  }
`;