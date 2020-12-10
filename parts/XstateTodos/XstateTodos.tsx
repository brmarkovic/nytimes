import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateTodosMachine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateTodos() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateTodosMachine);
  const [{ context: cx, matches: ma }, send] = machine || [{}];
  useXstateDebugger({ machine, name: '__' });

  useEffect(() => {
    // boot machine
    send({ type: 'idle' });
  }, []);

  // REACT (HTML+) KOMPONENTA
  return (
    <div className="p-2">
      <div className="text-2xl">TODO APLIKACIJA</div>

      <div className="flex flex-col mt-3 text-lg">
        <div className="flex items-center">
          <div>
            <input
              value={cx.newtodo}
              onChange={(ev) => {
                send({ type: 'TODO_NEW', data: ev.target.value });
              }}
              className="px-2 border rounded"
              type="text"
              placeholder="upisi todo..."
            />
          </div>
          <div>
            <button
              onClick={() => {
                send({ type: 'TODO_ADD', data: { todo: cx.newtodo } });
              }}
              type="button"
              className="px-2 ml-1 text-white bg-blue-500 rounded"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          {cx?.todos?.map((r) => {
            return (
              <div>
                <input
                  value={r.todo}
                  onChange={(ev) => {
                    send({ type: 'TODO_MODIFY', data: { id: r.id, todo: ev.target.value } });
                  }}
                  className="px-2 border rounded"
                  type="text"
                  placeholder="upisi todo..."
                />
                <button type="button" className="px-2 ml-1 text-white bg-orange-500 rounded">
                  Update
                </button>
                <button type="button" className="px-2 ml-1 text-white bg-red-500 rounded">
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default XstateTodos;
