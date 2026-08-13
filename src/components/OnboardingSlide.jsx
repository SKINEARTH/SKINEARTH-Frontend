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
}) => {
  return (
    <Slide>
      <Visual src={image} alt="" />

      <MainTitle>
        {title}
      </MainTitle>

      <Description>
        {description}
      </Description>
    </Slide>
  );
};

export default OnboardingSlide;