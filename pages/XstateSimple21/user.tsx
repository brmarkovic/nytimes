import React from 'react';
import Link from 'next/link';

export default function XstateSimple21() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex bg-black">
          <div className="w-5/6 ml-4 md:w-1/6 md:flex md:justify-end md:mr-5">
            <Link href="/xstate">
              <img
                className="w-10 h-10"
                src="data:image/png;base64,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"
                alt=""
              />
            </Link>
          </div>
          <div className="md:flex md:text-white sm:hidden md:items-center md:justify-start md:font-semibold md:w-4/6">
            <div className="md:ml-5">World</div>
            <div className="md:ml-5">US Polittics</div>
            <div className="md:ml-5">Business</div>
            <div className="md:ml-5">Healtih</div>
            <div className="md:ml-5">Entertaintment</div>
            <div className="md:ml-5">Style</div>
            <div className="md:ml-5">Travel </div>
            <div className="md:ml-5">Sports</div>
            <div className="md:ml-5">Videos</div>
          </div>
          <div className="flex w-1/6 mr-7 md:justify-end md:mr-48 md:text-white">
            <div className="md:flex md:items-center md:justify-end md:mr-5 md:font-semibold ">Edition</div>
            <div className="md:flex md:items-center sm:hidden md:mr-5">
              <Link href="/XstateSimple21/user">
                <svg
                  className="text-white w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex items-center justify-end md:mr-5 ">
              <svg
                className="text-white w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex items-center">
              <svg
                className="text-white w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mt-5 text-xl font-bold text-center bg-red-400 ">
            {' '}
            Da li zelite da se prijavite na mailing listu{' '}
          </div>
        </div>
      </div>
    </div>
  );
}
