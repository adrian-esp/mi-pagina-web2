import React, { useState, useEffect, useRef } from 'react';
import { BREED_DATA, BreedMonograph } from '../data/breeds';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBreed: (breedId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectBreed }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = BREED_DATA.filter((breed) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      breed.name.toLowerCase().includes(q) ||
      breed.origin.toLowerCase().includes(q) ||
      breed.fciGroup.toLowerCase().includes(q) ||
      breed.taxaTag.toLowerCase().includes(q) ||
      breed.keyTraits.some((t) => t.toLowerCase().includes(q)) ||
      breed.workingClass.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Input header */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by breed, traits (e.g. double-coat, bite force), FCI group, or origin..."
            className="flex-1 bg-transparent text-sm text-slate-900 outline-hidden placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 text-xs px-1"
            >
              Clear
            </button>
          )}
          <kbd className="px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[11px] font-mono border border-slate-300">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <span className="material-symbols-outlined text-4xl mb-1">search_off</span>
              <p className="text-xs">No cynological records found for "{query}"</p>
            </div>
          ) : (
            filtered.map((breed) => (
              <div
                key={breed.id}
                onClick={() => {
                  onSelectBreed(breed.id);
                  onClose();
                }}
                className="p-3 hover:bg-sky-50/70 rounded-xl cursor-pointer flex items-center gap-3 transition-colors group"
              >
                <img
                  src={breed.imageUrl}
                  alt={breed.name}
                  className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-sm font-bold text-slate-900 group-hover:text-sky-700">
                      {breed.name}
                    </h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold uppercase">
                      {breed.fciGroup}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {breed.summary}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                    <span>{breed.origin}</span>
                    <span>•</span>
                    <span className="text-sky-700 font-semibold">{breed.biteForcePsi} PSI</span>
                    <span>•</span>
                    <span>{breed.workingClass}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-sky-600 text-lg">
                  arrow_forward
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>{filtered.length} indexed records found</span>
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 border border-slate-300 font-mono text-[10px]">
              ESC
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
