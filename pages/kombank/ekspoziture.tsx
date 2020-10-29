import React from 'react';
import KombankHeader from 'parts/KombankHeader';

export default function Ekspoziture() {
  return (
    <div>
      <KombankHeader />
      <div>
        <div className="p-2">
          <img src="https://www.kombank.com/images/mapa-mob.PNG" alt="" />
        </div>
        <div className="flex justify-center p-4 mt-4 text-xl">LOKACIJE </div>
        <div className="flex p-4">
          <div className="w-1/2 h-10 text-lg text-center text-purple-700 bg-gray-300 rounded-md">Ekspoziture</div>
          <div className="w-1/2 h-10 text-lg text-center text-white bg-purple-800 rounded-md">Bankomati</div>
        </div>
        <div className="p-4 ">
          <div className="flex justify-center p-3 mt-4 bg-gray-300 border-gray-700 rounded-md">
            Unesite mesto ili grad
          </div>
        </div>
        <div className="p-4 bg-gradient-to-r from-purple-700 to-pink-500">Kreditni kalkulator </div>
      </div>
    </div>
  );
}
