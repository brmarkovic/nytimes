/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';

export default function B92Menu() {
  return (
    <div className="flex flex-col">
      <div className="flex text-white bg-purple-800">
        <div className="flex justify-center w-5/6 text-4xl font-bold ">
          <Link href="/b92">
            <a>b92</a>
          </Link>
        </div>
        <div className="flex justify-end w-1/6 text-4xl font-bold">
          {' '}
          <Link href="/b92/pregled">
            <a>=</a>
          </Link>{' '}
        </div>
      </div>
      <div className="flex justify-between px-2 text-blue-900 bg-gray-300">
        <div className="p-2">NOVO</div>
        <div className="p-2">
          <Link href="/b92/info">
            <a>INFO</a>
          </Link>
        </div>
        <div className="flex p-2 text-white bg-orange-600 ">KORONAVIRUS</div>
        <div className="p-2">
          <Link href="/b92/sport">
            <a>SPORT</a>
          </Link>
        </div>
        <div className="p-2">
          <Link href="/b92/biz">
            <a>BIZ</a>
          </Link>
        </div>
        <div className="p-2">ZIVOT</div>
        <div className="p-2">
          <Link href="/b92/zdravlje">
            <a>ZDRAVLJE</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
