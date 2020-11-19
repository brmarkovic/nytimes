import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { SimpleMachine } from './_machine';

// inspect({
//   // options
//   // url: 'https://statecharts.io/inspect', // (default)
//   iframe: false, // open in new window
// });

export function SimpleComponent() {
  const machine = useMachine(SimpleMachine, {
    show: false,
  });
  const [{ context: cx }, send] = machine || [{}];
  useXstateDebugger({ machine, name: 'SimpleMachine' });

  useEffect(() => {
    // boot machine
    send({ type: 'idle' });
  }, []);

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
    </div>
  );
}

export default SimpleComponent;
