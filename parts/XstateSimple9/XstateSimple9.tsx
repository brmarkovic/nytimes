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
                  type: 'VIDIKOMEDIJU',
                });
              }}
            >
              Vidi ponudu filmova - KOMEDIJE
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
                    className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
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
                    className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
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
                    className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
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
                    Potvrdi clanstvo
                  </button>
                  <button
                    className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
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
        <pre>{JSON.stringify({ cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple9;
