import React, { useState, useMemo } from 'react';
import { BREED_DATA, TAXA_FILTERS, BreedMonograph } from '../data/breeds';

interface OverviewViewProps {
  onSelectBreed: (breedId: string) => void;
  savedBreedIds: string[];
  onToggleSave: (breedId: string) => void;
  onOpenThesis: () => void;
  onOpenSubmissionSuccess: (data: { breed: string; credentials: string }) => void;
  selectedTaxa: string;
  onSelectTaxa: (taxa: string) => void;
  onOpenCompare: (initialBreedId?: string) => void;
}

type SortField = 'name' | 'intellectScore' | 'energyScore' | 'biteForcePsi' | 'lifespanMax';

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectBreed,
  savedBreedIds,
  onToggleSave,
  onOpenThesis,
  onOpenSubmissionSuccess,
  selectedTaxa,
  onSelectTaxa,
  onOpenCompare
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDenseGrid, setIsDenseGrid] = useState(false);
  const [matrixSortField, setMatrixSortField] = useState<SortField>('intellectScore');
  const [matrixSortAsc, setMatrixSortAsc] = useState(false);
  const [matrixMode, setMatrixMode] = useState<'standard' | 'empirical'>('standard');

  // Submission Form State
  const [subBreed, setSubBreed] = useState('');
  const [subCredentials, setSubCredentials] = useState('');
  const [formError, setFormError] = useState('');

  // Filtered Breeds
  const filteredBreeds = useMemo(() => {
    return BREED_DATA.filter((breed) => {
      const matchesTaxa =
        selectedTaxa === 'all' ||
        (selectedTaxa === 'spitz' && breed.category === 'spitz') ||
        (selectedTaxa === 'working' && (breed.category === 'working' || breed.tags.includes('working'))) ||
        (selectedTaxa === 'herding' && breed.category === 'herding') ||
        (selectedTaxa === 'sporting' && breed.category === 'sporting');

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        breed.name.toLowerCase().includes(q) ||
        breed.origin.toLowerCase().includes(q) ||
        breed.taxaTag.toLowerCase().includes(q) ||
        breed.fciGroup.toLowerCase().includes(q) ||
        breed.keyTraits.some((t) => t.toLowerCase().includes(q)) ||
        breed.tags.some((t) => t.toLowerCase().includes(q));

      return matchesTaxa && matchesQuery;
    });
  }, [selectedTaxa, searchQuery]);

  // Sorted Breeds for Matrix Table
  const sortedMatrixBreeds = useMemo(() => {
    return [...BREED_DATA].sort((a, b) => {
      let valA: string | number = a[matrixSortField];
      let valB: string | number = b[matrixSortField];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return matrixSortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return matrixSortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [matrixSortField, matrixSortAsc]);

  const handleSort = (field: SortField) => {
    if (matrixSortField === field) {
      setMatrixSortAsc(!matrixSortAsc);
    } else {
      setMatrixSortField(field);
      setMatrixSortAsc(false);
    }
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subBreed.trim() || !subCredentials.trim()) {
      setFormError('Please supply both the specimen taxon and curator credentials.');
      return;
    }
    setFormError('');
    onOpenSubmissionSuccess({
      breed: subBreed.trim(),
      credentials: subCredentials.trim()
    });
    setSubBreed('');
    setSubCredentials('');
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* 1. Top Archival Intro & Status Ticker */}
      <section className="w-full px-4 sm:px-6 lg:px-10 py-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200 text-sky-800 text-[11px] uppercase tracking-widest font-semibold shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
              Curatorial Taxonomy &amp; Biometrics Release 2024.IV
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              CANIS <span className="italic text-sky-700 font-normal font-serif">—</span> The Modern
              Canine Monograph &amp; Taxonomy
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              A curated digital compendium of the world's most distinguished breeds — detailing
              anatomical heritage, behavioral profiles, genetic traits, and care dynamics with
              forensic precision.
            </p>
          </div>

          {/* Quick Stats Metrics Pod */}
          <div className="grid grid-cols-3 gap-2 bg-white border border-slate-200 p-4 rounded-xl shadow-xs shrink-0">
            <div className="flex flex-col pr-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Index Monograms
              </span>
              <span className="text-xl text-sky-700 font-bold mt-1 tabular-nums">6 Volumes</span>
              <span className="text-xs text-slate-500 mt-0.5">Peer Verified</span>
            </div>
            <div className="flex flex-col px-4 bg-slate-50 border-x border-slate-200 rounded">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Trait Accuracy
              </span>
              <span className="text-xl text-amber-700 font-bold mt-1 tabular-nums">100% Genomic</span>
              <span className="text-xs text-slate-500 mt-0.5">Phenotypic Cross</span>
            </div>
            <div className="flex flex-col pl-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Registries
              </span>
              <span className="text-xl text-sky-700 font-bold mt-1">FCI / AKC</span>
              <span className="text-xs text-slate-500 mt-0.5">Dual Indexed</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Matrix Bar */}
        <div className="mt-4 p-2 bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
          {/* Taxa Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold px-2">
              Taxa Filter:
            </span>
            {TAXA_FILTERS.map((filter) => {
              const isActive = selectedTaxa === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => onSelectTaxa(filter.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Search Input & Density Toggle */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <div className="relative flex items-center w-full md:w-64">
              <span className="material-symbols-outlined absolute left-2.5 text-slate-400 text-[16px] pointer-events-none">
                tune
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by trait, origin..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs pl-8 pr-3 py-1.5 rounded-lg outline-hidden placeholder:text-slate-400 focus:border-sky-600 focus:bg-white transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-slate-400 hover:text-slate-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => setIsDenseGrid(!isDenseGrid)}
              title={isDenseGrid ? 'Switch to 3-column layout' : 'Switch to 2-column wide layout'}
              className={`px-2.5 py-1.5 border border-slate-200 rounded-lg flex items-center justify-center transition-colors shadow-xs ${
                isDenseGrid
                  ? 'bg-sky-50 text-sky-700 border-sky-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDenseGrid ? 'view_agenda' : 'grid_view'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Featured Breed Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Curated Breed Monographies
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 uppercase font-semibold">
              {filteredBreeds.length} Primary Records
            </span>
          </div>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold hidden sm:inline">
            Chronological Monograph Order
          </span>
        </div>

        {filteredBreeds.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-xl mx-auto my-8">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">search_off</span>
            <h3 className="font-serif text-lg font-bold text-slate-800">No Specimen Matching Query</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your taxa filter or keyword criteria.
            </p>
            <button
              onClick={() => {
                onSelectTaxa('all');
                setSearchQuery('');
              }}
              className="mt-4 px-3 py-1.5 rounded-lg bg-sky-700 text-white text-xs font-semibold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              isDenseGrid
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredBreeds.map((breed) => {
              const isSaved = savedBreedIds.includes(breed.id);

              return (
                <article
                  key={breed.id}
                  className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col transition-all duration-300 hover:shadow-xl hover:border-slate-300"
                >
                  {/* Image Plate */}
                  <div className="relative h-72 w-full overflow-hidden bg-slate-100">
                    <img
                      src={breed.imageUrl}
                      alt={`${breed.name} Monograph Plate`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                      <span className="px-2.5 py-0.5 rounded bg-white/90 backdrop-blur-md text-sky-800 text-[11px] uppercase tracking-wider font-semibold shadow-xs">
                        {breed.fciGroup}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/90 backdrop-blur-md text-white text-[11px] uppercase font-bold shadow-xs">
                        {breed.fciSection}
                      </span>
                    </div>

                    {/* Save & Compare Quick Overlays */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenCompare(breed.id);
                        }}
                        title="Compare in Biometric Lab"
                        className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur text-white flex items-center justify-center transition-colors"
                      >
                        <span className="material-symbols-outlined text-[15px]">compare_arrows</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(breed.id);
                        }}
                        title={isSaved ? 'Remove from Saved' : 'Save to Vault'}
                        className={`w-7 h-7 rounded-full backdrop-blur flex items-center justify-center transition-colors ${
                          isSaved
                            ? 'bg-amber-500 text-white'
                            : 'bg-black/40 hover:bg-black/70 text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {isSaved ? 'bookmark_added' : 'bookmark'}
                        </span>
                      </button>
                    </div>

                    {/* Bottom Image Label */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
                      <div>
                        <span className="text-[10px] text-amber-300 uppercase tracking-widest block font-semibold drop-shadow-xs">
                          {breed.taxaTag}
                        </span>
                        <h2 className="font-serif text-2xl font-bold text-white drop-shadow-md">
                          {breed.name}
                        </h2>
                      </div>
                      <span className="text-[11px] text-white uppercase bg-black/40 backdrop-blur px-2 py-1 rounded font-semibold shrink-0">
                        {breed.origin}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {breed.summary}
                    </p>

                    {/* Core Trait Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {breed.keyTraits.map((trait) => (
                        <span
                          key={trait}
                          className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-[10px] uppercase font-semibold border border-slate-200"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>

                    {/* Quick Metrics Bar */}
                    <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">
                          Energy
                        </span>
                        <span className="text-xs text-sky-700 font-bold tabular-nums">
                          {breed.energyScore.toFixed(1)} / 5.0
                        </span>
                      </div>
                      <div className="border-x border-slate-200 px-1">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">
                          Bite Index
                        </span>
                        <span className="text-xs text-slate-900 font-bold tabular-nums">
                          {breed.biteForcePsi} PSI
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">
                          Longevity
                        </span>
                        <span className="text-xs text-amber-700 font-bold tabular-nums">
                          {breed.lifespanMin}–{breed.lifespanMax} yrs
                        </span>
                      </div>
                    </div>

                    {/* Access Monograph Button */}
                    <button
                      onClick={() => onSelectBreed(breed.id)}
                      className="w-full py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-sky-700 hover:text-white text-slate-800 font-semibold border border-slate-200 transition-all duration-200 flex items-center justify-between text-xs uppercase tracking-wider group/link shadow-xs cursor-pointer"
                    >
                      <span>Access Monograph</span>
                      <span className="material-symbols-outlined text-[18px] transition-transform group-hover/link:translate-x-1">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. Comparative Biometric Cross-Analysis Matrix Table */}
      <section className="w-full px-4 sm:px-6 lg:px-10 py-8">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
          {/* Table Header Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-700 text-[20px]">analytics</span>
                <span className="text-[11px] text-sky-700 uppercase tracking-widest font-bold">
                  Comparative Diagnostics
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Cross-Specimen Biometric Matrix
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Synchronized empirical ratings across working aptitude, maintenance demand, and physiological thresholds.
              </p>
            </div>

            {/* Display Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 uppercase font-bold">Display:</span>
              <div className="flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg">
                <button
                  onClick={() => setMatrixMode('standard')}
                  className={`px-2.5 py-1 rounded text-[11px] uppercase font-semibold transition-all ${
                    matrixMode === 'standard'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Standard Scale (1–5)
                </button>
                <button
                  onClick={() => setMatrixMode('empirical')}
                  className={`px-2.5 py-1 rounded text-[11px] uppercase font-semibold transition-all ${
                    matrixMode === 'empirical'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Empirical Metrics
                </button>
              </div>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-[10px] uppercase tracking-wider border-b border-slate-200">
                  <th
                    onClick={() => handleSort('name')}
                    className="py-3 px-4 rounded-l font-bold cursor-pointer hover:bg-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Taxon Specimen</span>
                      {matrixSortField === 'name' && (
                        <span>{matrixSortAsc ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="py-3 px-4 font-bold">Working Class</th>
                  <th
                    onClick={() => handleSort('intellectScore')}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Working Intellect</span>
                      {matrixSortField === 'intellectScore' && (
                        <span>{matrixSortAsc ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('energyScore')}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Daily Kinetic Output</span>
                      {matrixSortField === 'energyScore' && (
                        <span>{matrixSortAsc ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="py-3 px-4 font-bold">Grooming Index</th>
                  <th
                    onClick={() => handleSort('lifespanMax')}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Mean Lifespan</span>
                      {matrixSortField === 'lifespanMax' && (
                        <span>{matrixSortAsc ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('biteForcePsi')}
                    className="py-3 px-4 rounded-r font-bold cursor-pointer hover:bg-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Bite Metric</span>
                      {matrixSortField === 'biteForcePsi' && (
                        <span>{matrixSortAsc ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-100">
                {sortedMatrixBreeds.map((breed, idx) => {
                  const intellectPct = (breed.intellectScore / 5) * 100;
                  const energyPct = (breed.energyScore / 5) * 100;

                  return (
                    <tr
                      key={breed.id}
                      onClick={() => onSelectBreed(breed.id)}
                      className={`cursor-pointer transition-colors group ${
                        idx % 2 === 1 ? 'bg-slate-50/70 hover:bg-sky-50/50' : 'hover:bg-sky-50/50'
                      }`}
                    >
                      {/* Name */}
                      <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            breed.category === 'spitz'
                              ? 'bg-sky-500'
                              : breed.category === 'herding'
                              ? 'bg-amber-600'
                              : breed.category === 'working'
                              ? 'bg-indigo-600'
                              : 'bg-emerald-600'
                          }`}
                        />
                        <span className="group-hover:text-sky-700 transition-colors">
                          {breed.name}
                        </span>
                      </td>

                      {/* Class */}
                      <td className="py-3.5 px-4 text-slate-500 uppercase text-[10px] font-semibold">
                        {breed.workingClass}
                      </td>

                      {/* Intellect */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-sky-700 rounded-full transition-all"
                              style={{ width: `${intellectPct}%` }}
                            />
                          </div>
                          <span className="font-bold text-sky-700 tabular-nums">
                            {breed.intellectScore.toFixed(1)}
                            {breed.intellectRank && breed.intellectRank <= 10 && (
                              <span className="text-[10px] text-slate-500 ml-1">
                                (#{breed.intellectRank})
                              </span>
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Kinetic Output */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-600 rounded-full transition-all"
                              style={{ width: `${energyPct}%` }}
                            />
                          </div>
                          <span className="font-bold text-amber-700 tabular-nums">
                            {matrixMode === 'empirical'
                              ? `${(breed.energyScore * 4.5).toFixed(1)} MJ/d`
                              : breed.energyScore.toFixed(1)}
                          </span>
                        </div>
                      </td>

                      {/* Grooming Index */}
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        Level {breed.groomingLevel}{' '}
                        <span className="text-slate-400 text-[10px]">
                          ({breed.groomingNote.split('(')[0].trim()})
                        </span>
                      </td>

                      {/* Lifespan */}
                      <td className="py-3.5 px-4 font-semibold text-slate-900 tabular-nums">
                        {breed.lifespanMin} – {breed.lifespanMax} yrs
                      </td>

                      {/* Bite Metric */}
                      <td className="py-3.5 px-4 font-bold text-sky-700 tabular-nums">
                        {matrixMode === 'empirical'
                          ? `${(breed.biteForcePsi * 6.89476).toFixed(0)} kPa`
                          : `${breed.biteForcePsi} PSI`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Editorial Deep Dive & Archival Research Module */}
      <section className="w-full px-4 sm:px-6 lg:px-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured Research Paper Banner (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between shadow-xs relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-sky-100/50 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded bg-sky-100 border border-sky-200 text-sky-800 text-[11px] uppercase tracking-wider font-semibold">
                  Featured Archival Thesis
                </span>
                <span className="text-[11px] text-slate-400 uppercase font-semibold">
                  Genomic Series 2024.11
                </span>
              </div>

              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-slate-900 max-w-xl leading-tight">
                Whole-Genome Comparative Sequencing of Basal Arctic &amp; European Working Lineages
              </h2>

              <p className="text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
                An empirical investigation analyzing 142 microsatellite markers and single-nucleotide
                polymorphisms (SNPs) across the Chukchi Siberian, Spitz, and Western Herding
                clades, validating phenotypic insulation alleles (FGF5, RSPO2) and bite mechanics loci.
              </p>

              {/* Key Takeaways Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-amber-700 block">
                    Key Finding I
                  </span>
                  <p className="text-xs text-slate-900 mt-1">
                    Arctic clades exhibit distinct mitochondrial haplogroup d2, isolated 9,500 years
                    BP.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-sky-700 block">
                    Key Finding II
                  </span>
                  <p className="text-xs text-slate-900 mt-1">
                    Working group trainability correlates directly with DRD4 dopamine receptor
                    polymorphisms.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-3 mt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-400 uppercase font-semibold">
                <span>DOI: 10.1038/s41588-canis-024</span>
                <span>•</span>
                <span>48 Pages • PDF Archive</span>
              </div>
              <button
                onClick={onOpenThesis}
                type="button"
                className="px-4 py-2 rounded-lg bg-sky-700 text-white text-xs uppercase tracking-wider hover:bg-sky-800 transition-all flex items-center gap-1.5 shadow-xs font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                <span>Read Archival Thesis</span>
              </button>
            </div>
          </div>

          {/* Quick Curatorial Inquiry Pod (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Cynological Standard Registry
                </span>
                <span className="material-symbols-outlined text-amber-600 text-[20px]">verified</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mt-3">
                Request Phenotypic Submission
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Registered cynological breeders, geneticists, and breed club archivists can submit
                verified biometrics, cranial indices, and health registries for inclusion in the
                2025 monograph cycle.
              </p>

              {/* Input Form */}
              <form onSubmit={handleSubmitInquiry} className="mt-4 space-y-3">
                {formError && (
                  <div className="p-2 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    {formError}
                  </div>
                )}
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Breed Taxon / FCI Index
                  </label>
                  <input
                    type="text"
                    value={subBreed}
                    onChange={(e) => setSubBreed(e.target.value)}
                    placeholder="e.g. Alaskan Malamute (FCI 243)"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-3.5 py-2.5 rounded-lg outline-hidden placeholder:text-slate-400 focus:border-sky-600 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Curator Credentials / Lab Affiliation
                  </label>
                  <input
                    type="text"
                    value={subCredentials}
                    onChange={(e) => setSubCredentials(e.target.value)}
                    placeholder="e.g. OFA Certified / UC Davis Cynological Unit"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-3.5 py-2.5 rounded-lg outline-hidden placeholder:text-slate-400 focus:border-sky-600 focus:bg-white transition-colors"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs font-semibold cursor-pointer"
                  >
                    <span>Transmit Inquiry To Curators</span>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
