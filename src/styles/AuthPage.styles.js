import styled from "styled-components";

export const AuthContainer = styled.main`
  width: 100%;
  min-height: 100dvh;

  display: flex;
  justify-content: center;

  background: linear-gradient(156.5deg, #0a1428 0.96%, #14264a 100%);

  color: var(--white);
`;

export const AuthContent = styled.div`
  width: 100%;
  max-width: 393px;
  min-height: 100dvh;

  padding: 76px 32px 36px;

  overflow-x: hidden;

  @media (max-width: 392px) {
    padding-right: 24px;
    padding-left: 24px;
  }
`;

export const BrandHeader = styled.header`
  height: 82px;

  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const BrandLogo = styled.img`
  width: 38px;
  height: 38px;

  display: block;

  filter: drop-shadow(0 0 12px rgba(55, 92, 178, 0.5));
`;

export const BrandName = styled.p`
  margin-top: 4px;

  color: var(--white);

  font-family: "EstablishRetrosans", sans-serif;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 2.4px;

  white-space: nowrap;
`;

export const TitleArea = styled.section`
  margin-bottom: 30px;
`;

export const AuthTitle = styled.h1`
  color: var(--white);

  font-family: "Paperlogy", sans-serif;
  font-size: 28px;
  font-weight: 800;
  line-height: 36.4px;
`;

export const AuthDescription = styled.p`
  margin-top: 8px;

  color: var(--gray);

  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  line-height: 21px;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding-bottom: 14px;
`;

export const FieldGroup = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldLabel = styled.label`
  color: var(--gray);

  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  line-height: 20px;
`;

export const FieldInput = styled.input`
  width: 100%;
  height: 44px;

  padding: 0 17px;

  border: 1.5px solid
    ${({ $hasError }) => ($hasError ? "#ff7474" : "var(--dark-gray)")};
  border-radius: 14px;

  outline: none;

  background: #1a2748;
  color: var(--white);

  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  line-height: 21px;

  transition:
    border-color 120ms ease,
    box-shadow 120ms ease;

  &::placeholder {
    color: #a9b4c6;
    opacity: 1;
  }

  &:focus {
    border-color: var(--light-blue);
    box-shadow: 0 0 0 2px rgba(143, 173, 234, 0.08);
  }
`;

export const ErrorMessage = styled.p`
  color: #e98369;

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  line-height: 18px;
`;

export const PasswordResetButton = styled.button`
  margin: 0 4px 22px auto;
  padding-top: 14px;

  border: 0;
  background: none;
  color: #aab9cf;

  font-family: "Pretendard", sans-serif;
  font-size: 13px;

  cursor: pointer;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 52px;

  border: 0;
  border-radius: 999px;

  background: ${({ disabled }) => (disabled ? "#aab9cf" : "#375cb2")};

  color: var(--white);

  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 700;

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  box-shadow: ${({ disabled }) =>
    disabled
      ? "0 0 12px rgba(55, 92, 178, 0.2)"
      : "0 0 12px rgba(55, 92, 178, 0.4), 0 0 4px rgba(55, 92, 178, 0.2)"};

  transition:
    background-color 120ms ease,
    transform 120ms ease,
    box-shadow 120ms ease;

  &:not(:disabled):active {
    background: #8fadea;
    transform: scale(0.99);
  }
`;

export const PageSwitchText = styled.p`
  margin-top: 22px;

  color: #6c7a8e;
  text-align: center;

  font-family: "Pretendard", sans-serif;
  font-size: 13px;
`;

export const PageSwitchButton = styled.button`
  padding: 0;

  border: 0;
  background: none;

  color: var(--light-blue);
  font: inherit;
  text-decoration: underline;

  cursor: pointer;
`;

export const AgreementCard = styled.div`
  height: 213px;
  padding: 21px;

  border: 1px solid #26314a;
  border-radius: 20px;

  background: rgba(17, 29, 57, 0.78);

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
`;

export const AgreementRow = styled.div`
  min-height: 45px;

  display: flex;
  align-items: center;
  gap: 10px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(38, 49, 74, 0.65);
  }

  &:last-child {
    min-height: 21px;
  }
`;

export const AgreementCheckbox = styled.input`
  appearance: none;

  width: 20px;
  height: 20px;

  flex: 0 0 20px;

  display: grid;
  place-content: center;

  border: 1.5px solid #6c7a8e;
  border-radius: 6px;

  background: transparent;

  cursor: pointer;

  &::before {
    width: 10px;
    height: 10px;

    border-radius: 3px;
    background: #8fadea;

    content: "";

    transform: scale(0);
    transition: transform 100ms ease;
  }

  &:checked {
    border-color: #8fadea;
    background: rgba(143, 173, 234, 0.15);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus-visible {
    outline: 2px solid rgba(143, 173, 234, 0.55);
    outline-offset: 2px;
  }
`;

export const AgreementLabel = styled.label`
  flex: 1;

  color: var(--white);

  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  line-height: 20px;

  cursor: pointer;
`;

export const TermsButton = styled.button`
  border: 0;
  background: none;

  color: var(--gray);

  font-family: "Pretendard", sans-serif;
  font-size: 11px;
  line-height: 17px;
  text-decoration: underline;

  cursor: pointer;
`;

export const AgreementDivider = styled.hr`
  width: 100%;
  height: 13px;

  border: 0;
`;

export const SignupButtonArea = styled.div`
  margin-top: 42px;
`;
