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
    <div className="flex flex-col">
      <div className="bg-teal-500">
        <div className="flex flex-col">
          <div className="flex-auto h-16 bg-gradient-to-tr from-teal-300 via-teal-500 to-teal-700 justify-items-center">
            <div className="text-xl text-center text-white "> Prognoza i vremenske prilike</div>
          </div>
          <div>
            <img
              className="object-cover"
              src="http://radioberane.me/wp-content/uploads/2020/07/vremenska-prognoza-zrenjanin.jpg"
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <div className="mt-4 text-center text-white">Unesite naziv grada </div>
            <div className="flex justify-center mt-3 ">
              <textarea
                value={cx?.naziv}
                onChange={(ev) => {
                  send({ type: 'INPUT', data: ev.target.value });
                }}
                className="bg-teal-200 border border-teal-700 rounded-lg "
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center mt-3 ">
            <button
              className="p-1 mx-1 text-blue-500 bg-teal-200 rounded-lg hover:bg-teal-700 "
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
        </div>
        <div className="flex flex-col mt-5 border-t-2 border-teal-800">
          {['vidiuslove'].some(ma) && (
            <div className="flex flex-col">
              <div className="ml-3 text-xl text-teal-200">Prikazani su rezultati za izabrani grad:</div>
              <div className="ml-3 text-lg font-semibold text-teal-200 ">Pritisak:{cx?.prognoza?.pritisak}mbr</div>
              <div className="ml-3 text-lg font-semibold text-teal-200 ">
                Temperatura: {cx?.prognoza?.temperatura}fr{' '}
              </div>
              <div className="ml-3 text-lg font-semibold text-teal-200 ">Zagadjenje:{cx?.zagadjenje?.pm2}</div>
            </div>
          )}
        </div>{' '}
        <div>
          <div className="mt-5">
            {' '}
            <img
              src="https://thumbs.dreamstime.com/b/same-tree-changing-over-duration-four-seasons-d-render-illustration-tree-changing-over-duration-four-seasons-142397841.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
    </div>
  );
}

export default XstateSimple13;
