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
type Ikorisnik = {
  id: number;
  klijent: string;
};

type Ikomentar = {
  id: number;
  id_klijent: number;
  komentar: string;
};
// Icontext
export interface Icontext {
  show: boolean;
  klijent: Ikorisnik[];
  noviklijent: string;
  novikomentar: string;
  komentar: Ikomentar[];
  sviklijenti: Ikorisnik[];
  svikomentari: Ikomentar[];
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
  | { type: 'idle' }
  | { type: 'LOGKLIJENTA' }
  | { type: 'LOGKOMENTARA' }
  | { type: 'DODAJKLIJENTA' }
  | { type: 'DODAJKOMENTAR' }
  | { type: 'POTVRDIKLIJENTA' }
  | { type: 'POTVRDIKOMENTAR' }
  | { type: 'SUBMIT' }
  | { type: 'ABORT' }
  | { type: 'VRATISENAKLIJENTE' };

const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    idle: {};
    ucitajklijente: {};
    vidiklijenta: {};
    vidikomentare: {};
    noviklijent: {};
    novikomentar: {};
    snimiubazu: {};
  };
}

export const XstateSimple8Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple8Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    show: false,
    klijent: [],
    noviklijent: '',
    komentar: [],
    novikomentar: '',
    sviklijenti: [
      { id: 1, klijent: 'Biljana' },
      { id: 2, klijent: 'Ivana' },
      { id: 3, klijent: 'Peca' },
    ],
    svikomentari: [
      { id: 1, id_klijent: 1, komentar: 'zaposlen' },
      { id: 2, id_klijent: 2, komentar: 'bolovanje' },
      { id: 3, id_klijent: 1, komentar: 'kratka kosa' },
      { id: 4, id_klijent: 3, komentar: 'auto' },
    ],
  },
  // BIKA FOKUS END <<<<<<
  states: {
    // DEFAULT MILAN STATE
    ssr: {
      on: {
        idle: [
          {
            target: 'ucitajklijente',
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
      },
    },
    ucitajklijente: {
      on: {
        LOGKLIJENTA: {
          target: 'vidiklijenta',
        },
        DODAJKLIJENTA: {
          target: 'noviklijent',
        },
      },
    },
    noviklijent: {
      on: {
        INPUT: [
          {
            actions: [
              assign((cx, ev: evINPUT) => {
                cx.noviklijent = ev?.data || '';
              }),
            ],
          },
        ],
        POTVRDIKLIJENTA: [
          {
            cond: (cx) => cx?.noviklijent?.length === 0 || false,
            target: 'noviklijent',
          },
          {
            target: 'snimiubazu',
          },
        ],
        ABORT: {
          target: 'idle',
        },
      },
    },
    vidiklijenta: {
      on: {
        LOGKOMENTARA: {
          target: 'vidikomentare',
        },
      },
    },
    vidikomentare: {
      on: {
        DODAJKOMENTAR: {
          target: 'novikomentar',
        },
        VRATISENAKLIJENTE: {
          target: 'idle',
        },
      },
    },
    novikomentar: {
      on: {
        POTVRDIKOMENTAR: {
          target: 'snimiubazu',
        },
        ABORT: {
          target: 'idle',
        },
      },
    },
    snimiubazu: {},
  },
});
