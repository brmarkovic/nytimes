import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple11Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple11() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple11Machine, {
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
      <div className="flex flex-col">
        {['videoklub'].some(ma) && (
          <div className="flex flex-col">
            <button
              className="p-5 mx-1 font-serif text-lg text-green-700 bg-yellow-600 rounded-lg"
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
              IZNAJMI FILM
            </button>
            <button
              className="p-5 mx-1 font-serif text-lg text-green-700 bg-yellow-600 rounded-lg"
              type="button"
              onClick={() => {
                send({
                  type: 'VIDIVESTI',
                });
              }}
            >
              NOVOSTI U SVETU FILMA
            </button>
          </div>
        )}
      </div>
      <div>
        <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple11;
