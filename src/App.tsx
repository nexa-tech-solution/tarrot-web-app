import MainLayout from "./pages/main-layout";
import OnboardingPage from "./pages/onboarding";
import HomePage from "./pages/home";
import JournalPage from "./pages/journal";
import ProfilePage from "./pages/profile";
import ReadingPage from "./pages/reading";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./pages/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/main" element={<MainLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="journal" element={<JournalPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="/reading" element={<ReadingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
