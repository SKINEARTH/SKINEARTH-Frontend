import styled from "styled-components";

export const SurveyContainer = styled.main`
  width: 100%;
  min-height: 100dvh;

  display: flex;
  justify-content: center;

  background: var(--dark-navy);
  color: var(--white);
`;

export const SurveyContent = styled.div`
  position: relative;

  width: 100%;
  max-width: 390px;
  min-height: 100dvh;

  padding: 72px 24px 40px;

  overflow: hidden;

  @media (max-width: 374px) {
    padding-right: 20px;
    padding-left: 20px;
  }
`;

export const ProgressHeader = styled.div`
  width: 100%;
  height: 30px;
`;

export const ProgressLabel = styled.p`
  color: #6c7a8e;

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  line-height: 18px;
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 4px;

  margin-top: 8px;

  border-radius: 999px;
  background: #26314a;

  overflow: hidden;
`;

export const ProgressFill = styled.div`
  width: ${({ $progress }) => $progress};
  height: 100%;

  border-radius: inherit;
  background: linear-gradient(90deg, #6bd2b0 0%, #8fadea 100%);

  box-shadow: 0 0 8px rgba(143, 173, 234, 0.45);

  transition: width 240ms ease;
`;

export const SurveyHeader = styled.header`
  margin-top: 24px;
`;

export const SurveyTitle = styled.h1`
  color: var(--white);

  font-family: "Paperlogy", sans-serif;
  font-size: 22px;
  font-weight: 800;
  line-height: 33px;
`;

export const SurveyDescription = styled.p`
  margin-top: 4px;

  color: var(--gray);

  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  line-height: 20px;
`;

export const SurveyForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;

  margin-top: 24px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldLabel = styled.label`
  color: var(--gray);

  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  line-height: 20px;
`;

export const NicknameInput = styled.input`
  width: 100%;
  height: 44px;

  padding: 0 17px;

  border: 1.5px solid #26314a;
  border-radius: 14px;
  outline: none;

  background: #1a2748;
  color: var(--white);

  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  line-height: 21px;

  transition:
    border-color 120ms ease,
    box-shadow 120ms ease;

  &::placeholder {
    color: var(--gray);
    opacity: 1;
  }

  &:focus {
    border-color: var(--light-blue);
    box-shadow: 0 0 10px rgba(143, 173, 234, 0.2);
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SectionTitle = styled.h2`
  color: var(--gray);

  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
`;

export const StatusOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

export const StatusButton = styled.button`
  height: 44px;

  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#8fadea" : "#26314a")};
  border-radius: 14px;

  background: ${({ $selected }) =>
    $selected ? "rgba(143, 173, 234, 0.15)" : "#1a2748"};
  color: ${({ $selected }) =>
    $selected ? "#8fadea" : "var(--gray)"};

  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
  line-height: 21px;

  box-shadow: ${({ $selected }) =>
    $selected ? "0 0 10px rgba(143, 173, 234, 0.2)" : "none"};

  cursor: pointer;
`;

export const ConcernOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ConcernButton = styled.button`
  height: 40.5px;

  padding: 0 17px;

  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#6bd2b0" : "#26314a")};
  border-radius: 999px;

  background: ${({ $selected }) =>
    $selected ? "rgba(107, 210, 176, 0.15)" : "#1a2748"};
  color: ${({ $selected }) =>
    $selected ? "#6bd2b0" : "var(--gray)"};

  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
  line-height: 19.5px;

  box-shadow: ${({ $selected }) =>
    $selected ? "0 0 10px rgba(107, 210, 176, 0.2)" : "none"};

  cursor: pointer;
`;

export const MoveButton = styled.button`
  position: absolute;
  right: 24px;
  bottom: 40px;
  left: 24px;

  height: 52px;

  border: 0;
  border-radius: 999px;

  background: ${({ disabled }) =>
    disabled ? "#aab9cf" : "#375cb2"};
  color: var(--white);

  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;

  box-shadow: 0 0 12px rgba(55, 92, 178, 0.4),
    0 0 4px rgba(55, 92, 178, 0.2);

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  transition:
    background-color 120ms ease,
    transform 120ms ease;

  &:not(:disabled):active {
    background: #8fadea;
    transform: scale(0.99);
  }

  @media (max-width: 374px) {
    right: 20px;
    left: 20px;
  }
`;
