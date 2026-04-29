import { useState, useRef } from 'react';
import {
  ChevronRight, AlertCircle, Sparkles, UserPlus, AlertTriangle,
  Shield, Stethoscope, Activity, Heart, Clock, CheckCircle2,
  User, Plus, Trash2
} from 'lucide-react';
import { api } from '../services/api.js';

const LoginScreen = ({ onLogin, onRegister }) => {
  const [logoError, setLogoError] = useState(false);
  const [mode, setMode] = useState('signin');
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [reg, setReg] = useState({
    lastName: '', firstName: '', middleName: '', suffix: '', employeeId: '',
    department: '', email: '', phone: '', age: '', gender: 'Female',
    civilStatus: 'Single',
    password: '', confirmPassword: '', photo: null, dependents: []
  });
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const photoInputRef = useRef(null);
  const depPhotoRefs = useRef({});
  const depValidIdRefs = useRef({});

  const handleLogin = async () => {
    setLoginError('');
    if (!username.trim() || !password.trim()) {
      setLoginError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    try {
      const result = await api.login({ username: username.trim(), password });
      onLogin(result);
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setReg(prev => ({ ...prev, photo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleDepValidIdUpload = (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setReg(prev => ({
        ...prev,
        dependents: prev.dependents.map((d, i) => i === idx ? { ...d, validId: ev.target.result, validIdName: file.name } : d)
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDepPhotoUpload = (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setReg(prev => ({
        ...prev,
        dependents: prev.dependents.map((d, i) => i === idx ? { ...d, photo: ev.target.result } : d)
      }));
    };
    reader.readAsDataURL(file);
  };

  const addDependent = () => {
    if (reg.dependents.length >= 4) {
      setRegError('You can only add up to 4 dependents.');
      return;
    }
    setReg(prev => ({
      ...prev,
      dependents: [...prev.dependents, { name: '', relationship: 'Spouse', age: '', photo: null, validId: null, validIdName: null }]
    }));
  };

  const updateDependent = (idx, field, value) => {
    setReg(prev => ({
      ...prev,
      dependents: prev.dependents.map((d, i) => i === idx ? { ...d, [field]: value } : d)
    }));
  };

  const removeDependent = (idx) => {
    setReg(prev => ({
      ...prev,
      dependents: prev.dependents.filter((_, i) => i !== idx)
    }));
  };

  const handleRegister = async () => {
    setRegError('');
    if (!reg.photo) { setRegError('Please upload a photo to proceed.'); return; }
    if (reg.dependents.length > 4) { setRegError('You can only register with up to 4 dependents.'); return; }
    const invalidDependent = reg.dependents.find(d => !d.name?.trim() || !d.age);
    if (invalidDependent) { setRegError('Please fill in both name and age for all dependents.'); return; }
    if (!reg.lastName || !reg.firstName || !reg.middleName || !reg.employeeId || !reg.department || !reg.email || !reg.phone || !reg.age || !reg.password) {
      setRegError('Please complete all required fields (marked with *).'); return;
    }
    if (reg.password !== reg.confirmPassword) { setRegError('Passwords do not match.'); return; }
    if (reg.password.length < 8) { setRegError('Password must be at least 8 characters long.'); return; }
    if (!/[0-9]/.test(reg.password)) { setRegError('Password must contain at least one number.'); return; }
    setLoading(true);
    try {
      const fullName = `${reg.lastName}, ${reg.firstName}${reg.middleName ? ' ' + reg.middleName : ''}${reg.suffix ? ' ' + reg.suffix : ''}`;
      await onRegister({ ...reg, name: fullName });
      setRegSuccess(true);
    } catch (err) {
      setRegError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const iCls = 'w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:outline-none text-sm transition-colors bg-white';
  const lCls = 'block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

      {/* ─── Master card: FIXED 1000 × 650 px, never resizes ─── */}
      <div className="relative w-[1000px] h-[650px] flex flex-row overflow-hidden rounded-3xl shadow-2xl border border-emerald-100 bg-white">

        {/* ── LEFT: Green branding panel — collapses to w-0 on register ── */}
        <div className={`flex-shrink-0 overflow-hidden transition-all duration-500 ease-in-out ${
          mode === 'register' ? 'w-0 opacity-0' : 'w-[400px] opacity-100'
        }`}>
          {/* Inner wrapper is always 400 px so content never reflows during animation */}
          <div className="w-[400px] h-full bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 p-10 relative flex flex-col">
            <div className="absolute top-0 right-0 w-56 h-56 bg-yellow-400 rounded-full blur-3xl opacity-20 pointer-events-none" />

            <div className="relative flex flex-col h-full">
              {/* WeCare branding */}
              <div className="mb-10">
                <div className="font-display text-lg font-bold leading-none text-white">WeCare</div>
                <div className="text-[11px] text-emerald-300 mt-0.5">Health Care Services</div>
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl font-semibold leading-tight mb-3 tracking-tight text-white">
                Care that follows <em className="text-yellow-300 not-italic font-bold">you</em>.
              </h1>
              <p className="text-emerald-100 text-sm leading-relaxed mb-6 max-w-xs">
                Consultation & Medical Assistance Management for Wesleyan University–Philippines.
              </p>

              {/* Feature bullets */}
              <div className="space-y-2.5 flex-1">
                {[
                  { icon: Shield, text: '₱150,000 annual coverage per member' },
                  { icon: Stethoscope, text: 'Streamlined consultations & LOA' },
                  { icon: Activity, text: 'Real-time balance tracking' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-emerald-100">
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-yellow-300" />
                    </div>
                    <span className="text-xs">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-auto pt-5 border-t border-emerald-600/50">
                <div className="text-[10px] text-emerald-300 tracking-widest uppercase">Wesleyan University — Philippines</div>
                <div className="text-xs text-emerald-100 mt-0.5">Mabini Extension, Cabanatuan City</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form panel — flex-1 auto-fills the remaining width ── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">

          {/* Tab switcher — pinned, never scrolls */}
          {!regSuccess && (
            <div className="flex-shrink-0 px-8 pt-6 pb-4 border-b border-gray-100">
              <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => { setMode('signin'); setLoginError(''); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    mode === 'signin' ? 'bg-white text-emerald-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setMode('register'); setRegError(''); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    mode === 'register' ? 'bg-white text-emerald-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Register as Member
                </button>
              </div>
            </div>
          )}

          {/* ── Scrollable content — overflow ONLY here, card height stays fixed ── */}
          <div className="flex-1 overflow-y-auto scrollbar-thin px-8 py-6">

            {/* ════ REGISTRATION SUCCESS ════ */}
            {regSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fadeInUp">
                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-emerald-900 mb-2">Registration Submitted!</h2>
                <p className="text-gray-500 text-sm mb-5 max-w-sm">
                  Your registration is pending approval by the WeCare Coordinator. You'll be notified once activated.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-5 text-left w-full max-w-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-yellow-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-yellow-900 text-xs mb-1">What happens next?</div>
                      <ul className="text-xs text-yellow-800 space-y-0.5">
                        <li>• Coordinator reviews your registration</li>
                        <li>• You'll receive an email once approved</li>
                        <li>• After approval, sign in with your credentials</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setRegSuccess(false);
                    setMode('signin');
                    setReg({ lastName: '', firstName: '', middleName: '', suffix: '', employeeId: '', department: '', email: '', phone: '', age: '', gender: 'Female', civilStatus: 'Single', password: '', confirmPassword: '', photo: null, dependents: [] });
                  }}
                  className="w-full max-w-sm bg-emerald-800 hover:bg-emerald-900 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors"
                >
                  Back to Sign In
                </button>
              </div>

            /* ════ SIGN IN FORM ════ */
            ) : mode === 'signin' ? (
              <div className="flex flex-col justify-start animate-fadeInUp pt-2">
                {/* Logo - clean, no container */}
                <div className="mb-2">
                  {!logoError ? (
                    <img src="/logos/WCLogo.png" alt="WeCare Logo" className="w-20 h-30 object-contain" onError={() => setLogoError(true)} />
                  ) : (
                    <Heart className="w-20 h-20 text-emerald-600" fill="currentColor" />
                  )}
                </div>

                <div className="mb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-900 rounded-full text-xs font-medium mb-3">
                    <Sparkles className="w-3 h-3" /> Internal Access
                  </div>
                  <h2 className="font-display text-3xl font-semibold text-emerald-900 mb-2">Welcome back</h2>
                  <p className="text-gray-500 text-sm">Sign in with your registered account credentials.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={lCls}>Username or Email</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="Enter your username" className={iCls} />
                  </div>
                  <div>
                    <label className={lCls}>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="Enter your password" className={iCls} />
                  </div>

                  {loginError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2 animate-slideIn">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-red-800">{loginError}</div>
                    </div>
                  )}

                  <button onClick={handleLogin} disabled={loading} className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-800/20 flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading ? 'Signing in…' : <><span>Sign In</span><ChevronRight className="w-4 h-4" /></>}
                  </button>

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-[11px] text-gray-400 text-center mb-2">Demo credentials for testing</p>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      {[
                        { color: 'purple', role: 'Admin (IT)', cred: 'admin / admin123' },
                        { color: 'emerald', role: 'Coordinator', cred: 'coordinator / coord123' },
                        { color: 'yellow', role: 'Director', cred: 'director / director123' },
                        { color: 'blue', role: 'Member', cred: 'j.delacruz / member123' },
                      ].map(({ color, role, cred }) => (
                        <div key={role} className={`bg-${color}-50 rounded-lg p-2`}>
                          <div className={`font-semibold text-${color}-900`}>{role}</div>
                          <div className="text-gray-500 font-mono">{cred}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            /* ════ REGISTER FORM (full-width card) ════ */
            ) : (
              <div className="animate-fadeInUp">

                {/* Header row + warning side-by-side */}
                <div className="flex items-start gap-6 mb-5">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-medium mb-2">
                      <UserPlus className="w-3 h-3" /> New Member Registration
                    </div>
                    <h1 className="font-display text-2xl font-semibold text-emerald-900 leading-tight">Join WeCare Program</h1>
                    <p className="text-gray-500 text-xs mt-1">For permanent employees of Wesleyan University.</p>
                  </div>
                  <div className="flex-1 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-3 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-yellow-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-yellow-900 text-xs">Coordinator Approval Required</div>
                      <p className="text-yellow-800 text-[11px] mt-0.5 leading-relaxed">Only permanent employees are eligible. Your account must be approved before you can sign in.</p>
                    </div>
                  </div>
                </div>

                {/* Photo upload row */}
                <div className="flex items-center gap-4 pb-4 border-b border-gray-100 mb-5">
                  {reg.photo ? (
                    <img src={reg.photo} alt="Preview" className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-400 shadow-sm flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                      <User className="w-7 h-7 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <label className={lCls}>Profile Photo <span className="text-red-500 normal-case">*</span></label>
                    <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    <button type="button" onClick={() => photoInputRef.current?.click()} className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-1.5 rounded-lg font-semibold text-xs transition-colors">
                      {reg.photo ? 'Change Photo' : 'Upload Photo'}
                    </button>
                    <span className="text-[11px] text-gray-400 ml-2">JPG or PNG, max 2MB</span>
                  </div>
                </div>

                {/* ── Name Row: 4 equal columns ── */}
                <div className="mb-4">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</p>
                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <label className={lCls}>Last Name <span className="text-red-500">*</span></label>
                      <input type="text" value={reg.lastName} onChange={e => setReg(p => ({ ...p, lastName: e.target.value }))} placeholder="Dela Cruz" className={iCls} />
                    </div>
                    <div>
                      <label className={lCls}>First Name <span className="text-red-500">*</span></label>
                      <input type="text" value={reg.firstName} onChange={e => setReg(p => ({ ...p, firstName: e.target.value }))} placeholder="Juan" className={iCls} />
                    </div>
                    <div>
                      <label className={lCls}>Middle Name <span className="text-red-500">*</span></label>
                      <input type="text" value={reg.middleName} onChange={e => setReg(p => ({ ...p, middleName: e.target.value }))} placeholder="Reyes" className={iCls} />
                    </div>
                    <div>
                      <label className={lCls}>Suffix</label>
                      <select value={reg.suffix} onChange={e => setReg(p => ({ ...p, suffix: e.target.value }))} className={iCls}>
                        <option value="">None</option>
                        <option value="Jr.">Jr.</option>
                        <option value="Sr.">Sr.</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                        <option value="V">V</option>
                        <option value="Ph.D.">Ph.D.</option>
                        <option value="M.D.">M.D.</option>
                        <option value="D.D.S.">D.D.S.</option>
                        <option value="Esq.">Esq.</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ── Details + Contact in one row: 4 columns ── */}
                <div className="mb-4">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Employee &amp; Contact</p>
                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <label className={lCls}>Employee ID <span className="text-red-500">*</span></label>
                      <input type="text" value={reg.employeeId} onChange={e => setReg(p => ({ ...p, employeeId: e.target.value }))} placeholder="WUP-2026-001" className={`${iCls} font-mono`} />
                    </div>
                    <div>
                      <label className={lCls}>Department <span className="text-red-500">*</span></label>
                      <input type="text" value={reg.department} onChange={e => setReg(p => ({ ...p, department: e.target.value }))} placeholder="College of Nursing" className={iCls} />
                    </div>
                    <div>
                      <label className={lCls}>Email <span className="text-red-500">*</span></label>
                      <input type="email" value={reg.email} onChange={e => setReg(p => ({ ...p, email: e.target.value }))} placeholder="juan@wup.edu.ph" className={iCls} />
                    </div>
                    <div>
                      <label className={lCls}>Phone <span className="text-red-500">*</span></label>
                      <input type="tel" value={reg.phone} onChange={e => setReg(p => ({ ...p, phone: e.target.value }))} placeholder="09XX XXX XXXX" className={iCls} />
                    </div>
                  </div>
                </div>

                {/* ── Personal + Security in one row: 5 columns ── */}
                <div className="mb-5">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Personal &amp; Security</p>
                  <div className="grid grid-cols-5 gap-3">
                    <div>
                      <label className={lCls}>Age <span className="text-red-500">*</span></label>
                      <input type="number" min="18" value={reg.age} onChange={e => setReg(p => ({ ...p, age: e.target.value }))} placeholder="25" className={iCls} />
                    </div>
                    <div>
                      <label className={lCls}>Gender <span className="text-red-500">*</span></label>
                      <select value={reg.gender} onChange={e => setReg(p => ({ ...p, gender: e.target.value }))} className={iCls}>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </select>
                    </div>
                    <div>
                      <label className={lCls}>Civil Status <span className="text-red-500">*</span></label>
                      <select value={reg.civilStatus} onChange={e => setReg(p => ({ ...p, civilStatus: e.target.value }))} className={iCls}>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>
                    <div>
                      <label className={lCls}>Password <span className="text-red-500">*</span></label>
                      <input type="password" value={reg.password} onChange={e => setReg(p => ({ ...p, password: e.target.value }))} placeholder="Min. 8 characters" className={iCls} />
                    </div>
                    <div>
                      <label className={lCls}>Confirm Password <span className="text-red-500">*</span></label>
                      <input type="password" value={reg.confirmPassword} onChange={e => setReg(p => ({ ...p, confirmPassword: e.target.value }))} placeholder="Re-type password" className={iCls} />
                    </div>
                  </div>
                </div>

                {/* ── Dependents ── */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">Dependents</span>
                      <span className="text-[11px] text-gray-400 ml-2">up to 4 family members</span>
                    </div>
                    <button
                      type="button"
                      onClick={addDependent}
                      disabled={reg.dependents.length >= 4}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors ${
                        reg.dependents.length >= 4 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500 text-emerald-900'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>

                  {reg.dependents.length === 0 ? (
                    <p className="text-xs text-gray-400 italic text-center py-3 bg-white rounded-lg border border-gray-200">
                      No dependents added. Click "Add" to include a spouse, child, or other dependent.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {reg.dependents.map((d, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 border-2 border-emerald-100">
                          <div className="flex items-center gap-2 mb-2">
                            {d.photo ? (
                              <img src={d.photo} alt="" className="w-9 h-9 rounded-lg object-cover flex-shrink-0 border-2 border-emerald-200" />
                            ) : (
                              <div className="w-9 h-9 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                            <input
                              type="text" value={d.name}
                              onChange={e => updateDependent(idx, 'name', e.target.value)}
                              placeholder="Full name *"
                              className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:outline-none text-xs transition-colors"
                            />
                            <button type="button" onClick={() => depPhotoRefs.current[idx]?.click()} title="Upload photo" className="w-7 h-7 flex items-center justify-center rounded-lg border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-colors flex-shrink-0">
                              <User className="w-3.5 h-3.5" />
                            </button>
                            <button type="button" onClick={() => removeDependent(idx)} title="Remove" className="w-7 h-7 flex items-center justify-center rounded-lg border-2 border-red-200 text-red-500 hover:bg-red-50 transition-colors flex-shrink-0">
                              <Trash2 className="w-3 h-3" />
                            </button>
                            <input ref={el => depPhotoRefs.current[idx] = el} type="file" accept="image/*" onChange={e => handleDepPhotoUpload(idx, e)} className="hidden" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <select value={d.relationship} onChange={e => updateDependent(idx, 'relationship', e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:outline-none text-xs bg-white transition-colors">
                              <option>Spouse</option>
                              <option>Child</option>
                              <option>Parent</option>
                              <option>Sibling</option>
                            </select>
                            <input type="number" value={d.age} onChange={e => updateDependent(idx, 'age', e.target.value)} placeholder="Age *" className="w-full px-2.5 py-1.5 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:outline-none text-xs transition-colors" />
                          </div>
                          <div className="mt-2">
                            <input ref={el => depValidIdRefs.current[`validId_${idx}`] = el} type="file" accept="image/*,.pdf" onChange={e => handleDepValidIdUpload(idx, e)} className="hidden" />
                            <button type="button" onClick={() => depValidIdRefs.current[`validId_${idx}`]?.click()} className={`w-full text-xs px-2 py-1.5 rounded-lg border-2 transition-colors text-left truncate ${d.validId ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-dashed border-gray-300 text-gray-500 hover:border-emerald-400 hover:bg-emerald-50'}`}>
                              {d.validId ? `ID: ${d.validIdName}` : '+ Upload Valid ID'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Error */}
                {regError && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 mb-3 flex items-start gap-2 animate-slideIn">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-800">{regError}</p>
                  </div>
                )}

                {/* Submit + note */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-emerald-800/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting…' : <><span>Submit Registration</span><ChevronRight className="w-4 h-4" /></>}
                  </button>
                  <p className="text-[11px] text-gray-400 max-w-[160px] leading-relaxed">
                    Your account will be activated once approved by the Coordinator.
                  </p>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginScreen;
