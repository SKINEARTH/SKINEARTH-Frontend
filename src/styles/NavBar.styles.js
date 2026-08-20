import styled from "styled-components";

export const NavContainer = styled.nav`
  position: fixed;
  left: 50%;
  bottom: 0;

  transform: translateX(-50%);

  width: 100%;
  max-width: 430px;
  height: 5.5rem;

  display: grid;
  grid-template-columns: repeat(5, 1fr);

  background: var(--navy);

  z-index: 100;
`;

export const IconBox = styled.div`
  width: 2.5rem;
  height: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavItem = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: 0.35rem;

  min-width: 0;
`;

export const NavIcon = styled.img`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};

  object-fit: contain;
  display: block;
`;

export const NavLabel = styled.span`
  font-family:
    "Pretendard Variable",
    "Pretendard",
    sans-serif;

  font-size: 0.75rem;
  font-weight: ${({ $active }) =>
  $active ? 600 : 400};

  line-height: 1;

  color: ${({ $active }) =>
    $active
      ? "var(--light-blue)"
      : "var(--gray)"};

  white-space: nowrap;

  transition: color 0.2s ease;
`;