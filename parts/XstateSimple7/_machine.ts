/* eslint-disable no-undef */
/* eslint-disable no-console */
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
  tipklijenta: string;
  jmbg: number;
  maticnibroj: number;
  razlozi: string;
  olaksice: string;
};

// Icontext
export interface Icontext {
  prijava: any;
  jmbg: string;
  show: boolean;
  maticnibroj: string;
  tipklijenta: string;
  razlozi: string;
  olaksice: string;
  prijave: Ikorisnik[];
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

type evSET_CLIENT = {
  type: 'SET_CLIENT';
  data: string;
};

type evSETRAZLOG = {
  type: 'SET_RAZLOG';
  data: string;
};

type evSETOLAKSICE = {
  type: 'SET_OLAKSICE';
  data: string;
};

type evSUBMIT = {
  type: 'SUBMIT';
  data: {
    tipklijenta: string;
    jmbg: number | string;
    maticnibroj: number | string;
    razlozi: string;
    olaksice: string;
  };
};

export type Ievents =
  | evINPUT
  | evSHOW
  | evSET_CLIENT
  | evSETRAZLOG
  | evSETOLAKSICE
  | evSUBMIT
  | { type: 'FORMULAR' }
  | { type: 'PODNESIZAHTEV' }
  | { type: 'ABORT' }
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
    zahtevread: {};
    snimiubazu: {};
  };
}

export const XstateSimple7Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple7Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    show: false,
    jmbg: '',
    maticnibroj: '',
    tipklijenta: '',
    razlozi: '',
    olaksice: '',
    prijave: [],
  },
  // BIKA FOKUS END <<<<<<
  states: {
    // DEFAULT MILAN STATE
    ssr: {
      on: {
        idle: [
          {
            target: 'zahtevread',
          },
        ],
      },
    },
    zahtevread: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query zahtevread {
                  zahtev {
                    id
                    jmbg
                    maticnibroj
                    olaksice
                    razlozi
                    tipklijenta
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
              console.log({ ev });
              cx.prijave = ev.data.data.zahtev;
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
        SET_CLIENT: [
          {
            cond: (cx, ev: evSET_CLIENT) => ev.data === 'fizickolice' || ev.data === 'poljoprivrednik',
            actions: [
              assign((cx, ev: evSET_CLIENT) => {
                cx.tipklijenta = ev.data;
              }),
            ],
            target: 'jmbg',
          },
          {
            cond: (cx, ev: evSET_CLIENT) => ev.data === 'preduzetnik' || ev.data === 'pravnolice',
            actions: [
              assign((cx, ev: evSET_CLIENT) => {
                cx.tipklijenta = ev.data;
              }),
            ],
            target: 'maticnibroj',
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
        SET_RAZLOG: [
          {
            cond: (cx, ev: evSETRAZLOG) => ev.data === 'razlog1' || ev.data === 'razlog2' || ev.data === 'razlog3',
            actions: [
              assign((cx, ev: evSETRAZLOG) => {
                cx.razlozi = ev.data;
              }),
            ],
            target: 'olaksice',
          },
        ],

        ABORT: 'idle',
      },
    },

    olaksice: {
      on: {
        SET_OLAKSICE: [
          {
            cond: (cx, ev: evSETOLAKSICE) =>
              ev.data === 'trpozajmica' ||
              ev.data === 'kreditnekartice' ||
              ev.data === 'karticesaodlplacanjem' ||
              ev.data === 'krediti',
            actions: [
              assign((cx, ev: evSETOLAKSICE) => {
                cx.olaksice = ev.data;
              }),
            ],
            target: 'provera',
          },
        ],
        ABORT: 'idle',
      },
    },

    provera: {
      on: {
        SUBMIT: 'snimiubazu',

        BACK: 'tipklijenta',

        ABORT: 'idle',
      },
    },
    snimiubazu: {
      invoke: {
        src: async (cx, ev: evSUBMIT) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                tipklijenta: ev.data.tipklijenta,
                jmbg: ev.data.jmbg,
                maticnibroj: ev.data.maticnibroj,
                razlozi: ev.data.razlozi,
                olaksice: ev.data.olaksice,
              },
              mutation: gql`
                mutation insertzahtev(
                  $tipklijenta: String
                  $jmbg: String
                  $maticnibroj: String
                  $olaksice: String
                  $razlozi: String
                ) {
                  insert_zahtev(
                    objects: {
                      tipklijenta: $tipklijenta
                      jmbg: $jmbg
                      maticnibroj: $maticnibroj
                      razlozi: $razlozi
                      olaksice: $olaksice
                    }
                  ) {
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
              cx.tipklijenta = null;
              cx.jmbg = null;
              cx.maticnibroj = null;
              cx.razlozi = null;
              cx.olaksice = null;
            }),
          ],
          target: 'potvrda',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'provera',
        },
      },
    },

    potvrda: {
      after: {
        1000: [
          {
            target: 'zahtevread',
          },
        ],
      },
    },
  },
});
