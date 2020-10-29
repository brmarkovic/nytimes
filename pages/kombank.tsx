/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import KombankHeader from 'parts/KombankHeader';
import Link from 'next/link';

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
          <div className="w-1/3 leading-5">
            <Link href="/kombank/ekspoziture">
              <a>Ekspoziture i bankomati</a>
            </Link>
          </div>
        </div>
        <div className="w-1/3">
          {' '}
          <img src="https://www.kombank.com/images/izdvojeno/kontaktmob.png" alt="" />{' '}
          <div className="w-1/3 leading-5">Kontakt centar</div>
        </div>
        <div className="w-1/3">
          {' '}
          <img src="https://www.kombank.com/images/izdvojeno/stambenimob.png" alt="" />{' '}
          <div className="w-1/3 leading-5">
            <Link href="/kombank/stambeni">
              <a>Stambeni krediti</a>
            </Link>
          </div>
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
      <div className="p-4 ">
        <div className="flex justify-center p-3 mt-4 bg-gray-300 border-gray-700 rounded-md">
          Unesite mesto ili grad
        </div>
      </div>
      <div className="p-4 bg-gradient-to-r from-purple-700 to-pink-500">Kreditni kalkulator </div>
    </div>
  );
}
