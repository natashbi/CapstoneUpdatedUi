import { useState } from 'react';
import { Bell, AlertTriangle, Menu, Clock, UserCheck, KeyRound, ChevronDown } from 'lucide-react';
import { useNotifications } from '../context/NotificationsContext.jsx';
import { useAppUser } from '../context/UserContext.jsx';
import ChangePasswordModal from './shared/ChangePasswordModal.jsx';

// ============ TOPBAR ============
const TopBar = ({ title, subtitle, children, alerts = [], onMenuToggle }) => {
  const [showAlerts, setShowAlerts] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const contextAlerts = useNotifications();
  const { user } = useAppUser();
  const allAlerts = [...contextAlerts, ...alerts];

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';
  const roleColors = { admin: 'bg-purple-100 text-purple-800', coordinator: 'bg-emerald-100 text-emerald-800', director: 'bg-yellow-100 text-yellow-900', member: 'bg-blue-100 text-blue-800' };
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-5 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 min-w-0">
          {/* Hamburger menu — mobile only */}
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 mr-2 flex-shrink-0"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="font-display text-3xl font-semibold text-emerald-900 tracking-tight truncate">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {children}

          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => { setShowAlerts(!showAlerts); setShowUserMenu(false); }}
              className="relative w-10 h-10 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors"
            >
              <Bell className="w-4 h-4 text-gray-700" />
              {allAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-emerald-900 text-xs font-bold rounded-full flex items-center justify-center animate-pulse-glow">
                  {allAlerts.length}
                </span>
              )}
            </button>
            {showAlerts && allAlerts.length > 0 && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                <div className="p-3 border-b border-gray-100 bg-yellow-50">
                  <div className="font-semibold text-emerald-900 text-sm">Notifications</div>
                </div>
                <div className="max-h-96 overflow-y-auto scrollbar-thin">
                  {allAlerts.map((a, i) => (
                    <div key={i} className="p-3 border-b border-gray-50 hover:bg-gray-50 flex gap-3">
                      <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                        a.type === 'pending-loa' ? 'bg-blue-100 text-blue-700' :
                        a.type === 'pending-member' ? 'bg-purple-100 text-purple-700' :
                        a.type === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {a.type === 'pending-loa' ? <Clock className="w-4 h-4" /> :
                         a.type === 'pending-member' ? <UserCheck className="w-4 h-4" /> :
                         <AlertTriangle className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">{a.title}</div>
                        <div className="text-xs text-gray-600 mt-0.5">{a.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User avatar + dropdown (Change Password only — Sign Out is in Sidebar) */}
          {user && (
            <div className="relative">
              <button
                onClick={() => { setShowUserMenu(!showUserMenu); setShowAlerts(false); }}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-yellow-300 font-bold text-xs">
                  {user.photo
                    ? <img src={user.photo} alt="" className="w-full h-full object-cover" />
                    : getInitials(user.name)
                  }
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-semibold text-gray-900 leading-tight">{user.name.split(' ')[0]}</div>
                  <div className={`text-[10px] font-bold px-1.5 rounded capitalize ${roleColors[user.role] || 'bg-gray-100 text-gray-700'}`}>{user.role}</div>
                </div>
                <ChevronDown className="w-3 h-3 text-gray-400 hidden md:block" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-100 bg-emerald-50">
                    <div className="text-sm font-semibold text-emerald-900">{user.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                  </div>
                  <button
                    onClick={() => { setShowUserMenu(false); setShowChangePassword(true); }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left"
                  >
                    <KeyRound className="w-4 h-4 text-gray-500" /> Change Password
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}
      </div>
    </div>
  );
};

export default TopBar;
