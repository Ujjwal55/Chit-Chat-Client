import { ReactNode } from "react";
import { MdClose } from "react-icons/md";

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    modalStyles?: React.CSSProperties;
  }

const Modal = ({ isOpen, onClose, children, modalStyles }: IModalProps) => {
    // If the modal is not open, don't render anything
    if (!isOpen) return null;

    // Render the modal overlay and content
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-[80%] break-words max-h-[80%] overflow-auto text-black" style={modalStyles}>
                {/* Close button */}
                <MdClose size={20} onClick={onClose} className="cursor-pointer"/>
                {/* Modal content */}
                {children}
            </div>
        </div>
    );
};

export default Modal;