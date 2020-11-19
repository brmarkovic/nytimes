import { Machine, spawn } from 'xstate';
import { send as untypedSend, cancel, sendUpdate } from 'xstate/lib/actions';
import { assign } from '@xstate/immer';

// Icontext
export interface Icontext {
  show: boolean;
}

// Ievents
type eSHOW = {
  type: 'SHOW';
  data: boolean;
};
export type Ievents = { type: 'idle' } | eSHOW;
const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    idle: {};
  };
}

export const SimpleMachine = Machine<Icontext, Istates, Ievents>({
  id: 'SimpleMachine',
  context: {
    show: false,
  },
  initial: 'ssr',
  states: {
    ssr: {
      on: {
        idle: 'idle',
      },
    },
    idle: {
      on: {
        SHOW: {
          actions: [
            assign((cx, ev: eSHOW) => {
              cx.show = ev.data;
            }),
          ],
        },
      },
    },
  },
});
