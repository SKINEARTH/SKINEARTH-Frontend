import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import SplashPage from "./pages/SplashPage";
import OnboardingPage from "./pages/OnboardingPage";

import HomePage from "./pages/HomePage";
import LogPage from "./pages/LogPage";

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
      <Route path="/" element={<OnboardingPage />} />

      <Route path="/home" element={<HomePage />} />

      <Route path="/log" element={<LogPage />} />

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

      <Route
        path="/mission"
        element={<MissionPage />}
      />

      <Route
        path="/my"
        element={<MyPage />}
      />
    </Routes>
  );
}

export default App;