import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthInput from "../components/AuthInput";
import logo from "../assets/logo_Auth.svg";

import {
  AuthContainer,
  AuthContent,
  BrandHeader,
  BrandLogo,
  BrandName,
  TitleArea,
  AuthTitle,
  AuthDescription,
  AuthForm,
  InputList,
  PasswordResetButton,
  SubmitButton,
  PageSwitchText,
  PageSwitchButton,
} from "../styles/AuthPage.styles";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canLogin = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canLogin) {
      return;
    }

    // TODO: 인증 API 연동
  };

  return (
    <AuthContainer>
      <AuthContent>
        <BrandHeader>
          <BrandLogo src={logo} alt="SKINEARTH" />
          <BrandName>SKINEARTH</BrandName>
        </BrandHeader>

        <TitleArea>
          <AuthTitle>
            반갑습니다,
            <br />
            여행자님!
          </AuthTitle>

          <AuthDescription>로그인하여 나만의 여정을 시작하세요</AuthDescription>
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
              autoComplete="current-password"
            />
          </InputList>

          <PasswordResetButton
            type="button"
            aria-label="비밀번호 찾기"
          >
            비밀번호를 잊으셨나요?
          </PasswordResetButton>

          <SubmitButton type="submit" disabled={!canLogin}>
            로그인
          </SubmitButton>
        </AuthForm>

        <PageSwitchText>
          아직 계정이 없으신가요?{" "}
          <PageSwitchButton type="button" onClick={() => navigate("/signup")}>
            회원가입
          </PageSwitchButton>
        </PageSwitchText>
      </AuthContent>
    </AuthContainer>
  );
};

export default LoginPage;
