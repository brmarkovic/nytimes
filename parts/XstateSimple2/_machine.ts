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

export type Ievents =
  | { type: 'idle' }
  | { type: 'FEEDBACK' }
  | { type: 'YES' }
  | { type: 'NO' }
  | { type: 'SUBMIT' }
  | { type: 'ABORT' }
  | eSHOW;
const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    idle: {};
    pitanje: {};
    kritika: {};
    zahvalnica: {};
  };
}

export const XstateSimple2Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple2Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    show: false,
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
        SHOW: {
          actions: [
            assign((cx, ev: eSHOW) => {
              cx.show = ev.data;
            }),
          ],
        },
        FEEDBACK: {
          target: 'pitanje',
        },
      },
    },
    pitanje: {
      on: {
        YES: {
          target: 'zahvalnica',
        },
        NO: {
          target: 'kritika',
        },
      },
    },
    kritika: {
      on: {
        SUBMIT: {
          target: 'zahvalnica',
        },
        ABORT: {
          target: 'idle',
        },
      },
    },
    zahvalnica: {
      1000: {
        target: 'idle',
      },
    },
  },
});
