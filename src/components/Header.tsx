import React from 'react';
import { BREED_DATA } from '../data/breeds';

interface HeaderProps {
  currentView: 'overview' | string; // 'overview' or breed id
  onSelectView: (view: 'overview' | string) => void;
  savedBreedIds: string[];
  onOpenSaved: () => void;
  onOpenCompare: () => void;
  onOpenSearch: () => void;
  selectedTaxa: string;
  onSelectTaxa: (taxa: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  savedBreedIds,
  onOpenSaved,
  onOpenCompare,
  onOpenSearch,
  selectedTaxa,
  onSelectTaxa
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-xs">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-2.5 flex flex-col justify-center">
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          {/* Brand and Nav */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Logo */}
            <button
              onClick={() => onSelectView('overview')}
              className="flex items-center gap-2.5 text-left group transition-opacity hover:opacity-90"
              title="CANIS Archival Cynology Home"
            >
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1V1kwjQDMYmF0Bn6Pq6RxLOcP5xPB14esKRX7ichG72aIYqHsuappSTSL48PecCl9uy4PWEPEO4AT5tUXcg4B2nIKYtZRnHxwwNjUMYbhltgotv7nyLMs9WRLbCxkV5zAw4YpaJKWIzc6kMiiTY-dR_xpHEvk1SIeOv66PASG-RO8c-bQuP0vWZgig-H-5hiyvPsAqJzxGKr0wJ0U62Q7w-wv8TegHlpSozcdljEAmDcwG2ObUv5p7HNg"
                alt="CANIS Logo"
                className="h-8 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-wider text-slate-900 leading-tight">
                  CANIS
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-700 leading-none">
                  Archival Cynology
                </span>
              </div>
            </button>

            <div className="h-7 w-[1px] bg-slate-200 hidden xl:block" />

            {/* Nav Links */}
            <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
              <button
                onClick={() => onSelectView('overview')}
                className={`px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold transition-all ${
                  currentView === 'overview'
                    ? 'bg-sky-50 text-sky-700 border border-sky-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                All Breeds
              </button>
              {BREED_DATA.map((breed) => (
                <button
                  key={breed.id}
                  onClick={() => onSelectView(breed.id)}
                  className={`px-3 py-1.5 rounded text-[11px] uppercase tracking-wider transition-all whitespace-nowrap ${
                    currentView === breed.id
                      ? 'bg-sky-50 text-sky-700 border border-sky-200 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {breed.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <button
              onClick={onOpenSearch}
              className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-lg text-slate-700 text-left pl-9 pr-14 py-2 text-xs transition-all outline-hidden shadow-xs flex items-center justify-between group"
            >
              <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[18px] group-hover:text-sky-600 transition-colors">
                search
              </span>
              <span className="text-slate-500">Search breeds, genetics, traits, FCI indices...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 text-[11px] font-mono border border-slate-300">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Index stats pill */}
            <div className="hidden 2xl:flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded text-xs">
              <span className="text-slate-500 uppercase text-[10px] font-semibold">Indexed:</span>
              <span className="text-sky-700 font-bold tabular-nums">362 Breeds</span>
              <span className="text-slate-300">|</span>
              <span className="text-amber-700 font-bold tabular-nums">10 Groups</span>
            </div>

            {/* Compare Tool button */}
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors text-xs font-semibold"
              title="Open Comparative Diagnostics Lab"
            >
              <span className="material-symbols-outlined text-[17px] text-sky-600">compare_arrows</span>
              <span className="hidden sm:inline uppercase text-[11px]">Compare</span>
            </button>

            {/* Saved Bookmarks button */}
            <button
              onClick={onOpenSaved}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors text-xs font-semibold"
              title="View Bookmarked Monographies"
            >
              <span className="material-symbols-outlined text-[18px] text-amber-700">bookmark</span>
              <span className="uppercase text-[11px] hidden sm:inline">Saved</span>
              {savedBreedIds.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center -mr-1">
                  {savedBreedIds.length}
                </span>
              )}
            </button>

            {/* Search icon button for mobile */}
            <button
              onClick={onOpenSearch}
              className="md:hidden w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700"
              title="Search"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>

            {/* Curator avatar badge */}
            <div
              className="w-8 h-8 rounded-full bg-sky-700 flex items-center justify-center shrink-0 shadow-xs cursor-pointer text-white"
              title="Curator Profile: Dr. K. Vance (Fellow of Archival Cynology)"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </div>
          </div>
        </div>

        {/* Secondary Taxa Quick Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold shrink-0">
              Taxa:
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  onSelectView('overview');
                  onSelectTaxa('working');
                }}
                className={`px-2.5 py-0.5 rounded text-[11px] uppercase font-semibold transition-colors ${
                  selectedTaxa === 'working' && currentView === 'overview'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                Working
              </button>
              <button
                onClick={() => {
                  onSelectView('overview');
                  onSelectTaxa('spitz');
                }}
                className={`px-2.5 py-0.5 rounded text-[11px] uppercase font-semibold transition-colors ${
                  selectedTaxa === 'spitz' && currentView === 'overview'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                Spitz &amp; Primitive
              </button>
              <button
                onClick={() => {
                  onSelectView('overview');
                  onSelectTaxa('herding');
                }}
                className={`px-2.5 py-0.5 rounded text-[11px] uppercase font-semibold transition-colors ${
                  selectedTaxa === 'herding' && currentView === 'overview'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                Herding
              </button>
              <button
                onClick={() => {
                  onSelectView('overview');
                  onSelectTaxa('sporting');
                }}
                className={`px-2.5 py-0.5 rounded text-[11px] uppercase font-semibold transition-colors ${
                  selectedTaxa === 'sporting' && currentView === 'overview'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                Sporting
              </button>
              <button
                onClick={() => {
                  onSelectView('overview');
                  onSelectTaxa('all');
                }}
                className={`px-2.5 py-0.5 rounded text-[11px] uppercase font-semibold transition-colors ${
                  selectedTaxa === 'all' && currentView === 'overview'
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                All (6)
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
            <span>Curated Archival Standard 2024.4</span>
          </div>
        </div>
      </div>
    </header>
  );
};
