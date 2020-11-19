import { Machine, spawn } from 'xstate';
import { send as untypedSend, cancel, sendUpdate } from 'xstate/lib/actions';
import { assign } from '@xstate/immer';

// Icontext
export interface Icontext {
  show: boolean;
  kritikaTekst: string;
}

// Ievents
type eSHOW = {
  type: 'SHOW';
  data: boolean;
};
type eINPUT = {
  type: 'INPUT';
  data: string;
};
export type Ievents =
  | eINPUT
  | { type: 'FEEDBACK' }
  | { type: 'SUBMIT' }
  | { type: 'idle' }
  | { type: 'YES' }
  | { type: 'NO' }
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

export const XstateSimpleMachine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimpleMachine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    show: false,
    kritikaTekst: '',
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
    // BIKA FOKUS >>>>>>>>
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
        INPUT: {
          actions: (cx, ev: eINPUT) => {
            cx.kritikaTekst = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.kritikaTekst?.length === 0 || false,
            target: 'kritika',
          },
          {
            actions: (cx) => {
              cx.kritikaTekst = '';
            },
            target: 'zahvalnica',
          },
        ],
        ABORT: {
          target: 'idle',
        },
      },
    },
    zahvalnica: {
      after: {
        1000: {
          target: 'idle',
        },
      },
    },

    // BIKA FOCUS END <<<<
  },
});
