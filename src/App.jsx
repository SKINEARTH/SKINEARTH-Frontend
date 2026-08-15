import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import SplashPage from "./pages/SplashPage";
import OnboardingPage from "./pages/OnboardingPage";
import HomePage from "./pages/HomePage";
import LogPage from "./pages/LogPage";
import LogLoadingPage from "./pages/LogLoadingPage";
import LogCompletePage from "./pages/LogCompletePage";
import MissionPage from "./pages/MissionPage";
import MyPage from "./pages/MyPage";
import PredictionPage from "./pages/PredictionPage";

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
      <Route path="/log/loading" element={<LogLoadingPage />} />
      <Route path="/log/complete" element={<LogCompletePage />} />
      <Route path="/prediction" element={<PredictionPage />} />
      <Route path="/mission" element={<MissionPage />} />
      <Route path="/my" element={<MyPage />} />
    </Routes>
  );
}

export default App;