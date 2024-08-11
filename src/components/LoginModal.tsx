import { useState, FC } from "react";
import styles from "../styles/LoginModal.module.css";
import { FaGithub } from 'react-icons/fa'; 
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import ForgotPasswordModal from "./ForgotModal"; 
import ReCAPTCHA from "react-google-recaptcha"; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGitHubSignIn = () => {
    window.location.href = `https://streaktype.studex.tech/`;
  };

  const handleGoogleSuccess = (response: CredentialResponse) => {
    console.log('Google Sign-In success:', response);

  };

  const handleGoogleError = (error: any) => {
    console.log('Google Sign-In error:', error);
  
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const openForgotPassword = () => {
    setForgotPasswordOpen(true);
  };

  const closeForgotPassword = () => {
    setForgotPasswordOpen(false);
  };

  return (
    <>
      <div className={styles.modalBackdrop} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={onClose}>×</button>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${isSignIn ? styles.active : ""}`} 
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </button>
            <button 
              className={`${styles.tab} ${!isSignIn ? styles.active : ""}`} 
              onClick={() => setIsSignIn(false)}
            >
              Sign Up
            </button>
          </div>
          <form className={styles.form}>
            {isSignIn ? (
              <>
                <input className={styles.inputField} type="email" placeholder="Email" required />
                <input className={styles.inputField} type="password" placeholder="Password" required />
                <div className={styles.rememberMeContainer}>
                  <input type="checkbox" id="rememberMe" className={styles.rememberMeCheckbox} />
                  <label htmlFor="rememberMe" className={styles.rememberMeLabel}>Remember Me</label>
                  <button type="button" className={styles.forgotPasswordLink} onClick={openForgotPassword}>
                    Forgot Password?
                  </button>
                </div>
                <br />
                <button className={styles.submitButton} type="submit">Sign In</button>
              </>
            ) : (
              <>
                <input className={styles.inputField} type="email" placeholder="Email" required />
                <input className={styles.inputField} type="password" placeholder="Password" required />
                <input className={styles.inputField} type="password" placeholder="Confirm Password" required />
                <br></br>
                <div className={styles.captchaContainer}>
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} 
                    onChange={handleCaptchaChange}
                    theme="dark"
                  />
                </div>
                <br />
                <button 
                  className={styles.submitButton} 
                  type="submit" 

                  disabled={!captchaValue} 
                >
                  Sign Up
                </button>
              </>
            )}
            <div className={styles.separatorContainer}>
              <hr className={styles.separator} />
              <span className={styles.orText}>OR</span>
              <hr className={styles.separator} />
            </div>
            <button className={styles.githubButton} onClick={handleGitHubSignIn}>
              <FaGithub className={styles.githubIcon} /> Sign in with GitHub
            </button>
            <br />
            <div className={styles.googleButton}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
            
              />
            </div>
          </form>
        </div>
      </div>
      <ForgotPasswordModal isOpen={forgotPasswordOpen} onClose={closeForgotPassword} />
    </>
  );
};

export default Modal;
