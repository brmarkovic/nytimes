/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';

export default function MetroMenu() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col ">
        <div className="fixed top-0 w-full bg-white">
          <div className="hidden h-3 font-sans font-thin text-gray-700">
            <div className="hidden w-56 px-3 justify-items-start ">Telefon: 021 795 3001</div>
            <Link href="/Metro/koferi">
              <div className="flex-auto hidden px-3 justify-items-start">
                <a>Koferi</a>
              </div>
            </Link>
            <div className="justify-end w-56">
              <Link href="/Metro/prijavise">
                <a>Prijavite se</a>
              </Link>
            </div>
            <div className="justify-end w-56 ">
              <Link href="/Metro/registrujse">
                <a>Registrujte se</a>
              </Link>
            </div>
          </div>
          <div className="flex mb-1 h-15 lign-text-bottom">
            <div className="flex items-center">
              <div className="flex flex-row px-2 ">
                <a>
                  <svg
                    className="text-gray-700 w-9 h-9"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
              <div className="flex flex-row">
                <a>
                  <svg
                    className="mt-2 ml-1 text-gray-700 w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex justify-center flex-auto">
              <Link href="/metro">
                <a>
                  <img
                    className="flex-auto w-24 h-15"
                    src="https://www.obucametro.rs/files/images/2019/7/29/LOGO%20METRO%20NOVI%286%29.png"
                    alt=""
                  />
                </a>
              </Link>
            </div>
            <div className="flex justify-end font-thin text-gray-500 align-bottom">
              <div className="flex flex-col mt-4">
                <Link href="/Metro/omiljeno">
                  <a>
                    <svg
                      className="w-7 h-7"
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
                  </a>
                </Link>
              </div>
              <div className="flex flex-col mt-4 ml-5 mr-3">
                <Link href="/Metro/korpa">
                  <a>
                    <svg
                      className=" w-7 h-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex hidden px-48 mt-5 text-gray-700">
          <div className="flex-auto ">
            <Link href="/Metro/zensko">
              <a>ZENSKO</a>
            </Link>
          </div>
          <div className="flex-auto">
            <Link href="/Metro/musko">
              <a>MUSKO</a>
            </Link>
          </div>
          <div className="flex-auto">
            <Link href="/Metro/decije">
              <a>DECIJE</a>
            </Link>
          </div>
          <div className="flex-auto">
            <Link href="/Metro/tekstil">
              <a>TEKSTIL</a>
            </Link>
          </div>
          <div className="flex-auto">
            <Link href="/Metro/fitnes">
              <a>FITNES</a>
            </Link>
          </div>
          <div className="flex-auto">
            <Link href="/Metro/modnidodaci">
              <a>MODNI DODACI</a>
            </Link>
          </div>
          <div className="flex-auto">
            <Link href="/Metro/brendovi">
              <a>BRENDOVI</a>
            </Link>
          </div>
          <div className="flex-auto">
            <Link href="/Metro/setovi">
              <a>SETOVI</a>
            </Link>
          </div>
          <div className="flex-auto text-red-600">
            <Link href="/Metro/akcije">
              <a>AKCIJE</a>
            </Link>
          </div>
          <div className="flex-auto">
            <Link href="/Metro/novo">
              <a>NOVO</a>
            </Link>
          </div>
          <div className="flex-auto">
            <Link href="/Metro/lokacije">
              <a>LOKACIJE</a>
            </Link>
          </div>
          <div className="flex-auto border-gray-700 rounded-lg ">
            <Link href="/Metro/pretrazisajt">
              <a>Pretrazi sajt</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
