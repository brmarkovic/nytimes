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
import { type } from 'os';

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

type Itransakcijaklijenta = {
  id: number;
  transakcijatekst: string;
  id_klijent: number;
};

type Izahtevklijenta = {
  id: number;
  tipklijenta: string;
  jmbg: number;
  maticnibroj: number;
  razlozi: string;
  olaksice: string;
  id_klijent: number;
};

// Icontext - nema glagola kao prve reci = da je kljuc iz konteksta
export interface Icontext {
  listaklijenata: Iklijent[];
  noviklijent: string; // ovo korisnik kuca u inputu kada dodaje
  listalogovaklijenta: Ilogklijenta[];
  novilogklijenta: string; // ovo isto
  trenutniklijent: number;
  listatransakcijaklijenta: Itransakcijaklijenta[];
  novatransakcijaklijenta: string;
  listazhatevaklijenta: Izahtevklijenta[];
  novizahtevklijenta: string;
  jmbg: string;
  maticnibroj: string;
  tipklijenta: string;
  razlozi: string;
  olaksice: string;
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
  };
};
// button
type evLOGKLIJENTA = {
  type: 'LOGKLIJENTA';
  data: {
    id: number;
  };
};

type evTRANSAKCIJAKLIJENTA = {
  type: 'TRANSAKCIJAKLIJENTA';
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

type evNOVATRANSAKCIJAKLIJENTA = {
  type: 'NOVATRANSAKCIJAKLIJENTA';
  data: {
    transakcijatekst: string;
  };
};

type evDODAJNOVUTRANSAKCIJUKLIJENTA = {
  type: 'DODAJNOVUTRANSAKCIJUKLIJENTA';
  data: {
    transakcijatekst: string;
    id_klijent: number;
  };
};

type evZAHTEVKLIJENTA = {
  type: 'ZAHTEVKLIJENTA';
  data: {
    id: number;
  };
};

type evNOVZAHTEVKLIJENTA = {
  type: 'NOVZAHTEVKLIJENTA';
  data: {
    tipklijenta: string;
    jmbg: number;
    maticnibroj: number;
    razlozi: string;
    olaksice: string;
  };
};

type evDODAJNOVZAHTEVKLIJENTA = {
  type: 'DODAJNOVZAHTEVKLIJENTA';
  data: {
    tipklijenta: string;
    jmbg: number;
    maticnibroj: number;
    razlozi: string;
    olaksice: string;
    id_klijent: number;
  };
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

export type Ievents =
  | evNOVIKLIJENT // input
  | evDODAJNOVIKLIJENT // button
  | evNOVILOGKLIJENTA // input
  | evDODAJNOVILOGKLIJENTA // button
  | evLOGKLIJENTA // button
  | evTRANSAKCIJAKLIJENTA
  | evNOVATRANSAKCIJAKLIJENTA
  | evDODAJNOVUTRANSAKCIJUKLIJENTA
  | evZAHTEVKLIJENTA
  | evNOVZAHTEVKLIJENTA
  | evDODAJNOVZAHTEVKLIJENTA
  | { type: 'ABORT' } // button
  | evLISTAKLIJENATA // button
  | evINPUT
  | evSET_CLIENT
  | evSETRAZLOG
  | evSETOLAKSICE
  | { type: 'PODNESIZAHTEV' }
  | { type: 'SUBMIT' }
  | { type: 'BACK' }
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
    // TRANSAKCIJE KLIJENTA
    ucitajtransakcijeklijenta: {};
    vidilistutransakcijaklijenta: {};
    dodajtransakcijuklijenta: {};
    // ZAHTEVIKLIJENTA
    ucitajzahteveklijenta: {};
    vidilistuzahtevaklijenta: {};
    tipklijenta: {};
    jmbg: {};
    maticnibroj: {};
    razlozi: {};
    olaksice: {};
    provera: {};
    dodajzahtevklijenta: {};
  };
}

export const XstateSimple8Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple8Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    noviklijent: '',
    novilogklijenta: '',
    novatransakcijaklijenta: '',
    novizahtevklijenta: '',
    trenutniklijent: 1,
    jmbg: '',
    maticnibroj: '',
    tipklijenta: '',
    razlozi: '',
    olaksice: '',
    listaklijenata: [],
    listalogovaklijenta: [
      { id: 1, id_klijent: 1, logtekst: 'zaposlen' },
      { id: 2, id_klijent: 1, logtekst: 'auto' },
      { id: 3, id_klijent: 1, logtekst: 'nabavka' },
    ],
    listatransakcijaklijenta: [
      { id: 1, id_klijent: 1, transakcijatekst: 'kredit' },
      { id: 2, id_klijent: 1, transakcijatekst: 'tekuciracun' },
      { id: 3, id_klijent: 1, transakcijatekst: 'pozajmica' },
    ],
    listazhatevaklijenta: [
      {
        id: 1,
        id_klijent: 1,
        jmbg: 23456,
        maticnibroj: null,
        tipklijenta: 'fizickolice',
        razlozi: 'Razlog1',
        olaksice: 'kredit',
      },
      {
        id: 2,
        id_klijent: 1,
        jmbg: null,
        maticnibroj: 112233,
        tipklijenta: 'preduzetnik',
        razlozi: 'Razlog3',
        olaksice: 'kartice',
      },
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
            target: 'ucitajlogoveklijenta',
          },
        ],
        TRANSAKCIJAKLIJENTA: [
          {
            actions: [
              assign((cx, ev: evTRANSAKCIJAKLIJENTA) => {
                cx.trenutniklijent = ev.data.id; // IZMENITI//promenila
              }),
            ],
            target: 'ucitajtransakcijeklijenta',
          },
        ],
        ZAHTEVKLIJENTA: [
          {
            actions: [
              assign((cx, ev: evZAHTEVKLIJENTA) => {
                cx.trenutniklijent = ev.data.id; // IZMENITI// izmenila
              }),
            ],
            target: 'ucitajzahteveklijenta',
          },
        ],
      },
    },
    dodajnovogklijenta: {
      invoke: {
        src: async (_cx, ev: evDODAJNOVIKLIJENT) => {
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
              query: gql`
                query klijentlog {
                  klijentlog(order_by: { id: desc }) {
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
              cx.listalogovaklijenta = ev.data.data.klijentlog;
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
        src: async (_cx, ev: evDODAJNOVILOGKLIJENTA) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                logtekst: ev.data.logtekst,
                id_klijent: ev.data.id_klijent,
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
          target: 'ucitajlogoveklijenta',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'vidilistuklijenata',
        },
      },
    },
    ucitajtransakcijeklijenta: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              query: gql`
                query klijenttransakcija {
                  klijenttransakcija {
                    id_klijent
                    transakcijatekst
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
              cx.listatransakcijaklijenta = ev.data.data.klijenttransakcija; // izmeniti//izmenjeno
            }),
          ],
          target: 'vidilistutransakcijaklijenta',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'vidilistutransakcijaklijenta',
        },
      },
    },
    vidilistutransakcijaklijenta: {
      on: {
        NOVATRANSAKCIJAKLIJENTA: [
          {
            actions: [
              assign((cx, ev: evNOVATRANSAKCIJAKLIJENTA) => {
                cx.novatransakcijaklijenta = ev?.data.transakcijatekst || '';
              }),
            ],
          },
        ],
        DODAJNOVUTRANSAKCIJUKLIJENTA: [
          {
            cond: (cx) => cx?.novatransakcijaklijenta === null || false,
            target: 'vidilistutransakcijaklijenta',
          },
          {
            target: 'dodajtransakcijuklijenta',
          },
        ],
        LISTAKLIJENATA: [
          {
            actions: [
              assign((cx, ev: evLISTAKLIJENATA) => {
                cx.trenutniklijent = ev.data.id_klijent; // izmeni/izmenjeno
              }),
            ],
            target: 'vidilistuklijenata',
          },
        ],
      },
    },
    dodajtransakcijuklijenta: {
      invoke: {
        src: async (_cx, ev: evDODAJNOVUTRANSAKCIJUKLIJENTA) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                transakcijatekst: ev.data.transakcijatekst,
                id_klijent: ev.data.id_klijent, // izmeniti//izmenjeno
              },
              mutation: gql`
                mutation insertklijenttransakcija($id_klijent: Int, $transakcijatekst: String) {
                  insert_klijenttransakcija(objects: { id_klijent: $id_klijent, transakcijatekst: $transakcijatekst }) {
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
              cx.novatransakcijaklijenta = null;
            }),
          ],
          target: 'ucitajtransakcijeklijenta',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'vidilistuklijenata',
        },
      },
    },
    ucitajzahteveklijenta: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              query: gql`
                query klijentzahtev {
                  klijentzahtev {
                    id_klijent
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
              // console.log({ ev });
              cx.listazhatevaklijenta = ev.data.data.klijentzahtev; // izmeniti//izmenjeno
            }),
          ],
          target: 'vidilistuzahtevaklijenta',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'vidilistuzahtevaklijenta',
        },
      },
    },
    vidilistuzahtevaklijenta: {
      on: {
        PODNESIZAHTEV: {
          target: 'tipklijenta',
        },
        LISTAKLIJENATA: [
          {
            actions: [
              assign((cx, ev: evLISTAKLIJENATA) => {
                cx.trenutniklijent = ev.data.id_klijent; // izmeni/izmenjeno
              }),
            ],
            target: 'vidilistuklijenata',
          },
        ],
      },
    },
    tipklijenta: {
      on: {
        SET_CLIENT: [
          {
            cond: (cx, ev: evSET_CLIENT) => ev.data === 'fizickolice' || ev.data === 'poljoprivrednik',
            actions: [
              assign((cx, ev: evSET_CLIENT) => {
                cx.tipklijenta = ev?.data || '';
              }),
            ],
            target: 'jmbg',
          },
          {
            cond: (cx, ev: evSET_CLIENT) => ev.data === 'preduzetnik' || ev.data === 'pravnolice',
            actions: [
              assign((cx, ev: evSET_CLIENT) => {
                cx.tipklijenta = ev?.data || '';
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
                cx.jmbg = '';
              }),
            ],
            target: 'vidilistuzahtevaklijenta',
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
                cx.maticnibroj = '';
              }),
            ],
            target: 'vidilistuzahtevaklijenta',
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
                cx.razlozi = ev?.data || '';
              }),
            ],
            target: 'olaksice',
          },
        ],

        ABORT: 'vidilistuzahtevaklijenta',
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
                cx.olaksice = ev?.data || '';
              }),
            ],
            target: 'provera',
          },
        ],
        ABORT: 'vidilistuzahtevaklijenta',
      },
    },
    provera: {
      on: {
        DODAJNOVZAHTEVKLIJENTA: [
          {
            cond: (cx) => cx?.tipklijenta === null || false, // ovde ovaj uslov treba promeniti

            target: 'vidilistutransakcijaklijenta',
          },
          {
            target: 'dodajzahtevklijenta',
          },
        ],

        BACK: 'tipklijenta',
      },
    },
    dodajzahtevklijenta: {
      invoke: {
        src: async (_cx, ev: evDODAJNOVZAHTEVKLIJENTA) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                tipklijenta: ev.data.tipklijenta,
                jmbg: ev.data.jmbg,
                maticnibroj: ev.data.maticnibroj,
                razlozi: ev.data.razlozi,
                olaksice: ev.data.olaksice,
                id_klijent: ev.data.id_klijent, // izmeniti//izmenjeno
              },
              mutation: gql`
                mutation insertklijentzahtev(
                  $id_klijent: Int
                  $jmbg: String
                  $maticnibroj: String
                  $olaksice: String
                  $razlozi: String
                  $tipklijenta: String
                ) {
                  insert_klijentzahtev(
                    objects: {
                      id_klijent: $id_klijent
                      jmbg: $jmbg
                      maticnibroj: $maticnibroj
                      olaksice: $olaksice
                      razlozi: $razlozi
                      tipklijenta: $tipklijenta
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
              cx.tipklijenta = null; // vidi sa Milanom
            }),
          ],
          target: 'vidilistuzahtevaklijenta',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'vidilistuklijenata',
        },
      },
    },
  },
});
