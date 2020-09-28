import Link from 'next/link';
import React from 'react';

export default function DexycoHeader() {
  return (
    <div className="flex flex-col">
      <div className="flex text-white bg-red-600">
        <div className="flex px-2 text-4xl font-bold font bold 1/12">=</div>
        <div className="flex justify-center w-9/12">
          <img src="https://www.dexy.co.rs/files/images/logo/dexyco-logo.webp" alt="" />
        </div>
        <div className="flex w-1/12 text-3xl">P</div>
        <div className="flex justify-center w-1/12 text-3xl bg-green-600">K</div>
      </div>
    </div>
  );
}
