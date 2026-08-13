import { useState } from "react";

import logo from "../assets/logo_SplashPage.svg";
import orangeSplash from "../assets/orange_SplashPage.svg";

import {
  Container,
  LogoGroup,
  LogoArea,
  Logo,
  Orbit,
  OrangeCircle,
  BrandName,
} from "../styles/SplashPage.styles";

const SplashPage = ({ onFinish }) => {
  const [isFinished, setIsFinished] = useState(false);

  const handleOrbitEnd = () => {
    setIsFinished(true);

    setTimeout(() => {
      onFinish();
    }, 900);
  };

  return (
    <Container $finished={isFinished}>
      <LogoGroup $finished={isFinished}>
        <LogoArea $finished={isFinished}>
          <Logo src={logo} alt="SKINEARTH logo" />

          <Orbit
            $finished={isFinished}
            onAnimationEnd={handleOrbitEnd}
          >
            <OrangeCircle
              src={orangeSplash}
              alt=""
              aria-hidden="true"
              $finished={isFinished}
            />
          </Orbit>
        </LogoArea>

        <BrandName $finished={isFinished}>
          SKINEARTH
        </BrandName>
      </LogoGroup>
    </Container>
  );
};

export default SplashPage;