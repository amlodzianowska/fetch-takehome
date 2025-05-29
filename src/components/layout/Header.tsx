import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import LoginButton from "../auth/LoginButton";
import SearchButton from "../ui/SearchButton";
import FavoritesButton from "../ui/FavoritesButton";

interface HeaderProps {
  openLoginModal?: () => void;
}

function Header({ openLoginModal }: HeaderProps) {
  const { isLoggedIn, logout, userName } = useAuth();
  const { favoriteDogs } = useFavorites();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleFavoritesClick = () => {
    navigate("/favorites");
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300 
    ${
      scrolled
        ? "bg-white shadow-md py-3"
        : "bg-white bg-opacity-10 backdrop-blur-sm py-5"
    }
  `;
  const logoClasses = "flex items-center space-x-2";

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className={logoClasses}>
          <Link to="/" className="flex items-center space-x-2">
            <img src="favicon.ico" alt="PetStop Logo" className="w-8 h-8" />
            <span className="font-bold text-xl text-primary-500">PetStop</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <>
              <SearchButton onClick={handleSearchClick} />
              <FavoritesButton
                onClick={handleFavoritesClick}
                favoriteCount={favoriteDogs.length}
              />
            </>
          )}

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-primary-500">Hello, {userName}</span>
              <LoginButton
                variant={scrolled ? "secondary" : "outline"}
                onClick={handleLogout}
              >
                Sign Out
              </LoginButton>
            </div>
          ) : (
            <LoginButton
              variant={scrolled ? "primary" : "outline"}
              onClick={openLoginModal}
            >
              Sign In
            </LoginButton>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
