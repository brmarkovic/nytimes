/* eslint-disable prettier/prettier */
import { Machine, spawn } from 'xstate';
import { send as untypedSend, cancel, sendUpdate } from 'xstate/lib/actions';
import { assign } from '@xstate/immer';

// Icontext
export interface Icontext {
  show: boolean;
  imePrezime: string;
  parfemTekst: string;
  autoTekst: string;
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
  | { type: 'idle' }
  | { type: 'SUBMIT' }
  | { type: 'ABORT' }
  | { type: 'FORMULAR' }
  | { type: 'MUSKI' }
  | { type: 'ZENSKI' }
  | eSHOW;
const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    idle: {};
    imeprezime: {};
    pol: {};
    parfem: {};
    auto: {};
    zahvalnica: {};
  };
}

export const XstateSimple3Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple3Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    show: false,
    imePrezime:'',
    parfemTekst:'',
    autoTekst:'',
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
        FORMULAR: {
          target: 'imeprezime',
        },
      },
    },
    imeprezime: {
      on: {
        INPUT: {
          actions: (cx, ev: eINPUT) => {
            cx.imePrezime = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.imePrezime?.length === 0 || false,
            target: 'imeprezime',
          },
          {
            actions: (cx) => {
              cx.imePrezime = '';
            },
            target: 'pol',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.imePrezime = '';
          },
          target: 'idle',
        },
      },
    },
    pol: {
      on: {
        ZENSKI: {
          target: 'parfem',
        },
        MUSKI: {
          target: 'auto',
        },
        ABORT: {
          target: 'idle',
        },
      },
    },
    parfem: {
      on: {
        INPUT: {
          actions: (cx, ev: eINPUT) => {
            cx.parfemTekst = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.parfemTekst?.length === 0 || false,
            target: 'parfem',
          },
          {
            actions: (cx) => {
              cx.parfemTekst = '';
            },
            target: 'zahvalnica',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.parfemTekst = '';
          },
          target: 'idle',
        },
      },
      
    },
    auto: {
      on: {
        INPUT: {
          actions: (cx, ev: eINPUT) => {
            cx.autoTekst = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.autoTekst?.length === 0 || false,
            target: 'auto',
          },
          {
            actions: (cx) => {
              cx.autoTekst = '';
            },
            target: 'zahvalnica',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.autoTekst = '';
          },
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
    // BIKA FOKUS >>>>>>>>

    // BIKA FOCUS END <<<<
  },
});
