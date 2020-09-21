import B92Menu from 'parts/B92Menu';
import React from 'react';

export default function B92() {
  return (
    <div className="flex flex-col">
      <B92Menu />
      <div>
        {' '}
        <img src="https://www.b92.net/news/pics/2020/09/19/18537083375f65eb380a5f7353365493_v4_big.jpg" alt="" />
        <div className="z-20 px-6 -mt-12 text-2xl text-red-500">Iran napada</div>
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
      <div className="flex py-4 m-4 border-t border-gray-400">
        <div className="flex flex-col w-2/3">
          <div className="px-2 py-4 text-xl text-gray-700 ">Najgori scenario za Orbana</div>
          <div className="flex justify-start text-gray-500 ">
            <div className="p-2">INFO</div>
            <div className="p-2 border-l border-gray-500">KOMENTARA: 45 </div>
          </div>
        </div>
        <div className="p-5">
          <img
            src="https://www.b92.net/news/pics/2020/09/21/5432502825f68c5338aae4829000826_208x160x666600.jpg"
            alt=""
          />{' '}
        </div>
      </div>
      <div className="flex py-4 m-4 border-t border-gray-400">
        <div className="flex flex-col w-2/3">
          <div className="px-2 py-4 text-xl text-gray-700 ">
            Druga volonterka Astra Zeneke dobila tesko neurolosko oboljenje
          </div>
          <div className="flex justify-start text-gray-500 ">
            <div className="p-2">ZDRAVLJE</div>
            <div className="p-2 border-l border-gray-500">KOMENTARA: 45 </div>
          </div>
        </div>
        <div className="p-5">
          <img
            src="https://www.b92.net/news/pics/2020/09/21/16697259585f6892f1d2cd6154861406_208x160x508200.jpg"
            alt=""
          />{' '}
        </div>
      </div>
    </div>
  );
}
