import {
  Slide,
  Visual,
  MainTitle,
  Description,
} from "../styles/OnboardingPage.styles";

const OnboardingSlide = ({
  image,
  title,
  description,
  active,
}) => {
  return (
    <Slide>
      <Visual
        src={image}
        alt=""
        $active={active}
      />

      <MainTitle $active={active}>
        {title}
      </MainTitle>

      <Description $active={active}>
        {description}
      </Description>
    </Slide>
  );
};

export default OnboardingSlide;