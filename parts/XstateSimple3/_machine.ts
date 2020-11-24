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
        SUBMIT: {
          target: 'pol',
        },
        ABORT: {
          target: 'zahvalnica',
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
          target: 'zahvalnica',
        },
      },
    },
    parfem: {
      on: {
        SUBMIT: {
          target: 'zahvalnica',
        },
        ABORT: {
          target: 'zahvalnica',
        },
      },
    },
    auto: {
      on: {
        SUBMIT: {
          target: 'zahvalnica',
        },
        ABORT: {
          target: 'zahvalnica',
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
