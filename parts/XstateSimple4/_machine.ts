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
        SUBMIT: {
          target: 'transakcija',
        },
        ABORT: {
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
      },
    },
    brkartice: {
      on: {
        SUBMIT: {
          target: 'novausluga',
        },
        ABORT: {
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
        SUBMIT: {
          target: 'novausluga',
        },
        ABORT: {
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
        SUBMIT: {
          target: 'jmbg',
        },
        ABORT: {
          target: 'idle',
        },
      },
    },
    jmbg: {
      on: {
        SUBMIT: {
          target: 'telefon',
        },
        ABORT: {
          target: 'idle',
        },
      },
    },
    telefon: {
      on: {
        SUBMIT: {
          target: 'potvrda',
        },
        ABORT: {
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
