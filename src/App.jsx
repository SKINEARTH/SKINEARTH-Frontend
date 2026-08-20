import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import SplashPage from "./pages/SplashPage";
import OnboardingPage from "./pages/OnboardingPage";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import PersonalizationSurveyPage from "./pages/PersonalizationSurveyPage";
import FirstRecordGuidePage from "./pages/FirstRecordGuidePage";

import HomePage from "./pages/HomePage";
import OrbitHistoryPage from "./pages/OrbitHistoryPage";

import LogPage from "./pages/LogPage";
import LogCompletePage from "./pages/LogCompletePage";

import PredictionPage from "./pages/PredictionPage";
import PredictionLoadingPage from "./pages/PredictionLoadingPage";
import PredictionResultPage from "./pages/PredictionResultPage";

import MissionPage from "./pages/MissionPage";
import MyPage from "./pages/MyPage";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <SplashPage
        onFinish={() => setShowSplash(false)}
      />
    );
  }

  return (
    <Routes>
      {/* 온보딩 */}
      <Route
        path="/"
        element={<OnboardingPage />}
      />

      {/* 인증 */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/signup"
        element={<SignupPage />}
      />

      {/* 개인화 */}
      <Route
        path="/personalization"
        element={<PersonalizationSurveyPage />}
      />

      <Route
        path="/first-record"
        element={<FirstRecordGuidePage />}
      />

      {/* 홈 */}
      <Route
        path="/home"
        element={<HomePage />}
      />

      <Route
        path="/orbit-history"
        element={<OrbitHistoryPage />}
      />

      {/* 기록 */}
      <Route
        path="/log"
        element={<LogPage />}
      />

      <Route
        path="/log/complete"
        element={<LogCompletePage />}
      />

      {/* 예측 */}
      <Route
        path="/prediction"
        element={<PredictionPage />}
      />

      <Route
        path="/prediction/loading"
        element={<PredictionLoadingPage />}
      />

      <Route
        path="/prediction/result"
        element={<PredictionResultPage />}
      />

      {/* 미션 */}
      <Route
        path="/mission"
        element={<MissionPage />}
      />

      {/* 마이 */}
      <Route
        path="/my"
        element={<MyPage />}
      />
    </Routes>
  );
}

export default App;
