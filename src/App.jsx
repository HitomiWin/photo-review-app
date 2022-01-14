import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ReactQueryDevtools } from "react-query/devtools";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignupPage from "./pages/SignupPage";
import UploadImagePage from "./pages/UploadImagePage";
import PreviewPage from "./pages/PreviewPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <>
      <Navigation />
      <Container id="App" className="p-3">
        <Routes>
          <Route path="preview/:id" element={<PreviewPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <RequireAuth redirectTo="/login">
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="upload-image/:id"
            element={
              <RequireAuth redirectTo="/login">
                <UploadImagePage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default App;
