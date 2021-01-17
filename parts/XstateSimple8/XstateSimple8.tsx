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
      <div className="font-extrabold">Pogledaj listu klijenata i logove klijenata</div>

      <div>
        <div className="flex flex-col">
          {['vidilistuklijenata'].some(ma) && (
            <div className="flex flex-col">
              {cx.listaklijenata.map((r) => {
                return (
                  <div>
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
                      Vidi logove klijenta
                    </button>
                    {r.klijent}{' '}
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
                          klijent: ev.target.value,
                        },
                      });
                    }}
                    className="border border-gray-500"
                  />
                  <div className="flex flex-col">
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'DODAJNOVIKLIJENT',
                          data: {
                            klijent: cx.noviklijent,
                          },
                        });
                      }}
                    >
                      Dodaj klijenta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col">
            {['vidilistulogovaklijenta'].some(ma) && (
              <div className="flex flex-col">
                {cx?.listalogovaklijenta
                  ?.filter((r) => cx.trenutniklijent === r.id_klijent)
                  .map((r) => {
                    return <div> Lista logova klijenta {r.logtekst} </div>;
                  })}
                <div className="flex flex-col ">
                  <div>Unesite novog log za klijenta</div>
                  <div>
                    <textarea
                      value={cx?.novilogklijenta}
                      onChange={(ev) => {
                        send({
                          type: 'NOVILOGKLIJENTA',
                          data: {
                            logtekst: ev.target.value,
                          },
                        });
                      }}
                      className="border border-gray-500"
                    />
                    <div className="flex flex-col">
                      <button
                        className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                        type="button"
                        onClick={() => {
                          send({
                            type: 'DODAJNOVILOGKLIJENTA',
                            data: {
                              logtekst: cx.novilogklijenta,
                              id_klijent: cx.trenutniklijent,
                            },
                          });
                        }}
                      >
                        Dodaj novi log klijenta
                      </button>
                      <button
                        className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                        type="button"
                        onClick={() => {
                          send({
                            type: 'LISTAKLIJENATA',
                            data: {
                              id_klijent: 0,
                            },
                          });
                        }}
                      >
                        Vrati se na listuklijenata
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <pre>{JSON.stringify({ cx }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default XstateSimple8;
