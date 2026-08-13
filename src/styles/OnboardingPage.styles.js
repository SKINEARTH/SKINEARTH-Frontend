import styled from "styled-components";

export const Container = styled.main`
  position: relative;

  width: 100%;
  min-height: 100dvh;

  background: var(--dark-navy);

  overflow: hidden;
`;

export const HeaderLogoGroup = styled.div`
  position: absolute;

  top: 6.5rem;
  left: 50%;

  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 2;
`;

export const LogoArea = styled.div`
  position: relative;

  width: 5.5rem;
  height: 5.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;

  display: block;
`;

export const Orbit = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;

  width: 3.9rem;
  height: 3.9rem;

  transform: translate(-50%, -50%);
`;

export const OrangeCircle = styled.img`
  position: absolute;

  top: 0;
  left: 50%;

  width: 0.75rem;
  height: 0.75rem;

  transform: translate(-50%, -50%);

  display: block;
`;

export const BrandName = styled.h1`
  margin-top: 1.1rem;

  color: var(--white);

  font-family: "EstablishRetrosans", sans-serif;
  font-size: 1.35rem;

  font-style: normal;
  font-weight: 400;

  line-height: 1;

  letter-spacing: 0.09rem;

  white-space: nowrap;
`;

export const Slider = styled.div`
  display: flex;

  width: 100%;
  height: 100dvh;

  overflow-x: auto;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Slide = styled.section`
  position: relative;

  min-width: 100%;
  height: 100%;

  flex-shrink: 0;

  scroll-snap-align: start;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Visual = styled.img`
  position: absolute;

  top: 34%;
  left: 50%;

  width: 8.75rem;
  height: auto;

  transform: translateX(-50%);

  display: block;
`;

export const MainTitle = styled.h2`
  position: absolute;
  bottom: 12.5rem;

  width: 100%;

  color: var(--white);
  text-align: center;

  font-family: "Paperlogy", sans-serif;
  font-size: 2rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.04rem;
`;

export const Highlight = styled.span`
  color: var(--light-blue);
`;

export const Description = styled.p`
  position: absolute;
  bottom: 8.5rem;

  width: 100%;

  color: var(--gray);
  text-align: center;

  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.4875rem;
`;

export const Indicator = styled.div`
  position: absolute;

  bottom: 4.5rem;
  left: 50%;

  transform: translateX(-50%);

  display: flex;
  align-items: center;
  gap: 0.55rem;

  z-index: 2;
`;

export const ActiveDot = styled.div`
  width: 3rem;
  height: 0.7rem;

  border-radius: 999px;
  background: var(--light-blue);

  transition: 0.3s ease;
`;

export const Dot = styled.div`
  width: 0.7rem;
  height: 0.7rem;

  border-radius: 50%;
  background: var(--dark-gray);

  transition: 0.3s ease;
`;