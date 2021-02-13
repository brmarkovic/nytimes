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
    <div className="flex flex-col ">
      <div className="bg-indigo-200">
        <div className="flex flex-col">
          <div className="flex items-center justify-center h-12 text-xl text-blue-300 bg-gradient-to-tr from-blue-300 via-blue-500 to-blue-900">
            <div>Vremnska prognoza</div>
          </div>
          <div className="flex-auto">
            <img
              className="object-cover w-full "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7czCT4YITre5hpR8uF5X3Mc5r8wg02-v-YQ&usqp=CAU"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col mt-7">
          <div className="flex flex-row items-center justify-center">
            <div>
              <textarea
                value={cx.naziv}
                onChange={(ev) => {
                  send({
                    type: 'INPUT',
                    data: ev.target.value,
                  });
                }}
                className="border border-blue-900 rounded-lg "
              />
            </div>

            <button
              className="h-10 ml-4 text-white bg-blue-700 rounded-lg hover:bg-blue-900 "
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
              <div className="ml-2 mr-2">SETAM BEBU</div>
            </button>
          </div>
          <div className="flex flex-col">
            <div className="text-xl text-blue-800 border-indigo-500 group hover:bg-white hover:shadow-lg hover:border-transparent">
              <div className="text-center">Vremenska prognoza za izabrani grad</div>
              <div className="mt-3 ml-4 text-base font-medium">
                <div>Pritisak:{cx.prognoza.pressure}milibara</div>
                <div>Temperatura:{cx.prognoza.temp}farenhajta</div>
                <div>Zagadjenje:{cx.zagadjenje.pm2_5} pm2_5</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <div>
              <img
                className="object-cover w-full"
                src="https://www.vijesti.me/data/images/2020/06/18/21/5218251_shutterstock-286242953_ls-xs.jpg"
                alt=""
              />
            </div>
          </div>
          <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default XstateSimple15;
