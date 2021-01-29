/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';

export default function MetroMenu() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex h-3 font-sans font-thin text-gray-600">
          <div className="w-56 px-3 justify-items-start ">Telefon: 021 795 3001</div>
          <Link href="/Metro/koferi">
            <div className="flex-auto px-3 justify-items-start">
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
        <div className="flex align-text-bottom">
          <div className="flex justify-center w-10/12 ">
            <Link href="/metro">
              <a>
                <img
                  className="mt-3 mb-3 justify-items-center"
                  src="https://www.obucametro.rs/files/images/2019/7/29/LOGO%20METRO%20NOVI%286%29.png"
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="flex w-1/12 font-thin text-gray-600 align-bottom">
            <div className="flex flex-col w-10 h-10 mt-8">
              <Link href="/Metro/omiljeno">
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Omiljeno
                </a>
              </Link>
            </div>
            <div className="flex flex-col w-10 h-10 mt-8 ml-8">
              <Link href="/Metro/korpa">
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Korpa
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex px-48 text-gray-700">
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
