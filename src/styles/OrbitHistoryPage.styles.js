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
