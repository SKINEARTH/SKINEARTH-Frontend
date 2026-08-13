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

const SplashPage = () => {
  return (
    <Container>
      <LogoGroup>
        <LogoArea>
          <Logo src={logo} alt="SKINEARTH logo" />

          <Orbit>
            <OrangeCircle
              src={orangeSplash}
              alt=""
              aria-hidden="true"
            />
          </Orbit>
        </LogoArea>

        <BrandName>SKINEARTH</BrandName>
      </LogoGroup>
    </Container>
  );
};

export default SplashPage;