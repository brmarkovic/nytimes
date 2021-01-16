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

type Iklijent = {
  id: number;
  klijent: string;
};

type Ilogklijenta = {
  id: number;
  logtekst: string;
  id_klijent: number; // ovo ide na dno
};

// Icontext - nema glagola kao prve reci = da je kljuc iz konteksta
export interface Icontext {
  listaklijenata: Iklijent[];
  noviklijent: string; // ovo korisnik kuca u inputu kada dodaje
  listalogovaklijenta: Ilogklijenta[];
  novilogklijenta: string; // ovo isto
  trenutniklijent: number;
}

// Ievents
// input
type evNOVIKLIJENT = {
  type: 'NOVIKLIJENT';
  data: {
    // id: number; // ovo je automatski u hasuri
    klijent: string;
  };
};
type evDODAJNOVIKLIJENT = {
  type: 'DODAJNOVIKLIJENT';
  data: {
    klijent: string;
  };
};
type evDODAJNOVILOGKLIJENTA = {
  type: 'DODAJNOVILOGKLIJENTA';
  data: {
    logtekst: string;
    id_klijent: number;
  };
};
// input
type evNOVILOGKLIJENTA = {
  type: 'NOVILOGKLIJENTA';
  data: {
    logtekst: string;
    id_klijent: number;
  };
};
// button
type evLOGKLIJENTA = {
  type: 'LOGKLIJENTA';
  data: {
    id: number;
  };
};
type evLISTAKLIJENATA = {
  type: 'LISTAKLIJENATA';
  data: {
    id_klijent: number;
  };
};

export type Ievents =
  | evNOVIKLIJENT // input
  | evDODAJNOVIKLIJENT // button
  | evNOVILOGKLIJENTA // input
  | evDODAJNOVILOGKLIJENTA // button
  | evLOGKLIJENTA // button
  | { type: 'ABORT' } // button
  | evLISTAKLIJENATA // button
  | { type: 'BROWSER' }; // ssr OK
const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

// state UVEK mora da ima GLAGOL kao prvu rec "vidi,ucitaj,dodaj..."
interface Istates {
  states: {
    ssr: {};
    // KLIJENT
    ucitajklijente: {}; // invoke
    vidilistuklijenata: {}; //
    dodajnovogklijenta: {}; // invoke
    // LOGOVI KLIJENTA
    ucitajlogoveklijenta: {}; //  invoke
    vidilistulogovaklijenta: {};
    dodajlogklijenta: {}; //  invoke
    // snimiubazu: {};
  };
}

export const XstateSimple8Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple8Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    noviklijent: '',
    novilogklijenta: '',
    trenutniklijent: 1,
    listaklijenata: [],
    listalogovaklijenta: [
      { id: 1, id_klijent: 1, logtekst: 'zaposlen' },
      { id: 2, id_klijent: 1, logtekst: 'auto' },
      { id: 3, id_klijent: 1, logtekst: 'nabavka' },
    ],
  },
  // BIKA FOKUS END <<<<<
  states: {
    // DEFAULT MILAN STATE
    ssr: {
      on: {
        BROWSER: [
          {
            target: 'ucitajklijente',
          },
        ],
      },
    },
    ucitajklijente: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query klijent {
                  klijent {
                    id
                    klijent
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
              cx.listaklijenata = ev.data.data.klijent;
            }),
          ],
          target: 'vidilistuklijenata',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'vidilistuklijenata',
        },
      },
    },
    vidilistuklijenata: {
      on: {
        NOVIKLIJENT: [
          {
            actions: [
              assign((cx, ev: evNOVIKLIJENT) => {
                cx.noviklijent = ev?.data.klijent || '';
              }),
            ],
          },
        ],
        DODAJNOVIKLIJENT: [
          {
            cond: (cx) => cx?.noviklijent === null || false,
            target: 'vidilistuklijenata',
          },
          {
            target: 'dodajnovogklijenta',
          },
        ],
        LOGKLIJENTA: [
          {
            actions: [
              assign((cx, ev: evLOGKLIJENTA) => {
                cx.trenutniklijent = ev.data.id;
              }),
            ],
            target: 'vidilistulogovaklijenta',
          },
        ],
      },
    },
    dodajnovogklijenta: {
      invoke: {
        src: async (cx, ev: evDODAJNOVIKLIJENT) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                klijent: ev.data.klijent,
              },
              mutation: gql`
                mutation insertklijent($klijent: String) {
                  insert_klijent(objects: { klijent: $klijent }) {
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
              cx.noviklijent = null;
            }),
          ],
          target: 'ucitajklijente',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'ucitajklijente',
        },
      },
    },
    ucitajlogoveklijenta: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query klijentlog {
                  klijentlog {
                    id
                    id_klijent
                    logtekst
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
              cx.listalogovaklijenta = ev.data.data.logtekst;
            }),
          ],
          target: 'vidilistulogovaklijenta',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'vidilistulogovaklijenta',
        },
      },
    },
    vidilistulogovaklijenta: {
      on: {
        NOVILOGKLIJENTA: [
          {
            actions: [
              assign((cx, ev: evNOVILOGKLIJENTA) => {
                cx.novilogklijenta = ev?.data.logtekst || '';
              }),
            ],
          },
        ],
        DODAJNOVILOGKLIJENTA: [
          {
            cond: (cx) => cx?.novilogklijenta === null || false,
            target: 'vidilistulogovaklijenta',
          },
          {
            target: 'dodajlogklijenta',
          },
        ],
        LISTAKLIJENATA: [
          {
            actions: [
              assign((cx, ev: evLISTAKLIJENATA) => {
                cx.trenutniklijent = ev.data.id_klijent;
              }),
            ],
            target: 'vidilistuklijenata',
          },
        ],
      },
    },
    dodajlogklijenta: {
      invoke: {
        src: async (cx, ev: evDODAJNOVILOGKLIJENTA) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                logtekst: ev.data.logtekst,
                id_klijent: 1,
              },
              mutation: gql`
                mutation insertklijentlog($id_klijent: Int, $logtekst: String) {
                  insert_klijentlog(objects: { id_klijent: $id_klijent, logtekst: $logtekst }) {
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
              cx.novilogklijenta = null;
            }),
          ],
          target: 'vidilistulogovaklijenta',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'ucitajklijente',
        },
      },
    },
  },
});
