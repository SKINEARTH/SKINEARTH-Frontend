import { useState } from "react";

import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const AuthPage = () => {
  const [currentPage, setCurrentPage] = useState("login");

  if (currentPage === "signup") {
    return <SignupPage />;
  }

  return <LoginPage onMoveToSignup={() => setCurrentPage("signup")} />;
};

export default AuthPage;
