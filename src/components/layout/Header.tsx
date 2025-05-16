import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../auth/LoginModal";
import { useAuth } from "../../contexts/AuthContext";
import LoginButton from "../auth/LoginButton";

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isLoggedIn, logout, userName } = useAuth();


  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src="favicon.ico" alt="PetStop Logo" className="w-8 h-8" />
          </Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          {isLoggedIn && (
            <Link to="/search" className="text-gray-600 hover:text-primary-500">
              Search
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Hello, {userName}</span>
              <LoginButton variant="secondary" onClick={handleLogout}>
                Sign Out
              </LoginButton>
            </div>
          ) : (
            <LoginButton onClick={openLoginModal}>Sign In</LoginButton>
          )}
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSuccess={closeLoginModal} // Explicitly pass closeLoginModal as onSuccess
      />
    </header>
  );
}

export default Header;
