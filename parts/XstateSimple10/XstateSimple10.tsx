import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple10Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple10() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple10Machine, {
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
    <div className="p-2 bg-gradient-to-tr from-green-600 to-orange-500">
      <div className="font-serif text-lg font-extrabold text-center text-yellow-500">VIDEO KLUB VASA</div>
      <div>
        <div className="flex flex-col">
          {['videoklub'].some(ma) && (
            <div className="flex flex-col">
              <button
                className="p-5 mx-1 font-serif text-lg text-green-700 bg-yellow-600 rounded-lg "
                type="button"
                onClick={() => {
                  send({
                    type: 'VIDICLAN',
                  });
                }}
              >
                CLANOVI KLUBA
              </button>
              <button
                className="p-5 mx-1 font-serif text-lg text-green-700 bg-yellow-600 rounded-lg"
                type="button"
                onClick={() => {
                  send({
                    type: 'VIDIKOMEDIJA',
                  });
                }}
              >
                IZBOR FILMOVA
              </button>
              <button
                className="p-5 mx-1 font-serif text-lg text-green-700 bg-yellow-600 rounded-lg"
                type="button"
                onClick={() => {
                  send({
                    type: 'ZAPOCNIIZNAJMI',
                  });
                }}
              >
                IZNAJMI
              </button>
            </div>
          )}
        </div>
        <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple10;
