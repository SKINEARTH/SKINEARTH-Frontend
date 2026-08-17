import styled from "styled-components";

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

  padding: 3rem 1.25rem 8.5rem;
`;

export const Header = styled.header`
  margin-bottom: 1.75rem;
`;

export const Title = styled.h1`
  color: var(--white);

  font-family: "Paperlogy", sans-serif;
  font-size: 1.375rem;
  font-style: normal;
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

  color: ${({ $blue, $mint }) => {
    if ($blue) {
      return "var(--light-blue)";
    }

    if ($mint) {
      return "var(--mint)";
    }

    return "var(--gray)";
  }};

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.95rem;
  font-weight: 700;
`;

export const FactorList = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1.5rem;
`;

export const FactorItem = styled.div`
  width: 100%;
`;

export const FactorLabel = styled.div`
  height: 2rem;

  display: flex;
  align-items: center;

  gap: 0.55rem;

  margin-bottom: 0.75rem;

  color: var(--white);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1;
`;

export const Emoji = styled.span`
  width: 1.5rem;
  height: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  font-size: 1.15rem;
  line-height: 1;
`;

export const ScoreButtons = styled.div`
  display: grid;

  grid-template-columns:
    repeat(5, minmax(0, 1fr));

  gap: 0.5rem;
`;

export const ScoreButton = styled.button`
  width: 100%;
  height: 3rem;

  padding: 0;

  border: 1px solid
    ${({ $selected }) =>
      $selected
        ? "var(--light-blue)"
        : "rgba(143, 173, 234, 0.12)"};

  border-radius: 0.75rem;

  background: ${({ $selected }) =>
    $selected
      ? "rgba(143, 173, 234, 0.20)"
      : "rgba(143, 173, 234, 0.08)"};

  color: ${({ $selected }) =>
    $selected
      ? "var(--light-blue)"
      : "var(--gray)"};

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.95rem;
  font-weight: ${({ $selected }) =>
    $selected ? 700 : 400};

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  -webkit-tap-highlight-color:
    transparent;
`;

export const SleepHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${FactorLabel} {
    margin-bottom: 0.75rem;
  }
`;

export const SleepValue = styled.span`
  margin-bottom: 0.75rem;

  color: var(--light-blue);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.875rem;
  font-weight: 700;
`;

export const Slider = styled.input`
  width: 100%;

  accent-color: var(--light-blue);

  cursor: pointer;
`;

export const SkinOptions = styled.div`
  display: grid;

  grid-template-columns:
    repeat(5, minmax(0, 1fr));

  gap: 0.5rem;
`;

export const SkinButton = styled.button`
  width: 100%;

  aspect-ratio: 1;

  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid
    ${({ $selected }) =>
      $selected
        ? "var(--light-blue)"
        : "rgba(143, 173, 234, 0.12)"};

  border-radius: 0.75rem;

  background: ${({ $selected }) =>
    $selected
      ? "rgba(143, 173, 234, 0.18)"
      : "rgba(143, 173, 234, 0.08)"};

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.15s ease;

  &:active {
    transform: scale(0.96);
  }

  -webkit-tap-highlight-color:
    transparent;
`;

export const SkinIcon = styled.img`
  width: 2.25rem;
  height: 2.25rem;

  object-fit: contain;

  display: block;
`;

export const SkinLabels = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 0.5rem;

  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.75rem;
  font-weight: 400;
`;

export const SymptomOptions = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 0.65rem;
`;

export const SymptomButton = styled.button`
  padding:
    0.65rem 1.1rem;

  border: 1px solid
    ${({ $selected }) =>
      $selected
        ? "var(--light-blue)"
        : "rgba(143, 173, 234, 0.12)"};

  border-radius: 999px;

  background: ${({ $selected }) =>
    $selected
      ? "rgba(143, 173, 234, 0.2)"
      : "rgba(143, 173, 234, 0.08)"};

  color: ${({ $selected }) =>
    $selected
      ? "var(--light-blue)"
      : "var(--gray)"};

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.85rem;
  font-weight: ${({ $selected }) =>
    $selected ? 600 : 400};

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  -webkit-tap-highlight-color:
    transparent;
`;

export const GuideCard = styled.section`
  width: 100%;

  margin: 1.5rem 0;
  padding: 1.5rem;

  border: 1px solid
    rgba(93, 217, 186, 0.4);

  border-radius: 1.5rem;

  background:
    rgba(93, 217, 186, 0.07);
`;

export const GuideBadge = styled.div`
  display: inline-flex;
  align-items: center;

  padding: 0.35rem 0.75rem;

  margin-bottom: 1.25rem;

  border: 1px solid
    rgba(93, 217, 186, 0.55);

  border-radius: 999px;

  color: var(--mint);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.75rem;
  font-weight: 600;
`;

export const GuideText = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.7rem;
`;

export const GuideParagraph = styled.p`
  color: var(--mint);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.78rem;
  font-weight: 400;
  line-height: 1.75;

  strong {
    font-weight: 700;
  }
`;

export const SaveButton = styled.button`
  width: 100%;
  height: 3.5rem;

  margin-top: 0.5rem;

  border: none;
  border-radius: 999px;

  background: #416bc7;

  color: var(--white);

  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 1.15rem;
  font-weight: 700;

  cursor: pointer;

  box-shadow:
    0 0.5rem 1.5rem
    rgba(65, 107, 199, 0.2);

  transition:
    transform 0.15s ease,
    opacity 0.15s ease;

  &:active {
    transform: scale(0.98);
  }
`;