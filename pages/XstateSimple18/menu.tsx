/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import Link from 'next/link';

export default function XstateSimple18() {
  return (
    <div className="flex flex-col">
      <div className="bg-white">
        <div className="flex flex-col">
          <div className="flex items-center h-12 text-xs text-white truncate bg-black">
            <div className="ml-5">
              Za vreme drzavnog praznika 15.i 16. februara, robna kuca IKEA Beograd, Restoran i centar za isporuku Novi
              Sad radice nepromenjenjo. usluzni centar za isporuku Nis nece raditi.
            </div>
          </div>
          <div className="flex flex-row items-center mt-3">
            <div className="flex-auto ml-4">
              <Link href="/xstate">
                <img
                  className="w-16 h-8"
                  src="https://www.ikea.com/rs/sr/static/ikea-logo.f88b07ceb5a8c356b7a0fdcc9a563d63.svg"
                  alt=""
                />
              </Link>
            </div>
            <div className="flex justify-end mr-5 ">
              <svg
                className="w-5 h-5 rounded-full hover:bg-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="flex justify-end mr-5 rounded-full hover:bg-gray-400">
              <svg
                className="w-5 h-5 rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div className="flex justify-end mr-5 ">
              <svg
                className="w-5 h-5 rounded-full hover:bg-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="mr-5">
              <svg
                className="w-5 h-5 rounded-full hover:bg-gray-400 hover:w-7 hover:h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          </div>
          <div className="flex flex-row h-10 mt-4 ml-5 mr-5 bg-gray-300 rounded-6xl hover:bg-gray-600">
            <div className="flex items-center ml-3">
              <svg
                className="w-5 h-5"
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
            </div>
            <div className="flex items-center justify-center ml-3 text-gray-900">Sta trazis?</div>
            <div className="flex items-center justify-items-end">
              <svg
                className="w-5 h-5 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-10 ml-5 text-lg font-bold ">Tvoja korpa je prazna </div>
          <div className="mt-5 ml-5 mr-5 border border-gray-400 ">
            <div className="flex flex-row p-6">
              <div className="flex flex-col">
                <div className="mt-3 font-bold">Imas nalog?</div>
                <div className="text-xs">Pridruzi se ili prijavi da lakse obavis placanje.</div>
              </div>
              <div className="mt-5 ml-16">
                <svg
                  className="flex w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-10 ml-6 mr-6 border-t border-gray-400">
            <div className="mt-5 font-bold hover:underline">Dodaj proizvod unosom broja arikla</div>
            <div className="flex flex-row mt-10">
              <div>
                <svg
                  className="w-5 h-5 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div className="ml-2 font-bold ">365 dana da se predomislis </div>
            </div>
            <div className="flex flex-row mt-4">
              <div>
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="ml-2 font-bold">Sigurna kupovina sa SSL enkripcijom informacija</div>
            </div>
          </div>
          <div className="ml-6 mr-6 border-t border-gray-400 mt-7">
            <div className="mt-6 text-lg font-bold ">Preporuceno za tebe </div>
          </div>
        </div>
      </div>
    </div>
  );
}
