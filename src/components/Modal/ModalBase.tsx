import React from 'react';

interface ModalBaseProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalBase: React.FC<ModalBaseProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 text-black py-2 rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalBase;
