import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple13Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple13() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple13Machine, {
    show: false,
  });
  const [{ context: cx, matches: ma, value: currentState }, send] = machine || [{}];
  // useXstateDebugger({ machine, name: '__' });

  useEffect(() => {
    // boot machine
    send({ type: 'BROWSER' });
  }, []);

  // REACT (HTML+) KOMPONENTA
  return (
    <div className="p-2">
      <div>Pogledajte prognozu i vremenske prilike</div>

      <div className="flex flex-col">
        <div>Unesite naziv grada za koji zelite da proverite vremenske uslove</div>
        <div>
          <textarea
            value={cx?.naziv}
            onChange={(ev) => {
              send({ type: 'INPUT', data: ev.target.value });
            }}
            className="border border-gray-500"
          />
        </div>
      </div>
      <div>
        <button
          className="p-1 mx-1 bg-green-500 rounded-lg"
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
      <div className="flex flex-col">
        <div>Prognoza za izabrani grad</div>
        <div>Pritisak:{cx?.prognoza?.pritisak}mbr</div>
        <div>Zagadjenje:{cx?.zagadjenje?.pm2}</div>
      </div>
      <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
    </div>
  );
}

export default XstateSimple13;
