import B92Menu from 'parts/B92Menu';
import React from 'react';

export default function Zdravlje() {
  return (
    <div>
      <B92Menu />
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
