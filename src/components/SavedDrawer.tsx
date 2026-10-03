import React, { useState } from 'react';
import { BREED_DATA, BreedMonograph } from '../data/breeds';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedBreedIds: string[];
  onToggleSave: (breedId: string) => void;
  onSelectBreed: (breedId: string) => void;
  onClearAll: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedBreedIds,
  onToggleSave,
  onSelectBreed,
  onClearAll
}) => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  const savedBreeds: BreedMonograph[] = BREED_DATA.filter((b) => savedBreedIds.includes(b.id));

  const handleCopyBibliography = (format: 'apa' | 'bibtex') => {
    let text = '';
    if (format === 'apa') {
      text = savedBreeds
        .map(
          (b) =>
            `CANIS Archival Cynology. (2024). Monograph: ${b.name} (${b.latinName}). FCI Standard ${b.fciNumber}. https://canis-monograph.org/vault/${b.id}`
        )
        .join('\n\n');
    } else {
      text = savedBreeds
        .map(
          (b) => `@article{canis_${b.id},
  title={${b.name}: Modern Monograph and Biometrics},
  author={CANIS Curatorial Unit},
  journal={Archival Cynology Review},
  volume={2024},
  number={${b.fciNumber}},
  year={2024}
}`
        )
        .join('\n\n');
    }

    navigator.clipboard?.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-700 text-xl">bookmark</span>
            <div>
              <h2 className="font-serif text-lg font-bold text-slate-900">
                Curator Vault ({savedBreeds.length})
              </h2>
              <p className="text-xs text-slate-500">Bookmarked Canine Monograph Records</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {savedBreeds.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-slate-400">
              <span className="material-symbols-outlined text-5xl">bookmark_border</span>
              <h3 className="font-serif text-base font-bold text-slate-700">Your Vault is Empty</h3>
              <p className="text-xs max-w-xs mx-auto">
                Bookmark distinguished breeds from the compendium or individual monograph sheets to review them here.
              </p>
            </div>
          ) : (
            savedBreeds.map((breed) => (
              <div
                key={breed.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 group hover:border-slate-300 transition-all"
              >
                <img
                  src={breed.imageUrl}
                  alt={breed.name}
                  className="w-16 h-16 rounded-lg object-cover cursor-pointer shrink-0"
                  onClick={() => {
                    onSelectBreed(breed.id);
                    onClose();
                  }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-amber-700 font-bold uppercase block truncate">
                    {breed.fciGroup} • {breed.origin}
                  </span>
                  <h4
                    onClick={() => {
                      onSelectBreed(breed.id);
                      onClose();
                    }}
                    className="font-serif text-sm font-bold text-slate-900 truncate hover:text-sky-700 cursor-pointer"
                  >
                    {breed.name}
                  </h4>
                  <span className="text-xs text-slate-500">
                    {breed.biteForcePsi} PSI • {breed.lifespanMin}–{breed.lifespanMax} yrs
                  </span>
                </div>
                <button
                  onClick={() => onToggleSave(breed.id)}
                  title="Remove from saved"
                  className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {savedBreeds.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Export Academic Citations
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCopyBibliography('apa')}
                className="py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-center"
              >
                {copiedFormat === 'apa' ? 'Copied APA!' : 'Copy APA Citations'}
              </button>
              <button
                onClick={() => handleCopyBibliography('bibtex')}
                className="py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-center"
              >
                {copiedFormat === 'bibtex' ? 'Copied BibTeX!' : 'Copy BibTeX'}
              </button>
            </div>
            <button
              onClick={onClearAll}
              className="w-full text-center text-xs text-rose-600 hover:underline pt-2 font-medium cursor-pointer"
            >
              Clear All Saved Records
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
