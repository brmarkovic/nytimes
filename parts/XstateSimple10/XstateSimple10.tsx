/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple10Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple10() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple10Machine, {
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
    <div className="p-2 bg-gradient-to-tr from-green-600 to-orange-500">
      <div className="font-serif text-lg font-extrabold text-center text-yellow-500">VIDEO KLUB VASA</div>
      <div>
        <div className="flex flex-col">
          {['videoklub'].some(ma) && (
            <div className="flex flex-col">
              <button
                className="p-5 mx-1 font-serif text-lg text-green-700 bg-yellow-600 rounded-lg "
                type="button"
                onClick={() => {
                  send({
                    type: 'VIDICLAN',
                  });
                }}
              >
                CLANOVI KLUBA
              </button>
              <button
                className="p-5 mx-1 font-serif text-lg text-green-700 bg-yellow-600 rounded-lg"
                type="button"
                onClick={() => {
                  send({
                    type: 'VIDIKOMEDIJA',
                  });
                }}
              >
                IZBOR FILMOVA
              </button>
              <button
                className="p-5 mx-1 font-serif text-lg text-green-700 bg-yellow-600 rounded-lg"
                type="button"
                onClick={() => {
                  send({
                    type: 'ZAPOCNIIZNAJMI',
                  });
                }}
              >
                IZNAJMI
              </button>
            </div>
          )}
          {['vidilistuclanova'].some(ma) && (
            <div className="flex flex-col">
              {cx?.listaclanova?.map((r) => {
                return <div className="text-justify "> Lista clanova kluba {r.imeclan} </div>;
              })}
              <div className="flex flex-col">
                <div> Uclanite se u klub </div>
                <div>
                  <textarea
                    value={cx?.noviclan}
                    onChange={(ev) => {
                      send({
                        type: 'NOVICLAN',
                        data: {
                          imeclan: ev.target.value,
                        },
                      });
                    }}
                    className="border border-green-900"
                  />
                  <div className="flex flex-col">
                    <button
                      className="p-1 mx-1 text-yellow-400 bg-green-900 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'DODAJNOVICLAN',
                          data: {
                            imeclan: cx.noviclan,
                          },
                        });
                      }}
                    >
                      Potvrdi clanstvo
                    </button>
                    <button
                      className="p-1 mx-1 text-yellow-400 bg-green-900 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'HOME',
                        });
                      }}
                    >
                      Vrati se na pocetnu stranu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {['vidilistukomedija'].some(ma) && (
            <div className="flex flex-col ">
              {cx?.listakomedija?.map((r) => {
                return <div className="flex flex-col">Lista komedija {r.imekomedija}</div>;
              })}
              <div className="flex flex-col">
                <div> Unesite film koji bi ste zeleli da pogledate </div>
                <div>
                  <textarea
                    value={cx.novakomedija}
                    onChange={(ev) => {
                      send({
                        type: 'NOVAKOMEDIJA',
                        data: {
                          imekomedija: ev.target.value,
                        },
                      });
                    }}
                    className="bg-orange-500 border border-green-900"
                  />
                  <div className="flex flex-col">
                    <button
                      className="p-1 mx-1 text-yellow-400 bg-green-900 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'DODAJNOVAKOMEDIJA',
                          data: {
                            imekomedija: cx.novakomedija,
                          },
                        });
                      }}
                    >
                      Potvrdi film
                    </button>
                    <button
                      className="p-1 text-yellow-400 bg-green-900 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'HOME',
                        });
                      }}
                    >
                      Vrati se na pocetnu stranu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {['vidilistuiznajmljivanja'].some(ma) && (
            <div className="flex flex-col">
              <div className="flex">
                <div className="flex flex-col">
                  <div>Izaberi film </div>
                  {cx?.listakomedija?.map((r) => {
                    return (
                      <div>
                        <button
                          className={`p-1 mx-1 text-yellow-400  ${
                            r.id === cx.trenutnakomedija ? `bg-blue-500` : `bg-green-900`
                          }`}
                          type="button"
                          onClick={() => {
                            send({
                              type: 'IZABERIKOMEDIJA',
                              data: {
                                id: r.id,
                              },
                            });
                          }}
                        >
                          {r.imekomedija}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col">
                  <div> Izaber clan </div>
                  {cx?.listaclanova?.map((r) => {
                    return (
                      <div>
                        <button
                          className={`p-1 mx-1 text-yellow-400  ${
                            r.id === cx.trenutniclan ? `bg-blue-500` : `bg-green-900`
                          }`}
                          type="button"
                          onClick={() => {
                            send({
                              type: 'IZABERICLAN',
                              data: {
                                id: r.id,
                              },
                            });
                          }}
                        >
                          {r.imeclan}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button
                className="p-1 mx-1 text-yellow-400 bg-green-900 rounded-lg"
                type="button"
                onClick={() => {
                  send({
                    type: 'IZNAJMI',
                    data: {
                      id_clan: cx.trenutniclan,
                      id_komedija: cx.trenutnakomedija,
                    },
                  });
                }}
              >
                IZNAJMI
              </button>
              <button
                className="p-1 mx-1 text-yellow-400 bg-green-900 rounded-lg"
                type="button"
                onClick={() => {
                  send({
                    type: 'HOME',
                  });
                }}
              >
                Vrati se na pocetnu stranu
              </button>
              <div>
                {cx?.listaiznajmljivanja?.map((r) => {
                  return (
                    <div>
                      {' '}
                      lista iznajmljenih filmova {r.id_clan} {r.id_komedija}{' '}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple10;
