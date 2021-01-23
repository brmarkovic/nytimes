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

type Iclan = {
  id: number;
  imeclan: string;
};

type Ikomedija = {
  id: number;
  imekomedija: string;
};

// Icontext
export interface Icontext {
  noviclan: string;
  novakomedija: string;
  trenutnakomedija: number;
  trenutniclan: number;
  listaclanova: Iclan[];
  listakomedija: Ikomedija[];
}

// Ievents

type evNOVICLAN = {
  type: 'NOVICLAN';
  data: {
    imeclan: string;
  };
};

type evNOVAKOMEDIJA = {
  type: 'NOVAKOMEDIJA';
  data: {
    imekomedija: string;
  };
};
type evDODAJNOVICLAN = {
  type: 'DODAJNOVICLAN';
  data: {
    imeclan: string;
  };
};

type evDODAJNOVAKOMEDIJA = {
  type: 'DODAJNOVAKOMEDIJA';
  data: {
    imekomedija: string;
  };
};

type evIZABERIKOMEDIJA = {
  type: 'IZABERIKOMEDIJA';
  data: {
    imekomedija: string;
  };
};

export type Ievents =
  | evNOVICLAN
  | evNOVAKOMEDIJA
  | evDODAJNOVICLAN
  | evDODAJNOVAKOMEDIJA
  | evIZABERIKOMEDIJA
  | { type: 'VIDICLAN' }
  | { type: 'VIDIKOMEDIJA' }
  | { type: 'ZAPOCNIIZNAJMI' }
  | { type: 'HOME' }
  | { type: 'BROWSER' };

const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    videoklub: {};
    // clanovi
    ucitajclanove: {};
    vidilistuclanova: {};
    dodajnoviclan: {};
    // komedija
    ucitajkomedije: {};
    vidilistukomedije: {};
    dodajnovukomediju: {};
    // iznajmljivanje
    ucitajiznajmljivanje: {};
    ucitajiznajmljivanjekomedije: {};
    ucitajiznamljivanjeclan: {};
    vidilistuiznajmljivanja: {};
    dodajiznajmljivanje: {};
  };
}

export const XstateSimple9Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple9Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    noviclan: '',
    novakomedija: '',
    trenutnakomedija: 1,
    trenutniclan: 1,
    listaclanova: [
      { id: 1, imeclan: 'BILJANA MARKOVIC' },
      { id: 2, imeclan: 'IVANA SAVIC' },
    ],
    listakomedija: [
      { id: 1, imekomedija: 'ALFI' },
      { id: 2, imekomedija: 'RASTANAK' },
    ],
  },
  // BIKA FOKUS END <<<<<<
  states: {
    // DEFAULT MILAN STATE
    ssr: {
      on: {
        BROWSER: [
          {
            target: 'videoklub',
          },
        ],
      },
    },
    videoklub: {
      on: {
        VIDICLAN: [
          {
            target: 'ucitajclanove', // promeniti posle u ucitajclanove
          },
        ],
        VIDIKOMEDIJA: [
          {
            target: 'ucitajkomedije',
          },
        ],
        ZAPOCNIIZNAJMI: [
          {
            target: 'vidilistuiznajmljivanja',
          },
        ],
      },
    },
    ucitajclanove: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query clanovikluba {
                  clanovikluba {
                    id
                    imeclan
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
              cx.listaclanova = ev.data.data.clanovikluba;
            }),
          ],
          target: 'vidilistuclanova',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'videoklub',
        },
      },
    },
    vidilistuclanova: {
      on: {
        NOVICLAN: [
          {
            actions: [
              assign((cx, ev: evNOVICLAN) => {
                cx.noviclan = ev?.data.imeclan || '';
              }),
            ],
          },
        ],
        DODAJNOVICLAN: [
          {
            // cx?.noviklijent === null || false
            cond: (cx) => {
              if (cx?.noviclan === null) {
                return true;
              }
              return false;
            },
            target: 'vidilistuclanova',
          },
          {
            target: 'dodajnoviclan',
          },
        ],
        HOME: [
          {
            target: 'videoklub',
          },
        ],
      },
    },
    dodajnoviclan: {
      invoke: {
        src: async (_cx, ev: evDODAJNOVICLAN) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                imeclan: ev.data.imeclan,
              },
              mutation: gql`
                mutation insertclanovikluba($imeclan: String) {
                  insert_clanovikluba(objects: { imeclan: $imeclan }) {
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
              cx.noviclan = null;
            }),
          ],
          target: 'ucitajclanove',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'ucitajclanove',
        },
      },
    },
    ucitajkomedije: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query listakomedija {
                  listakomedija {
                    id
                    imekomedija
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
              cx.listakomedija = ev.data.data.listakomedija;
            }),
          ],
          target: 'vidilistukomedije',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'videoklub',
        },
      },
    },
    vidilistukomedije: {
      on: {
        NOVAKOMEDIJA: [
          {
            actions: [
              assign((cx, ev: evNOVAKOMEDIJA) => {
                cx.novakomedija = ev?.data.imekomedija || '';
              }),
            ],
          },
        ],
        DODAJNOVAKOMEDIJA: [
          {
            // cx?.noviklijent === null || false
            cond: (cx) => {
              if (cx?.novakomedija === null) {
                return true;
              }
              return false;
            },
            target: 'vidilistukomedije',
          },
          {
            target: 'dodajnovukomediju',
          },
        ],
        HOME: [
          {
            target: 'videoklub',
          },
        ],
      },
    },
    dodajnovukomediju: {
      invoke: {
        src: async (_cx, ev: evDODAJNOVAKOMEDIJA) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                imekomedija: ev.data.imekomedija,
              },
              mutation: gql`
                mutation insertlistakomedija($imekomedija: String) {
                  insert_listakomedija(objects: { imekomedija: $imekomedija }) {
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
              cx.novakomedija = null;
            }),
          ],
          target: 'ucitajkomedije',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'ucitajkomedije',
        },
      },
    },
    ucitajiznajmljivanje: {},
    ucitajiznajmljivanjekomedije: {},
    ucitajiznamljivanjeclan: {},
    vidilistuiznajmljivanja: {},
    dodajiznajmljivanje: {},
  },
});
