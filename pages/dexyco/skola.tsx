import React from 'react';
import DexycoHeader from 'parts/DexycoHeader';

export default function Skola() {
  return (
    <div>
      <DexycoHeader />
      <div className="flex flex-col">
        <div className="px-2 text-black bg-red-600">RS</div>
        <div className="px-2 text-black bg-red-600">HR</div>
        <div className="px-2 text-black bg-red-600">BA</div>
        <div className="px-2 text-black bg-red-600">RO</div>
        <div className="px-2 text-black bg-red-600">MK</div>
        <div className="p-3 text-lg font-bold text-white bg-red-900">SKOLA</div>

        <div className="p-4 space-y-3">
          <div>
            RANCEVI I TORBE
            <div>Skolski rancevi</div>
            <div>Rancevi za vrtic</div>
            <div>Torbe za fizicko</div>
            <div>Torbe za blok 5</div>
          </div>
          <div>
            PERNICE
            <div>Pune pernice</div>
            <div>Prazne pernice</div>
          </div>
          <div>
            SVESKE
            <div>Na linije</div>
            <div>Na kvadratice</div>
            <div>Na uske i siroke linije</div>
            <div>Sveske ciste</div>
            <div>Sveske mix</div>
          </div>
          <div>
            OSTALO ZA SKOLU
            <div>Pribor za crtanje i pisanje</div>
            <div>Dnevnici blokcici notesi</div>
            <div>Skolski pribor</div>
          </div>
        </div>
      </div>
    </div>
  );
}
