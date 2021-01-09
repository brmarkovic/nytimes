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
    send({ type: 'idle' });
  }, []);

  // REACT (HTML+) KOMPONENTA
  return (
    <div className="p-2">
      <div>Simple Machine8</div>
      <div>
        <button
          type="button"
          onClick={() => {
            send({ type: 'SHOW', data: !cx.show });
          }}
        >
          toggle show
        </button>
        {cx?.show && <div>prikazujem...</div>}

        <div className="flex flex-col">
          <div>
            {cx.sviklijenti.map((r) => {
              return (
                <div>
                  SVI KLIJENTI
                  <button
                    className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                    type="button"
                    onClick={() => {
                      send({ type: 'LOGKLIJENTA' });
                    }}
                  >
                    Vidi klijenta
                  </button>
                  {r.klijent}
                </div>
              );
            })}

            <button
              className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'DODAJKLIJENTA' });
              }}
            >
              Unesi klijenta
            </button>
          </div>

          <div>
            {cx.svikomentari.map((r) => {
              return <div> SVI KOMENTARI {r.komentar} </div>;
            })}
            <button
              className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'DODAJKOMENTAR' });
              }}
            >
              Unesi komentar
            </button>
          </div>
        </div>
        <pre>{JSON.stringify({ cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple8;
