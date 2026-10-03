import React, { useState } from 'react';
import { BREED_DATA, BreedMonograph } from '../data/breeds';

interface MonographViewProps {
  breedId: string;
  onSelectBreed: (breedId: string) => void;
  onBackToOverview: () => void;
  savedBreedIds: string[];
  onToggleSave: (breedId: string) => void;
  onOpenCompare: (breedId: string) => void;
}

export const MonographView: React.FC<MonographViewProps> = ({
  breedId,
  onSelectBreed,
  onBackToOverview,
  savedBreedIds,
  onToggleSave,
  onOpenCompare
}) => {
  const [activeTab, setActiveTab] = useState<'morphology' | 'behavior' | 'genetics' | 'history'>('morphology');
  const [copiedCitation, setCopiedCitation] = useState(false);

  const breedIndex = BREED_DATA.findIndex((b) => b.id === breedId);
  const breed: BreedMonograph = breedIndex !== -1 ? BREED_DATA[breedIndex] : BREED_DATA[0];

  const prevBreed = BREED_DATA[(breedIndex - 1 + BREED_DATA.length) % BREED_DATA.length];
  const nextBreed = BREED_DATA[(breedIndex + 1) % BREED_DATA.length];

  const isSaved = savedBreedIds.includes(breed.id);

  const handleCopyCitation = () => {
    const citation = `CANIS Cynological Archive (2024). Monograph Folio: ${breed.name} (${breed.latinName}). FCI Standard No. ${breed.fciNumber}. DOI: 10.1038/s41588-canis-024-${breed.id}.`;
    navigator.clipboard?.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="w-full px-4 sm:px-6 lg:px-10 py-6 max-w-7xl mx-auto pb-16">
      {/* 1. Breadcrumbs & Quick Nav Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={onBackToOverview}
            className="hover:text-sky-700 transition-colors font-medium flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Archival Vault</span>
          </button>
          <span>/</span>
          <span className="text-slate-400 uppercase text-[10px]">{breed.fciGroup}</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{breed.name}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Previous / Next buttons */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
            <button
              onClick={() => onSelectBreed(prevBreed.id)}
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors"
              title={`Previous: ${prevBreed.name}`}
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span className="text-[10px] px-2 text-slate-400 font-mono">
              0{breedIndex + 1} / 0{BREED_DATA.length}
            </span>
            <button
              onClick={() => onSelectBreed(nextBreed.id)}
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors"
              title={`Next: ${nextBreed.name}`}
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleSave(breed.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
              isSaved
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isSaved ? 'bookmark_added' : 'bookmark'}
            </span>
            <span>{isSaved ? 'Saved in Vault' : 'Save Folio'}</span>
          </button>

          {/* Compare Button */}
          <button
            onClick={() => onOpenCompare(breed.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-sky-600">compare_arrows</span>
            <span>Compare</span>
          </button>

          {/* Citation Button */}
          <button
            onClick={handleCopyCitation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            title="Copy academic bibliographic citation"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copiedCitation ? 'check' : 'format_quote'}
            </span>
            <span>{copiedCitation ? 'Copied Citation!' : 'Cite'}</span>
          </button>

          {/* Print / PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            title="Print or save as PDF"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print Folio</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Specimen Plate */}
      <section className="mt-6 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Visual Specimen Plate (5 Cols) */}
          <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-[480px] bg-slate-900 overflow-hidden">
            <img
              src={breed.imageUrl}
              alt={breed.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-white/95 backdrop-blur text-sky-800 text-[11px] font-bold uppercase tracking-wider shadow-xs">
                {breed.fciGroup}
              </span>
              <span className="px-2.5 py-1 rounded bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                FCI #{breed.fciNumber}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] text-amber-300 uppercase tracking-widest font-semibold block">
                {breed.taxaTag}
              </span>
              <p className="text-xs text-slate-200 italic mt-0.5 font-serif">
                {breed.latinName}
              </p>
              <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-300">
                <span>Origin: {breed.origin}</span>
                <span>•</span>
                <span>AKC {breed.akcRecognition}</span>
              </div>
            </div>
          </div>

          {/* Specimen Curatorial Summary (7 Cols) */}
          <div className="lg:col-span-7 p-6 lg:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[11px] uppercase font-bold tracking-widest text-sky-700">
                  Canine Monograph Record Vol. 0{breedIndex + 1}
                </span>
                <span className="text-[11px] text-slate-400 font-mono uppercase">
                  Epoch: {breed.historicalEpoch}
                </span>
              </div>

              <div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                  {breed.name}
                </h1>
                <p className="text-sm font-serif italic text-slate-500 mt-1">
                  Taxon classification: {breed.latinName}
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                {breed.summary}
              </p>

              {/* Trait Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {breed.keyTraits.map((trait) => (
                  <span
                    key={trait}
                    className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-semibold uppercase tracking-wider border border-slate-200"
                  >
                    {trait}
                  </span>
                ))}
                <span className="px-2.5 py-1 rounded bg-sky-50 text-sky-800 text-xs font-semibold uppercase tracking-wider border border-sky-200">
                  {breed.workingClass}
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Working Intellect
                </span>
                <span className="text-base text-sky-700 font-bold tabular-nums">
                  {breed.intellectScore.toFixed(1)} / 5.0
                </span>
                {breed.intellectRank && (
                  <span className="text-[10px] text-slate-500 block">
                    (Rank #{breed.intellectRank})
                  </span>
                )}
              </div>
              <div className="sm:border-l border-slate-200">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Kinetic Energy
                </span>
                <span className="text-base text-amber-700 font-bold tabular-nums">
                  {breed.energyScore.toFixed(1)} / 5.0
                </span>
                <span className="text-[10px] text-slate-500 block">Aerobic Drive</span>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Bite Pressure
                </span>
                <span className="text-base text-slate-900 font-bold tabular-nums">
                  {breed.biteForcePsi} PSI
                </span>
                <span className="text-[10px] text-slate-500 block">Canine Cusps</span>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Mean Longevity
                </span>
                <span className="text-base text-emerald-700 font-bold tabular-nums">
                  {breed.lifespanMin}–{breed.lifespanMax} yrs
                </span>
                <span className="text-[10px] text-slate-500 block">Life Expectancy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Section Tabs */}
      <div className="mt-8 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('morphology')}
          className={`py-3 px-4 font-semibold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'morphology'
              ? 'border-sky-700 text-sky-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          1. Morphology &amp; Biometrics
        </button>
        <button
          onClick={() => setActiveTab('behavior')}
          className={`py-3 px-4 font-semibold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'behavior'
              ? 'border-sky-700 text-sky-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          2. Behavioral Spectrum
        </button>
        <button
          onClick={() => setActiveTab('genetics')}
          className={`py-3 px-4 font-semibold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'genetics'
              ? 'border-sky-700 text-sky-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          3. Genomic Archeology
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-3 px-4 font-semibold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'history'
              ? 'border-sky-700 text-sky-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          4. Archival Monograph
        </button>
      </div>

      {/* 4. Tab Panels */}
      <div className="mt-6">
        {/* TAB 1: MORPHOLOGY */}
        {activeTab === 'morphology' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cephalic Index Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-sky-700">
                  Cranial Morphometrics
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-sky-50 text-sky-800 font-semibold border border-sky-200">
                  {breed.cephalicIndex.type}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Cephalic Index: {breed.cephalicIndex.ratio}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {breed.cephalicIndex.description}
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
                <span className="font-bold text-slate-800 block text-[11px] mb-1">
                  Biomechanical Consequence:
                </span>
                Optimized leverage between masseter muscle attachment and canine shear force.
              </div>
            </div>

            {/* Skeletal Height & Mass */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
              <span className="text-[10px] uppercase font-bold text-amber-700 block">
                Stature &amp; Mass
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Skeletal Withers Height
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Male Withers:</span>
                  <span className="font-semibold text-slate-900">{breed.physicalMetrics.maleHeightCm}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Female Withers:</span>
                  <span className="font-semibold text-slate-900">{breed.physicalMetrics.femaleHeightCm}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500">Mass Range:</span>
                  <span className="font-semibold text-slate-900">{breed.physicalMetrics.weightKg}</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
                <span className="font-bold text-slate-800 block text-[11px] mb-1">Dentition &amp; Jaw:</span>
                {breed.physicalMetrics.dentitionBite}
              </div>
            </div>

            {/* Coat Morphology */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3 md:col-span-2 lg:col-span-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Thermal &amp; Dermal Shield
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Coat Morphology &amp; Grooming
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {breed.physicalMetrics.coatStructure}
              </p>
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500">Grooming Maintenance:</span>
                  <span className="font-bold text-slate-900">Level {breed.groomingLevel} / 5</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full"
                    style={{ width: `${(breed.groomingLevel / 5) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1 italic">
                  {breed.groomingNote}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BEHAVIORAL SPECTRUM */}
        {activeTab === 'behavior' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-xs">
            <div className="max-w-2xl mb-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-sky-700">
                Ethological Assessment
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Multivariate Behavioral Matrix
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Empirically validated indices based on working trials, operant conditioning latency, and socio-cognitive evaluations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Endurance */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700">Aerobic Endurance</span>
                  <span className="text-sky-700 tabular-nums">{breed.behavioralRadar.endurance}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-700 rounded-full"
                    style={{ width: `${breed.behavioralRadar.endurance}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Capacity for sustained trotting and metabolic caloric efficiency.
                </p>
              </div>

              {/* Biddability */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700">Biddability &amp; Trainability</span>
                  <span className="text-sky-700 tabular-nums">{breed.behavioralRadar.biddability}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-700 rounded-full"
                    style={{ width: `${breed.behavioralRadar.biddability}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Willingness to receive operant cues and work cooperatively with handlers.
                </p>
              </div>

              {/* Prey Drive */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700">Prey Drive &amp; Chase Reflex</span>
                  <span className="text-amber-700 tabular-nums">{breed.behavioralRadar.preyDrive}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full"
                    style={{ width: `${breed.behavioralRadar.preyDrive}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Instinctive motor pattern for visual tracking and quarry capture.
                </p>
              </div>

              {/* Social Affiliation */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700">Social Affiliation</span>
                  <span className="text-emerald-700 tabular-nums">{breed.behavioralRadar.socialAffiliation}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${breed.behavioralRadar.socialAffiliation}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Affectionate orientation towards conspecifics and human kin.
                </p>
              </div>

              {/* Cold Tolerance */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700">Hypothermic Resistance</span>
                  <span className="text-sky-700 tabular-nums">{breed.behavioralRadar.coldTolerance}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-600 rounded-full"
                    style={{ width: `${breed.behavioralRadar.coldTolerance}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Physiological adaptation to sub-zero blizzards and frostbite aversion.
                </p>
              </div>

              {/* Vigilance */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700">Sentry Vigilance</span>
                  <span className="text-indigo-700 tabular-nums">{breed.behavioralRadar.vigilance}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${breed.behavioralRadar.vigilance}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Alertness to environmental perimeter changes and territorial boundary defense.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GENOMICS */}
        {activeTab === 'genetics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Clade Profile */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
                <span className="text-[10px] uppercase font-bold text-sky-700 block">
                  Mitochondrial Phylogeny
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  {breed.genomicProfile.mitochondrialHaplogroup}
                </h3>
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg text-xs text-sky-900">
                  <span className="font-bold block mb-1">Genetic Divergence Estimate:</span>
                  Approx. <span className="font-bold underline">{breed.genomicProfile.geneticIsolationYearsBp.toLocaleString()}</span> years before present (BP) from ancestral wolves.
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {breed.genomicProfile.drd4ReceptorTrait}
                </p>
              </div>

              {/* Notable Alleles */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">
                  Identified Genomic Loci
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Phenotypic Molecular Alleles
                </h3>
                <ul className="space-y-2">
                  {breed.genomicProfile.notableAlleles.map((allele, i) => (
                    <li
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px] text-sky-700 shrink-0 mt-0.5">
                        dna
                      </span>
                      <span>{allele}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lineage Tree */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">
                Cladistic Phylogeny
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6">
                Genealogical Pedigree Stratification
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {/* Node 1 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 border-l-4 border-l-sky-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Phase 01: Ancestral Clade
                  </span>
                  <h4 className="font-serif text-sm font-bold text-slate-900 mt-1">
                    {breed.lineageAncestry.ancestralClade}
                  </h4>
                </div>

                {/* Node 2 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 border-l-4 border-l-amber-600">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Phase 02: Foundational Line
                  </span>
                  <h4 className="font-serif text-sm font-bold text-slate-900 mt-1">
                    {breed.lineageAncestry.foundationalLine}
                  </h4>
                </div>

                {/* Node 3 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 border-l-4 border-l-indigo-600">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Phase 03: Historical Function
                  </span>
                  <h4 className="font-serif text-sm font-bold text-slate-900 mt-1">
                    {breed.lineageAncestry.historicalRole}
                  </h4>
                </div>

                {/* Node 4 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 border-l-4 border-l-emerald-600">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Phase 04: Modern Standard
                  </span>
                  <h4 className="font-serif text-sm font-bold text-slate-900 mt-1">
                    {breed.lineageAncestry.modernStandardization}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HISTORY */}
        {activeTab === 'history' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-xs space-y-6">
            <div className="max-w-3xl space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-sky-700">
                Archival Historical Monograph
              </span>
              <h3 className="font-serif text-3xl font-bold text-slate-900">
                The Heritage of {breed.name}
              </h3>
              <p className="text-xs text-slate-400 uppercase font-mono">
                Historical Focus: {breed.originRegion} ({breed.historicalEpoch})
              </p>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed pt-2">
                {breed.historicalMonograph.map((para, i) => (
                  <p key={i} className="first:first-letter:text-4xl first:first-letter:font-serif first:first-letter:float-left first:first-letter:mr-2">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Curator Field Note */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 max-w-3xl">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase mb-1">
                <span className="material-symbols-outlined text-[16px]">clinical_notes</span>
                <span>Curator's Cynological Field Note</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                {breed.curatorNotes}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 5. Related Specimens in Compendium */}
      <section className="mt-12 pt-8 border-t border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Adjacent Specimens in Monograph Vault
          </h3>
          <button
            onClick={onBackToOverview}
            className="text-xs font-semibold text-sky-700 hover:underline cursor-pointer"
          >
            View All 6 Specimen →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BREED_DATA.filter((b) => b.id !== breed.id).slice(0, 3).map((relBreed) => (
            <div
              key={relBreed.id}
              onClick={() => onSelectBreed(relBreed.id)}
              className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-slate-300 hover:shadow-xs transition-all group"
            >
              <img
                src={relBreed.imageUrl}
                alt={relBreed.name}
                className="w-14 h-14 rounded-lg object-cover group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-amber-700 font-semibold block uppercase">
                  {relBreed.taxaTag}
                </span>
                <h4 className="font-serif text-sm font-bold text-slate-900 truncate">
                  {relBreed.name}
                </h4>
                <span className="text-[11px] text-slate-400">
                  {relBreed.biteForcePsi} PSI • {relBreed.origin}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
