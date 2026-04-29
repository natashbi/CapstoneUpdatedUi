import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);

const STYLES = {
  success: { bg: 'bg-emerald-50 border-emerald-200', Icon: CheckCircle2, iconCls: 'text-emerald-600' },
  error:   { bg: 'bg-red-50 border-red-200',         Icon: XCircle,       iconCls: 'text-red-600'     },
  warning: { bg: 'bg-yellow-50 border-yellow-200',   Icon: AlertTriangle, iconCls: 'text-yellow-600'  },
};

const ToastItem = ({ id, message, type, onDismiss }) => {
  const s = STYLES[type] || STYLES.success;
  return (
    <div className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-lg w-80 animate-fadeInUp ${s.bg}`}>
      <s.Icon className={`w-4 h-4 flex-shrink-0 ${s.iconCls}`} />
      <span className="text-sm font-medium text-gray-800 flex-1">{message}</span>
      <button onClick={() => onDismiss(id)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const dismiss = useCallback((id) => setToasts(prev => prev.filter(t => t.id !== id)), []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => <ToastItem key={t.id} {...t} onDismiss={dismiss} />)}
      </div>
    </ToastContext.Provider>
  );
};
