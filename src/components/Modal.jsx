import React from 'react';
import './Modal.css'; // Import CSS for Modal

const Modal = ({ isOpen, onClose, onMarkUnread, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
      <button onClick={onMarkUnread}>Mark as Unread</button>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Modal;
