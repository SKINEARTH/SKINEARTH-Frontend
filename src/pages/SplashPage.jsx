import styled, { keyframes } from "styled-components";
import logo from "../assets/logo_SplashPage.svg";

const SplashPage = () => {
  return (
    <Container>
      <LogoArea>
        <Logo src={logo} alt="SKINEARTH logo" />

        <Orbit>
          <OrangeDot />
        </Orbit>
      </LogoArea>

      <BrandName>SKINEARTH</BrandName>
    </Container>
  );
};

export default SplashPage;

const orbit = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(540deg);
  }
`;

const Container = styled.main`
  width: 100%;
  min-height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
    180deg,
    #09152a 0%,
    #142c55 48%,
    #284f8d 100%
  );

  overflow: hidden;
`;

const LogoArea = styled.div`
  position: relative;

  width: 124px;
  height: 124px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const Orbit = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;

  width: 124px;
  height: 124px;

  animation: ${orbit} 2.2s cubic-bezier(0.45, 0, 0.55, 1) forwards;
`;

const OrangeDot = styled.div`
  position: absolute;

  top: -10px;
  left: 50%;

  width: 20px;
  height: 20px;

  transform: translateX(-50%);

  border-radius: 50%;
  background: #ff664b;

  box-shadow: 0 0 16px rgba(255, 102, 75, 0.2);
`;

const BrandName = styled.h1`
  margin-top: 32px;

  font-family: "EstablishRetrosans", sans-serif;
  font-size: clamp(42px, 12vw, 58px);
  font-weight: normal;

  line-height: 1;
  letter-spacing: 1px;

  color: #f6f7fa;
`;