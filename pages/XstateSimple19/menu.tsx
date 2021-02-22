/* eslint-disable react/button-has-type */
import React from 'react';
import Link from 'next/link';

export default function XstateSimple19() {
  return (
    <div className="flex flex-col">
      <div className="bg-white">
        <div className="flex flex-row justify-between p-3">
          <div>
            <img className="ml-3 h-7" src="https://images.direktnabanka.rs/logo.png" alt="" />
          </div>
          <Link href="/xstate">
            <div>
              <svg
                className="w-5 mr-3 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>{' '}
            </div>
          </Link>
        </div>
        <div className="flex flex-col text-center">
          <div className="mt-12 text-lg text-gray-600 hover:text-red-600 hover:underline ">Stanovnistvo</div>
          <div className="mt-4 text-lg text-gray-600 hover:text-red-600 hover:underline ">Privreda</div>
          <div className="mt-4 text-lg text-gray-600 hover:text-red-600 hover:underline ">Poljoprivreda</div>
          <div className="mt-4 text-lg text-gray-600 hover:text-red-600 hover:underline ">Digitalni servisi</div>
          <div className="mt-4 text-lg text-gray-600 hover:text-red-600 hover:underline ">Karijera </div>
          <div className="mt-4 text-lg text-gray-600 hover:text-red-600 hover:underline ">Prigovori</div>
          <div className="mt-4 text-lg text-gray-600 hover:text-red-600 hover:underline ">Kontakt</div>
        </div>
        <div className="flex justify-center ">
          <div className="flex ">
            <button className="px-8 py-2 mt-8 text-white bg-red-600 border border-red-600 rounded-6xl">
              011 333 60 00
            </button>
          </div>

          <div className="flex justify-center ">
            <button className="px-8 py-2 mt-8 ml-3 text-red-600 border border-red-600 rounded-6xl hover:bg-red-600 hover:text-white">
              e-banking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
