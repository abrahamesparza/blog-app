import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    
    return (
        <div>
            <div>
                <button onClick={onClose}>x</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;