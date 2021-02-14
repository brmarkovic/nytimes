import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple16Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple16() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple16Machine, {
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
      <div className="bg-pink-300">
        <div>
          <div> vremenska prognoza</div>
          <div>
            <textarea
              value={cx.naziv}
              onChange={(ev) => {
                send({
                  type: 'INPUT',
                  data: ev.target.value,
                });
              }}
              className="border border-pink-900 "
            />
          </div>
          <div>
            <button
              className="bg-pink-800 rounded-lg"
              type="button"
              onClick={() => {
                send({
                  type: 'VIDILOKACIJA',
                  data: {
                    naziv: cx.naziv,
                  },
                });
              }}
            >
              SETAM BEBU
            </button>
          </div>
        </div>
        <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple16;
