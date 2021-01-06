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

// Icontext
export interface Icontext {
  show: boolean;
  klijent: string;
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

export type Ievents =
  | evINPUT
  | evSHOW
  | { type: 'idle' }
  | { type: 'KLIJENTZAHTEV' }
  | { type: 'SUBMIT' }
  | { type: 'ABORT' }
  | { type: 'KLIJENTLOG' };

const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    idle: {};
    klijentread: {};
    unesizahtev: {};
    snimiubazu: {};
    zahvalnica: {};
  };
}

export const XstateSimple8Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple8Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    show: false,
    klijent: '',
    prijave: [],
  },
  // BIKA FOKUS END <<<<<<
  states: {
    // DEFAULT MILAN STATE
    ssr: {
      on: {
        idle: [
          {
            target: 'klijentread',
          },
        ],
      },
    },
    klijentread: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query klijentread {
                  klijent {
                    klijent
                    id
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
              cx.prijave = ev.data.data.klijent;
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
        KLIJENTZAHTEV: {
          target: 'unesizahtev',
        },
      },
    },
    unesizahtev: {
      on: {
        SUBMIT: 'snimiubazu',
        ABORT: 'idle',
      },
    },
    snimiubazu: {
      invoke: {
        src: async (cx, ev: evSUBMIT) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                klijent: ev.data.klijent,
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
              cx.klijent = '';
            }),
          ],
          target: 'zahvalnica',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'idle',
        },
      },
    },
    zahvalnica: {
      after: {
        1000: [
          {
            target: 'klijentread',
          },
        ],
      },
    },
  },
});
