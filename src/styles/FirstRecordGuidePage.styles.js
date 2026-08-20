import styled from "styled-components";

export const Page = styled.main`
  width: 100%;
  min-height: 100dvh;

  display: flex;
  justify-content: center;

  background: #0a1428;
  color: var(--white);
`;

export const Content = styled.div`
  width: 100%;
  max-width: 390px;
  min-height: 100dvh;

  padding: 72px 32px 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  @media (max-height: 760px) {
    padding-top: 40px;
    padding-bottom: 32px;
    gap: 20px;
  }
`;

export const OrbitImage = styled.img`
  width: 250px;
  height: 250px;

  display: block;
  object-fit: contain;

  @media (max-height: 760px) {
    width: 210px;
    height: 210px;
  }
`;

export const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  color: var(--white);

  font-family: "Paperlogy", sans-serif;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.3;
  text-align: center;
`;

export const Nickname = styled.span`
  color: var(--light-blue);
`;

export const Description = styled.p`
  margin-top: 12px;

  color: var(--gray);

  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  text-align: center;
`;

export const ProgressCard = styled.section`
  width: 100%;

  padding: 21px;

  border: 1px solid #26314a;
  border-radius: 20px;

  background: #121d38;
  box-shadow: 0 0 10px rgba(55, 92, 178, 0.12);
`;

export const ProgressTitle = styled.p`
  color: var(--dark-gray);

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;

  margin-top: 12px;

  border-radius: 999px;
  background: #26314a;

  overflow: hidden;
`;

export const ProgressFill = styled.div`
  width: ${({ $progress }) => ($progress === 0 ? "14px" : `${$progress * 10}%`)};
  height: 100%;

  border-radius: inherit;
  background: linear-gradient(90deg, var(--mint), var(--light-blue));
  box-shadow: 0 0 8px rgba(107, 210, 176, 0.5);

  transition: width 240ms ease;
`;

export const ProgressInfo = styled.div`
  margin-top: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProgressCount = styled.span`
  color: var(--light-blue);

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  line-height: 18px;
`;

export const ProgressHint = styled.span`
  color: var(--dark-gray);

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  line-height: 18px;
`;

export const ButtonGroup = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RecordButton = styled.button`
  width: 100%;
  height: 52px;

  border: 0;
  border-radius: 999px;

  background: #6bd2b0;
  color: #0a2a20;
  box-shadow:
    0 0 12px rgba(107, 210, 176, 0.5),
    0 0 4px rgba(107, 210, 176, 0.25);

  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;

  cursor: pointer;

  transition:
    background-color 120ms ease,
    transform 120ms ease;

  &:active {
    background: #8fadea;
    transform: scale(0.99);
  }
`;

export const LaterButton = styled.button`
  width: 100%;

  padding: 12px;

  border: 0;
  background: transparent;
  color: var(--dark-gray);

  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  line-height: 21px;

  cursor: pointer;

  &:active {
    color: var(--gray);
  }
`;
