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
  show: boolean;
  imeprezime: string;
  mail: string;
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
  | { type: 'UPITNIK' }
  | { type: 'BACK' }
  | { type: 'zahvalnica' }
  | { type: 'potvrda' }
  | eSHOW;
const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    idle: {};
    pitanje: {};
    imeprezime: {};
    mail: {};
    telefon: {};
    potvrda: {};
    zahvalnica: {};
    snimiubazu: {};
  };
}

export const XstateSimple5Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple5Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    show: false,
    imeprezime: '',
    mail: '',
    telefon: '',
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
        SHOW: [
          {
            actions: [
              assign((cx, ev: eSHOW) => {
                cx.show = ev.data;
              }),
              // send ne moze ovde jer je unutar "on"
            ],
            // target: 'dkdk' // unutar "on" se koristi "target", a van "send"
          },
        ],
        UPITNIK: [
          {
            target: 'pitanje',
          },
        ],
      },
    },
    pitanje: {
      on: {
        YES: [
          {
            target: 'imeprezime',
          },
        ],
        NO: [
          {
            target: 'idle',
          },
        ],
      },
    },
    imeprezime: {
      on: {
        INPUT: [
          {
            actions: [
              assign((cx, ev: eInput) => {
                cx.imeprezime = ev?.data || '';
              }),
            ],
          },
        ],
        SUBMIT: [
          {
            cond: (cx) => cx?.imeprezime?.length === 0 || false,
            target: 'imeprezime',
          },
          {
            target: 'mail',
          },
        ],
        ABORT: [
          {
            actions: [
              assign((cx) => {
                cx.imeprezime = '';
              }),
            ],
            target: 'idle',
          },
        ],
      },
    },
    mail: {
      on: {
        INPUT: [
          {
            actions: [
              assign((cx, ev: eInput) => {
                cx.mail = ev?.data || '';
              }),
            ],
          },
        ],
        SUBMIT: [
          {
            cond: (cx) => cx?.mail === null || false,
            target: 'mail',
          },
          {
            target: 'telefon',
          },
        ],
        ABORT: [
          {
            actions: [
              assign((cx) => {
                cx.mail = null;
              }),
            ],
            target: 'idle',
          },
        ],
      },
    },
    telefon: {
      on: {
        INPUT: [
          // default
          {
            actions: [
              assign((cx, ev: eInput) => {
                cx.telefon = ev?.data || '';
              }),
            ],
          },
        ],
        SUBMIT: [
          // cond1
          {
            cond: (cx) => cx?.telefon?.length === 0 || false,
            target: 'telefon',
          },
          // default
          {
            target: 'potvrda',
          },
        ],
        ABORT: [
          {
            actions: [
              assign((cx) => {
                cx.telefon = '';
              }),
            ],
            target: 'idle',
          },
        ],
      },
    },
    potvrda: {
      on: {
        SUBMIT: [
          {
            target: 'snimiubazu',
          },
        ],
        BACK: [
          {
            target: 'imeprezime',
          },
        ],
      },
    },
    snimiubazu: {
      invoke: {
        src: async (cx) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                imeprezime: cx.imeprezime,
                mail: cx.mail,
                telefon: cx.telefon,
              },
              mutation: gql`
                mutation insertmaillista($imeprezime: String, $mail: String, $telefon: String) {
                  insert_maillista(objects: { imeprezime: $imeprezime, mail: $mail, telefon: $telefon }) {
                    affected_rows
                  }
                }
              `,
            })
            .then((r) => [null, r])
            .catch((e) => [e]);
          if ((data && data.errors) || ERRdata) {
            throw new Error('error');
          }
          return data;
        },
        onDone: {
          // kada server vrati odgovor
          actions: [
            assign((cx) => {
              cx.imeprezime = null;
              cx.mail = null;
              cx.telefon = null;
            }),
            send({ type: 'zahvalnica' }),
          ],
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          actions: [send({ type: 'potvrda' })],
        },
      },
      on: {
        zahvalnica: [
          {
            target: 'zahvalnica',
          },
        ],
        potvrda: [
          {
            target: 'potvrda',
          },
        ],
      },
    },
    zahvalnica: {
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
