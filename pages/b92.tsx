import React from 'react';

export default function B92() {
  return (
    <div className="flex flex-col">
      <div className="flex text-white bg-purple-800">
        <div className="flex justify-center w-5/6 text-4xl font-bold ">b92</div>
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
      <div>
        {' '}
        <img src="https://www.b92.net/news/pics/2020/09/19/18537083375f65eb380a5f7353365493_v4_big.jpg" alt="" />
      </div>
      <div className="flex px-2">
        <div className="flex flex-col w-2/3">
          <div className="px-2 py-4 text-2xl text-gray-700 ">Zidan sokirao Jovica </div>
          <div className="flex justify-start text-gray-500 ">
            <div className="p-2">SPORT</div>
            <div className="p-2 border-l border-gray-500">KOMENTARA: 93 </div>
          </div>
        </div>
        <div className="p-5">
          <img
            src="https://www.b92.net/news/pics/2020/09/19/16359228545f65d89c4b4ea229618231_208x160x553000.jpg"
            alt=""
          />{' '}
        </div>
      </div>
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
      <div>.....</div>
      <div>.....</div>
    </div>
  );
}
