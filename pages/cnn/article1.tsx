/* eslint-disable react/no-unescaped-entities */
import CNNHeader from 'parts/CNNHeader';
import React from 'react';

export default function Article1() {
  return (
    <div>
      <CNNHeader />
      <div>
        <div className="mt-2 font-sans text-4xl font-bold leading-7 text-center ">
          Trump mocks social distancing with dangerous rally
        </div>
        <div className="p-2 mt-3">
          <img
            className="z-10"
            src="https://cdn.cnn.com/cnnnext/dam/assets/200914095325-02-trump-rally-nevada-exlarge-tease.jpg"
            alt="trump"
          />
          <div className="z-20 flex p-2 -mt-10 font-bold text-red-500 bg-blue-600">Trump and voters!</div>
        </div>
        <div className="flex pb-2 ml-2 ">
          <div className="flex w-1/6 text-xl font-bold flex- coll">Analysis:</div>
          <div className="flex w-5/6 ml-2 text-xl leading-5 flex-coll">
            {' '}
            Trump mocks social distancing with dangerous rally
          </div>
        </div>
      </div>
      <div className="flex m-2 border-t-2 border-gray-500">
        <div className="flex w-1/6 px-2 text-xl font-bold ">Opinion:</div>
        <div className="flex w-5/6 px-3 text-xl text-gray-600 ">Trumps town hall didn't go well</div>
      </div>
      <div className="flex m-2 border-t-2 border-gray-500">
        <div className="flex px-2 text-lg">
          {' '}
          <span className="pr-2 font-bold text-red-500"> LIVE UPDATES</span> CDC rols backcontroversial testing
        </div>
      </div>
    </div>
  );
}
