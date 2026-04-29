// ============ HELPER FUNCTIONS ============
export const formatPeso = (n) => '₱' + Number(n || 0).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const formatPesoShort = (n) => '₱' + Number(n || 0).toLocaleString('en-PH');
export const formatDate = (d) => new Date(d).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
export const formatDateLong = (d) => new Date(d).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
export const getInitials = (name) => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

export const generateSerialNo = (prefix, existing) => {
  const nums = existing.map(x => parseInt(x.serialNo || '0')).filter(n => !isNaN(n));
  const max = nums.length > 0 ? Math.max(...nums) : 0;
  return String(max + 1).padStart(6, '0');
};
