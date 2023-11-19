import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';



type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const modalRoot = document.getElementById('modal-root');
  const el = document.createElement('div');

  useEffect(() => {
    if (modalRoot) {
        modalRoot.appendChild(el);
    }

    // Optional: Add event listener for "Escape" key to close modal
    const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
        if ((e.charCode || e.keyCode) === 27) {
            onClose();
        }
    };

    document.body.addEventListener('keydown', closeOnEscapeKeyDown);

    return () => {
        if (modalRoot && el.parentNode === modalRoot) {
            modalRoot.removeChild(el);
        }
        document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, [el, modalRoot, onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal" onClick={onClose}>
      <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg">
        <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    el
  );
};

export default Modal;
