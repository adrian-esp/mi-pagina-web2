import React from 'react';

interface SubmissionSuccessModalProps {
  data: { breed: string; credentials: string } | null;
  onClose: () => void;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  const docketNumber = `CYN-2024-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">verified</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-sky-700 block">
              Curatorial Standard Registry
            </span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Inquiry Transmitted to Curators
            </h3>
            <p className="text-xs text-slate-500">
              Your candidate specimen submission has been logged into the peer-review accession queue.
            </p>
          </div>

          {/* Docket Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500">Accession Docket Code:</span>
              <span className="font-mono font-bold text-sky-800">{docketNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Proposed Taxon:</span>
              <span className="font-semibold text-slate-900">{data.breed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Affiliation:</span>
              <span className="font-semibold text-slate-900 truncate max-w-[200px]">
                {data.credentials}
              </span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-slate-200 text-[10px] text-slate-400">
              <span>Status: Pending Biometric Audit</span>
              <span>Cycle: 2025 Release</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500">
            A member of the Cynological Editorial Committee will examine cranial indices and pedigree markers within 14 business days.
          </p>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Acknowledge &amp; Return
          </button>
        </div>
      </div>
    </div>
  );
};
