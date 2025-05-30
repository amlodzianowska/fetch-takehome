import Modal from "../ui/Modal";
import ModalContent from "../ui/ModalContent";
import ModalFooter from "../ui/ModalFooter";
import LoginForm from "./LoginForm";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        title="Welcome to PetStop"
        subtitle="Sign in to find your perfect furry companion"
        icon="/favicon.ico"
        iconAlt="PetStop Logo"
        onClose={onClose}
      >
        <LoginForm onSuccess={onSuccess} />

        <ModalFooter>
          <p className="text-xs text-gray-500">
            By signing in, you'll be able to search and find your perfect pet
            match
          </p>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
