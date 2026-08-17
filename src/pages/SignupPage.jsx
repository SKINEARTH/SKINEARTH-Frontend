import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthInput from "../components/AuthInput";
import logo from "../assets/logo_Auth.svg";
import { signup } from "../api/auth";

import {
  AuthContainer,
  AuthContent,
  BrandHeader,
  BrandLogo,
  BrandName,
  TitleArea,
  AuthTitle,
  AuthForm,
  InputList,
  AgreementCard,
  AgreementRow,
  AgreementCheckbox,
  AgreementLabel,
  TermsButton,
  AgreementDivider,
  SubmitButton,
  SignupButtonArea,
} from "../styles/AuthPage.styles";

const SignupPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [agreements, setAgreements] = useState({
    service: false,
    health: false,
    research: false,
  });

  const passwordError =
    password.length > 0 && password.length < 8
      ? "비밀번호가 너무 짧습니다. 비밀번호를 8자 이상 입력해 주세요."
      : "";

  const passwordConfirmError =
    passwordConfirm.length > 0 && password !== passwordConfirm
      ? "비밀번호가 일치하지 않습니다."
      : "";

  const allAgreed =
    agreements.service &&
    agreements.health &&
    agreements.research;

  const canSignup =
    email.trim() !== "" &&
    password.length >= 8 &&
    password === passwordConfirm &&
    agreements.service &&
    agreements.health;

  const handleAgreement = (name) => {
    setAgreements((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };

  const handleAllAgreements = (event) => {
    const checked = event.target.checked;

    setAgreements({
      service: checked,
      health: checked,
      research: checked,
    });
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!canSignup) {
    return;
  }

  try {
    await signup({
      email,
      password,
      passwordConfirm,
      serviceTermsAgreed: agreements.service,
      sensitiveDataAgreed: agreements.health,
      researchDataAgreed: agreements.research,
    });

    alert("회원가입이 완료되었습니다.");

    navigate("/login", {
      replace: true,
    });
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <AuthContainer>
      <AuthContent>
        <BrandHeader>
          <BrandLogo src={logo} alt="SKINEARTH" />
          <BrandName>SKINEARTH</BrandName>
        </BrandHeader>

        <TitleArea>
          <AuthTitle>회원가입</AuthTitle>
        </TitleArea>

        <AuthForm onSubmit={handleSubmit}>
          <InputList>
            <AuthInput
              label="이메일"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="이메일을 입력하세요"
              autoComplete="email"
            />

            <AuthInput
              label="비밀번호"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력하세요"
              error={passwordError}
              autoComplete="new-password"
            />

            <AuthInput
              label="비밀번호 확인"
              type="password"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              error={passwordConfirmError}
              autoComplete="new-password"
            />
          </InputList>

          <AgreementCard>
            <AgreementRow>
              <AgreementCheckbox
                id="service-agreement"
                type="checkbox"
                checked={agreements.service}
                onChange={() => handleAgreement("service")}
              />

              <AgreementLabel htmlFor="service-agreement">
                [필수] 서비스 이용약관 동의
              </AgreementLabel>

              <TermsButton type="button">보기</TermsButton>
            </AgreementRow>

            <AgreementRow>
              <AgreementCheckbox
                id="health-agreement"
                type="checkbox"
                checked={agreements.health}
                onChange={() => handleAgreement("health")}
              />

              <AgreementLabel htmlFor="health-agreement">
                [필수] 민감 건강정보 처리 동의
              </AgreementLabel>

              <TermsButton type="button">보기</TermsButton>
            </AgreementRow>

            <AgreementRow>
              <AgreementCheckbox
                id="research-agreement"
                type="checkbox"
                checked={agreements.research}
                onChange={() => handleAgreement("research")}
              />

              <AgreementLabel htmlFor="research-agreement">
                [선택] 연구목적 데이터 공유 동의
              </AgreementLabel>

              <TermsButton type="button">보기</TermsButton>
            </AgreementRow>

            <AgreementDivider />

            <AgreementRow>
              <AgreementCheckbox
                id="all-agreements"
                type="checkbox"
                checked={allAgreed}
                onChange={handleAllAgreements}
              />

              <AgreementLabel htmlFor="all-agreements">
                전체 동의
              </AgreementLabel>
            </AgreementRow>
          </AgreementCard>

          <SignupButtonArea>
            <SubmitButton type="submit" disabled={!canSignup}>
              완료
            </SubmitButton>
          </SignupButtonArea>
        </AuthForm>
      </AuthContent>
    </AuthContainer>
  );
};

export default SignupPage;