import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.85;
  }

  50% {
    transform: scale(1.06);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0.85;
  }
`;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(1rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Page = styled.main`
  position: relative;

  width: 100%;
  min-height: 100dvh;

  background: var(--dark-navy);

  color: var(--white);

  overflow: hidden;
`;

export const LoadingContent = styled.section`
  position: absolute;

  top: 47%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
`;

export const LogoGlow = styled.div`
  width: 8.5rem;
  height: 8.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(93, 217, 186, 0.18) 0%,
    rgba(93, 217, 186, 0.08) 48%,
    rgba(93, 217, 186, 0) 72%
  );

  animation: ${pulse} 1.8s ease-in-out infinite;
`;

export const LoadingLogo = styled.img`
  width: 5.5rem;
  height: 5.5rem;

  object-fit: contain;
  display: block;
`;

export const Title = styled.h1`
  margin-top: 2.75rem;

  color: var(--white);

  font-family: "Paperlogy", sans-serif;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.4;

  animation: ${fadeUp} 0.7s ease forwards;
`;

export const Description = styled.p`
  margin-top: 1rem;

  color: var(--gray);

  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.95rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8;

  opacity: 0;

  animation: ${fadeUp} 0.7s ease 0.2s forwards;
`;