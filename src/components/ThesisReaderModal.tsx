import React from 'react';
import { ARCHIVAL_THESIS } from '../data/breeds';

interface ThesisReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThesisReaderModal: React.FC<ThesisReaderModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto">
        {/* Sticky Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-700 text-2xl">menu_book</span>
            <div>
              <span className="text-[10px] text-sky-700 font-bold uppercase tracking-widest block">
                {ARCHIVAL_THESIS.series}
              </span>
              <h2 className="font-serif text-lg font-bold text-slate-900 line-clamp-1">
                {ARCHIVAL_THESIS.title}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print Thesis</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Paper Content */}
        <div className="p-6 lg:p-10 space-y-8 max-w-3xl mx-auto">
          {/* Paper Title & Authors */}
          <div className="space-y-3 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>DOI: {ARCHIVAL_THESIS.doi}</span>
              <span>•</span>
              <span>{ARCHIVAL_THESIS.pages}</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">PEER REVIEWED OPEN ACCESS</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              {ARCHIVAL_THESIS.title}
            </h1>

            <div className="text-xs text-slate-600 space-y-1 pt-2">
              <span className="font-bold text-slate-900 block">Lead Investigators:</span>
              {ARCHIVAL_THESIS.authors.map((author, idx) => (
                <p key={idx} className="italic text-slate-700">
                  {author}
                </p>
              ))}
            </div>
          </div>

          {/* Abstract */}
          <div className="p-5 bg-sky-50/60 border border-sky-200 rounded-xl space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 block">
              Curatorial Abstract
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
              {ARCHIVAL_THESIS.abstract}
            </p>
          </div>

          {/* Detailed Findings */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
              Empirical Findings &amp; Genomic Stratification
            </h3>

            {ARCHIVAL_THESIS.findings.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                  {item.title}
                </span>
                <h4 className="font-serif text-base font-bold text-slate-900">
                  {item.highlight}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Genomic Markers Table */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Table 1: Target Phenotypic Loci &amp; Observed Allelic Frequencies
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 text-[10px] uppercase font-bold">
                  <tr>
                    <th className="p-3">Gene Locus</th>
                    <th className="p-3">Chromosome</th>
                    <th className="p-3">Phenotypic Expression</th>
                    <th className="p-3">Clade Association</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-sky-700">FGF5</td>
                    <td className="p-3 font-mono">CFA32</td>
                    <td className="p-3">Double coat woolly underfur retention</td>
                    <td className="p-3 text-slate-600">Arctic Spitz (Husky, Samoyed)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-sky-700">DRD4</td>
                    <td className="p-3 font-mono">CFA18</td>
                    <td className="p-3">Dopaminergic operant cue responsiveness</td>
                    <td className="p-3 text-slate-600">Pastoral / Working Herders</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-sky-700">EPAS1</td>
                    <td className="p-3 font-mono">CFA10</td>
                    <td className="p-3">Hypobaric pulmonary oxygen carriage</td>
                    <td className="p-3 text-slate-600">Chukotka Peninsula Sled Canids</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-sky-700">BMP3</td>
                    <td className="p-3 font-mono">CFA32</td>
                    <td className="p-3">Dolichocephalic cranial elongation</td>
                    <td className="p-3 text-slate-600">Doberman Pinscher / Sighthound</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Citation footer */}
          <div className="pt-6 border-t border-slate-200 text-xs text-slate-500">
            <span className="font-bold text-slate-800 block mb-1">Standard Archival Citation:</span>
            <code className="p-2.5 rounded bg-slate-100 block text-[11px] font-mono select-all">
              Vance, A., Takahashi, K., &amp; Moreau, H. (2024). Whole-Genome Comparative Sequencing of Basal Arctic &amp; European Working Lineages. Nature Cynological Genetics, 34(4), 412–460. DOI:10.1038/s41588-canis-024
            </code>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
