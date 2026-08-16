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

  padding: 64px 20px 112px;
`;

export const GreetingHeader = styled.header`
  height: 49px;

  display: flex;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 45px;
  height: 45px;

  display: block;
  object-fit: cover;

  filter: drop-shadow(0 0 10px rgba(107, 210, 176, 0.5));
`;

export const GreetingText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateText = styled.p`
  color: var(--dark-gray);

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;

export const Greeting = styled.h1`
  color: var(--white);

  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
`;

export const PlanetSection = styled.section`
  width: 100%;
  height: 246px;

  margin-top: 14px;
  padding: 8px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SectionTitle = styled.h2`
  width: 100%;

  color: var(--white);

  font-family: "Paperlogy", sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
`;

export const Gauge = styled.div`
  width: 220px;
  height: 220px;

  flex-shrink: 0;
`;

export const PlanetGaugeImage = styled.img`
  width: 220px;
  height: 220px;

  display: block;
  object-fit: contain;
`;

export const RecordStatusCard = styled.section`
  width: 100%;
  height: 79px;

  margin-top: 14px;
  padding: 19px;

  display: flex;
  align-items: center;
  gap: 12px;

  border: 1px solid #26314a;
  border-radius: 20px;

  background: #121d38;
  box-shadow: 0 0 10px rgba(55, 92, 178, 0.12);
`;

export const RecordStatusIcon = styled.div`
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: ${({ $recorded }) =>
    $recorded ? "rgba(107, 210, 176, 0.15)" : "rgba(251, 240, 121, 0.15)"};
  box-shadow: ${({ $recorded }) =>
    $recorded
      ? "0 0 12px rgba(107, 210, 176, 0.5)"
      : "0 0 12px rgba(251, 240, 121, 0.2)"};

  font-family: "Pretendard", sans-serif;
  font-size: 20px;
  line-height: 30px;
`;

export const RecordStatusIconImage = styled.img`
  width: 24px;
  height: 24px;

  display: block;
`;

export const RecordStatusContent = styled.div`
  min-width: 0;
  flex: 1;
`;

export const RecordStatusTitle = styled.h3`
  color: var(--white);

  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
  white-space: nowrap;
`;

export const RecordStatusDescription = styled.p`
  padding-top: 2px;

  color: var(--gray);

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  white-space: nowrap;
`;

export const RecordStatusButton = styled.button`
  flex-shrink: 0;

  padding: 8px 14px;

  border: 0;
  border-radius: 999px;

  background: #375cb2;
  color: var(--white);
  box-shadow:
    0 0 12px rgba(55, 92, 178, 0.35),
    0 0 4px rgba(55, 92, 178, 0.18);

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;

  cursor: pointer;

  &:active {
    background: var(--light-blue);
  }
`;
