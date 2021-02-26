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
  kritikatekst: string;
}

// Ievents

type evINPUT = {
  type: 'INPUT';
  data: string;
};
export type Ievents =
  | evINPUT
  | { type: 'BROWSER' }
  | { type: 'ANKETA' }
  | { type: 'YES' }
  | { type: 'NO' }
  | { type: 'SUBMIT' }
  | { type: 'ABORT' };
const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

// Istates
interface Istates {
  states: {
    ssr: {};
    anketa: {};
    pitanje: {};
    kritika: {};
    zahvalnica: {};
  };
}

export const XstateSimple18Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple18Machine',
  initial: 'ssr',
  context: {
    kritikatekst: '',
  },
  states: {
    ssr: {
      on: {
        BROWSER: [
          {
            target: 'anketa',
          },
        ],
      },
    },
    anketa: {
      on: {
        ANKETA: {
          target: 'pitanje',
        },
      },
    },
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
          actions: (cx, ev: evINPUT) => {
            cx.kritikatekst = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.kritikatekst?.length === 0 || false,
            target: 'kritika',
          },
          {
            actions: (cx) => {
              cx.kritikatekst = '';
            },
            target: 'zahvalnica',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.kritikatekst = '';
          },
          target: 'anketa',
        },
      },
    },
    zahvalnica: {
      after: {
        1000: {
          target: 'anketa',
        },
      },
    },
  },
});