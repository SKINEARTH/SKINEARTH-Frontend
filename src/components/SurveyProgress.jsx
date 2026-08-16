import {
  ProgressHeader,
  ProgressLabel,
  ProgressTrack,
  ProgressFill,
} from "../styles/PersonalizationSurveyPage.styles";

const SurveyProgress = ({ step, total = 2 }) => {
  const progress = `${(step / total) * 100}%`;

  return (
    <ProgressHeader aria-label={`설문 ${step}/${total}`}>
      <ProgressLabel>
        설문 {step}/{total}
      </ProgressLabel>

      <ProgressTrack aria-hidden="true">
        <ProgressFill $progress={progress} />
      </ProgressTrack>
    </ProgressHeader>
  );
};

export default SurveyProgress;
