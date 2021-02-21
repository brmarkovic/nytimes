/* eslint-disable no-undef */
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
  | { type: 'POTVRDA' }
  | { type: 'ZAHVALNICA' }
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
    snimiubazu: {};
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
    racun: {
      on: {
        INPUT: [
          {
            actions: [
              assign((cx, ev: evINPUT) => {
                cx.brracuna = ev?.data || '';
              }),
            ],
          },
        ],
        SUBMIT: [
          {
            cond: (cx) => cx?.brracuna?.length === 0 || false,
            target: 'racun',
          },
          {
            actions: [
              assign((cx) => {
                cx.brracuna = '';
              }),
            ],
            target: 'transakcija',
          },
        ],
        ABORT: [
          {
            actions: [
              assign((cx) => {
                cx.brracuna = '';
              }),
            ],
            target: 'idle',
          },
        ],
      },
    },
    transakcija: {
      on: {
        STANJE: {
          target: 'stanje',
        },
        BLOKADA: {
          target: 'kartica',
        },
        CEKOVI: {
          target: 'cekovi',
        },
        ABORT: {
          target: 'idle',
        },
      },
    },
    stanje: {
      on: {
        SUBMIT: {
          target: 'novausluga',
        },
        ABORT: {
          target: 'idle',
        },
      },
    },
    cekovi: {
      on: {
        INPUT: [
          {
            actions: [
              assign((cx, ev: evINPUT) => {
                cx.brcekova = ev?.data || '';
              }),
            ],
          },
        ],
        SUBMIT: [
          {
            cond: (cx) => cx?.brcekova?.length === 0 || false,
            target: 'cekovi',
          },
          {
            actions: [
              assign((cx) => {
                cx.brcekova = '';
              }),
            ],
            target: 'novausluga',
          },
        ],
        ABORT: [
          {
            actions: [
              assign((cx) => {
                cx.brcekova = '';
              }),
            ],
            target: 'idle',
          },
        ],
      },
    },
    kartica: {
      on: {
        INPUT: [
          {
            actions: [
              assign((cx, ev: evINPUT) => {
                cx.brkartice = ev?.data || '';
              }),
            ],
          },
        ],
        SUBMIT: [
          {
            cond: (cx) => cx?.brcekova?.length === 0 || false,
            target: 'kartica',
          },
          {
            actions: [
              assign((cx) => {
                cx.brkartice = '';
              }),
            ],
            target: 'novausluga',
          },
        ],
        ABORT: [
          {
            actions: [
              assign((cx) => {
                cx.brkartice = '';
              }),
            ],
            target: 'idle',
          },
        ],
      },
    },
    novausluga: {
      on: {
        YES: {
          target: 'transakcija',
        },
        NO: {
          target: 'zahvalnica',
        },
      },
    },
    otvoriracun: {
      on: {
        YES: {
          target: 'imeprezime',
        },
        NO: {
          target: 'zahvalnica',
        },
      },
    },
    imeprezime: {
      on: {
        INPUT: [
          {
            actions: [
              assign((cx, ev: evINPUT) => {
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
            target: 'jmbg',
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
            cond: (cx) => cx?.jmbg?.length === 0 || false,
            target: 'jmbg',
          },
          {
            target: 'telefon',
          },
        ],
        ABORT: [
          {
            actions: [
              assign((cx) => {
                cx.jmbg = '';
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
          {
            actions: [
              assign((cx, ev: evINPUT) => {
                cx.telefon = ev?.data || '';
              }),
            ],
          },
        ],
        SUBMIT: [
          {
            cond: (cx) => cx?.telefon?.length === 0 || false,
            target: 'telefon',
          },
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
        SUBMIT: {
          target: 'snimiubazu',
        },
        BACK: {
          target: 'imeprezime',
        },
      },
    },
    snimiubazu: {
      invoke: {
        src: async (cx) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                imeprezime: cx.imeprezime,
                jmbg: cx.jmbg,
                telefon: cx.telefon,
              },
              mutation: gql`
                mutation insert_otvaranjeracuna($imeprezime: String, $jmbg: String, $telefon: String) {
                  insert_otvaranjeracuna(objects: { imeprezime: $imeprezime, jmbg: $jmbg, telefon: $telefon }) {
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
              cx.jmbg = null;
              cx.telefon = null;
            }),
            send({ type: 'ZAHVALNICA' }),
          ],
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          actions: [send({ type: 'POTVRDA' })],
        },
      },
      on: {
        ZAHVALNICA: [
          {
            target: 'zahvalnica',
          },
        ],
        POTVRDA: [
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
