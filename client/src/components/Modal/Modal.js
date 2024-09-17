// components/Modal/Modal.js
import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null; // Don't render the modal if "show" is false

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.modalButtons}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
