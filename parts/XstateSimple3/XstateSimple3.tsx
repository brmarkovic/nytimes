import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple3Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple3() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple3Machine, {
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
      <div>Simple3 Machine</div>
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
    </div>
  );
}

export default XstateSimple3;
