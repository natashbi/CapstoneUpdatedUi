// ============ FIELD ============
const Field = ({ label, value, onChange, type = 'text', required, select, options, placeholder, textarea, readonly }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    {textarea ? (
      <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder} readOnly={readonly}
        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-emerald-600 resize-none" />
    ) : select ? (
      <select value={value || ''} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-emerald-600 bg-white">
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    ) : (
      <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} readOnly={readonly}
        className={`w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-emerald-600 ${readonly ? 'bg-gray-50' : ''}`} />
    )}
  </div>
);

export default Field;
