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
        <div className="flex flex-col">
          <div className="flex items-center justify-center h-12 text-2xl text-pink-100 bg-gradient-to-bl from-pink-900 via-pink-600 to-pink-300">
            {' '}
            VREMENSKA PROGNOZA
          </div>
          <div className="flex flex-col mt-5">
            <div className="flex justify-center ">
              <textarea
                value={cx.naziv}
                onChange={(ev) => {
                  send({
                    type: 'INPUT',
                    data: ev.target.value,
                  });
                }}
                className="text-pink-900 bg-pink-200 border border-pink-900 rounded-lg "
              />
            </div>{' '}
          </div>
          <div className="flex justify-center h-8 mt-4 ">
            <button
              className="p-1 bg-pink-800 rounded-lg hover:bg-purple-700 hover:text-white "
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
          <div>
            <div className="mt-5 border-t border-b border-pink-800">
              <img
                className="object-cover w-full"
                src="https://aska.rs/wp-content/uploads/ultimatemember/temp/zumbul-1.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col mt-2 ml-3 border-b border-pink-800">
            <div>Vidi prilike za izabrani grad</div>
            <div>Pritisak: {cx.prognoza.pressure}</div>
            <div> Zagadjenje:{cx.zagadjenje.pm2_5}</div>
          </div>
        </div>
        <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple16;
