import { Machine, spawn } from 'xstate';
import { send as untypedSend, cancel, sendUpdate } from 'xstate/lib/actions';
import { assign } from '@xstate/immer';

// Icontext
export interface Icontext {
  show: boolean;
  brracuna: string;
  brkartice: string;
  brcekova: string;
  imeprezime: string;
  jmbg: string;
  telefon: string;
}

// Ievents
type eSHOW = {
  type: 'SHOW';
  data: boolean;
};

type eInput = {
  type: 'INPUT';
  data: string;
};
export type Ievents =
  | eInput
  | { type: 'idle' }
  | { type: 'YES' }
  | { type: 'NO' }
  | { type: 'ABORT' }
  | { type: 'SUBMIT' }
  | { type: 'STANJE' }
  | { type: 'CEKOVI' }
  | { type: 'BLOKADA' }
  | { type: 'UPITNIK' }
  | { type: 'BACK' }
  | eSHOW;
const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    idle: {};
    pitanje: {};
    racun: {};
    transakcija: {};
    brkartice: {};
    stanjepoTR: {};
    brcekova: {};
    otvoritiracun: {};
    novausluga: {};
    imeprezime: {};
    jmbg: {};
    telefon: {};
    potvrda: {};
    zahvalnica: {};
  };
}

export const XstateSimple4Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple4Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    show: false,
    brracuna: '',
    brkartice: '',
    brcekova: '',
    imeprezime: '',
    jmbg: '',
    telefon: '',
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
        UPITNIK: {
          target: 'pitanje',
        },
      },
    },
    pitanje: {
      on: {
        YES: {
          target: 'racun',
        },
        NO: {
          target: 'otvoritiracun',
        },
        ABORT: {
          target: 'idle',
        },
      },
    },
    racun: {
      on: {
        INPUT: {
          actions: (cx, ev: eInput) => {
            cx.brracuna = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.brracuna?.length === 0 || false,
            target: 'racun',
          },
          {
            actions: (cx) => {
              cx.brracuna = '';
            },
            target: 'transakcija',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.brracuna = '';
          },
          target: 'idle',
        },
      },
    },
    transakcija: {
      on: {
        STANJE: {
          target: 'stanjepoTR',
        },
        CEKOVI: {
          target: 'brcekova',
        },
        BLOKADA: {
          target: 'brkartice',
        },
        ABORT: {
          target: 'idle',
        },
      },
    },
    brkartice: {
      on: {
        INPUT: {
          actions: (cx, ev: eInput) => {
            cx.brkartice = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.brkartice?.length === 0 || false,
            target: 'brkartice',
          },
          {
            actions: (cx) => {
              cx.brkartice = '';
            },
            target: 'novausluga',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.brkartice = '';
          },
          target: 'idle',
        },
      },
    },
    stanjepoTR: {
      on: {
        YES: {
          target: 'novausluga',
        },
        NO: {
          target: 'zahvalnica',
        },
      },
    },
    brcekova: {
      on: {
        INPUT: {
          actions: (cx, ev: eInput) => {
            cx.brcekova = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.brcekova?.length === 0 || false,
            target: 'brcekova',
          },
          {
            actions: (cx) => {
              cx.brcekova = '';
            },
            target: 'novausluga',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.brcekova = '';
          },
          target: 'zahvalnica',
        },
      },
    },
    novausluga: {
      on: {
        SUBMIT: {
          target: 'transakcija',
        },
        ABORT: {
          target: 'zahvalnica',
        },
      },
    },
    otvoritiracun: {
      on: {
        SUBMIT: {
          target: 'imeprezime',
        },
        ABORT: {
          target: 'idle',
        },
      },
    },
    imeprezime: {
      on: {
        INPUT: {
          actions: (cx, ev: eInput) => {
            cx.imeprezime = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.imeprezime?.length === 0 || false,
            target: 'imeprezime',
          },
          {
            actions: (cx) => {
              cx.imeprezime = '';
            },
            target: 'jmbg',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.imeprezime = '';
          },
          target: 'idle',
        },
      },
    },
    jmbg: {
      on: {
        INPUT: {
          actions: (cx, ev: eInput) => {
            cx.jmbg = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.jmbg?.length === 0 || false,
            target: 'jmbg',
          },
          {
            actions: (cx) => {
              cx.jmbg = '';
            },
            target: 'telefon',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.jmbg = '';
          },
          target: 'idle',
        },
      },
    },
    telefon: {
      on: {
        INPUT: {
          actions: (cx, ev: eInput) => {
            cx.telefon = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.telefon?.length === 0 || false,
            target: 'telefon',
          },
          {
            actions: (cx) => {
              cx.telefon = '';
            },
            target: 'potvrda',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.telefon = '';
          },
          target: 'idle',
        },
      },
    },
    potvrda: {
      on: {
        SUBMIT: {
          target: 'zahvalnica',
        },
        BACK: {
          target: 'imeprezime',
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
  },
});
