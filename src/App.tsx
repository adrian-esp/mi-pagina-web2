/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OverviewView } from './components/OverviewView';
import { MonographView } from './components/MonographView';
import { CompareModal } from './components/CompareModal';
import { SavedDrawer } from './components/SavedDrawer';
import { ThesisReaderModal } from './components/ThesisReaderModal';
import { SearchModal } from './components/SearchModal';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { BREED_DATA } from './data/breeds';

export default function App() {
  const [currentView, setCurrentView] = useState<'overview' | string>('overview');
  const [selectedTaxa, setSelectedTaxa] = useState<string>('all');

  // Bookmarks persistence
  const [savedBreedIds, setSavedBreedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('canis_saved_breeds');
      return stored ? JSON.parse(stored) : ['siberian-husky', 'doberman-pinscher'];
    } catch {
      return ['siberian-husky', 'doberman-pinscher'];
    }
  });

  // Modals state
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareInitialBreed, setCompareInitialBreed] = useState<string | undefined>(undefined);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isThesisOpen, setIsThesisOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [submissionSuccessData, setSubmissionSuccessData] = useState<{
    breed: string;
    credentials: string;
  } | null>(null);

  // Sync saved to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('canis_saved_breeds', JSON.stringify(savedBreedIds));
    } catch {
      // ignore
    }
  }, [savedBreedIds]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCompareOpen(false);
        setIsSavedDrawerOpen(false);
        setIsThesisOpen(false);
        setSubmissionSuccessData(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSave = (breedId: string) => {
    setSavedBreedIds((prev) =>
      prev.includes(breedId) ? prev.filter((id) => id !== breedId) : [...prev, breedId]
    );
  };

  const handleClearAllSaved = () => {
    setSavedBreedIds([]);
  };

  const handleOpenCompare = (initialBreedId?: string) => {
    setCompareInitialBreed(initialBreedId);
    setIsCompareOpen(true);
  };

  const handleSelectBreedFromSearchOrCompare = (breedId: string) => {
    setCurrentView(breedId);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col font-sans selection:bg-[#0284c7] selection:text-white">
      {/* Fixed Header */}
      <Header
        currentView={currentView}
        onSelectView={(view) => setCurrentView(view)}
        savedBreedIds={savedBreedIds}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenCompare={() => handleOpenCompare()}
        onOpenSearch={() => setIsSearchOpen(true)}
        selectedTaxa={selectedTaxa}
        onSelectTaxa={(taxa) => setSelectedTaxa(taxa)}
      />

      {/* Main Content (with top padding for fixed header) */}
      <main className="flex-1 w-full pt-28">
        {currentView === 'overview' ? (
          <OverviewView
            onSelectBreed={(breedId) => setCurrentView(breedId)}
            savedBreedIds={savedBreedIds}
            onToggleSave={handleToggleSave}
            onOpenThesis={() => setIsThesisOpen(true)}
            onOpenSubmissionSuccess={(data) => setSubmissionSuccessData(data)}
            selectedTaxa={selectedTaxa}
            onSelectTaxa={setSelectedTaxa}
            onOpenCompare={handleOpenCompare}
          />
        ) : (
          <MonographView
            breedId={currentView}
            onSelectBreed={(breedId) => setCurrentView(breedId)}
            onBackToOverview={() => setCurrentView('overview')}
            savedBreedIds={savedBreedIds}
            onToggleSave={handleToggleSave}
            onOpenCompare={(breedId) => handleOpenCompare(breedId)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectBreed={(breedId) => setCurrentView(breedId)}
        onOpenThesis={() => setIsThesisOpen(true)}
      />

      {/* Interactive Overlays & Modals */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        initialBreedId={compareInitialBreed}
        onSelectBreed={handleSelectBreedFromSearchOrCompare}
      />

      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedBreedIds={savedBreedIds}
        onToggleSave={handleToggleSave}
        onSelectBreed={(breedId) => {
          setCurrentView(breedId);
          setIsSavedDrawerOpen(false);
        }}
        onClearAll={handleClearAllSaved}
      />

      <ThesisReaderModal
        isOpen={isThesisOpen}
        onClose={() => setIsThesisOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectBreed={handleSelectBreedFromSearchOrCompare}
      />

      <SubmissionSuccessModal
        data={submissionSuccessData}
        onClose={() => setSubmissionSuccessData(null)}
      />
    </div>
  );
}
