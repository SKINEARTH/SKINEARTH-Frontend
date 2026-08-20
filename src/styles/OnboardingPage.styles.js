import styled from "styled-components";


/* =========================
   CONTAINER
========================= */

export const Container = styled.main`
  position: relative;

  width: 100%;
  min-height: 100dvh;

  background:
    var(--dark-navy);

  overflow: hidden;
`;


/* =========================
   HEADER LOGO
========================= */

export const HeaderLogoGroup =
  styled.div`
    position: absolute;

    top: 2rem;
    left: 50%;

    transform:
      translateX(-50%);

    display: flex;
    flex-direction: column;
    align-items: center;

    z-index: 2;
  `;


export const LogoArea =
  styled.div`
    position: relative;

    width: 5.5rem;
    height: 5.5rem;

    display: flex;
    justify-content: center;
    align-items: center;
  `;


export const Logo =
  styled.img`
    width: 100%;
    height: 100%;

    display: block;
  `;


export const Orbit =
  styled.div`
    position: absolute;

    top: 50%;
    left: 50%;

    width: 3.9rem;
    height: 3.9rem;

    transform:
      translate(
        -50%,
        -50%
      );
  `;


export const OrangeCircle =
  styled.img`
    position: absolute;

    top: 0;
    left: 50%;

    width: 0.75rem;
    height: 0.75rem;

    transform:
      translate(
        -50%,
        -50%
      );

    display: block;
  `;


export const BrandName =
  styled.h1`
    margin-top: 1.1rem;

    color: var(--white);

    font-family:
      "EstablishRetrosans",
      sans-serif;

    font-size: 1.35rem;
    font-style: normal;
    font-weight: 400;

    line-height: 1;

    letter-spacing:
      0.09rem;

    white-space: nowrap;
  `;


/* =========================
   SLIDER
========================= */

export const Slider =
  styled.div`
    display: flex;

    width: 100%;
    height: 100dvh;

    overflow-x: auto;

    scroll-snap-type:
      x mandatory;

    scroll-behavior:
      smooth;

    scrollbar-width:
      none;

    &::-webkit-scrollbar {
      display: none;
    }
  `;


/* =========================
   SLIDE
========================= */

export const Slide =
  styled.section`
    position: relative;

    min-width: 100%;
    height: 100%;

    flex-shrink: 0;

    scroll-snap-align:
      start;

    display: flex;
    flex-direction: column;
    align-items: center;
  `;


/* =========================
   VISUAL
========================= */

export const Visual =
  styled.img`
    position: absolute;

    top: 24%;
    left: 50%;

    width: 12rem;
    height: auto;

    display: block;

    opacity:
      ${({ $active }) =>
        $active ? 1 : 0};

    transform:
      ${({ $active }) =>
        $active
          ? "translate(-50%, 0)"
          : "translate(-50%, 1.25rem)"};

    transition:
      opacity
        0.8s ease
        0.15s,
      transform
        0.8s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        )
        0.15s;
  `;


/* =========================
   TITLE
========================= */

export const MainTitle =
  styled.h2`
    position: absolute;

    bottom: 16rem;

    width: 100%;

    color:
      var(--white);

    text-align: center;

    font-family:
      "Paperlogy",
      sans-serif;

    font-size: 1.625rem;

    font-style: normal;

    font-weight: 800;

    line-height: 1.35;

    letter-spacing:
      -0.04rem;

    opacity:
      ${({ $active }) =>
        $active ? 1 : 0};

    transform:
      ${({ $active }) =>
        $active
          ? "translateY(0)"
          : "translateY(1rem)"};

    transition:
      opacity
        0.8s ease
        0.3s,
      transform
        0.8s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        )
        0.3s;
  `;


export const Highlight =
  styled.span`
    color:
      var(--light-blue);
  `;


/* =========================
   DESCRIPTION
========================= */

export const Description =
  styled.p`
    position: absolute;

    bottom: 12rem;

    width: 100%;

    color: var(--gray);

    text-align: center;

    font-family:
      "Pretendard Variable",
      "Pretendard",
      sans-serif;

    font-size: 0.875rem;

    font-style: normal;

    font-weight: 400;

    line-height:
      1.4875rem;

    opacity:
      ${({ $active }) =>
        $active ? 1 : 0};

    transform:
      ${({ $active }) =>
        $active
          ? "translateY(0)"
          : "translateY(0.75rem)"};

    transition:
      opacity
        0.8s ease
        0.45s,
      transform
        0.8s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        )
        0.45s;
  `;


/* =========================
   INDICATOR
========================= */

export const Indicator =
  styled.div`
    position: absolute;

    bottom:
      ${({ $last }) =>
        $last
          ? "10rem"
          : "4.5rem"};

    left: 50%;

    transform:
      translateX(-50%);

    display: flex;
    align-items: center;

    gap: 0.55rem;

    z-index: 3;

    transition:
      bottom
      0.35s ease;
  `;


export const ActiveDot =
  styled.div`
    width: 3rem;
    height: 0.7rem;

    border-radius:
      999px;

    background:
      var(--light-blue);

    transition:
      0.3s ease;
  `;


export const Dot =
  styled.div`
    width: 0.7rem;
    height: 0.7rem;

    border-radius: 50%;

    background:
      var(--dark-gray);

    transition:
      0.3s ease;
  `;


/* =========================
   START AREA
========================= */

export const StartArea =
  styled.div`
    position: absolute;

    left: 50%;
    bottom: 3rem;

    z-index: 5;

    width:
      calc(
        100% - 2.5rem
      );

    max-width: 30rem;

    transform:
      translateX(-50%);

    display: flex;
    flex-direction: column;
    align-items: center;

    animation:
      startFadeIn
      0.6s
      cubic-bezier(
        0.22,
        1,
        0.36,
        1
      )
      forwards;

    @keyframes startFadeIn {
      from {
        opacity: 0;
        transform:
          translate(
            -50%,
            1rem
          );
      }

      to {
        opacity: 1;
        transform:
          translate(
            -50%,
            0
          );
      }
    }
  `;


/* =========================
   START BUTTON
========================= */

export const StartButton =
  styled.button`
    width: 100%;
    height: 3rem;

    border: none;

    border-radius:
      999px;

    background:
      #416bc7;

    color:
      var(--white);

    font-family:
      "Pretendard Variable",
      "Pretendard",
      sans-serif;

    font-size: 1.15rem;

    font-weight: 800;

    cursor: pointer;

    box-shadow:
      0
      0.5rem
      1.5rem
      rgba(
        65,
        107,
        199,
        0.22
      );

    transition:
      transform
        0.15s ease,
      opacity
        0.15s ease;

    &:active {
      transform:
        scale(0.98);
    }

    -webkit-tap-highlight-color:
      transparent;
  `;


/* =========================
   SIGNUP
========================= */

export const SignupText =
  styled.p`
    margin-top: 1.25rem;

    color:
      var(--dark-gray);

    font-family:
      "Pretendard Variable",
      "Pretendard",
      sans-serif;

    font-size: 0.8rem;

    font-weight: 400;

    text-align: center;
  `;


export const SignupButton =
  styled.button`
    padding: 0;

    border: none;

    background:
      transparent;

    color:
      var(--light-blue);

    font-family:
      "Pretendard Variable",
      "Pretendard",
      sans-serif;

    font-size: 0.8rem;

    font-weight: 500;

    text-decoration:
      underline;

    text-underline-offset:
      0.15rem;

    cursor: pointer;

    -webkit-tap-highlight-color:
      transparent;
  `;