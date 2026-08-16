import { useLocation, useNavigate } from "react-router-dom";

import orbitImage from "../assets/first-record-orbit.png";

import {
  Page,
  Content,
  OrbitImage,
  MessageGroup,
  Title,
  Nickname,
  Description,
  ProgressCard,
  ProgressTitle,
  ProgressTrack,
  ProgressFill,
  ProgressInfo,
  ProgressCount,
  ProgressHint,
  ButtonGroup,
  RecordButton,
  LaterButton,
} from "../styles/FirstRecordGuidePage.styles";

const FirstRecordGuidePage = ({ nickname: nicknameProp, recordCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const nickname = nicknameProp ?? location.state?.nickname ?? "여행자";
  const normalizedRecordCount = Math.min(Math.max(recordCount, 0), 10);
  const remainingCount = 10 - normalizedRecordCount;

  return (
    <Page>
      <Content>
        <OrbitImage src={orbitImage} alt="빛나는 여행자의 궤도" />

        <MessageGroup>
          <Title>
            <Nickname>{nickname}</Nickname>님의
            <br />
            궤도가 준비됐어요!
          </Title>

          <Description>
            첫 번째 기록을 남기면
            <br />
            피부 기후 분석이 시작됩니다.
          </Description>
        </MessageGroup>

        <ProgressCard>
          <ProgressTitle>분석까지 남은 기록</ProgressTitle>

          <ProgressTrack>
            <ProgressFill $progress={normalizedRecordCount} />
          </ProgressTrack>

          <ProgressInfo>
            <ProgressCount>{normalizedRecordCount}/10 기록</ProgressCount>
            <ProgressHint>
              {remainingCount}개 더 쌓으면 맞춤 예측 시작!
            </ProgressHint>
          </ProgressInfo>
        </ProgressCard>

        <ButtonGroup>
          <RecordButton type="button" onClick={() => navigate("/log") }>
            <span aria-hidden="true">🌿</span> 지금 첫 기록 남기기
          </RecordButton>

          <LaterButton type="button" onClick={() => navigate("/home") }>
            나중에 할게요
          </LaterButton>
        </ButtonGroup>
      </Content>
    </Page>
  );
};

export default FirstRecordGuidePage;
