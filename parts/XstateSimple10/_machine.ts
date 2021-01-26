/* eslint-disable no-unused-vars */
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
type Iiznajmljivanje = {
  id: number;
  id_clan: number;
  id_komedija: number;
};

// Icontext
export interface Icontext {
  noviclan: string;
  novakomedija: string;
  trenutnakomedija: number;
  trenutniclan: number;
  greska: string;
  listaclanova: Iclan[];
  listakomedija: Ikomedija[];
  listaiznajmljivanja: Iiznajmljivanje[];
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

type evIZABERICLAN = {
  type: 'IZABERICLAN';
  data: {
    id: number;
  };
};

type evIZABERIKOMEDIJA = {
  type: 'IZABERIKOMEDIJA';
  data: {
    id: number;
  };
};

type evIZNAJMI = {
  type: 'IZNAJMI';
  data: {
    id_clan: number;
    id_komedija: number;
  };
};

export type Ievents =
  | evNOVICLAN
  | evNOVAKOMEDIJA
  | evDODAJNOVICLAN
  | evDODAJNOVAKOMEDIJA
  | evIZABERICLAN
  | evIZABERIKOMEDIJA
  | evIZNAJMI
  | { type: 'HOME' }
  | { type: 'VIDICLAN' }
  | { type: 'VIDIKOMEDIJA' }
  | { type: 'ZAPOCNIIZNAJMI' }
  | { type: 'BROWSER' };

const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    videoklub: {};
    // clanov
    ucitajclanove: {};
    vidilistuclanova: {};
    dodajnoviclan: {};
    // komedija
    ucitajkomedije: {};
    vidilistukomedija: {};
    dodajnovakomedija: {};
    // iznajmljivanje
    ucitajiznajmljivanje: {};
    ucitajiznajmljivanjeclan: {};
    ucitajiznajmljivanjekomedija: {};
    ucitajiznajmljivanjeiznajmljeno: {};
    vidilistuiznajmljivanja: {};
    dodajiznajmljivanje: {};
  };
}

export const XstateSimple10Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple10Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    noviclan: '',
    novakomedija: '',
    trenutnakomedija: 0,
    trenutniclan: 0,
    greska: '',
    listaclanova: [
      { id: 1, imeclan: 'BILJANA MARKOVIC' },
      { id: 2, imeclan: 'JELENA CVORKOV' },
    ],
    listakomedija: [
      { id: 1, imekomedija: 'PETAK 13' },
      { id: 2, imekomedija: 'PUTOVANJE' },
    ],
    listaiznajmljivanja: [
      { id: 1, id_clan: 1, id_komedija: 2 },
      { id: 2, id_clan: 2, id_komedija: 1 },
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
        VIDICLAN: {
          target: 'ucitajclanove',
        },
        VIDIKOMEDIJA: {
          target: 'ucitajkomedije',
        },
        ZAPOCNIIZNAJMI: {
          target: 'vidilistuiznajmljivanja',
        },
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
          actions: [
            assign((cx, ev) => {
              cx.listaclanova = ev.data.data.clanovikluba;
            }),
          ],
          target: 'vidilistuclanova',
        },
        onError: {
          target: 'vidilistuclanova',
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
          actions: [
            assign((cx) => {
              cx.noviclan = null;
            }),
          ],
          target: 'ucitajclanove',
        },

        onError: {
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
          actions: [
            assign((cx, ev) => {
              cx.listakomedija = ev.data.data.listakomedija;
            }),
          ],
          target: 'vidilistukomedija',
        },
        onError: {
          target: 'vidilistukomedija',
        },
      },
    },
    vidilistukomedija: {
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
            cond: (cx) => {
              if (cx?.novakomedija === null) {
                return true;
              }
              return false;
            },
            target: 'vidilistukomedija',
          },
          {
            target: 'dodajnovakomedija',
          },
        ],
        HOME: [
          {
            target: 'videoklub',
          },
        ],
      },
    },
    dodajnovakomedija: {
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
          actions: [
            assign((cx) => {
              cx.novakomedija = null;
            }),
          ],
          target: 'ucitajkomedije',
        },
        onError: {
          target: 'ucitajkomedije',
        },
      },
    },
    ucitajiznajmljivanje: {},
    ucitajiznajmljivanjeclan: {},
    ucitajiznajmljivanjekomedija: {},
    ucitajiznajmljivanjeiznajmljeno: {},
    vidilistuiznajmljivanja: {
      on: {
        IZABERIKOMEDIJA: [
          {
            actions: [
              assign((cx, ev: evIZABERIKOMEDIJA) => {
                cx.trenutnakomedija = ev?.data.id;
              }),
            ],
          },
        ],
        IZABERICLAN: [
          {
            actions: [
              assign((cx, ev: evIZABERICLAN) => {
                cx.trenutniclan = ev?.data.id;
              }),
            ],
          },
        ],
        IZNAJMI: [
          {
            target: 'dodajiznajmljivanje',
          },
        ],
        HOME: [
          {
            target: 'videoklub',
          },
        ],
      },
    },
    dodajiznajmljivanje: {
      invoke: {
        src: async (cx, ev: evIZNAJMI) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                id_clan: ev.data.id_clan,
                id_komedija: ev.data.id_komedija,
              },
              mutation: gql`
                mutation listaiznajmljivanja($id_clan: Int, $id_komedija: Int) {
                  insert_listaiznajmljivanja(objects: { id_clan: $id_clan, id_komedija: $id_komedija }) {
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
          actions: [
            assign((cx, ev) => {
              cx.greska = '';
              cx.trenutnakomedija = 0;
              cx.trenutniclan = 0;
            }),
          ],
          target: 'vidilistuiznajmljivanja',
        },
        onError: {
          actions: [
            assign((cx, ev) => {
              cx.greska = 'Iznajmljivanje nije uspelo! Kliknite ponovo!';
            }),
          ],
          target: 'ucitajiznajmljivanje',
        },
      },
    },
  },
});
