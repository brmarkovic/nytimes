/* eslint-disable react/button-has-type */
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
        <div className="flex px-5 mt-4 mb-2 text-gray-600">
          <div className="flex flex-col w-1/4 ">
            <img
              className="mb-2 "
              src="https://www.obucametro.rs/files/thumbs/files/images/slike_proizvoda/thumbs_1200/N70458_1200_1200px.jpg"
              alt="metro"
            />
            <div className="-mt-5 -mr-5 text-red-500 rounded-full boreder-red-500 ">20%</div>
            <div className="mt-4 text-xs truncate ">CIPELE DUBOKE ZA ZIMU</div>
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
            <div className="mt-4 text-xs truncate ">CIPELE DUBOKE ZA ZIMU</div>
            <div className="text-xs text-gray-900">T34267</div>
            <div className="mt-3 text-xs">Cena 1.780,00 RSD</div>
          </div>
          <div className="flex flex-col w-1/4">
            <img
              className="mb-2 "
              src="https://www.obucametro.rs/files/thumbs/files/images/slike_proizvoda/thumbs_1200/N70883_1200_1200px.jpg"
              alt=""
            />

            <div className="-mt-5 -mr-5 text-red-500 rounded-full boreder-red-500">20%</div>

            <div className="mt-4 text-xs">SNEGARICA</div>
            <div className="text-xs text-gray-900">T4570</div>
            <div className="mt-3 text-xs">Cena 6.590,00 RSD</div>
          </div>
        </div>
        <div className="flex flex-wrap ml-2 mr-2">
          <div className="flex flex-wrap mt-2">
            <div className="flex ml-2 mr-2">
              <div className="flex flex-wrap mt-2 mr-2">
                <img src="https://www.obucametro.rs/files/images/metro/GLAVNI-SLAJDER/muske%20majice.jpg" alt="" />
              </div>
              <div className="flex flex-wrap mt-2">
                <img src="https://www.obucametro.rs/files/images/metro/GLAVNI-SLAJDER/letnje%20torbe.jpg" alt="" />
              </div>
            </div>
            <div className="flex ml-2 mr-2">
              <div className="flex flex-wrap mt-2 mr-2">
                <img src="https://www.obucametro.rs/files/images/metro/GLAVNI-SLAJDER/gleznjace.jpg" alt="" />
              </div>
              <div className="flex flex-wrap mt-2 ">
                <img src="https://www.obucametro.rs/files/images/2020/12/15/slajderwaterproof.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mt-10 text-xl font-thin text-center mb-7">KATEGORIJE</div>
          <div>
            <div className="ml-20">
              <img src="https://www.obucametro.rs/files/images/metro/GLAVNI-SLAJDER/zenskanovo.jpg" alt="" />
            </div>
            <div className="w-56 mt-4 ml-32 text-xl font-thin text-center border-2 border-black">ZENSKA KOLEKCIJA</div>
          </div>
          <div>
            <div className="mt-5 ml-20">
              <img src="https://www.obucametro.rs/files/images/metro/GLAVNI-SLAJDER/muskanovo.jpg" alt="" />
            </div>
            <div className="w-56 mt-4 ml-32 text-xl font-thin text-center border-2 border-black">MUSKA KOLEKCIJA</div>
          </div>
          <div>
            <div className="mt-5 ml-20">
              <img src="https://www.obucametro.rs/files/images/metro/GLAVNI-SLAJDER/decijanovo.jpg" alt="" />
            </div>
            <div className="w-56 mt-4 ml-32 text-xl font-thin text-center border-2 border-black">DECIJA KOLEKCIJA</div>
          </div>
          <div>
            <div className="mt-5 ml-20">
              <img src="https://www.obucametro.rs/files/images/metro/GLAVNI-SLAJDER/musketorbe.jpg" alt="" />
            </div>
            <div className="w-56 mt-4 ml-32 text-xl font-thin text-center border-2 border-black">DODATNI PROGRAM</div>
          </div>

          <div className="flex flex-row ml-1 mr-1 space-x-2 mt-7">
            <div>
              <img src="https://www.obucametro.rs/files/images/metro/GLAVNI-SLAJDER/salvatorerossinovo.jpg" alt="" />
            </div>
            <div>
              <img src="https://www.obucametro.rs/files/images/metro/GLAVNI-SLAJDER/claudiadonatellinovo.jpg" alt="" />
            </div>
          </div>
          <div className="mt-3 bg-red-200">
            <div className="text-3xl font-semibold text-center mt-7">NEWSLETTER</div>
            <div className="mt-4 mb-4 text-lg text-center ">Budite u toku sa najnovijim ponudama i novostima</div>
            <div className="flex items-center w-64 h-10 px-2 ml-32 text-gray-600 bg-white border border-gray-400">
              Unesite email
            </div>
            <button className="w-32 h-8 mt-2 mb-8 ml-48 text-center text-white bg-black ">PRIJAVITE SE</button>
          </div>
          <div className="mt-8 text-xl text-center">BRENDOVI PROIZVODA</div>
          <div className="flex flex-row overflow-x-scroll">
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/brendovi/gaia_verdi.png" alt="" />
            </div>
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/brendovi/salvatore_ressi.png" alt="" />
            </div>
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/brendovi/claudia_donatelli.png" alt="" />
            </div>
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/brendovi/zen.png" alt="" />
            </div>
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/2019/10/1/asics%281%29.png" alt="" />
            </div>
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/brendovi/comfort_lusso.png" alt="" />
            </div>
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/brendovi/dft.png" alt="" />
            </div>
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/brendovi/differente.png" alt="" />
            </div>
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/brendovi/lusso.png" alt="" />
            </div>
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/brendovi/marco_tozzi.png" alt="" />
            </div>
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/brendovi/francesca.png" alt="" />
            </div>
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/brendovi/marinaro.png" alt="" />
            </div>
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/brendovi/pandin.png" alt="" />
            </div>
            <div className="flex-none">
              <img src="https://www.obucametro.rs/files/images/brendovi/elly_shoes.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
