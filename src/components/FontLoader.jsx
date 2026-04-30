// ============ FONTS INJECTION ============
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

    * { font-family: 'Manrope', system-ui, sans-serif; }
    .font-display { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    .font-serif { font-family: 'Fraunces', Georgia, serif; }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-12px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(32px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-32px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4); }
      50% { box-shadow: 0 0 0 8px rgba(234, 179, 8, 0); }
    }
    .animate-fadeInUp { animation: fadeInUp 0.4s ease-out both; }
    .animate-slideIn { animation: slideIn 0.3s ease-out both; }
    .animate-slideInRight { animation: slideInRight 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
    .animate-slideInLeft { animation: slideInLeft 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
    .animate-scaleIn { animation: scaleIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
    .animate-pulse-glow { animation: pulse-glow 2s infinite; }

    .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
    .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
    .scrollbar-thin::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
    .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #9ca3af; }

    @media print {
      body * { visibility: hidden; }
      .print-area, .print-area * { visibility: visible; }
      .print-area { position: absolute; left: 0; top: 0; width: 100%; }
      .no-print { display: none !important; }

      /* Fit exactly 2 consultation slips per printed page */
      @page { size: A4 portrait; margin: 8mm; }
      .consultation-slip {
        font-size: 8.5pt !important;
        page-break-inside: avoid;
        break-inside: avoid;
        max-width: 100% !important;
        margin-bottom: 0 !important;
      }
      .consultation-slip + .consultation-slip {
        page-break-before: avoid;
        break-before: avoid;
      }
      .consultation-slip-pair {
        display: flex;
        flex-direction: column;
        height: 97vh;
      }
      .consultation-slip-pair .consultation-slip {
        flex: 1;
        overflow: hidden;
      }
    }

    .grid-bg {
      background-image:
        linear-gradient(rgba(22, 101, 52, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(22, 101, 52, 0.04) 1px, transparent 1px);
      background-size: 24px 24px;
    }
  `}</style>
);

export default FontLoader;
