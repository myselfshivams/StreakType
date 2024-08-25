
import React from 'react';
import styles from '../styles/Warning.module.css';

const MobileWarningModal: React.FC = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.headi}>Mobile Device Warning</h2>
        <p className={styles.pp}>This site is not supported on mobile devices. Please use a desktop or laptop for the best experience.</p>
      </div>
    </div>
  );
};

export default MobileWarningModal;
