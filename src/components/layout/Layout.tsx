import { useState, type PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LoginModal from "../auth/LoginModal";

function Layout({ children }: PropsWithChildren) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header openLoginModal={openLoginModal} />
      <main className="flex-grow">{children}</main>
      <Footer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSuccess={closeLoginModal}
      />
    </div>
  );
}

export default Layout;
