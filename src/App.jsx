import { useState } from "react";

import SplashPage from "./pages/SplashPage";
import OnboardingPage from "./pages/OnboardingPage";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashPage
          onFinish={() => setShowSplash(false)}
        />
      ) : (
        <OnboardingPage />
      )}
    </>
  );
}

export default App;