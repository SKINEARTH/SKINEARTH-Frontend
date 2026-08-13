import { useEffect, useState } from "react";

import OnboardingSlide from "../components/OnboardingSlide";

import logo from "../assets/logo_SplashPage.svg";
import orangeSplash from "../assets/orange_SplashPage.svg";

import firstOnboarding from "../assets/first_OnboardingPage.svg";
import secondOnboarding from "../assets/second_OnboardingPage.svg";
import thirdOnboarding from "../assets/third_OnboardingPage.svg";

import {
  Container,
  HeaderLogoGroup,
  LogoArea,
  Logo,
  Orbit,
  OrangeCircle,
  BrandName,
  Slider,
  Highlight,
  Indicator,
  ActiveDot,
  Dot,
} from "../styles/OnboardingPage.styles";

const OnboardingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntered(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const onboardingData = [
    {
      image: firstOnboarding,
      title: (
        <>
          당신의 피부에는
          <br />
          <Highlight>고유한 기후</Highlight>가 있습니다
        </>
      ),
      description: (
        <>
          매일의 환경이 피부에 남기는 흔적을
          <br />
          놓치지 않도록 읽어드립니다.
        </>
      ),
    },

    {
      image: secondOnboarding,
      title: (
        <>
          매일의 피부 상태를
          <br />
          <Highlight>행성 온도 점수</Highlight>로 확인하세요
        </>
      ),
      description: (
        <>
          여행자의 행성 온도 점수가
          <br />
          어떻게 변하는지 매일 상태를 알려줍니다.
        </>
      ),
    },

    {
      image: thirdOnboarding,
      title: (
        <>
          당신의 탐사 파트너,
          <br />
          <Highlight>PP</Highlight>와 함께하세요
        </>
      ),
      description: (
        <>
          PP가 여행자의 피부 상태를 기반으로
          <br />
          데일리 탐사 미션을 추천합니다.
        </>
      ),
    },
  ];

  const handleScroll = (e) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;

    const index = Math.round(scrollLeft / width);

    setCurrentIndex(index);
  };

  return (
    <Container>
      <HeaderLogoGroup>
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
      </HeaderLogoGroup>

      <Slider onScroll={handleScroll}>
        {onboardingData.map((item, index) => (
          <OnboardingSlide
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            active={isEntered && index === currentIndex}
          />
        ))}
      </Slider>

      <Indicator>
        {onboardingData.map((_, index) =>
          index === currentIndex ? (
            <ActiveDot key={index} />
          ) : (
            <Dot key={index} />
          )
        )}
      </Indicator>
    </Container>
  );
};

export default OnboardingPage;