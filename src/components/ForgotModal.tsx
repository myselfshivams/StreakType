import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import styles from "../styles/Forgot.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step === 1) {
      if (captchaValue) {
        setStep(step + 1);
      } else {
        toast.error('Please complete the CAPTCHA.');
      }
    } else if (step === 2) {
      // Simulate checking the code. Replace this with actual verification logic.
      const isCodeValid = checkCodeValidity(code);
      if (isCodeValid) {
        setStep(step + 1);
      } else {
        toast.error('You are not registered in StreakType Portal');
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleCodeChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.match(/^\d{0,1}$/)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        document.getElementById(`code-input-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && index > 0 && !code[index]) {
      document.getElementById(`code-input-${index - 1}`)?.focus();
    }
  };

  // Simulate code validation function
  const checkCodeValidity = (code: string[]) => {
    // Replace with actual API call or validation logic
    return false; // Simulate invalid code for demonstration
  };

  return (
    <>
      <div className={styles.modalBackdrop} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={onClose}>×</button>
          {step === 1 && (
            <>
              <h2 className={styles.modalHeading}>Forgot Password</h2>
              <form className={styles.form}>
                <input
                  className={styles.inputField}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <br />
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} 
                  onChange={handleCaptchaChange}
                  className={styles.captcha}
                  theme="dark"
                />
                <br />
                <button
                  className={styles.submitButton}
                  type="button"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </form>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className={styles.modalHeading}>Enter Code</h2>
              <form className={styles.form}>
                <div className={styles.codeInputContainer}>
                  {code.map((c, index) => (
                    <input
                      key={index}
                      id={`code-input-${index}`}
                      className={styles.codeInput}
                      type="text"
                      value={c}
                      onChange={(e) => handleCodeChange(index, e)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      maxLength={1}
                      inputMode="numeric"
                    />
                  ))}
                </div>
                <br />
                <button
                  className={styles.submitButton}
                  type="button"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </form>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className={styles.modalHeading}>Reset Password</h2>
              <form className={styles.form}>
                <input
                  className={styles.inputField}
                  type="password"
                  placeholder="New password"
                  required
                />
                <input
                  className={styles.inputField}
                  type="password"
                  placeholder="Confirm password"
                  required
                />
                <br />
                <button
                  className={styles.submitButton}
                  type="submit"
                >
                  Reset Password
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </>
  );
};

export default ForgotPasswordModal;
