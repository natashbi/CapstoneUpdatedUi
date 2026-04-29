import { useState, useRef, useEffect, useMemo } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { HIS_ITEMS } from '../data/hisItems.js';

const CATEGORY_COLORS = {
  'Laboratory Exam':    'bg-blue-100 text-blue-800 border-blue-200',
  'X-Ray':              'bg-purple-100 text-purple-800 border-purple-200',
  'Ultrasound':         'bg-cyan-100 text-cyan-800 border-cyan-200',
  'CT Scan':            'bg-orange-100 text-orange-800 border-orange-200',
  '2D Echo / ECG':      'bg-pink-100 text-pink-800 border-pink-200',
  'Endoscopy':          'bg-amber-100 text-amber-800 border-amber-200',
  'Respiratory Therapy':'bg-teal-100 text-teal-800 border-teal-200',
  'Examinations':       'bg-emerald-100 text-emerald-800 border-emerald-200',
};

const tagColor = (cat) => CATEGORY_COLORS[cat] || 'bg-gray-100 text-gray-800 border-gray-200';

// Serialize [{name, qty, category}] → "CBC (x2), Urinalysis, Chest X-ray PA"
export const tagsToString = (tags) =>
  tags.map(t => t.qty > 1 ? `${t.name} (x${t.qty})` : t.name).join(', ');

// Parse "CBC (x2), Urinalysis" → [{name, qty, category}]
export const stringToTags = (str) => {
  if (!str || !str.trim()) return [];
  return str
    .split(',')
    .map(s => {
      s = s.trim();
      if (!s) return null;
      const match = s.match(/^(.+?)\s*\(x(\d+)\)$/);
      const name = match ? match[1].trim() : s;
      const qty  = match ? parseInt(match[2]) : 1;
      const found = HIS_ITEMS.find(i => i.name === name);
      return { name, qty, category: found?.category || 'Other' };
    })
    .filter(Boolean);
};

const ProcedureTagInput = ({ value = [], onChange, placeholder = 'Type to search procedures...' }) => {
  const [query, setQuery]           = useState('');
  const [open, setOpen]             = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef    = useRef(null);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const selected = new Set(value.map(v => v.name));
    return HIS_ITEMS
      .filter(item => item.name.toLowerCase().includes(q) && !selected.has(item.name))
      .slice(0, 14);
  }, [query, value]);

  useEffect(() => { setHighlighted(0); }, [suggestions]);

  const addItem = (item) => {
    onChange([...value, { name: item.name, qty: 1, category: item.category }]);
    setQuery('');
    setOpen(false);
    inputRef.current?.focus();
  };

  const removeItem = (index) => onChange(value.filter((_, i) => i !== index));

  const changeQty = (index, delta) => {
    onChange(value.map((item, i) =>
      i !== index ? item : { ...item, qty: Math.max(1, item.qty + delta) }
    ));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && !query && value.length > 0) {
      removeItem(value.length - 1);
      return;
    }
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown')  { e.preventDefault(); setHighlighted(h => Math.min(h + 1, suggestions.length - 1)); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter')     { e.preventDefault(); if (suggestions[highlighted]) addItem(suggestions[highlighted]); }
    else if (e.key === 'Escape')    { setOpen(false); setQuery(''); }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Tag container + input */}
      <div
        className="min-h-[44px] px-3 py-2 border border-gray-200 rounded-xl focus-within:border-emerald-600 bg-white flex flex-wrap gap-1.5 items-center cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-1 text-xs font-semibold border rounded-lg px-2 py-1 select-none ${tagColor(item.category)}`}
          >
            <span className="max-w-[200px] truncate">{item.name}</span>
            {/* qty controls */}
            <button
              type="button"
              onMouseDown={e => e.preventDefault()}
              onClick={e => { e.stopPropagation(); changeQty(i, -1); }}
              className="opacity-60 hover:opacity-100 hover:bg-black/10 rounded p-0.5 transition-opacity"
              title="Decrease quantity"
            >
              <Minus className="w-2.5 h-2.5" />
            </button>
            <span className="font-bold min-w-[14px] text-center tabular-nums">{item.qty}</span>
            <button
              type="button"
              onMouseDown={e => e.preventDefault()}
              onClick={e => { e.stopPropagation(); changeQty(i, 1); }}
              className="opacity-60 hover:opacity-100 hover:bg-black/10 rounded p-0.5 transition-opacity"
              title="Increase quantity"
            >
              <Plus className="w-2.5 h-2.5" />
            </button>
            <button
              type="button"
              onMouseDown={e => e.preventDefault()}
              onClick={e => { e.stopPropagation(); removeItem(i); }}
              className="opacity-60 hover:opacity-100 hover:bg-black/10 rounded p-0.5 ml-0.5 transition-opacity"
              title="Remove"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => { if (query) setOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[180px] text-sm outline-none bg-transparent placeholder-gray-400 py-0.5"
        />
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden max-h-64 overflow-y-auto">
          {suggestions.map((item, i) => (
            <button
              key={item.code}
              type="button"
              onMouseDown={e => e.preventDefault()}
              onClick={() => addItem(item)}
              className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 transition-colors ${
                i === highlighted ? 'bg-emerald-50' : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-sm text-gray-900 flex-1">{item.name}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${tagColor(item.category)}`}>
                {item.category}
              </span>
            </button>
          ))}
        </div>
      )}

      {open && query.trim() && suggestions.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl px-4 py-3 text-sm text-gray-500">
          No matching procedures — you can still type it freely in the text above.
        </div>
      )}

      {value.length > 0 && (
        <p className="text-xs text-gray-400 mt-1">
          {value.length} procedure{value.length !== 1 ? 's' : ''} selected
          {value.some(v => v.qty > 1) && ` · Use − / + to adjust quantities`}
        </p>
      )}
    </div>
  );
};

export default ProcedureTagInput;
