/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple8Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple8() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple8Machine, {
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
    <div className="p-2">
      <div className="font-extrabold">Pregled liste klijenata i logova klijenata</div>
      <div>
        <div className="flex flex-col">
          {cx.listaklijenata.map((r) => {
            return (
              <div>
                {' '}
                Lista klijenata
                <button
                  className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                  type="button"
                  onClick={() => {
                    send({
                      type: 'LOGKLIJENTA',
                      data: {
                        id: r.id,
                      },
                    });
                  }}
                >
                  Vidi klijenta
                </button>
                {r.imeklijenta}{' '}
              </div>
            );
          })}
          <div className="flex flex-col ">
            <div>Unesite novog klijenta</div>
            <div>
              <textarea
                value={cx?.noviklijent}
                onChange={(ev) => {
                  send({
                    type: 'NOVIKLIJENT',
                    data: {
                      imeklijenta: ev.target.value,
                    },
                  });
                }}
                className="border border-gray-500"
              />
            </div>
          </div>
          <button
            className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
            type="button"
            onClick={() => {
              send({ type: 'DODAJNOVIKLIJENT' });
            }}
          >
            Dodaj klijenta
          </button>

          {cx.listalogovaklijenta.map((r) => {
            return <div className="flex flex-col">Logovi klijenta {r.logtekst} </div>;
          })}
          <div className="flex flex-col">
            <div>Unesite novi log klijenta </div>
            <div>
              <textarea
                value={cx?.novilogklijenta}
                onChange={(ev) => {
                  send({
                    type: 'NOVILOGKLIJENTA',
                    data: {
                      logtekst: ev.target.value,
                      id_klijent: 1,
                    },
                  });
                }}
                className="border border-gray-500"
              />
            </div>
          </div>
          <button
            className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
            type="button"
            onClick={() => {
              send({ type: 'DODAJNOVILOGKLIJENTA' });
            }}
          >
            Dodaj komentar
          </button>
          <button
            className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
            type="button"
            onClick={() => {
              send({ type: 'LISTAKLIJENATA' });
            }}
          >
            Vrati se na listu klijenata
          </button>
          {['ucitajklijente'].some(ma) && (
            <div>
              <button
                className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'LISTAKLIJENATA' });
                }}
              >
                Pogledaj klijente
              </button>
            </div>
          )}
          <pre>{JSON.stringify({ cx }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default XstateSimple8;
