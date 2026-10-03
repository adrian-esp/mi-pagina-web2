import React, { useState } from 'react';
import { BREED_DATA, BreedMonograph } from '../data/breeds';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBreedId?: string;
  onSelectBreed: (breedId: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  initialBreedId,
  onSelectBreed
}) => {
  const [breed1Id, setBreed1Id] = useState<string>(initialBreedId || BREED_DATA[0].id);
  const [breed2Id, setBreed2Id] = useState<string>(
    initialBreedId === BREED_DATA[1].id ? BREED_DATA[0].id : BREED_DATA[1].id
  );

  if (!isOpen) return null;

  const breed1 = BREED_DATA.find((b) => b.id === breed1Id) || BREED_DATA[0];
  const breed2 = BREED_DATA.find((b) => b.id === breed2Id) || BREED_DATA[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-700 text-2xl">compare_arrows</span>
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Comparative Biometric Diagnostics Lab
              </h2>
              <p className="text-xs text-slate-500">
                Direct side-by-side analysis of two canonical canine specimens.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Specimen Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Specimen A */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Specimen 01
              </label>
              <select
                value={breed1Id}
                onChange={(e) => setBreed1Id(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-semibold p-2 rounded-lg outline-hidden focus:border-sky-600"
              >
                {BREED_DATA.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.origin})
                  </option>
                ))}
              </select>
            </div>

            {/* Specimen B */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Specimen 02
              </label>
              <select
                value={breed2Id}
                onChange={(e) => setBreed2Id(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm font-semibold p-2 rounded-lg outline-hidden focus:border-sky-600"
              >
                {BREED_DATA.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.origin})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Side by side plates */}
          <div className="grid grid-cols-2 gap-4">
            {/* Specimen 1 Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-3 flex flex-col items-center text-center">
              <img
                src={breed1.imageUrl}
                alt={breed1.name}
                className="w-full h-36 object-cover rounded-lg mb-2"
              />
              <span className="text-[10px] text-amber-700 uppercase font-semibold">
                {breed1.taxaTag}
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900">{breed1.name}</h3>
              <span className="text-[11px] text-slate-500 italic">{breed1.latinName}</span>
              <button
                onClick={() => {
                  onSelectBreed(breed1.id);
                  onClose();
                }}
                className="mt-2 text-xs font-semibold text-sky-700 hover:underline"
              >
                Open Full Monograph →
              </button>
            </div>

            {/* Specimen 2 Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-3 flex flex-col items-center text-center">
              <img
                src={breed2.imageUrl}
                alt={breed2.name}
                className="w-full h-36 object-cover rounded-lg mb-2"
              />
              <span className="text-[10px] text-amber-700 uppercase font-semibold">
                {breed2.taxaTag}
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900">{breed2.name}</h3>
              <span className="text-[11px] text-slate-500 italic">{breed2.latinName}</span>
              <button
                onClick={() => {
                  onSelectBreed(breed2.id);
                  onClose();
                }}
                className="mt-2 text-xs font-semibold text-sky-700 hover:underline"
              >
                Open Full Monograph →
              </button>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase text-[10px]">
                  <th className="p-3 font-bold w-1/3">Diagnostic Metric</th>
                  <th className="p-3 font-bold w-1/3 text-center">{breed1.name}</th>
                  <th className="p-3 font-bold w-1/3 text-center">{breed2.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Bite Force */}
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700">Bite Force (PSI)</td>
                  <td className="p-3 text-center font-bold text-sky-700 tabular-nums">
                    {breed1.biteForcePsi} PSI
                    {breed1.biteForcePsi > breed2.biteForcePsi && (
                      <span className="text-[10px] text-emerald-600 block">
                        (+{breed1.biteForcePsi - breed2.biteForcePsi} PSI)
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center font-bold text-sky-700 tabular-nums">
                    {breed2.biteForcePsi} PSI
                    {breed2.biteForcePsi > breed1.biteForcePsi && (
                      <span className="text-[10px] text-emerald-600 block">
                        (+{breed2.biteForcePsi - breed1.biteForcePsi} PSI)
                      </span>
                    )}
                  </td>
                </tr>

                {/* Working Intellect */}
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700">Working Intellect</td>
                  <td className="p-3 text-center font-bold text-slate-900 tabular-nums">
                    {breed1.intellectScore.toFixed(1)} / 5.0
                    {breed1.intellectRank && (
                      <span className="text-[10px] text-slate-500 block">Rank #{breed1.intellectRank}</span>
                    )}
                  </td>
                  <td className="p-3 text-center font-bold text-slate-900 tabular-nums">
                    {breed2.intellectScore.toFixed(1)} / 5.0
                    {breed2.intellectRank && (
                      <span className="text-[10px] text-slate-500 block">Rank #{breed2.intellectRank}</span>
                    )}
                  </td>
                </tr>

                {/* Kinetic Output */}
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700">Daily Kinetic Output</td>
                  <td className="p-3 text-center font-bold text-amber-700 tabular-nums">
                    {breed1.energyScore.toFixed(1)} / 5.0
                  </td>
                  <td className="p-3 text-center font-bold text-amber-700 tabular-nums">
                    {breed2.energyScore.toFixed(1)} / 5.0
                  </td>
                </tr>

                {/* Cephalic Index */}
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700">Cranial Cephalic Type</td>
                  <td className="p-3 text-center text-slate-800">
                    <span className="font-semibold">{breed1.cephalicIndex.type}</span>
                    <span className="text-[10px] text-slate-500 block">{breed1.cephalicIndex.ratio}</span>
                  </td>
                  <td className="p-3 text-center text-slate-800">
                    <span className="font-semibold">{breed2.cephalicIndex.type}</span>
                    <span className="text-[10px] text-slate-500 block">{breed2.cephalicIndex.ratio}</span>
                  </td>
                </tr>

                {/* Grooming Maintenance */}
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700">Grooming Index</td>
                  <td className="p-3 text-center text-slate-700">
                    Level {breed1.groomingLevel} / 5
                  </td>
                  <td className="p-3 text-center text-slate-700">
                    Level {breed2.groomingLevel} / 5
                  </td>
                </tr>

                {/* Mean Lifespan */}
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700">Mean Longevity</td>
                  <td className="p-3 text-center font-semibold text-slate-900 tabular-nums">
                    {breed1.lifespanMin} – {breed1.lifespanMax} yrs
                  </td>
                  <td className="p-3 text-center font-semibold text-slate-900 tabular-nums">
                    {breed2.lifespanMin} – {breed2.lifespanMax} yrs
                  </td>
                </tr>

                {/* Cold Tolerance */}
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700">Sub-Zero Cold Tolerance</td>
                  <td className="p-3 text-center font-bold text-sky-700 tabular-nums">
                    {breed1.behavioralRadar.coldTolerance}%
                  </td>
                  <td className="p-3 text-center font-bold text-sky-700 tabular-nums">
                    {breed2.behavioralRadar.coldTolerance}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Empirical Biometric Differential Engine v2.4
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
