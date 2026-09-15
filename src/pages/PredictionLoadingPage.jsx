import { useEffect, useRef } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import NavBar from "../components/NavBar";
import logo from "../assets/logo_SplashPage.svg";

import { createForecast, updateForecast } from "../api/forecast";

import {
  Page,
  LoadingContent,
  LogoGlow,
  LoadingLogo,
  Title,
  Description,
} from "../styles/PredictionLoadingPage.styles";

const PredictionLoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pendingRequest = useRef(null);
  const isEditing = location.state?.mode === "edit";
  const forecast = location.state?.forecast;

  const requestData =
    location.state?.requestData;

  useEffect(() => {
    let active = true;
    const runPrediction = async () => {
      /*
       * PredictionPage를 거치지 않고
       * loading URL로 직접 접근한 경우
       */
      if (!requestData) {
        navigate("/prediction", {
          replace: true,
        });

        return;
      }

      try {
        console.log(
          "예측 요청:",
          requestData
        );

        // Reuse the request when StrictMode replays the effect.
        pendingRequest.current ??= (isEditing ? updateForecast : createForecast)(requestData);
        const result = await pendingRequest.current;
        if (!active) return;
        if (!result?.data) throw new Error("예측 결과를 받지 못했어요. 다시 시도해 주세요.");

        console.log(
          "예측 성공:",
          result
        );

        navigate(
          "/prediction/result",
          {
            replace: true,
            state: {
              forecast: result.data,
            },
          }
        );
      } catch (error) {
        if (!active) return;
        console.error(
          "예측 실패:",
          error
        );

        alert(error.message);

        navigate("/prediction", {
          replace: true,
          state: { mode: isEditing ? "edit" : "create", forecast, requestData },
        });
      }
    };

    runPrediction();
    return () => { active = false; };
  }, [
    navigate,
    requestData,
    isEditing,
    forecast,
  ]);

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
          여행자님의 기록을 바탕으로
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

export default PredictionLoadingPage;
