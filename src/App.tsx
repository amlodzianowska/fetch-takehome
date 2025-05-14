import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import MatchPage from "./pages/MatchPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/match" element={<MatchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
