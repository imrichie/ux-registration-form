// ConfirmationModal.js
import React from "react";
import "./styles/ConfirmationModal.css";

function ConfirmationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 className="modal-header">Success! Your account is ready.</h2>
        <p className="modal-subtext">
          You’re all set. Thank you for signing up. Click below to continue.
        </p>
        <button className="modal-button" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
