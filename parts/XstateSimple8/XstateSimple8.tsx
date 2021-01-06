/* eslint-disable no-unreachable */
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
        {cx.prijave.map((r) => {
          return <div className="flex flex-col"> KLIJENT ({r.klijent})</div>;
          <button
            className="p-1 mx-1 bg-gray-500 rounded-lg"
            type="button"
            onClick={() => {
              send({ type: '', data: { id: r.id } });
            }}
          >
            Obrisi
          </button>;
        })}
        <pre>{JSON.stringify({ cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple8;
