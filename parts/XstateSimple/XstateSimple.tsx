import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimpleMachine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimpleMachine, {
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
      <div>Simple Machine</div>
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
      </div>
      <div>
        <div>FORMULAR</div>
        <hr />
        {['idle'].some(ma) && (
          <div>
            <button
              className="p-1 mx-1 bg-red-500 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'FEEDBACK' });
              }}
            >
              vas utisak?
            </button>
          </div>
        )}

        {['pitanje'].some(ma) && (
          <div>
            <div>Da li ste zadovoljni</div>
            <div>
              <button
                className="p-1 mx-1 bg-green-500 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'YES' });
                }}
              >
                DA
              </button>
              <button
                className="p-1 mx-1 bg-red-500 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'NO' });
                }}
              >
                NE
              </button>
            </div>
          </div>
        )}

        {['kritika'].some(ma) && (
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div>Kritika</div>
              <div>
                <textarea
                  value={cx?.kritikaTekst}
                  onChange={(ev) => {
                    send({ type: 'INPUT', data: ev.target.value });
                  }}
                  className="border border-gray-500"
                />
              </div>
            </div>
            <div>
              <button
                className="p-1 mx-1 bg-red-500 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'SUBMIT' });
                }}
              >
                Posalji
              </button>
              <button
                className="p-1 mx-1 bg-red-500 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'ABORT' });
                }}
              >
                Odustani
              </button>
            </div>
          </div>
        )}
        {['zahvalnica'].some(ma) && (
          <div>
            <div>Zahvaljujemo se!</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default XstateSimple;
