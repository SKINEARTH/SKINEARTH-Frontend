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

  padding: 3rem 20px 112px;
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

  margin-top: 14px;
  margin-bottom: 14px;
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
  position: relative;

  width: 240px;
  height: 240px;

  margin-top: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
`;

export const GaugeSvg = styled.svg`
  position: absolute;

  width: 240px;
  height: 240px;

  inset: 0;

  overflow: visible;

  transform: rotate(132deg);
`;

export const GaugeTrack = styled.circle`
  fill: none;

  stroke: #192747;
  stroke-width: 13;

  stroke-linecap: round;

  /*
   * 전체 원의 약 76%만 보여서
   * 참고 이미지처럼 아래쪽에 틈 생성
   */
  stroke-dasharray: 76 24;

  opacity: 1;
`;

export const GaugeProgress = styled.circle`
  fill: none;

  stroke: url(#planetGaugeGradient);
  stroke-width: 14;

  stroke-linecap: round;

  /*
   * 전체 원 중 실제 디자인에서 사용하는
   * 약 76% 구간을 100점으로 계산
   */
  stroke-dasharray: ${({ $score }) => {
    const safeScore = Math.min(
      Math.max($score ?? 0, 0),
      100
    );

    const progress =
      (safeScore / 100) * 76;

    return `${progress} ${100 - progress}`;
  }};

  transition:
    stroke-dasharray
    0.7s
    cubic-bezier(
      0.22,
      1,
      0.36,
      1
    );
`;

export const GaugeCenter = styled.div`
  position: relative;

  z-index: 2;

  width: 168px;
  height: 168px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background:
    radial-gradient(
      circle at 50% 35%,
      #182747 0%,
      #152342 50%,
      #111d37 100%
    );

  box-shadow:
    inset 0 0 30px
      rgba(143, 173, 234, 0.045),
    0 10px 24px
      rgba(0, 0, 0, 0.2);
`;

export const GaugeScore = styled.strong`
  margin-top: -4px;

  color: #edf1f8;

  font-family:
    "Pretendard",
    sans-serif;

  font-size: 56px;
  font-weight: 800;

  line-height: 1;

  letter-spacing: -2px;
`;

export const GaugeLabel = styled.span`
  margin-top: 18px;

  color: #a9b4c6;

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 14px;
  font-weight: 400;

  line-height: 1.3;
`;

export const GaugeLevel = styled.strong`
  margin-top: 6px;

  color: ${({ $level }) => {
    if ($level === "안정") {
      return "#6bd2b0";
    }

    if ($level === "주의") {
      return "#ffe259";
    }

    if ($level === "위험") {
      return "#f2684b";
    }

    if ($level === "보통") {
      return "#8fadea";
    }

    return "#a9b4c6";
  }};

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 15px;
  font-weight: 800;

  line-height: 1.3;

  text-shadow:
    0 0 10px
    ${({ $level }) => {
      if ($level === "안정") {
        return "rgba(107, 210, 176, 0.28)";
      }

      if ($level === "주의") {
        return "rgba(255, 226, 89, 0.25)";
      }

      if ($level === "위험") {
        return "rgba(242, 104, 75, 0.25)";
      }

      return "transparent";
    }};
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

export const ForecastProgressCard = styled.section`
  width: 100%;
  height: 85px;

  margin-top: 14px;
  padding: 15px 19px;

  border: 1px solid #26314a;
  border-radius: 20px;

  background: #121d38;
  box-shadow: 0 0 10px rgba(55, 92, 178, 0.12);
`;

export const ForecastProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: var(--gray);

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  line-height: 18px;
`;

export const ForecastProgressCount = styled.strong`
  color: var(--light-blue);
  font-weight: 700;
`;

export const ForecastProgressTrack = styled.div`
  width: 100%;
  height: 6px;

  margin-top: 8px;

  border-radius: 999px;
  background: #26314a;

  overflow: hidden;
`;

export const ForecastProgressBar = styled.div`
  width: ${({ $percentage }) => `${$percentage}%`};
  height: 100%;

  border-radius: inherit;
  background: linear-gradient(90deg, #6bd2b0, #8fadea);
  box-shadow: 0 0 8px rgba(107, 210, 176, 0.4);

  transition: width 240ms ease;
`;

export const ForecastProgressHint = styled.p`
  margin-top: 6px;

  color: var(--dark-gray);

  font-family: "Pretendard", sans-serif;
  font-size: 11px;
  line-height: 16.5px;
`;

export const ForecastSummaryCard = styled.button`
  width: 100%;
  height: 133px;

  margin-top: 14px;
  padding: 19px;

  border: 1px solid #26314a;
  border-radius: 20px;

  background: #121d38;
  color: inherit;
  box-shadow: 0 0 10px rgba(55, 92, 178, 0.12);

  text-align: left;
  cursor: pointer;

  &:active {
    background: #162244;
  }
`;

export const ForecastSummaryHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ForecastSummaryTitle = styled.h3`
  color: var(--white);

  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
`;

export const ForecastTypeBadge = styled.span`
  padding: 5.5px 11.5px;

  border: 1.5px dashed var(--dark-gray);
  border-radius: 999px;

  color: var(--dark-gray);

  font-family: "Pretendard", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 16.5px;
`;

export const ForecastSummaryBody = styled.div`
  height: 67px;

  padding-top: 12px;

  display: flex;
  align-items: center;
  gap: 14px;
`;

export const ForecastScoreGroup = styled.div`
  width: 46px;

  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ForecastScore = styled.strong`
  color: #fbf079;

  font-family: "Paperlogy", sans-serif;
  font-size: 38px;
  font-weight: 800;
  line-height: 38px;
`;

export const ForecastScoreLabel = styled.span`
  padding-top: 2px;

  color: var(--dark-gray);

  font-family: "Pretendard", sans-serif;
  font-size: 10px;
  line-height: 15px;
  white-space: nowrap;
`;

export const ForecastDetails = styled.div`
  min-width: 0;
  flex: 1;
`;

export const RiskBadge = styled.span`
  width: fit-content;

  padding: 5px 11px;

  display: flex;
  align-items: center;
  gap: 5px;

  border: 1px solid ${({ $riskTheme }) => $riskTheme.border};
  border-radius: 999px;

  background: ${({ $riskTheme }) => $riskTheme.background};
  color: ${({ $riskTheme }) => $riskTheme.color};
  box-shadow: 0 0 10px ${({ $riskTheme }) => $riskTheme.shadow};

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
`;

export const RiskDot = styled.span`
  width: 6px;
  height: 6px;

  border-radius: 3px;
  background: ${({ $riskTheme }) => $riskTheme.color};
`;

export const ForecastCause = styled.p`
  padding-top: 8px;

  color: var(--gray);

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;

  strong {
    color: var(--white);
    font-weight: 600;
  }
`;

export const MissionCard = styled.button`
  width: 100%;
  height: 95px;

  margin-top: 14px;
  padding: 19px;

  display: flex;
  align-items: center;
  gap: 12px;

  border: 1px solid #26314a;
  border-radius: 20px;

  background: linear-gradient(165deg, #121d38 0%, #162244 100%);
  color: inherit;
  box-shadow: 0 0 10px rgba(55, 92, 178, 0.12);

  text-align: left;
  cursor: pointer;

  &:active {
    background: linear-gradient(165deg, #162244 0%, #1a294f 100%);
  }
`;

export const MissionIcon = styled.span`
  width: 44px;
  height: 44px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;
  background: rgba(107, 210, 176, 0.15);

  font-family: "Pretendard", sans-serif;
  font-size: 22px;
  line-height: 33px;
`;

export const MissionContent = styled.div`
  min-width: 0;
  flex: 1;
`;

export const MissionLabel = styled.span`
  display: block;

  color: #6bd2b0;

  font-family: "Pretendard", sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 16.5px;
`;

export const MissionTitle = styled.strong`
  padding-top: 2px;

  display: block;

  color: var(--white);

  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
`;

export const MissionDuration = styled.span`
  display: block;

  color: var(--gray);

  font-family: "Pretendard", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 16.5px;
`;

export const MissionArrow = styled.span`
  flex-shrink: 0;

  color: var(--light-blue);

  font-family: "Pretendard", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
`;

export const MilestoneOverlay = styled.div`
  position: fixed;
  z-index: 200;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(3, 8, 20, 0.76);
`;

export const MilestoneGroup = styled.div`
  width: 336px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MilestonePpImage = styled.img`
  width: 240px;
  height: 240px;

  display: block;
  object-fit: contain;
`;

export const MilestoneModal = styled.div`
  width: 336px;

  margin-top: 15px;
  padding: 20px 28px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  border: 1px solid #6bd2b0;
  border-radius: 16px;

  background: #14264a;
  box-shadow: 0 0 10px rgba(107, 210, 176, 0.5);
`;

export const MilestoneTitle = styled.h2`
  color: var(--white);

  font-family: "Paperlogy", sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  white-space: nowrap;
`;

export const MilestoneDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  color: var(--white);

  font-family: "Paperlogy", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  text-align: center;
`;

export const MilestoneButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const MilestoneButton = styled.button`
  height: 38px;

  border: 0;
  border-radius: 12px;

  color: #1a2748;

  font-family: "Paperlogy", sans-serif;
  font-size: 12px;
  font-weight: 700;

  cursor: pointer;

  &:active {
    transform: scale(0.98);
  }
`;

export const ForecastButton = styled(MilestoneButton)`
  padding: 0 16px;
  background: #8fadea;
`;

export const PpButton = styled(MilestoneButton)`
  width: 98px;
  background: #6bd2b0;
`;
