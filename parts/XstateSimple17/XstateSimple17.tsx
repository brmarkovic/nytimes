import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple17Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple17() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple17Machine, {
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
      <div>VREME ZA SETNJU</div>
      <div>
        <div>
          <textarea
            value={cx.naziv}
            onChange={(ev) => {
              send({
                type: 'INPUT',
                data: ev.target.value,
              });
            }}
            className="border border-gray-800 rounded-lg"
          />
        </div>
        <div>
          <button
            className="text-white bg-gray-700 rounded-lg"
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
          <div>
            <div>Vidi uslove za setnju</div>
            <div>Pritisak {cx.prognoza.pressure}</div>
            <div>Temeratura {cx.prognoza.temp}</div>
            <div>Zagadjenje {cx.zagadjenje.pm2_5}</div>
          </div>
        </div>
        <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple17;
