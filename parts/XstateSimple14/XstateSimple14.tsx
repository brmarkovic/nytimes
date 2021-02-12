import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple14Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple14() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple14Machine, {
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
    <div className="p-2">
      <div>Setam bebu</div>
      <div className="flex flex-col">
        <div>
          <textarea
            value={cx?.naziv}
            onChange={(ev) => {
              send({
                type: 'INPUT',
                data: ev.target.value,
              });
            }}
            className="border border-gray-500"
          />
        </div>
        <div>
          <button
            className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
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

        <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple14;
