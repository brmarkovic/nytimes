import React, { useEffect } from 'react';
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
              className="w-16 h-8"
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
          <div>1</div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="ml-3 mr-3">
            <img
              className="w-full "
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </div>
          <div className="ml-3 mr-3 bg-gray-200">
            <div className="text-2xl font-semibold">
              Onlajn kupovina je toliko jednostavna da je mozes obaviti i levom nogom!
            </div>
          </div>
        </div>
        <div>
          <pre>{JSON.stringify({ cx }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default XstateSimple18;
