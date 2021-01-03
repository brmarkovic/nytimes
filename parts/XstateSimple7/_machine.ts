import { Machine } from 'xstate';
import { send as untypedSend } from 'xstate/lib/actions';
import { assign } from '@xstate/immer';

// SNIMANJE NA SERVER POCETAK
// SNIMANJE NA SERVER POCETAK
// SNIMANJE NA SERVER POCETAK
// SNIMANJE NA SERVER POCETAK
// SNIMANJE NA SERVER POCETAK

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';

export const backendServer = new ApolloClient({
  ssrMode: true,
  link: ApolloLink.from([
    new HttpLink({
      uri: 'https://backend-graphql-1.herokuapp.com/v1/graphql',
      fetch,
    }),
  ]),
  cache: new InMemoryCache(),
  // DO NOT DELETE, THE APP WILL BEHAVE RANDOMLY, CACHE IS HANDLED IN REDIS, APOLLO CACHE IS DISABLED THIS WAY
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

// SNIMANJE NA SERVER KRAJ
// SNIMANJE NA SERVER KRAJ
// SNIMANJE NA SERVER KRAJ
// SNIMANJE NA SERVER KRAJ
// SNIMANJE NA SERVER KRAJ

// Icontext
export interface Icontext {
  jmbg: number | string;
  show: boolean;
  maticnibroj: number | string;
}

// Ievents
type evSHOW = {
  type: 'SHOW';
  data: boolean;
};

type evINPUT = {
  type: 'INPUT';
  data: string;
};

export type Ievents =
  | evINPUT
  | evSHOW
  | { type: 'FORMULAR' }
  | { type: 'PODNESIZAHTEV' }
  | { type: 'FL' }
  | { type: 'POLJOPRIVREDNIK' }
  | { type: 'PRAVNOLICE' }
  | { type: 'PREDUZETNIK' }
  | { type: 'SUBMIT' }
  | { type: 'ABORT' }
  | { type: 'RAZLOG1' }
  | { type: 'RAZLOG2' }
  | { type: 'RAZLOG3' }
  | { type: 'TRPOZAJMICA' }
  | { type: 'KREDITNEKARTICE' }
  | { type: 'KARTICESAODLPLACANJEM' }
  | { type: 'KREDITI' }
  | { type: 'BACK' }
  | { type: 'idle' };

const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    idle: {};
    zahtev: {};
    tipklijenta: {};
    jmbg: {};
    maticnibroj: {};
    razlozi: {};
    olaksice: {};
    provera: {};
    potvrda: {};
  };
}

export const XstateSimple7Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple7Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    show: false,
    jmbg: null,
    maticnibroj: null,
  },
  // BIKA FOKUS END <<<<<<
  states: {
    // DEFAULT MILAN STATE
    ssr: {
      on: {
        idle: [
          {
            target: 'idle',
          },
        ],
      },
    },
    idle: {
      on: {
        SHOW: {
          actions: [
            assign((cx, ev: evSHOW) => {
              cx.show = ev.data;
            }),
          ],
        },
        FORMULAR: {
          target: 'zahtev',
        },
      },
    },
    zahtev: {
      on: {
        PODNESIZAHTEV: {
          target: 'tipklijenta',
        },
      },
    },
    tipklijenta: {
      on: {
        FL: 'jmbg',

        POLJOPRIVREDNIK: 'jmbg',

        PREDUZETNIK: 'maticnibroj',

        PRAVNOLICE: 'maticnibroj',
      },
    },

    jmbg: {
      on: {
        INPUT: [
          {
            actions: [
              assign((cx, ev: evINPUT) => {
                cx.jmbg = ev?.data || '';
              }),
            ],
          },
        ],
        SUBMIT: [
          {
            cond: (cx) => cx?.jmbg === null || false,
            target: 'jmbg',
          },
          {
            target: 'razlozi',
          },
        ],

        ABORT: [
          {
            actions: [
              assign((cx) => {
                cx.jmbg = null;
              }),
            ],
            target: 'idle',
          },
        ],
      },
    },

    maticnibroj: {
      on: {
        INPUT: [
          {
            actions: [
              assign((cx, ev: evINPUT) => {
                cx.maticnibroj = ev?.data || '';
              }),
            ],
          },
        ],
        SUBMIT: [
          {
            cond: (cx) => cx?.maticnibroj === null || false,
            target: 'maticnibroj',
          },
          {
            target: 'razlozi',
          },
        ],

        ABORT: [
          {
            actions: [
              assign((cx) => {
                cx.maticnibroj = null;
              }),
            ],
            target: 'idle',
          },
        ],
      },
    },

    razlozi: {
      on: {
        RAZLOG1: 'olaksice',

        RAZLOG2: 'olaksice',

        RAZLOG3: 'olaksice',

        ABORT: 'idle',
      },
    },

    olaksice: {
      on: {
        TRPOZAJMICA: 'provera',

        KREDITNEKARTICE: 'provera',

        KARTICESAODLPLACANJEM: 'provera',

        KREDITI: 'provera',

        ABORT: 'idle',
      },
    },

    provera: {
      on: {
        SUBMIT: 'potvrda',

        BACK: 'tipklijenta',

        ABORT: 'idle',
      },
    },

    potvrda: {
      after: {
        1000: [
          {
            target: 'idle',
          },
        ],
      },
    },
  },
});
