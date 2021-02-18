/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple19Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple19() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple19Machine, {
    show: false,
  });
  const [{ context: cx, matches: ma, value: currentState }, send] = machine || [{}];
  useXstateDebugger({ machine, name: '__' });

  useEffect(() => {
    // boot machine
    send({ type: 'BROWSER' });
  }, []);

  // REACT (HTML+) KOMPONENTA
  return (
    <div className="flex flex-col">
      <div className="bg-white">
        <div className="flex flex-row justify-between p-3">
          <div>
            <img className="ml-3 h-7" src="https://images.direktnabanka.rs/logo.png" alt="" />
          </div>
          <div>
            <svg
              className="w-5 mr-3 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>
        <div className="flex">
          <img
            className="w-full"
            style={{ width: 700, height: 384 }}
            src="https://images.direktnabanka.rs/1572871998/desktop/home-page-slider/616DB_Web%20stednja.jpg"
            alt=""
          />
        </div>
        <div className="mt-3 ml-5 text-4xl font-bold tracking-wider text-red-600">Upadljivo vrednije.</div>
        <div className="ml-5 text-xs text-gray-600">
          <span className="font-bold"> Standardnom, Stepenastom i Fleksi </span>stednjom u Direktnoj banci dodajte
          vrednost vasem novcu.
        </div>
        <div>
          <button className="px-8 py-2 ml-5 text-red-600 border border-red-600 rounded-6xl mt-7">Saznajte vise</button>
        </div>
        <div className="mt-16">
          <img
            src="https://images.direktnabanka.rs/1593680139/desktop/content-pages-home/79914369DB_tekuci_racuni.png"
            alt=""
          />
        </div>
        <div className="mt-12 font-medium text-center text-red-600"> ZA GRADJANE</div>
        <div className="mt-10 text-4xl text-center text-red-600">Tekuci racuni</div>
        <div className="mt-5 ml-5 mr-5 text-center text-gray-700">
          Upravljajte svojim vremenom i novcem otvorite tekući račun u našoj Banci, uz jednostavnu proceduru. Očekujemo
          Vas u svim našim poslovnicama, gde možete da se raspitate o prednostima naših paketa tekućih računa.
        </div>
        <div className="flex justify-center ">
          <button className="px-8 py-2 mt-8 ml-5 text-red-600 border border-red-600 rounded-6xl">Saznajte vise</button>
        </div>
        <div>
          <img
            src="https://images.direktnabanka.rs/1593680260/desktop/content-pages-home/80116379287money-bag.jpg"
            alt=""
          />
        </div>
      </div>
      <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
    </div>
  );
}

export default XstateSimple19;
