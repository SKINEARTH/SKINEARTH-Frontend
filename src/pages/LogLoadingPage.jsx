import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import logo from "../assets/logo_SplashPage.svg";

import {
  Page,
  LoadingContent,
  LogoGlow,
  LoadingLogo,
  Title,
  Description,
} from "../styles/LogLoadingPage.styles";

const LogLoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/log/complete", {
        replace: true,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Page>
      <LoadingContent>
        <LogoGlow>
          <LoadingLogo
            src={logo}
            alt="SKINEARTH"
          />
        </LogoGlow>

        <Title>
          내일의 궤도를 확인하는 중...
        </Title>

        <Description>
          사용자님의 기록을 바탕으로
          <br />
          내일의 궤도를 분석하는 중이에요.
          <br />
          잠시만 기다려 주세요.
        </Description>
      </LoadingContent>

      <NavBar />
    </Page>
  );
};

export default LogLoadingPage;