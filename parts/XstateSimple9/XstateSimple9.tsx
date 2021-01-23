import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple9Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple9() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple9Machine, {
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
    <div className="p-2 bg-green-500">
      <div className="font-extrabold text-yellow-400 bg-green-900">VIDEO KLUB VASA</div>
      <div>
        {['videoklub'].some(ma) && (
          <div className="flex flex-col">
            <button
              className="p-1 mx-1 text-green-700 bg-yellow-600 rounded-lg"
              type="button"
              onClick={() => {
                send({
                  type: 'VIDICLAN',
                });
              }}
            >
              Vidi clanove kluba
            </button>
            <button
              className="p-1 mx-1 text-green-700 bg-yellow-600 rounded-lg"
              type="button"
              onClick={() => {
                send({
                  type: 'VIDIKOMEDIJA',
                });
              }}
            >
              Vidi ponudu filmova - KOMEDIJE
            </button>
            <button
              className="p-1 mx-1 text-green-700 bg-yellow-600 rounded-lg"
              type="button"
              onClick={() => {
                send({
                  type: 'ZAPOCNIIZNAJMI',
                });
              }}
            >
              IZNAJMI FILM
            </button>
          </div>
        )}
        {['vidilistuclanova'].some(ma) && (
          <div className="flex flex-col">
            {cx?.listaclanova?.map((r) => {
              return <div> Lista clanovakluba {r.imeclan} </div>;
            })}
            <div className="flex flex-col ">
              <div>Uclanite se u video klub</div>
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
                  className="border border-gray-500"
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
        {['vidilistukomedije'].some(ma) && (
          <div className="flex flex-col">
            {cx?.listakomedija?.map((r) => {
              return <div> Lista filmova-zanr KOMEDIJA {r.imekomedija} </div>;
            })}
            <div className="flex flex-col ">
              <div>Unesite ime filma koji zelite da se nadje u video klubu</div>
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
                  className="border border-gray-500"
                />
                <div className="flex flex-col">
                  <button
                    className="p-1 mx-1 text-yellow-400 bg-green-900"
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
                    Ptvrdite unos zeljenog filma
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
        {['vidilistuiznajmljivanja'].some(ma) && (
          <div className="flex flex-col">
            <div className="flex ">
              <div className="flex flex-col">
                <div>Izaberi film </div>
                {cx?.listakomedija?.map((r) => {
                  return (
                    <div>
                      {' '}
                      <button
                        className="p-1 mx-1 text-yellow-400 bg-green-900"
                        type="button"
                        onClick={() => {
                          send({
                            type: 'IZABERIKOMEDIJA',
                            data: {
                              id: cx.trenutnakomedija,
                            },
                          });
                        }}
                      >
                        {r.imekomedija}
                      </button>{' '}
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col">
                <div> Izaberi clana </div>
                {cx?.listaclanova?.map((r) => {
                  return (
                    <div>
                      {' '}
                      <button
                        className="p-1 mx-1 text-yellow-400 bg-green-900"
                        type="button"
                        onClick={() => {
                          send({
                            type: 'IZABERICLAN',
                            data: {
                              id: cx.trenutniclan,
                            },
                          });
                        }}
                      >
                        {r.imeclan}
                      </button>{' '}
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              className="p-1 mx-1 text-yellow-400 bg-green-900"
              type="button"
              onClick={() => {
                send({
                  type: 'IZNAJMI',
                  data: {
                    id_clan: 1,
                    id_komedija: 1,
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
          </div>
        )}
        <pre>{JSON.stringify({ cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple9;
