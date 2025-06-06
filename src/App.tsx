import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import type { PropsWithChildren } from "react";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import FavoritesPage from "./pages/FavoritesPage";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { isLoggedIn } = useAuth();
  const savedUserName = localStorage.getItem("userName");

  if (!isLoggedIn && !savedUserName) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <SearchPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <FavoritesPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
