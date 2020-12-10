import { Machine, spawn } from 'xstate';
import { send as untypedSend, cancel, sendUpdate } from 'xstate/lib/actions';
import { assign } from '@xstate/immer';

// Icontext
export interface Icontext {
  newtodo: string;
  todos: { id: number; todo: string }[];
}

// Ievents
// plavi input
type eTODO_NEW = {
  type: 'TODO_NEW';
  data: string;
};
// plavi taster
type eTODO_ADD = {
  type: 'TODO_ADD';
  data: {
    todo: string;
  };
};
// input
type eTODO_MODIFY = {
  type: 'TODO_MODIFY';
  data: {
    id: number;
    todo: string;
  };
};
// narandzsti
type eTODO_UPDATE = {
  type: 'TODO_UPDATE';
  data: {
    id: number;
    todo: string;
  };
};
// crveni
type eTODO_DELETE = {
  type: 'TODO_DELETE';
  data: {
    id: number;
    todo: string;
  };
};
export type Ievents = { type: 'idle' } | eTODO_NEW | eTODO_ADD | eTODO_MODIFY | eTODO_UPDATE | eTODO_DELETE;
const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    idle: {};
  };
}

export const XstateTodosMachine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateTodosMachine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    newtodo: '',
    todos: [
      {
        id: 1,
        todo: 'kupi mleko',
      },
      {
        id: 2,
        todo: 'kupi hleb',
      },
    ],
  },
  // BIKA FOKUS END <<<<<<
  states: {
    // DEFAULT MILAN STATE
    ssr: {
      on: {
        idle: 'idle',
      },
    },
    idle: {
      on: {
        TODO_NEW: {
          actions: [
            assign((cx, ev: eTODO_NEW) => {
              cx.newtodo = ev.data;
            }),
          ],
        },
        TODO_ADD: {
          actions: [
            assign((cx, ev: eTODO_ADD) => {
              cx.todos = [...cx.todos, { id: +new Date(), todo: ev.data.todo }];
              cx.newtodo = '';
            }),
          ],
        },
        TODO_MODIFY: {
          actions: [
            assign((cx, ev: eTODO_MODIFY) => {
              cx.todos = cx.todos.map((r) => {
                if (r.id === ev.data.id) {
                  return {
                    ...r,
                    todo: ev.data.todo,
                  };
                }
                return r;
              });
            }),
          ],
        },
        TODO_UPDATE: {},
        TODO_DELETE: {},
      },
    },
    // BIKA FOCUS END <<<<
  },
});
