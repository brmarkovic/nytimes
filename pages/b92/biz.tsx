import B92Menu from 'parts/b92Menu';
import React from 'react';

export default function Biz() {
  return (
    <div>
      <B92Menu />
      <div className="flex py-4 m-4 border-t border-gray-400">
        <div className="flex flex-col w-2/3">
          <div className="px-2 py-4 text-xl text-gray-700 ">
            Izgradnja nove pasarele kod Ade Ciganilje je u toku: Pogledajete kako teku radovi FOTO
          </div>
          <div className="flex justify-start text-gray-500 ">
            <div className="p-2">BIZ</div>
            <div className="p-2 border-l border-gray-500">KOMENTARA: 13 </div>
          </div>
        </div>
        <div className="p-5">
          <img
            src="https://www.b92.net/news/pics/2020/09/19/14553436155f660f74f336f686101722_208x160x202000.jpg"
            alt=""
          />{' '}
        </div>
      </div>
    </div>
  );
}
