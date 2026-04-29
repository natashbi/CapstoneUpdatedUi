// ============ STAT CARD ============
const StatCard = ({ icon: Icon, label, value, sub, trend, color = 'emerald', percent }) => {
  const colors = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', accent: 'bg-emerald-700' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', accent: 'bg-yellow-500' },
    red: { bg: 'bg-red-50', text: 'text-red-700', accent: 'bg-red-500' },
  };
  const c = colors[color];
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fadeInUp">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full font-medium">{trend}</span>}
      </div>
      <div className="text-2xl font-display font-semibold text-emerald-900 tracking-tight">{value}</div>
      <div className="text-sm text-gray-600 mt-0.5">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
      {percent !== undefined && (
        <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full ${c.accent} rounded-full transition-all`} style={{ width: `${Math.min(100, percent)}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
