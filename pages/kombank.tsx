/* eslint-disable react/jsx-no-undef */
import React from 'react';
import KombankHeader from 'parts/KombankHeader';

export default function Kombank() {
  return (
    <div className="flex flex-col">
      <KombankHeader />

      <div className="flex justify-center p-2 bg-purple-900">
        <img className="w-auto" src="https://www.kombank.com/images/slajderi/Kes-krediti-mobile-360x226.jpg" alt="" />
      </div>
      <div className="flex flex-wrap p-6 ">
        <div className="w-1/3">
          {' '}
          <img src="https://www.kombank.com/images/izdvojeno/ekspozituremob.png" alt="" />{' '}
          <div className="w-1/3 leading-5">Ekspoziture i bankomati</div>
        </div>
        <div className="w-1/3">
          {' '}
          <img src="https://www.kombank.com/images/izdvojeno/kontaktmob.png" alt="" />{' '}
          <div className="w-1/3 leading-5">Kontakt centar</div>
        </div>
        <div className="w-1/3">
          {' '}
          <img src="https://www.kombank.com/images/izdvojeno/stambenimob.png" alt="" />{' '}
          <div className="w-1/3 leading-5">Stambeni krediti</div>
        </div>
        <div className="w-1/3">
          {' '}
          <img src="https://www.kombank.com/images/izdvojeno/gotovinskimob.png" alt="" />{' '}
          <div className="w-1/3 leading-5">Gotovinski krediti</div>
        </div>
        <div className="w-1/3">
          {' '}
          <img src="https://www.kombank.com/images/izdvojeno/tekucimob.png" alt="" />{' '}
          <div className="w-1/3 leading-5">Tekuci racuni</div>
        </div>
        <div className="w-1/3">
          {' '}
          <img src="https://www.kombank.com/images/izdvojeno/kreditnemob.png" alt="" />{' '}
          <div className="w-1/3 leading-5">Kreditne kartice</div>
        </div>
      </div>
      <div className="p-2">
        <img src="https://www.kombank.com/images/mapa-mob.PNG" alt="" />
      </div>
      <div className="flex justify-center p-4 mt-4 text-xl">LOKACIJE </div>
      <div className="flex p-4">
        <div className="w-1/2 h-10 text-lg text-center text-purple-700 bg-gray-300 rounded-md">Ekspoziture</div>
        <div className="w-1/2 h-10 text-lg text-center text-white bg-purple-800 rounded-md">Bankomati</div>
      </div>
      <div>Mesto ili grad</div>
      <div>mapa</div>
    </div>
  );
}
