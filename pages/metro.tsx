/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */

import React from 'react';
import MetroMenu from 'parts/MetroMenu';

export default function Metro() {
  return (
    <div>
      <div className="flex flex-col">
        <MetroMenu />
        <div>
          <img src="https://www.obucametro.rs/files/images/2021/1/25/slajder70javeolii.jpg" alt="" />
        </div>
        <div className="flex justify-center px-5 mt-6 text-xl font-thin">
          <div className="w-auto underline">NAJNOVIJE</div>
          <div className="w-auto ml-4 mr-4 ">NAJPRODAVANIJE</div>
          <div className="w-auto">AKCIJE</div>
        </div>
        <div className="flex px-10 mt-4 text-gray-600">
          <div className="flex flex-col w-1/4">
            <img
              src="https://www.obucametro.rs/files/thumbs/files/images/slike_proizvoda/thumbs_1200/N70458_1200_1200px.jpg"
              alt="metro"
            />
            <div className="z-20 px-6 -mt-12 text-red-500 rounded-full">20%</div>
            <div className="mt-4">CIPELE DUBOKE ZA ZIMU</div>
            <div className="text-gray-900">N4567</div>
            <div className="mt-7">Cena 3.456.00 RSD </div>
          </div>
          <div className="flex flex-col w-1/4">
            <img
              src="https://www.obucametro.rs/files/thumbs/files/images/slike_proizvoda/thumbs_1200/N69342_1200_1200px.jpg"
              alt=""
            />
            <div className="z-20 px-6 -mt-12 text-red-500 rounded-full">20%</div>
            <div className="mt-4">SPORTSKA PATIKA</div>
            <div className="text-gray-900">N46732</div>
            <div className="mt-7">Cena 4.350,00 RSD</div>
          </div>
          <div className="flex flex-col w-1/4">
            <img
              src="https://www.obucametro.rs/files/thumbs/files/images/slike_proizvoda/thumbs_1200/N70942_1200_1200px.jpg"
              alt=""
            />
            <div className="z-20 px-6 -mt-12 text-red-500 rounded-full">20%</div>
            <div className="mt-4">CIPELE DUBOKE ZA ZIMU</div>
            <div className="text-gray-900">T34267</div>
            <div className="mt-7">Cena 1.780,00 RSD</div>
          </div>
          <div className="flex flex-col w-1/4">
            <img
              src="https://www.obucametro.rs/files/thumbs/files/images/slike_proizvoda/thumbs_1200/N70883_1200_1200px.jpg"
              alt=""
            />
            <a>
              <div className="text-center text-white bg-red-700 rounded-full w-9 h-9">20%</div>
            </a>
            <div className="mt-4">SNEGARICA</div>
            <div className="text-gray-900">T4570</div>
            <div className="mt-7">Cena 6.590,00 RSD</div>
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
