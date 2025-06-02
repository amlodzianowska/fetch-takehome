import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import AsyncErrorBoundary from "./components/errorBoundary/AsyncErrorBoundary";
import type { PropsWithChildren } from "react";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { isLoggedIn } = useAuth();
  const savedUserName = localStorage.getItem("userName");

  if (!isLoggedIn && !savedUserName) {
    console.log("Protected route: User not authenticated, redirecting to home");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ErrorBoundary>
          <AuthProvider>
            <FavoritesProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route
                    path="/search"
                    element={
                      <ProtectedRoute>
                        <AsyncErrorBoundary>
                          <SearchPage />
                        </AsyncErrorBoundary>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/favorites"
                    element={
                      <ProtectedRoute>
                        <ErrorBoundary>
                          <FavoritesPage />
                        </ErrorBoundary>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </FavoritesProvider>
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
