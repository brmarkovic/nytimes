/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple18Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple18() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple18Machine, {
    show: false,
  });
  const [{ context: cx, matches: ma }, send] = machine || [{}];
  useXstateDebugger({ machine, name: '__' });

  useEffect(() => {
    // boot machine
    send({ type: 'BROWSER' });
  }, []);

  // REACT (HTML+) KOMPONENTA
  return (
    <div className="flex flex-col">
      <div className="bg-white">
        <div className="flex items-center h-12 text-xs text-white truncate bg-black">
          <div className="ml-5">
            Za vreme drzavnog praznika 15.i 16. februara, robna kuca IKEA Beograd, Restoran i centar za isporuku Novi
            Sad radice nepromenjenjo. usluzni centar za isporuku Nis nece raditi.
          </div>
        </div>
        <div className="flex flex-row items-center mt-3">
          <div className="flex-auto ml-4">
            <img
              className="w-16 h-8 "
              src="https://www.ikea.com/rs/sr/static/ikea-logo.f88b07ceb5a8c356b7a0fdcc9a563d63.svg"
              alt=""
            />
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
            <Link href="/XstateSimple18/menu">
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
            </Link>
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
          <div className="flex items-center w-1/6 ml-3">
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
          <div className="flex items-center justify-start w-4/6 ml-3 text-gray-900">Sta trazis?</div>
          <div className="flex items-center justify-start w-1/6">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="ml-3 mr-3">
            <img
              className="w-full "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTasHgeihzwGtMi8mwx2DTKsT2I7KJ6EbTu8g&usqp=CAU"
              alt=""
            />
          </div>
          <div className="p-5 ml-3 mr-3 bg-gray-200 ">
            <div className="mt-3 ml-6 mr-5 text-2xl font-bold text-gray-700">
              Onlajn kupovina je toliko jednostavna da je mozes obaviti i levom nogom!
            </div>
          </div>
        </div>
        <div className="flex flex-col p-8 mt-8 ml-3 mr-3 bg-blue-100">
          <div className="ml-6 text-lg font-bold ">Mozemo li nesto da te pitamo?</div>
          <div className="mt-2 ml-6">
            U kompaniji IKEA uvek nastojimo da pružimo što bolju uslugu našim kupcima. Želeli bismo da znamo kako je
            pandemija COVID-19 uticala na tebe, kako bismo ti ponudili još više. Za anketu ti je potrebno samo nekoliko
            minuta.
          </div>
          <div className="mt-2 ml-6">Hvala ti na izdvojenom vremenu!</div>
          <div className="mt-4 ml-6">
            <button
              className="p-2 text-white bg-black rounded-6xl"
              type="button"
              onClick={() => {
                send({
                  type: 'ANKETA',
                });
              }}
            >
              Popuni anketu
            </button>
          </div>
          {['pitanje'].some(ma) && (
            <div className="mt-4 ml-6">
              <div>Da li ste zadovoljni</div>
              <div className="mt-4 ">
                <button
                  className="p-1 mx-1 text-white bg-blue-800 rounded-full"
                  type="button"
                  onClick={() => {
                    send({ type: 'YES' });
                  }}
                >
                  DA
                </button>
                <button
                  className="p-1 mx-1 text-white bg-blue-800 rounded-full"
                  type="button"
                  onClick={() => {
                    send({ type: 'NO' });
                  }}
                >
                  NE
                </button>
              </div>
            </div>
          )}
          {['kritika'].some(ma) && (
            <div className="mt-4 ml-6">
              <div>Molimo unesite vasu kritiku</div>
              <div>
                <textarea
                  value={cx.kritikatekst}
                  onChange={(ev) => {
                    send({
                      type: 'INPUT',
                      data: ev.target.value,
                    });
                  }}
                  className="border border-gray-500 rounded-lg"
                />
              </div>
              <div className="mt-4 ">
                <button
                  className="p-1 mx-1 text-white bg-blue-800 rounded-full"
                  type="button"
                  onClick={() => {
                    send({ type: 'SUBMIT' });
                  }}
                >
                  Potvrdi
                </button>
                <button
                  className="p-1 mx-1 text-white bg-blue-800 rounded-full"
                  type="button"
                  onClick={() => {
                    send({ type: 'ABORT' });
                  }}
                >
                  Odustani
                </button>
              </div>
            </div>
          )}
          {['zahvalnica'].some(ma) && <div>IKEA vam se zahvaljuje na popunjenoj anket! </div>}
        </div>
        <div>
          <pre>{JSON.stringify({ cx }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default XstateSimple18;
