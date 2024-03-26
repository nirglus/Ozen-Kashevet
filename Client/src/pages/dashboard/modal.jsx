import React from 'react';

const Modal = ({ isOpen, onclose , children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 flex">
            <div className="bg-white p-6 rounded-lg shadow-lg h-[80vh] w-[50vw] flex  flex-wrap justify-between flex-col">
                {children}
            </div>
        </div>
    );
};

export default Modal;
