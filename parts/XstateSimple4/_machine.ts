import { Machine, spawn } from 'xstate';
import { send as untypedSend, cancel, sendUpdate } from 'xstate/lib/actions';
import { assign } from '@xstate/immer';

// Icontext
export interface Icontext {
  show: boolean;
  brracuna: string;
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
          target: 'pitanje',
        },
      },
    },
    racun: {
      on: {
        SUBMIT: {
          target: 'transakcija',
        },
        ABORT: {
          target: 'pitanje',
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
          target: 'pitanje',
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
          target: 'pitanje',
        },
      },
    },
    novausluga: {
      on: {
        SUBMIT: {
          target: 'racun',
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
          target: 'pitanje',
        },
      },
    },
    imeprezime: {
      on: {
        SUBMIT: {
          target: 'jmbg',
        },
        ABORT: {
          target: 'pitanje',
        },
      },
    },
    jmbg: {
      on: {
        SUBMIT: {
          target: 'telefon',
        },
        ABORT: {
          target: 'pitanje',
        },
      },
    },
    telefon: {
      on: {
        SUBMIT: {
          target: 'potvrda',
        },
        ABORT: {
          target: 'pitanje',
        },
      },
    },
    potvrda: {
      on: {
        SUBMIT: {
          target: 'zahvalnica',
        },
      },
    },
    zahvalnica: {
      type: 'final',
    },
  },
});
