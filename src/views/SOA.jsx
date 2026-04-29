import { useState, useMemo, useRef } from 'react';
import {
  Search, X, Check, Upload, FileText, AlertCircle,
  CheckCircle2, Clock, Receipt, Wallet, Activity, Stethoscope
} from 'lucide-react';
import TopBar from '../components/TopBar.jsx';
import Modal from '../components/shared/Modal.jsx';
import Field from '../components/shared/Field.jsx';
import ConfirmModal from '../components/shared/ConfirmModal.jsx';
import { useToast } from '../components/shared/Toast.jsx';
import { useSettings } from '../context/SettingsContext.jsx';
import { api } from '../services/api.js';
import { formatDate, formatPeso, formatPesoShort } from '../utils/helpers.js';

// ============ SOA VIEW ============
const SOAView = ({ soas, setSoas, loas, members, user, onMenuToggle }) => {
  const { coverageLimit } = useSettings();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [confirmReject, setConfirmReject] = useState(null);
  const [saving, setSaving] = useState(false);

  const toast = useToast();
  const isCoordinator = user.role === 'coordinator';
  const isMember = user.role === 'member';

  const filtered = useMemo(() => {
    let list = isMember ? soas.filter(s => s.memberId === user.memberId) : soas;
    if (filter !== 'All') list = list.filter(s => (s.status || 'Pending') === filter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => {
        const m = members.find(x => x.id === s.memberId);
        return m?.name.toLowerCase().includes(q) || s.loaId.toLowerCase().includes(q);
      });
    }
    return list.slice().reverse();
  }, [soas, search, filter, members, user, isMember]);

  const handleSave = async (data) => {
    setSaving(true);
    try {
      const created = await api.createSoa({
        ...data,
        status: 'Pending',
        uploadedBy: user.name,
        uploadedAt: new Date().toISOString(),
      });
      setSoas(prev => [...prev, created]);
      setShowModal(false);
      toast('SOA submitted successfully.', 'success');
    } catch (err) {
      toast(err.message || 'Failed to save SOA', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReview = async (id) => {
    try {
      const updated = await api.reviewSoa(id);
      setSoas(prev => prev.map(s => s.id === id ? updated : s));
      toast('SOA reviewed and deducted from member balance.', 'success');
    } catch (err) {
      toast(err.message || 'Failed to review SOA', 'error');
    }
  };

  const handleReject = async (id) => {
    try {
      const updated = await api.rejectSoa(id);
      setSoas(prev => prev.map(s => s.id === id ? updated : s));
      toast('SOA rejected.', 'warning');
    } catch (err) {
      toast(err.message || 'Failed to reject SOA', 'error');
    }
  };

  const handleViewDocument = (soa) => {
    if (soa.documentData) {
      const a = document.createElement('a');
      a.href = soa.documentData;
      a.download = soa.document || 'SOA_document';
      a.click();
    } else if (soa.document) {
      toast(`Document on file: ${soa.document}`, 'warning');
    } else {
      toast('No document attached to this SOA.', 'warning');
    }
  };

  // Member: LOAs with "Used" or "Approved" status that don't have an SOA yet (eligible for SOA upload)
  const memberEligibleLOAs = useMemo(() => {
    if (!isMember) return [];
    return loas.filter(l =>
      l.memberId === user.memberId &&
      (l.status === 'Approved' || l.status === 'Used' || l.status === 'Completed') &&
      !soas.some(s => s.loaId === l.id)
    );
  }, [loas, soas, isMember, user]);

  const totalExpenses = filtered.reduce((s, x) => s + x.total, 0);
  const pendingCount = soas.filter(s => (s.status || 'Pending') === 'Pending').length;

  // Member's own balance
  const myBalance = isMember ? (() => {
    const spent = soas
      .filter(s => s.memberId === user.memberId && s.status === 'Reviewed')
      .reduce((sum, s) => sum + s.total, 0);
    return coverageLimit - spent;
  })() : null;

  return (
    <>
      <TopBar
        title={isMember ? 'My Expenses (SOA)' : 'SOA Review'}
        subtitle={isMember ? 'Upload your statement of account after receiving hospital bills' : 'Review SOAs submitted by members'}
        onMenuToggle={onMenuToggle}
      >
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-56 pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600" />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none">
          <option>All</option><option>Pending</option><option>Reviewed</option><option>Rejected</option>
        </select>
        {/* Upload button: ONLY for members */}
        {isMember && (
          <button
            onClick={() => setShowModal(true)}
            disabled={memberEligibleLOAs.length === 0}
            className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm ${
              memberEligibleLOAs.length === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-800 hover:bg-emerald-900 text-white'
            }`}
            title={memberEligibleLOAs.length === 0 ? 'You need an approved LOA before uploading an SOA' : 'Upload your SOA'}
          >
            <Upload className="w-4 h-4" /> Upload SOA
          </button>
        )}
      </TopBar>

      {/* Member balance card */}
      {isMember && (
        <div className="mx-8 mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl p-5 text-white">
            <div className="text-emerald-200 text-xs font-bold uppercase tracking-widest mb-2">My Available Balance</div>
            <div className="font-display text-3xl font-semibold">{formatPesoShort(myBalance)}</div>
            <div className="text-sm text-emerald-200 mt-1">of {formatPesoShort(coverageLimit)} annual coverage</div>
            <div className="mt-4 h-2 bg-emerald-950/50 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 transition-all" style={{ width: `${(myBalance / coverageLimit) * 100}%` }}></div>
            </div>
          </div>
          {memberEligibleLOAs.length > 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-emerald-900">You have {memberEligibleLOAs.length} LOA{memberEligibleLOAs.length !== 1 ? 's' : ''} ready for SOA upload</div>
                <div className="text-xs text-gray-700 mt-1">After you receive the official hospital bill, upload it here. The Coordinator will review and deduct the amount from your balance.</div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">No pending SOA uploads</div>
                <div className="text-xs text-gray-600 mt-1">All your approved LOAs have corresponding SOAs. Upload becomes available after a new LOA is approved.</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Coordinator pending banner */}
      {isCoordinator && pendingCount > 0 && filter !== 'Pending' && (
        <div className="mx-8 mt-5 bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 flex items-center gap-3">
          <Clock className="w-6 h-6 text-yellow-700 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-semibold text-emerald-900 text-sm">{pendingCount} SOA{pendingCount !== 1 ? 's' : ''} awaiting your review</div>
            <div className="text-xs text-gray-700">Review uploaded statements and deduct amounts from member balances.</div>
          </div>
          <button onClick={() => setFilter('Pending')} className="bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-2 rounded-lg text-xs font-semibold">Review</button>
        </div>
      )}

      <div className="p-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: isMember ? 'My SOAs' : 'Total SOAs', value: filtered.length, icon: Receipt, color: 'emerald' },
            { label: isMember ? 'Total Claimed' : 'Total Expenses', value: formatPesoShort(totalExpenses), icon: Wallet, color: 'yellow' },
            { label: 'Laboratory', value: formatPesoShort(filtered.reduce((s,x) => s + x.laboratory, 0)), icon: Activity, color: 'emerald' },
            { label: 'Medicines', value: formatPesoShort(filtered.reduce((s,x) => s + x.medicines, 0)), icon: Stethoscope, color: 'yellow' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <div className={`w-10 h-10 rounded-lg mb-3 flex items-center justify-center ${
                s.color === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 'bg-yellow-50 text-yellow-700'
              }`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="font-display text-xl font-semibold text-emerald-900">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-emerald-50 to-yellow-50">
                <tr>
                  {['LOA #', 'Member', 'Date', 'Lab', 'X-ray', 'Meds', 'Others', 'Total', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-emerald-900 uppercase tracking-wider px-3 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((s, idx) => {
                  const m = members.find(x => x.id === s.memberId);
                  const status = s.status || 'Pending';
                  const linkedLoa = loas.find(l => l.id === s.loaId);
                  const overLoa = linkedLoa && s.total > linkedLoa.approvedAmount;
                  return (
                    <tr key={s.id} className="hover:bg-gray-50 animate-fadeInUp" style={{ animationDelay: `${idx * 30}ms` }}>
                      <td className="px-3 py-3 font-mono text-xs font-semibold text-emerald-900">{s.loaId}</td>
                      <td className="px-3 py-3 text-sm font-medium text-gray-900 max-w-[150px] truncate">{m?.name}</td>
                      <td className="px-3 py-3 text-xs text-gray-600">{formatDate(s.dateUploaded)}</td>
                      <td className="px-3 py-3 text-xs text-gray-700">{formatPesoShort(s.laboratory)}</td>
                      <td className="px-3 py-3 text-xs text-gray-700">{formatPesoShort(s.xray)}</td>
                      <td className="px-3 py-3 text-xs text-gray-700">{formatPesoShort(s.medicines)}</td>
                      <td className="px-3 py-3 text-xs text-gray-700">{formatPesoShort(s.others)}</td>
                      <td className="px-3 py-3">
                        <div className={`text-sm font-semibold ${overLoa ? 'text-red-700' : 'text-emerald-900'}`}>
                          {formatPesoShort(s.total)}
                          {overLoa && <span className="ml-1 text-[9px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full align-middle">OVER LOA</span>}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                          status === 'Reviewed' ? 'bg-emerald-100 text-emerald-800' :
                          status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-900'
                        }`}>{status}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleViewDocument(s)}
                            className="w-7 h-7 rounded-lg hover:bg-emerald-50 text-emerald-700 flex items-center justify-center"
                            title={s.document ? `Download: ${s.document}` : 'No document'}
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          {isCoordinator && status === 'Pending' && (
                            <>
                              <button onClick={() => setConfirmReject(s)} className="w-7 h-7 rounded-lg hover:bg-red-50 text-red-700 flex items-center justify-center" title="Reject">
                                <X className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleReview(s.id)} className="px-2 h-7 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white flex items-center gap-1 text-[10px] font-semibold" title="Approve & deduct">
                                <Check className="w-3 h-3" /> Review
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan={10} className="p-12 text-center text-gray-400">
                    {isMember ? 'No SOAs uploaded yet.' : 'No SOAs to review.'}
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && <SOAFormModal loas={memberEligibleLOAs} members={members} user={user} onSave={handleSave} onClose={() => setShowModal(false)} saving={saving} />}
      {confirmReject && (
        <ConfirmModal
          title="Reject SOA"
          message="Reject this SOA? The member will need to resubmit."
          confirmLabel="Reject"
          confirmColor="red"
          onConfirm={() => handleReject(confirmReject.id)}
          onClose={() => setConfirmReject(null)}
        />
      )}
    </>
  );
};

// ============ SOA FORM MODAL ============
const SOAFormModal = ({ loas, members, user, onSave, onClose, saving }) => {
  const isMember = user?.role === 'member';
  const [form, setForm] = useState({
    loaId: '', memberId: isMember ? user.memberId : '', dateUploaded: new Date().toISOString().slice(0,10),
    laboratory: 0, xray: 0, medicines: 0, others: 0, total: 0, document: '', remarks: ''
  });
  const [error, setError] = useState('');

  const fileRef = useRef(null);

  const total = Number(form.laboratory||0) + Number(form.xray||0) + Number(form.medicines||0) + Number(form.others||0);
  const selectedLoa = loas.find(l => l.id === form.loaId);
  const liveOverBudget = selectedLoa && total > selectedLoa.approvedAmount;

  const handleLOAChange = (loaId) => {
    const l = loas.find(x => x.id === loaId);
    if (l) setForm({ ...form, loaId, memberId: l.memberId });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm({ ...form, document: file.name, documentData: ev.target.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    setError('');
    if (!form.loaId || !form.memberId) { setError('Please link to an LOA'); return; }
    if (total === 0) { setError('Please encode at least one expense'); return; }
    if (!form.document) { setError('Please upload the SOA document'); return; }

    // Bug 5 fix: amount validation
    const loa = loas.find(l => l.id === form.loaId);
    if (loa && total > loa.approvedAmount) {
      setError(`Total (₱${total.toLocaleString()}) exceeds LOA approved amount (₱${loa.approvedAmount.toLocaleString()})`);
      return;
    }

    onSave({ ...form, total, laboratory: Number(form.laboratory||0), xray: Number(form.xray||0), medicines: Number(form.medicines||0), others: Number(form.others||0) });
  };

  const availableLoas = loas;

  return (
    <Modal title="Upload Statement of Account" onClose={onClose} size="md">
      <div className="space-y-5">
        {isMember && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <span className="text-emerald-900">After submission, the Coordinator will review your SOA and deduct the total from your annual balance.</span>
          </div>
        )}

        <Field label="Linked LOA" required select placeholder="Select LOA..." value={form.loaId}
          options={availableLoas.map(l => {
            const m = members.find(x => x.id === l.memberId);
            return { value: l.id, label: `#${l.serialNo} — ${isMember ? (l.procedures || 'LOA') : m?.name} — ${formatPesoShort(l.approvedAmount)}` };
          })}
          onChange={handleLOAChange} />

        <Field label="Date Uploaded" type="date" value={form.dateUploaded} onChange={v => setForm({...form, dateUploaded: v})} />

        <div className="bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-xl p-4">
          <div className="text-xs font-semibold text-yellow-900 uppercase tracking-wider mb-2">SOA Document (from hospital)</div>
          <input ref={fileRef} type="file" accept=".pdf,image/*" onChange={handleFile} className="hidden" />
          <button onClick={() => fileRef.current?.click()} className="w-full bg-white border-2 border-yellow-300 hover:border-emerald-600 rounded-lg p-4 text-center transition-colors">
            {form.document ? (
              <div className="flex items-center justify-center gap-2 text-emerald-800 font-semibold text-sm">
                <FileText className="w-5 h-5" /> {form.document}
              </div>
            ) : (
              <div className="text-gray-600 text-sm">
                <Upload className="w-6 h-6 mx-auto mb-1 text-yellow-700" />
                Click to upload PDF or image
              </div>
            )}
          </button>
        </div>

        <div>
          <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Expenses Breakdown</div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Laboratory (₱)" type="number" value={form.laboratory} onChange={v => setForm({...form, laboratory: v})} />
            <Field label="X-ray / Imaging (₱)" type="number" value={form.xray} onChange={v => setForm({...form, xray: v})} />
            <Field label="Medicines (₱)" type="number" value={form.medicines} onChange={v => setForm({...form, medicines: v})} />
            <Field label="Others (₱)" type="number" value={form.others} onChange={v => setForm({...form, others: v})} />
          </div>
        </div>

        <div className={`rounded-xl p-4 ${liveOverBudget ? 'bg-red-700' : 'bg-gradient-to-r from-emerald-700 to-emerald-900'} text-white`}>
          <div className="flex items-center justify-between">
            <div className="text-white/70 text-xs font-bold uppercase tracking-widest">Total Amount</div>
            <div className="font-display text-3xl font-bold">{formatPeso(total)}</div>
          </div>
          {liveOverBudget && (
            <div className="mt-2 text-xs font-semibold text-red-200 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Exceeds LOA approved amount of {formatPeso(selectedLoa.approvedAmount)} by {formatPeso(total - selectedLoa.approvedAmount)}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <Field label="Remarks" textarea value={form.remarks} onChange={v => setForm({...form, remarks: v})} placeholder="Optional notes..." />

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit} disabled={saving} className="flex-1 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold shadow-md disabled:opacity-60">
            {saving ? 'Saving...' : (isMember ? 'Submit SOA' : 'Upload SOA')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SOAView;
