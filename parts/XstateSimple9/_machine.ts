/* eslint-disable no-console */
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
  listaclanova: Iclan[];
  listakomedija: Ikomedija[];
  listaiznajmljivanja: Iiznajmljivanje[];
  greska: string;
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
    id: number;
  };
};

type evIZABERICLAN = {
  type: 'IZABERICLAN';
  data: {
    id: number;
  };
};

type evIZNAJMI = {
  type: 'IZNAJMI';
  data: {
    id_komedija: number;
    id_clan: number;
  };
};

export type Ievents =
  | evNOVICLAN
  | evNOVAKOMEDIJA
  | evDODAJNOVICLAN
  | evDODAJNOVAKOMEDIJA
  | evIZABERIKOMEDIJA
  | evIZABERICLAN
  | evIZNAJMI
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
    ucitajiznajmljivanjeiznajmljeno: {};
    vidilistuiznajmljivanja: {};
    dodajiznajmljivanje: {};
  };
}

export const XstateSimple9Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple9Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    greska: '',
    noviclan: '',
    novakomedija: '',
    trenutnakomedija: 0,
    trenutniclan: 0,
    listaclanova: [
      { id: 1, imeclan: 'BILJANA MARKOVIC' },
      { id: 2, imeclan: 'IVANA SAVIC' },
    ],
    listakomedija: [
      { id: 1, imekomedija: 'ALFI' },
      { id: 2, imekomedija: 'RASTANAK' },
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
            target: 'ucitajiznajmljivanje',
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
    ucitajiznajmljivanje: {
      after: {
        1: 'ucitajiznajmljivanjekomedije',
      },
    },
    ucitajiznajmljivanjekomedije: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query listaiznajmljivanjakomedije {
                  listaiznajmljivanja {
                    id_komedija
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
          actions: [
            assign((cx, ev) => {
              // console.log({ ev });
              cx.listaiznajmljivanja = ev.data.data.listaiznajmljivanjakomedije;
            }),
          ],
          target: 'ucitajiznamljivanjeclan',
        },
        onError: {
          actions: [
            assign((cx, ev) => {
              cx.greska = 'Server nije ucitao clanove!';
            }),
          ],
          target: 'vidilistuiznajmljivanja',
        },
      },
    },
    ucitajiznamljivanjeclan: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query listaiznajmljivanjeclan {
                  listaiznajmljivanja {
                    id_clan
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
          actions: [
            assign((cx, ev) => {
              // console.log({ ev });
              cx.listaiznajmljivanja = ev.data.data.listaiznajmljivanjeclan;
            }),
          ],
          target: 'ucitajiznajmljivanjeiznajmljeno',
        },
        onError: {
          target: 'vidilistuiznajmljivanja',
        },
      },
    },
    ucitajiznajmljivanjeiznajmljeno: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query listaiznajmljivanjaiznajmljeno {
                  listaiznajmljivanja {
                    id
                    id_clan
                    id_komedija
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
              // console.log({ ev });
              cx.listaiznajmljivanja = ev.data.data.listaiznajmljivanjaiznajmljeno;
            }),
          ],
          target: 'vidilistuiznajmljivanja',
        },
        onError: {
          target: 'vidilistuiznajmljivanja',
        },
      },
    },
    vidilistuiznajmljivanja: {
      on: {
        IZABERIKOMEDIJA: [
          {
            actions: [
              assign((cx, ev: evIZABERIKOMEDIJA) => {
                cx.trenutnakomedija = ev.data.id; // dir: cx, ev, ind: nema *u masini smo"
              }),
            ],
          },
        ],
        IZABERICLAN: [
          {
            actions: [
              assign((cx, ev: evIZABERICLAN) => {
                cx.trenutniclan = ev.data.id; // dir: cx, ev, ind: nema *u masini smo"
              }),
            ],
          },
        ],
        IZNAJMI: [
          {
            target: 'dodajiznajmljivanje', // + prosledi ev dalje
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
                mutation insertlistaiznajmljivanja($id_clan: Int, $id_komedija: Int) {
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
          // return {}; // on Done
          // throw new Error('neka greska, salje na onError');
        },
        onDone: {
          actions: [
            assign((cx, ev) => {
              //
              cx.greska = '';
              cx.trenutnakomedija = 0;
              cx.trenutniclan = 0;
            }),
          ],
          target: 'ucitajiznajmljivanje',
        },
        onError: {
          actions: [
            assign((cx, ev) => {
              cx.greska = 'Iznajmljivanje nije uspelo! Kliknite ponovo!';
            }),
          ],
          target: 'vidilistuiznajmljivanja',
        },
      },
    },
  },
});
