import { useEffect, useState } from 'react';
import './Toast.css';

interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  onClose: () => void;
  duration?: number; // in milliseconds
}

const Toast = ({
  message,
  type = 'info',
  onClose,
  duration = 5000,
}: ToastProps) => {
  const [animation, setanimation] = useState('none');

  useEffect(() => {
    const slideInTimer = setTimeout(() => {
      setanimation('in');
    }, 111);

    const slideOutTimer = setTimeout(() => {
      setanimation('out');

      // Wait for animation to finish before removing
      const deleteAnimation = setTimeout(() => {
        onClose();
      }, 999); // Match this duration with CSS animation duration

      return () => clearTimeout(deleteAnimation);
    }, duration);

    return () => {
      clearTimeout(slideInTimer);
      clearTimeout(slideOutTimer);
    };
  }, [duration, onClose]);

  // if (!animation) return null;

  return (
    <div className={`toast toast-${type} toast-${animation}`}>
      <div className='toast-content'>
        <span className='toast-message'>{message}</span>
        <button className='toast-close' onClick={() => setanimation('out')}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
