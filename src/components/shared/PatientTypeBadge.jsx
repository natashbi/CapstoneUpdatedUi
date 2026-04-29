// ============ PATIENT TYPE BADGE ============
const PatientTypeBadge = ({ type }) => {
  const map = {
    Consultation: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Outpatient: 'bg-blue-50 text-blue-700 border-blue-200',
    Inpatient: 'bg-purple-50 text-purple-700 border-purple-200',
    Emergency: 'bg-red-50 text-red-700 border-red-200',
  };
  return <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium border ${map[type] || 'bg-gray-50'}`}>{type}</span>;
};

export default PatientTypeBadge;
