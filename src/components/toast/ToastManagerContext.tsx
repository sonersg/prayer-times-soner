import { createContext, useContext, useState } from 'react';
import Toast from './Toast';

const ToastContext = createContext<{
  addToast: (message: string, type?: string, duration?: number) => void;
}>({ addToast: () => {} });

export const useToastContext = () => useContext(ToastContext);

export const ToastProvider = ({ children }: any) => {
  const [toasts, setToasts] = useState<any[]>([]);

  const addToast = (message: string, type = 'info', duration = 5000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className='toasts-container'>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {children}
    </ToastContext.Provider>
  );
};

// Hook for easy toaast usage
// export const useToast = () => {
//   const toastManagerRef = useRef<ToastManagerHandle>(null);

//   const showToast = useCallback(
//     (
//       message: string,
//       type?: 'info' | 'success' | 'warning' | 'error',
//       duration?: number
//     ) => {
//       toastManagerRef.current?.addToast(message, type, duration);
//     },
//     []
//   );

//   return { showToast, toastManagerRef };
// };

// // Types
// interface IToast {
//   id: number;
//   message: string;
//   type: 'info' | 'success' | 'warning' | 'error';
//   duration?: number;
// }
// interface IToastManager {
//   addToast: (message: string, type?: Toast['type'], duration?: number) => void;
// }
