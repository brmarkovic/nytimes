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

type evSETCLIENT = {
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
    jmbg: string;
    maticnibroj: string;
    razlozi: string;
    olaksice: string;
  };
};

export type Ievents =
  | evINPUT
  | evSHOW
  | evSETCLIENT
  | evSETRAZLOG
  | evSETOLAKSICE
  | evSUBMIT
  | { type: 'FORMULAR' }
  | { type: 'PODNESIZAHTEV' }
  | { type: 'FL' }
  | { type: 'POLJOPRIVREDNIK' }
  | { type: 'PRAVNOLICE' }
  | { type: 'PREDUZETNIK' }
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
            cond: (cx, ev) => cx.tipklijenta === 'fizickolice',
            target: 'jmbg',
          },
          {
            actions: [
              assign((cx, ev: evSETCLIENT) => {
                console.log({ ev });
                cx.tipklijenta = ev?.data || '';
              }),
            ],
          },
          {
            cond: (cx, ev) => cx.tipklijenta === 'poljoprivrednik',
            target: 'jmbg',
          },
          {
            actions: [
              assign((cx, ev: evSETCLIENT) => {
                cx.tipklijenta = ev?.data || '';
              }),
            ],
          },
          {
            cond: (cx, ev) => cx.tipklijenta === 'preduzetnik',
            target: 'maticnibroj',
          },
          {
            actions: [
              assign((cx, ev: evSETCLIENT) => {
                console.log({ ev });
                cx.tipklijenta = ev?.data || '';
              }),
            ],
          },
          {
            cond: (cx, ev) => cx.tipklijenta === 'pravnolice',
            target: 'maticnibroj',
          },
          {
            actions: [
              assign((cx, ev: evSETCLIENT) => {
                cx.tipklijenta = ev?.data || '';
              }),
            ],
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
            cond: (cx, ev) => cx.razlozi === 'razlog1',
            target: 'olaksice',
          },
          {
            actions: [
              assign((cx, ev: evSETRAZLOG) => {
                cx.razlozi = ev?.data || '';
              }),
            ],
          },
          {
            cond: (cx, ev) => cx.razlozi === 'razlog2',
            target: 'olaksice',
          },
          {
            actions: [
              assign((cx, ev: evSETRAZLOG) => {
                cx.razlozi = ev?.data || '';
              }),
            ],
          },
          {
            cond: (cx, ev) => cx.razlozi === 'razlog3',
            target: 'olaksice',
          },
          {
            actions: [
              assign((cx, ev: evSETRAZLOG) => {
                cx.razlozi = ev?.data || '';
              }),
            ],
          },
        ],

        ABORT: 'idle',
      },
    },

    olaksice: {
      on: {
        SET_OLAKSICE: [
          {
            cond: (cx, ev) => cx.olaksice === 'trpozajmica',
            target: 'provera',
          },
          {
            actions: [
              assign((cx, ev: evSETOLAKSICE) => {
                cx.olaksice = ev?.data || '';
              }),
            ],
          },
          {
            cond: (cx, ev) => cx.olaksice === 'kreditnekartice',
            target: 'provera',
          },
          {
            actions: [
              assign((cx, ev: evSETOLAKSICE) => {
                cx.olaksice = ev?.data || '';
              }),
            ],
          },
          {
            cond: (cx, ev) => cx.olaksice === 'karticenaodlplacanje',
            target: 'provera',
          },
          {
            actions: [
              assign((cx, ev: evSETOLAKSICE) => {
                cx.olaksice = ev?.data || '';
              }),
            ],
          },
          {
            cond: (cx, ev) => cx.olaksice === 'krediti',
            target: 'provera',
          },
          {
            actions: [
              assign((cx, ev: evSETOLAKSICE) => {
                cx.olaksice = ev?.data || '';
              }),
            ],
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
