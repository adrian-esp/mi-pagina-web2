import React from 'react';

interface FooterProps {
  onSelectBreed: (breedId: string) => void;
  onOpenThesis: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectBreed, onOpenThesis }) => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 py-10 mt-16">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200">
          {/* Main Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl uppercase tracking-wider text-slate-900 font-bold">
                CANIS
              </span>
              <span className="text-[11px] uppercase text-amber-800 px-2 py-0.5 rounded bg-orange-50 border border-orange-200 font-semibold tracking-wide">
                Standard Monograph Vault
              </span>
            </div>
            <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
              An uncompromising digital natural history monograph dedicated to canine anatomy,
              biometric cataloging, structural morphology, and evolutionary genetics. Verified
              against international cynological standards.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-400 uppercase font-semibold tracking-wider flex-wrap">
              <span>FCI Standard Grouping</span>
              <span className="text-slate-300">•</span>
              <span>AKC Structural Registry</span>
              <span className="text-slate-300">•</span>
              <span>Genomic Phenotypes</span>
            </div>
          </div>

          {/* Curatorial Indices */}
          <div className="space-y-2">
            <h4 className="text-[11px] uppercase tracking-wider text-slate-900 font-bold">
              Curatorial Indices
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li
                onClick={() => onSelectBreed('siberian-husky')}
                className="hover:text-sky-700 transition-colors cursor-pointer"
              >
                Bite Force Biometrics (PSI)
              </li>
              <li
                onClick={() => onSelectBreed('samoyed')}
                className="hover:text-sky-700 transition-colors cursor-pointer"
              >
                Coat Morphology Spectrum
              </li>
              <li
                onClick={() => onSelectBreed('doberman-pinscher')}
                className="hover:text-sky-700 transition-colors cursor-pointer"
              >
                Cranial Morphometrics
              </li>
              <li
                onClick={onOpenThesis}
                className="hover:text-sky-700 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Genetic Load &amp; Longevity</span>
                <span className="text-[10px] text-sky-600 font-bold">→</span>
              </li>
            </ul>
          </div>

          {/* Monograph Records */}
          <div className="space-y-2">
            <h4 className="text-[11px] uppercase tracking-wider text-slate-900 font-bold">
              Monograph Records
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li
                onClick={() => onSelectBreed('siberian-husky')}
                className="hover:text-sky-700 transition-colors cursor-pointer"
              >
                Siberian Arctic Lineages
              </li>
              <li
                onClick={() => onSelectBreed('german-shepherd')}
                className="hover:text-sky-700 transition-colors cursor-pointer"
              >
                Pastoral Working Trials
              </li>
              <li
                onClick={() => onSelectBreed('shiba-inu')}
                className="hover:text-sky-700 transition-colors cursor-pointer"
              >
                Nihon Ken Native Breeds
              </li>
              <li
                onClick={() => onSelectBreed('golden-retriever')}
                className="hover:text-sky-700 transition-colors cursor-pointer"
              >
                Comparative Anatomical Atlas
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 uppercase tracking-wide">
          <p>© 2024–2026 CANIS Encyclopedia. Curated under International Cynological Standards.</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span>Database v4.18.2</span>
            <span>•</span>
            <span>Encrypted Monograph Vault</span>
            <span>•</span>
            <span>Specimen Archives</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
