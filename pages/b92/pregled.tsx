/* eslint-disable jsx-a11y/anchor-is-valid */
import B92Menu from 'parts/B92Menu';
import Link from 'next/link';
import React from 'react';

export default function Pregled() {
  return (
    <div>
      <B92Menu />
      <div className="flex flex-col ">
        <div className="flex justify-center p-3 text-lg text-blue-800 border-b-2 border-gray-400">Novo</div>
        <div className="flex justify-center p-3 text-lg font-bold text-blue-800 border-b-2 border-gray-400">
          {' '}
          <Link href="/b92/info">
            <a>Info</a>
          </Link>
        </div>
        <div
          className="flex justify-center p-3 text-lg text-blue-800 underline border-b-2 border-gray-400"
          style={{ textDecorationColor: 'red' }}
        >
          Koronavirus
        </div>
        <div className="flex justify-center p-3 text-lg font-bold text-blue-800 border-b-2 border-gray-400">
          <Link href="/b92/sport">
            <a>Sport</a>
          </Link>
        </div>
        <div className="flex justify-center p-3 text-lg text-blue-800 border-b-2 border-gray-400">Biz</div>
        <div className="flex justify-center p-3 text-lg text-blue-800 border-b-2 border-gray-400">Zivot</div>
        <div className="flex justify-center p-3 text-lg text-blue-800 border-b-2 border-gray-400">Zdravlje</div>
        <div className="flex justify-center p-3 text-lg text-blue-800 border-b-2 border-gray-400">Putovanja</div>
        <div className="flex justify-center p-3 text-lg text-blue-800 border-b-2 border-gray-400">Auto</div>
        <div className="flex justify-center p-3 text-lg text-blue-800 border-b-2 border-gray-400">BBC</div>
        <div className="flex justify-center p-3 text-lg text-blue-800 border-b-2 border-gray-400">Superzena</div>
      </div>
    </div>
  );
}
