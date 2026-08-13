import styled, { keyframes } from "styled-components";

export const orbit = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(540deg);
  }
`;

export const Container = styled.main`
  width: 100%;
  min-height: 100dvh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    171deg,
    var(--dark-navy) 1.51%,
    var(--navy) 97.76%
  );

  overflow: hidden;
`;

export const LogoGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoArea = styled.div`
  position: relative;
  width: 124px;
  height: 124px;

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

  width: 88px;
  height: 88px;

  animation: ${orbit} 2.2s cubic-bezier(0.45, 0, 0.55, 1) forwards;
`;

export const OrangeCircle = styled.img`
  position: absolute;
  top: 0;
  left: 50%;

  width: 20px;
  height: 20px;

  transform: translate(-50%, -50%);
  display: block;
`;

export const BrandName = styled.h1`
  margin-top: 32px;

  color: var(--white);
  font-family: "EstablishRetrosans", sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 2.4px;
`;