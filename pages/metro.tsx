/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */

import React from 'react';
import MetroMenu from 'parts/MetroMenu';

export default function Metro() {
  return (
    <div>
      <div className="flex flex-col">
        <MetroMenu />
        <div className="w-auto h-auto">
          <img src="https://www.obucametro.rs/files/images/2021/1/26/nova-kol.jpg" alt="" />
        </div>
        <div className="flex flex-wrap justify-center mt-6 text-xl font-thin">
          <div className="w-auto mr-20 underline">NAJNOVIJE</div>
          <div className="w-auto ml-30">NAJPRODAVANIJE</div>
          <div className="w-1/2 text-center">AKCIJE</div>
        </div>
        <div className="flex px-5 mt-4 text-gray-600">
          <div className="flex flex-col w-1/4 ">
            <img
              className="mb-2 "
              src="https://www.obucametro.rs/files/thumbs/files/images/slike_proizvoda/thumbs_1200/N70458_1200_1200px.jpg"
              alt="metro"
            />
            <div className="-mt-5 -mr-5 text-red-500 rounded-full boreder-red-500 ">20%</div>
            <div className="mt-4 text-xs">CIPELE DUBOKE ZA ZIMU</div>
            <div className="text-xs text-gray-900">N4567</div>
            <div className="mt-3 text-xs">Cena 3.456.00 RSD </div>
          </div>
          <div className="flex flex-col w-1/4">
            <img
              className="mb-2 "
              src="https://www.obucametro.rs/files/thumbs/files/images/slike_proizvoda/thumbs_1200/N69342_1200_1200px.jpg"
              alt=""
            />
            <div className="-mt-5 -mr-5 text-red-500 rounded-full boreder-red-500">20%</div>
            <div className="mt-4 text-xs">SPORTSKA PATIKA</div>
            <div className="text-xs text-gray-900">N46732</div>
            <div className="mt-3 text-xs">Cena 4.350,00 RSD</div>
          </div>
          <div className="flex flex-col w-1/4">
            <img
              className="mb-2 "
              src="https://www.obucametro.rs/files/thumbs/files/images/slike_proizvoda/thumbs_1200/N70942_1200_1200px.jpg"
              alt=""
            />
            <div className="-mt-5 -mr-5 text-red-500 rounded-full boreder-red-500">20%</div>
            <div className="mt-4 text-xs">CIPELE DUBOKE ZA ZIMU</div>
            <div className="text-xs text-gray-900">T34267</div>
            <div className="mt-3 text-xs">Cena 1.780,00 RSD</div>
          </div>
          <div className="flex flex-col w-1/4">
            <img
              className="mb-2 "
              src="https://www.obucametro.rs/files/thumbs/files/images/slike_proizvoda/thumbs_1200/N70883_1200_1200px.jpg"
              alt=""
            />
            <a>
              <div className="-mt-5 -mr-5 text-red-500 rounded-full boreder-red-500">20%</div>
            </a>
            <div className="mt-4 text-xs">SNEGARICA</div>
            <div className="text-xs text-gray-900">T4570</div>
            <div className="mt-3 text-xs">Cena 6.590,00 RSD</div>
          </div>
        </div>
        <div className="flex">
          <div className="ml-3">
            <img src="https://www.obucametro.rs/files/images/metro/GLAVNI-SLAJDER/muske%20majice.jpg" alt="" />
          </div>
          <div className="ml-3 mr-3">
            <img src="https://www.obucametro.rs/files/images/metro/GLAVNI-SLAJDER/letnje%20torbe.jpg" alt="" />
          </div>
          <div className="flex flex-col mr-3">
            <div>
              <img src="https://www.obucametro.rs/files/images/metro/GLAVNI-SLAJDER/gleznjace.jpg" alt="" />
            </div>
            <div className="mt-3">
              <img src="https://www.obucametro.rs/files/images/2020/12/15/slajderwaterproof.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
