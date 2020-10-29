import KombankHeader from 'parts/KombankHeader';
import React from 'react';

export default function Stambeni() {
  return (
    <div>
      <KombankHeader />
      <div>
        <img src="https://www.kombank.com/images/tekstovi/zbirna-stambeni.jpg" alt="" />
      </div>
      <div className="p-2 mt-4 text-base text-center text-black">
        Vaš stan nikad nije bio bliže! Promenite adresu uz stambene kredite Komercijalne banke, uz minimalnu proceduru i
        maksimalnu podršku!
      </div>
      <div className="text-base text-center text-gray-800 text">Najduži rok otplate do 30 godina.</div>
      <div className="p-2 text-base text-center text-black">
        Stambeni krediti odobravaju se klijentima Banke sa redovnim primanjima zarade / penzije na tekućem računu
        otvorenom kod Banke.
      </div>
      <div className="p-2 text-base text-center text-gray-800 text">
        Minimalni uslovi koje je potrebno da ispuni podnosilac zahteva su stalni radni odnos minimum 6 meseci kod
        sadašnjeg poslodavca i minimum 12 meseci ukupnog radnog staža.
      </div>
      <div className="text-lg text-center text-white bg-purple-700">
        Brzo i lako uz podrsku komercijalne banke do stana u naselju Zemunske kapije
      </div>
    </div>
  );
}
