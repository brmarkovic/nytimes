/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple12Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple12() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple12Machine, {
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
    <div className="p-2 flex-flex-col">
      <div>
        <div className="flex flex-col">
          {['vidilistuklijentfirma'].some(ma) && (
            <div className="flex flex-col">
              <div className="text-lg"> Lista firmi </div>
              {cx?.listaklijentfirma?.map((r) => {
                return (
                  <div className="text-base">
                    {r.imefirma} (PIB:{r.pibfirma})
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'KLIJENTFAKTURA',
                          data: {
                            id: r.id,
                          },
                        });
                      }}
                    >
                      Vidi fakture klijenta
                    </button>
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'KLIJENTPLACANJE',
                          data: {
                            id: r.id, // IZMENITI HRADCODOVANU VREDNOST/izmenila
                          },
                        });
                      }}
                    >
                      Vidi placanja klijenta
                    </button>
                  </div>
                );
              })}
              <div className="flex flex-col">
              <div className="text-lg font-bold">Unesite novog klijenta-Firmu</div>
                <div>
                  <div className="flex flex-col">
                  <div>
                  <textarea
                    value={cx?.noviklijentfirmaime}
                    onChange={(ev) => {
                      send({
                        type: 'NOVIKLIJENTFIRMAIME',
                        data: {
                          imefirma: ev.target.value,
                        },
                          });
                    }}
                    className="border border-gray-500"
                  />
                    </div>
                    <div>
                    <textarea
                    value={cx?.noviklijentfirmapib}
                    onChange={(ev) => {
                      send({
                        type: 'NOVIKLIJENTFIRMAPIB',
                        data: {
                          pibfirma: ev.target.value,
                        },
                      });
                    }}
                    className="border border-gray-500"
                  />
                      </div>
                    </div>
                  <div className="flex flex-col">
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'DODAJNOVIKLIJENTFIRMA',
                          data: {
                            imefirma: cx.noviklijentfirmaime,
                            pibfirma: cx.noviklijentfirmapib,
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
        </div>
        <div>
          <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default XstateSimple12;
