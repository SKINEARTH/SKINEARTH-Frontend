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

  padding: 65px 20px 112px;
`;

export const PageTitle = styled.h1`
  height: 33px;

  color: var(--white);

  font-family: "Paperlogy", sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 33px;
`;

export const PeriodToggle = styled.div`
  width: 100%;
  height: 40px;

  margin-top: 16px;
  padding: 3px;

  display: flex;

  border-radius: 999px;
  background: #1a2748;
`;

export const PeriodButton = styled.button`
  min-width: 0;
  height: 34px;

  flex: 1;

  border: 0;
  border-radius: 999px;

  background: ${({ $active }) => ($active ? "#121d38" : "transparent")};
  color: ${({ $active }) => ($active ? "#edf1f8" : "#6c7a8e")};
  box-shadow: ${({ $active }) =>
    $active ? "0 0 5px rgba(55, 92, 178, 0.2)" : "none"};

  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  line-height: 21px;

  cursor: pointer;
`;

export const TrendCard = styled.section`
  width: 100%;
  height: 231px;

  margin-top: 16px;
  padding: 17px 9px 9px;

  border: 1px solid #26314a;
  border-radius: 20px;

  background: #121d38;
  box-shadow: 0 0 10px rgba(55, 92, 178, 0.12);
`;

export const TrendHeader = styled.header`
  height: 37px;

  padding: 0 8px;
`;

export const TrendTitle = styled.h2`
  color: #8fadea;

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
`;

export const TrendDescription = styled.p`
  padding-top: 2px;

  color: #6c7a8e;

  font-family: "Pretendard", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 16.5px;
`;

export const Chart = styled.svg`
  width: 100%;
  height: 168px;

  display: block;

  font-family: "Inter", "Pretendard", sans-serif;
`;

export const EmptyChart = styled.div`
  height: 168px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #6c7a8e;

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
`;

export const CauseCard = styled.section`
  width: 100%;
  height: 201px;

  margin-top: 16px;
  padding: 19px;

  border: 1px solid #26314a;
  border-radius: 20px;

  background: #121d38;
  box-shadow: 0 0 10px rgba(55, 92, 178, 0.12);
`;

export const CauseCardTitle = styled.h2`
  color: #8fadea;

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.72px;
`;

export const CauseTimeline = styled.ol`
  padding-top: 14px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  list-style: none;
`;

export const CauseItem = styled.li`
  min-height: 37px;

  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TimelineMarker = styled.span`
  width: 8px;
  height: 37px;

  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  &::after {
    width: 1px;
    height: 20px;

    display: ${({ $last }) => ($last ? "none" : "block")};

    background: #1a2440;
    content: "";
  }
`;

export const TimelineDot = styled.span`
  width: 8px;
  height: 8px;

  flex-shrink: 0;

  border-radius: 4px;
  background: ${({ $riskTheme }) => $riskTheme.color};
  box-shadow:
    0 0 24px rgba(${({ $riskTheme }) => $riskTheme.rgb}, 0.6),
    0 0 8px rgba(${({ $riskTheme }) => $riskTheme.rgb}, 0.3);
`;

export const CauseInfo = styled.div`
  min-width: 0;
  flex: 1;
`;

export const CausePeriod = styled.span`
  display: block;

  color: #6c7a8e;

  font-family: "Pretendard", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 16.5px;
`;

export const CauseName = styled.strong`
  display: block;

  color: #edf1f8;

  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  font-weight: 600;
  line-height: 19.5px;
`;

export const CauseRiskBadge = styled.span`
  padding: 5px 11px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  gap: 5px;

  border: 1px solid rgba(${({ $riskTheme }) => $riskTheme.rgb}, 0.5);
  border-radius: 999px;

  background: rgba(${({ $riskTheme }) => $riskTheme.rgb}, 0.15);
  color: ${({ $riskTheme }) => $riskTheme.color};
  box-shadow: 0 0 10px rgba(${({ $riskTheme }) => $riskTheme.rgb}, 0.25);

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
`;

export const CauseRiskDot = styled.span`
  width: 6px;
  height: 6px;

  border-radius: 3px;
  background: ${({ $riskTheme }) => $riskTheme.color};
`;

export const EmptyCauseTimeline = styled.p`
  height: 145px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #6c7a8e;

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
`;

export const MissionRateCard = styled.section`
  width: 100%;
  height: 136px;

  margin-top: 16px;
  padding: 19px;

  border: 1px solid #26314a;
  border-radius: 20px;

  background: #121d38;
  box-shadow: 0 0 10px rgba(55, 92, 178, 0.12);
`;

export const MissionRateTitle = styled.h2`
  color: #8fadea;

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.72px;
`;

export const MissionRateBody = styled.div`
  height: 80px;

  padding-top: 14px;

  display: flex;
  align-items: center;
  gap: 16px;
`;

export const MissionRateCircle = styled.div`
  width: 60px;
  height: 60px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  border-radius: 50%;
  background: conic-gradient(
    ${({ $color }) => $color} ${({ $percentage }) => $percentage * 3.6}deg,
    #26314a 0
  );

  &::before {
    width: 48px;
    height: 48px;

    grid-area: 1 / 1;

    border-radius: 50%;
    background: #121d38;
    content: "";
  }
`;

export const MissionRateValue = styled.strong`
  grid-area: 1 / 1;
  z-index: 1;

  color: ${({ $color }) => $color};

  font-family: "Paperlogy", sans-serif;
  font-size: 12px;
  font-weight: 900;
  line-height: 24px;
`;

export const MissionRateInfo = styled.div`
  min-width: 0;
`;

export const MissionRateCount = styled.strong`
  display: block;

  color: #edf1f8;

  font-family: "Noto Sans KR", "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
`;

export const MissionRateLabel = styled.span`
  display: block;

  color: #a9b4c6;

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;

export const MissionRateMessage = styled.span`
  padding-top: 4px;

  display: block;

  color: ${({ $color }) => $color};

  font-family: "Pretendard", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 16.5px;
  white-space: nowrap;
`;
