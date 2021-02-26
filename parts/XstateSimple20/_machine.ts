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
  imeprezime: string;
  mail: string;
  telefon: string;
}

type evINPUT = {
  type: 'INPUT';
  data: string;
};

// Ievents
export type Ievents =
  | { type: 'BROWSER' }
  | evINPUT
  | { type: 'YES' }
  | { type: 'NO' }
  | { type: 'SUBMIT' }
  | { type: 'ABORT' };
const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

// Istates
interface Istates {
  states: {
    ssr: {};

    pitanje: {};
    imeprezime: {};
    mail: {};
    telefon: {};
    potvrda: {};
    zahvalnica: {};
    snimiubazu: {};
    maillistread: {};
    deletesinglebaza: {};
    snimikorisnikaubazu: {};
  };
}

export const XstateSimple20Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple20Machine',
  initial: 'ssr',
  context: {
    imeprezime: '',
    mail: '',
    telefon: '',
  },
  states: {
    ssr: {
      on: {
        BROWSER: [
          {
            target: 'pitanje',
          },
        ],
      },
    },

    pitanje: {},
    imeprezime: {},
    mail: {},
    telefon: {},
    potvrda: {},
    zahvalnica: {},
    snimiubazu: {},
    maillistread: {},
    deletesinglebaza: {},
    snimikorisnikaubazu: {},
  },
});
