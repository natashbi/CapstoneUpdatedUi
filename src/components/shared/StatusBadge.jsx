// ============ STATUS BADGE ============
const StatusBadge = ({ status }) => {
  const map = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-emerald-100 text-emerald-800',
    Completed: 'bg-blue-100 text-blue-800',
    Used: 'bg-gray-100 text-gray-700',
    Rejected: 'bg-red-100 text-red-700',
    Expired: 'bg-orange-100 text-orange-800',
    Reviewed: 'bg-purple-100 text-purple-800',
  };
  return <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${map[status] || 'bg-gray-100'}`}>{status}</span>;
};

export default StatusBadge;
