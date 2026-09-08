import styled, {
  keyframes,
} from "styled-components";

const toastAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -1rem) scale(0.97);
  }

  12% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }

  78% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -0.75rem) scale(0.98);
  }
`;

export const ToastContainer =
  styled.div`
    position: fixed;

    top: 1.5rem;
    left: 50%;

    z-index: 9999;

    width: calc(100% - 2.5rem);
    max-width: 22rem;

    padding: 1.25rem 1.4rem;

    border: 1px solid #375cb2;
    border-radius: 1rem;

    background: linear-gradient(
      135deg,
      #abc3f5 20.28%,
      #87a7e9 76.36%
    );

    box-shadow:
      0 0.75rem 2rem
      rgba(0, 0, 0, 0.22);

    text-align: center;

    pointer-events: none;

    animation:
      ${toastAnimation}
      2.8s
      cubic-bezier(
        0.22,
        1,
        0.36,
        1
      )
      forwards;
  `;

export const ToastTitle = styled.p`
  margin: 0;

  color: var(--dark-navy);

  font-family:
    "Paperlogy",
    sans-serif;

  font-size: 1rem;
  font-weight: 800;
  line-height: 1.4;
`;

export const ToastDescription =
  styled.p`
    margin: 0.45rem 0 0;

    color: var(--dark-navy);

    font-family:
      "Pretendard Variable",
      "Pretendard",
      sans-serif;

    font-size: 0.85rem;
    font-weight: 500;
    line-height: 1.5;
  `;