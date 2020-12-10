import { Machine, spawn } from 'xstate';
import { send as untypedSend, cancel, sendUpdate } from 'xstate/lib/actions';
import { assign } from '@xstate/immer';

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

// Icontext
export interface Icontext {
  show: boolean;
  brracuna: string;
  brkartice: string;
  brcekova: string;
  imeprezime: string;
  jmbg: number;
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
    snimiubazu: {};
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
        INPUT: {
          actions: (cx, ev: eInput) => {
            cx.brracuna = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.brracuna?.length === 0 || false,
            target: 'racun',
          },
          {
            actions: (cx) => {
              cx.brracuna = '';
            },
            target: 'transakcija',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.brracuna = '';
          },
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
        ABORT: {
          target: 'idle',
        },
      },
    },
    brkartice: {
      on: {
        INPUT: {
          actions: (cx, ev: eInput) => {
            cx.brkartice = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.brkartice?.length === 0 || false,
            target: 'brkartice',
          },
          {
            actions: (cx) => {
              cx.brkartice = '';
            },
            target: 'novausluga',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.brkartice = '';
          },
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
        INPUT: {
          actions: (cx, ev: eInput) => {
            cx.brcekova = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.brcekova?.length === 0 || false,
            target: 'brcekova',
          },
          {
            actions: (cx) => {
              cx.brcekova = '';
            },
            target: 'novausluga',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.brcekova = '';
          },
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
        INPUT: {
          actions: (cx, ev: eInput) => {
            cx.imeprezime = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.imeprezime?.length === 0 || false,
            target: 'imeprezime',
          },
          {
            target: 'jmbg',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.imeprezime = '';
          },
          target: 'idle',
        },
      },
    },
    jmbg: {
      on: {
        INPUT: {
          actions: (cx, ev: eInput) => {
            cx.jmbg = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.jmbg?.length === 0 || false,
            target: 'jmbg',
          },
          {
            target: 'telefon',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.jmbg = '';
          },
          target: 'idle',
        },
      },
    },
    telefon: {
      on: {
        INPUT: {
          actions: (cx, ev: eInput) => {
            cx.telefon = ev?.data || '';
          },
        },
        SUBMIT: [
          {
            cond: (cx) => cx?.telefon?.length === 0 || false,
            target: 'telefon',
          },
          {
            target: 'potvrda',
          },
        ],
        ABORT: {
          actions: (cx) => {
            cx.telefon = '';
          },
          target: 'idle',
        },
      },
    },
    potvrda: {
      on: {
        SUBMIT: {
          // actions: [
          //   assign((cx, ev) => {
          //     cx.imeprezime = '';
          //     cx.jmbg = '';
          //     cx.telefon = '';
          //   }),
          // ],
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
                mutation insert_upitnik($imeprezime: String, $jmbg: Int, $telefon: String) {
                  insert_upitnik(objects: { imeprezime: $imeprezime, jmbg: $jmbg, telefon: $telefon }) {
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
          target: 'zahvalnica',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'potvrda',
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
