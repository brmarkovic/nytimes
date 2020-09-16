import CNNHeader from 'parts/CNNHeader';
import React from 'react';

export default function Article2() {
  return (
    <div>
      <CNNHeader />
      <div>
        <div className="flex flex-col px-2 text-2xl font-bold">
          Trump less trusted internationally than Putin and Xi after Covid-19 response
        </div>
        <div clas className="px-2 text-gray-600">
          <div>By Rob Picheta, CNN</div>
          <div>Update 1415 GMT(2215HKT) September 15</div>
          <img
            src="https://cdn.cnn.com/cnnnext/dam/assets/200911133241-trump-biden-split-0911-exlarge-tease.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
