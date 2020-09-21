import B92Menu from 'parts/B92Menu';
import React from 'react';

export default function Sport() {
  return (
    <div>
      <B92Menu />
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
    </div>
  );
}
