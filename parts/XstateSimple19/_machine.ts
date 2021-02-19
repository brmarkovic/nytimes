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
  brracuna: string;
  brcekova: string;
  brkartice: string;
  imeprezime: string;
  jmbg: string;
  telefon: string;
}

// Ievents

type evINPUT = {
  type: 'INPUT';
  data: string;
};
export type Ievents =
  | { type: 'BROWSER' }
  | { type: 'UPITNIK' }
  | { type: 'PITANJE' }
  | { type: 'YES' }
  | { type: 'NO' }
  | { type: 'BACK' }
  | { type: 'ABORT' }
  | { type: 'SUBMIT' }
  | { type: 'STANJE' }
  | { type: 'BLOKADA' }
  | { type: 'CEKOVI' }
  | evINPUT;

const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

// Istates
interface Istates {
  states: {
    ssr: {};
    idle: {};
    pitanje: {};
    racun: {};
    transakcija: {};
    stanje: {};
    cekovi: {};
    kartica: {};
    novausluga: {};
    otvoriracun: {};
    imeprezime: {};
    jmbg: {};
    telefon: {};
    potvrda: {};
    zahvalnica: {};
  };
}

export const XstateSimple19Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple19Machine',
  initial: 'ssr',
  context: {
    brracuna: '',
    brcekova: '',
    brkartice: '',
    imeprezime: '',
    jmbg: '',
    telefon: '',
  },
  states: {
    ssr: {
      on: {
        BROWSER: [
          {
            target: 'idle',
          },
        ],
      },
    },
    idle: {
      on: {
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
          target: 'otvoriracun',
        },
        ABORT: {
          target: 'idle',
        },
      },
    },
    racun: {},
    transakcija: {},
    stanje: {},
    cekovi: {},
    kartica: {},
    novausluga: {},
    otvoriracun: {},
    imeprezime: {},
    jmbg: {},
    telefon: {},
    potvrda: {},
    zahvalnica: {},
  },
});
