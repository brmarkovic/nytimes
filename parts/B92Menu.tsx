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
        <div className="flex justify-end w-1/6 text-4xl font-bold"> = </div>
      </div>
      <div className="flex justify-between px-2 py-3 text-blue-900 bg-gray-300">
        <div>NOVO</div>
        <div>INFO</div>
        <div className="flex px-2 text-white bg-orange-600 ">KORONAVIRUS</div>
        <div>SPORT</div>
        <div>BIZ</div>
        <div>ZIVOT</div>
        <div>ZDRAVLJE</div>
      </div>
    </div>
  );
}
