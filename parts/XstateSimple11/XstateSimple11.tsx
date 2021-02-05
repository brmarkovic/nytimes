/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple11Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple11() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple11Machine, {
    show: true,
  });
  const [{ context: cx, matches: ma, value: currentState }, send] = machine || [{}];
  useXstateDebugger({ machine, name: '__' });

  useEffect(() => {
    // boot machine
    send({ type: 'BROWSER' });
  }, []);

  // REACT (HTML+) KOMPONENTA
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row ">
        <div className="flex flex-row flex-auto w-1/6">
          <div>
            <a>
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex flex-row flex-auto w-4/6">
          <img
            className="flex items-center "
            src="data:image/png;base64,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"
            alt=""
          />
        </div>
        <div className="flex flex-row justify-end flex-auto w-1/6 ml-2">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="flex flex-row h-10 mt-1 bg-gray-300 border-t-2 border-b-2 border-gray-700">
        <div className="flex w-1/2 p-2 ml-2 text-xs font-medium">Thrusday, February 4,2021 </div>
        <div className="flex flex-row w-1/2 ">
          <div className="flex p-2 ml-2 text-xs text-gray-600 border-r-2 border-gray-600">SUBSCRIBE NOW</div>
          <div className="flex p-2 ml-2 text-xs text-gray-600 ">LOG IN </div>
        </div>
      </div>
      <div className="flex flex-col ">
        {['videoklub'].some(ma) && (
          <div className="flex flex-col">
            <button
              className="p-5 mx-1 font-serif text-lg text-gray-800 bg-gray-300 rounded-lg"
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
              className="p-5 mx-1 font-serif text-lg text-gray-800 bg-gray-300 rounded-lg"
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
              className="p-5 mx-1 font-serif text-lg text-gray-800 bg-gray-300 rounded-lg"
              type="button"
              onClick={() => {
                send({
                  type: 'ZAPOCNIIZNAJMI',
                });
              }}
            >
              IZNAJMI FILM
            </button>
            <button
              className="p-5 mx-1 font-serif text-lg text-gray-800 bg-gray-300 rounded-lg"
              type="button"
              onClick={() => {
                send({
                  type: 'VIDIVESTI',
                });
              }}
            >
              NOVOSTI U SVETU FILMA
            </button>
          </div>
        )}
        {['vidilistuclanova'].some(ma) && (
          <div className="flex flex-col bg-gray-300">
            <div>
              <div className="px-3 font-serif text-lg text-gray-900"> Lista clanova</div>
              {cx?.listaclanova?.map((r) => {
                return <div className="flex flex-col px-2">{r.imeclan}</div>;
              })}
              <div className="flex flex-col">
                <div className="font-serif font-semibold text-gray-800"> Uclanite se u klub </div>
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
                    className="bg-gray-400 border border-gray-900 "
                  />
                  <div className="flex flex-col">
                    <button
                      className="p-3 mx-1 font-semibold text-gray-300 bg-gray-600 rounded-lg"
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
                      className="p-3 mx-1 font-semibold text-gray-300 bg-gray-600 rounded-lg"
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
          </div>
        )}
        {['vidilistukomedija'].some(ma) && (
          <div className="flex flex-col bg-gray-300">
            <div>
              <div className="px-3 font-serif text-lg text-gray-900"> Lista filmova</div>
              {cx?.listakomedija?.map((r) => {
                return <div className="flex flex-col px-2"> {r.imekomedija}</div>;
              })}
              <div className="flex flex-col">
                <div className="font-serif font-semibold text-gray-800"> Unesite film koji zelite da gledate </div>
                <div>
                  <textarea
                    value={cx?.novakomedija}
                    onChange={(ev) => {
                      send({
                        type: 'NOVAKOMEDIJA',
                        data: {
                          imekomedija: ev.target.value,
                        },
                      });
                    }}
                    className="bg-gray-400 border border-gray-900"
                  />
                  <div className="flex flex-col">
                    <button
                      className="p-3 mx-1 font-semibold text-gray-300 bg-gray-600 rounded-lg"
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
                      className="p-3 mx-1 font-semibold text-gray-300 bg-gray-600 rounded-lg"
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
          </div>
        )}
        {['vidilistuiznajmljivanja'].some(ma) && (
          <div className="flex flex-col bg-gray-300">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <div className="flex justify-center px-3 font-serif text-lg text-gray-900 "> Lista clanova</div>
                {cx?.listaclanova?.map((r) => {
                  return (
                    <div>
                      <button
                        className={`p-1 mx-1 w-48 truncate ${
                          r.id === cx.trenutniclan ? `bg-gray-800 text-white` : `bg-gray-500 text-gray-700`
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
              <div className="flex flex-col">
                <div className="flex justify-center px-3 font-serif text-lg text-gray-900 "> Lista filmova</div>
                {cx?.listakomedija?.map((r) => {
                  return (
                    <div>
                      <button
                        className={`p-1 mx-1 w-48 truncate  ${
                          r.id === cx.trenutnakomedija ? `bg-gray-800 text-white` : `bg-gray-500 text-gray-700`
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
            </div>
            <button
              className="p-3 mx-1 mt-2 font-serif font-semibold text-gray-300 bg-gray-600 rounded-lg"
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
              className="p-3 mx-1 mt-2 font-serif font-semibold text-gray-300 bg-gray-600 rounded-lg"
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
                  <div className="flex flex-col">
                    {' '}
                    Lista iznajlmljivanja {r.id_clan}
                    {r.id_komedija}{' '}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {['vidilistuvesti'].some(ma) && (
          <div className="flex flex-col">
            {cx?.listavesti?.map((r) => {
              return (
                <div className="flex flex-col">
                  {r.naslov} {r.slika} {r.prica}
                </div>
              );
            })}
            <div className="flex flex-col">
              <div className="font-serif font-semibold text-green-900"> Unesite vesti iz filma </div>
              <div>
                <div>
                  <div>Unesite naslov </div>
                  <textarea
                    value={cx?.novinaslov}
                    onChange={(ev) => {
                      send({
                        type: 'NOVAVESTNASLOV',
                        data: {
                          naslov: ev.target.value,
                        },
                      });
                    }}
                    className="text-green-900 bg-yellow-600 border border-green-900"
                  />
                </div>
                <div>
                  <div>Unesite sliku </div>
                  <textarea
                    value={cx?.novaslika}
                    onChange={(ev) => {
                      send({
                        type: 'NOVAVESTSLIKA',
                        data: {
                          slika: ev.target.value,
                        },
                      });
                    }}
                    className="text-green-900 bg-yellow-600 border border-green-900"
                  />
                </div>

                <div>
                  <div>Unesite text </div>
                  <textarea
                    value={cx?.novaprica}
                    onChange={(ev) => {
                      send({
                        type: 'NOVAVESTPRICA',
                        data: {
                          prica: ev.target.value,
                        },
                      });
                    }}
                    className="text-green-900 bg-yellow-600 border border-green-900"
                  />
                </div>
                <div className="flex flex-col">
                  <button
                    className="p-3 mx-1 font-semibold text-yellow-400 bg-green-900 rounded-lg"
                    type="button"
                    onClick={() => {
                      send({
                        type: 'DODAJNOVAVEST',
                        data: {
                          naslov: cx.novinaslov,
                          slika: cx.novaslika,
                          prica: cx.novaprica,
                        },
                      });
                    }}
                  >
                    Potvrdi vest
                  </button>
                  <button
                    className="p-3 mx-1 font-semibold text-yellow-400 bg-green-900 rounded-lg"
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
      </div>
      <div>
        <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple11;
