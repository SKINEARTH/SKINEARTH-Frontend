import styled, { keyframes } from "styled-components";

export const orbit = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

export const Container = styled.main`
  position: relative;

  width: 100%;
  min-height: 100dvh;

  background: linear-gradient(
    171deg,
    var(--dark-navy) 1.51%,
    var(--navy) 97.76%
  );

  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;

    background: var(--dark-navy);

    opacity: ${({ $finished }) => ($finished ? 1 : 0)};

    transition: opacity 1.2s ease;

    pointer-events: none;
    z-index: 0;
  }
`;

export const LogoGroup = styled.div`
  position: absolute;
  z-index: 1;

  top: ${({ $finished }) =>
    $finished ? "2rem" : "50%"};

  left: 50%;

  transform: ${({ $finished }) =>
    $finished
      ? "translate(-50%, 0)"
      : "translate(-50%, -50%)"};

  display: flex;
  flex-direction: column;
  align-items: center;

  transition:
    top 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
`;

export const LogoArea = styled.div`
  position: relative;

  width: ${({ $finished }) =>
    $finished ? "5.5rem" : "7.75rem"};

  height: ${({ $finished }) =>
    $finished ? "5.5rem" : "7.75rem"};

  display: flex;
  justify-content: center;
  align-items: center;

  transition:
    width 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.9s cubic-bezier(0.22, 1, 0.36, 1);
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

  width: ${({ $finished }) =>
    $finished ? "3.9rem" : "5.5rem"};

  height: ${({ $finished }) =>
    $finished ? "3.9rem" : "5.5rem"};

  animation: ${orbit} 2.2s
    cubic-bezier(0.45, 0, 0.55, 1) forwards;

  transition:
    width 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.9s cubic-bezier(0.22, 1, 0.36, 1);
`;

export const OrangeCircle = styled.img`
  position: absolute;

  top: 0;
  left: 50%;

  width: ${({ $finished }) =>
    $finished ? "0.75rem" : "1.25rem"};

  height: ${({ $finished }) =>
    $finished ? "0.75rem" : "1.25rem"};

  transform: translate(-50%, -50%);
  display: block;

  transition:
    width 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.9s cubic-bezier(0.22, 1, 0.36, 1);
`;

export const BrandName = styled.h1`
  margin-top: ${({ $finished }) =>
    $finished ? "1.1rem" : "2rem"};

  color: var(--white);

  font-family: "EstablishRetrosans", sans-serif;

  font-size: ${({ $finished }) =>
    $finished ? "1.35rem" : "2rem"};

  font-style: normal;
  font-weight: 400;

  line-height: 1;

  letter-spacing: ${({ $finished }) =>
    $finished ? "0.09rem" : "0.15rem"};

  white-space: nowrap;

  transition:
    font-size 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    margin-top 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    letter-spacing 0.9s cubic-bezier(0.22, 1, 0.36, 1);
`;