/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';

export default function Zivot() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col text-white bg-red-600">
          <div className="h-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />
          <div className="flex justify-start w-5/6 px-2 text-4xl tracking-wide">ZIVOT</div>
          <div className="flex justify-end w-1/6 pr-2 text-4xl font-bold">=</div>
        </div>
        <div className="flex justify-between p-2 text-white bg-red-600">
          <div>vest</div>
          <div>nauka</div>
          <div>tabu</div>
          <div>ljubimac</div>
          <div>#ostaniodgovoran</div>
          <div>
            {' '}
            <Link href="/b92">
              <a>nazad na b92</a>
            </Link>
          </div>
        </div>
        <div>
          <div>
            {' '}
            <img src="https://www.b92.net/news/pics/2020/09/23/16346756575f6b5a8ec3249885440707_v4_big.jpg" alt="" />
            <div className="z-40 px-2 -mt-20 text-2xl text-white">
              Otkriven novi rekord najhladnije temperature severne hemisfere
            </div>
          </div>
          <div className="flex ">
            <div className="flex flex-col w-2/3">
              <div className="px-2 py-4 text-xl text-gray-700 ">Gde su nestali beogradski vrapci</div>
              <div className="flex justify-start text-gray-500 ">
                <div className="p-2">VESTI</div>
                <div className="p-2 border-l border-gray-500">KOMENTARA: 13 </div>
              </div>
            </div>
            <div className="flex p-5 ">
              <img
                src="https://www.b92.net/news/pics/2020/09/23/13507658845f6b532ec55ac220243016_208x160x452900.png"
                alt=""
              />{' '}
            </div>
          </div>
        </div>
        <div>
          <div className="flex border-t border-gray-400">
            <div className="flex flex-col w-2/3">
              <div className="px-2 py-4 text-xl text-gray-700 ">
                Buran zivot srpske rokerke: Uzimala je heroin i udala se posle 10 dana veze
              </div>
              <div className="flex justify-start text-gray-500 ">
                <div className="p-2">VESTI</div>
                <div className="p-2 border-l border-gray-500">KOMENTARA: 43 </div>
              </div>
            </div>
            <div className="p-5">
              <img
                src="https://www.b92.net/news/pics/2020/09/23/7140611705f6b06a30b78b039739990_214x153x353400.jpg"
                alt=""
              />{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
