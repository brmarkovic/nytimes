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
  prijave: {
    id: number;
    imeprezime: string;
    mail: string;
    telefon: string;
  }[];
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

type evDELETE = {
  type: 'DELETE';
  data: {
    id: number;
  };
};

type evSUBMIT = {
  type: 'SUBMIT';
  data: {
    imeprezime: string;
    telefon: string;
    mail: string;
  };
};

export type Ievents =
  | eInput
  | eSHOW
  | evDELETE
  | evSUBMIT
  | { type: 'idle' }
  | { type: 'YES' }
  | { type: 'NO' }
  | { type: 'ABORT' }
  | { type: 'UPITNIK' }
  | { type: 'BACK' };
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
    maillistread: {};
    deletesinglbaza: {};
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
    prijave: [
      {
        id: 999,
        imeprezime: 'xxx',
        mail: 'yyy',
        telefon: 'zzz',
      },
      {
        id: 9991,
        imeprezime: 'xxx1',
        mail: 'yyy1',
        telefon: 'zzz1',
      },
    ],
  },
  // BIKA FOKUS END <<<<<<
  states: {
    // DEFAULT MILAN STATE
    ssr: {
      on: {
        idle: [
          {
            target: 'maillistread',
          },
        ],
      },
    },
    maillistread: {
      invoke: {
        src: async (cx) => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query maillista {
                  maillista {
                    id
                    imeprezime
                    mail
                    telefon
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
            assign((cx, ev) => {
              // console.log({ ev });
              cx.prijave = ev.data.data.maillista;
            }),
          ],
          target: 'idle',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'idle',
        },
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
        DELETE: [
          {
            target: 'deletesinglbaza',
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
        src: async (cx, ev: evSUBMIT) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                imeprezime: ev.data.imeprezime,
                mail: ev.data.mail,
                telefon: ev.data.telefon,
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
          ],
          target: 'zahvalnica',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'potvrda',
        },
      },
    },
    deletesinglbaza: {
      invoke: {
        src: async (cx, ev: evDELETE) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                id: ev.data.id,
              },
              mutation: gql`
                mutation deletemaillista($id: Int) {
                  delete_maillista(where: { id: { _eq: $id } }) {
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
        onDone: [
          {
            cond: (cx, ev: any) => ev.data.data.delete_maillista.affected_rows === 1 || false,
            target: 'maillistread',
          },
          {
            target: 'idle',
          },
        ],
        onError: [
          {
            // kada server napravi gresku
            // internet ne radi, ne vidi server
            target: 'idle',
          },
        ],
      },
    },
    zahvalnica: {
      after: {
        1000: [
          {
            target: 'maillistread',
          },
        ],
      },
    },
  },
});
