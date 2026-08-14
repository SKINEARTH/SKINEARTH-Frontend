import styled from "styled-components";

export const NavContainer = styled.nav`
  position: fixed;

  left: 50%;
  bottom: 0;

  transform: translateX(-50%);

  width: 100%;
  max-width: 430px;

  display: grid;
  grid-template-columns: repeat(5, 1fr);

  background: var(--navy);

  padding-top: 0.75rem;

  padding-bottom: calc(
    0.75rem + env(safe-area-inset-bottom)
  );

  z-index: 100;
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: 0.35rem;

  min-width: 0;
`;

export const NavIcon = styled.img`
  width: 2rem;
  height: 2rem;

  object-fit: contain;

  display: block;
`;

export const NavLabel = styled.span`
  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.75rem;
  font-weight: 400;

  line-height: 1;

  color: ${({ $active }) =>
    $active
      ? "var(--light-blue)"
      : "var(--gray)"};

  white-space: nowrap;

  transition: color 0.2s ease;
`;