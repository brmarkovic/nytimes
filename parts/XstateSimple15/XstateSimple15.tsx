/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple15Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple15() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple15Machine, {
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
            className="border border-gray-300 "
          />
        </div>

        <button
          className=" bg-red-400 p-2 rounded-lg text=white "
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
        <div className="flex flex-col">
          <div className="text-xl text-red-800">
            <div>Vremenska prognoza za izabrani grad</div>
            <div className="text-base font-black">
              <div>Pritisak:{cx.prognoza.pressure}milibara</div>
              <div>Temperatura:{cx.prognoza.temp}farenhajta</div>
              <div>Zagadjenje:{cx.zagadjenje.pm2_5} pm2_5</div>
            </div>
          </div>
        </div>
        <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple15;
