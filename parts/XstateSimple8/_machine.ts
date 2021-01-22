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
type Idetaljizahteva = {
  id: number;
  odgovornolice: string;
  id_zahtev: number;
};
type Istatuszahteva = {
  id: number;
  status: string;
  id_odgovornolice: number;
};

// Icontext - nema glagola kao prve reci = da je kljuc iz konteksta
export interface Icontext {
  listaklijenata: Iklijent[];
  noviklijent: string; // ovo korisnik kuca u inputu kada dodaje
  listalogovaklijenta: Ilogklijenta[];
  novilogklijenta: string; // ovo isto
  trenutniklijent: number;
  trenutnizahtev: number;
  trenutnoodgovornolice: number;
  listatransakcijaklijenta: Itransakcijaklijenta[];
  novatransakcijaklijenta: string;
  listazhatevaklijenta: Izahtevklijenta[];
  novizahtevklijenta: string;
  listadetaljizahteva: Idetaljizahteva[];
  listastatusazahteva: Istatuszahteva[];
  novidetaljzahteva: string;
  novistatuszahteva: string;
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

type evNOVIDETALJZAHTEVA = {
  type: 'NOVIDETALJZAHTEVA';
  data: {
    odgovornolice: string;
  };
};
type evNOVISTATUSZAHTEVA = {
  type: 'NOVISTATUSZAHTEVA';
  data: {
    status: string;
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
type evLISTAZAHTEVA = {
  type: 'LISTAZAHTEVA';
  data: {
    id_zahtev: number;
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
type evDETALJIZAHTEVA = {
  type: 'DETALJIZAHTEVA';
  data: {
    id: number;
  };
};

type evSTATUSZAHTEVA = {
  type: 'STATUSZAHTEVA';
  data: {
    id: number;
  };
};

type evDODAJNOVIDETALJZAHTEVA = {
  type: 'DODAJNOVIDETALJZAHTEVA';
  data: {
    odgovornolice: string;
    id_zahtev: number;
  };
};

type evDODAJNOVISTATUSZAHTEVA = {
  type: 'DODAJNOVISTATUSZAHTEVA';
  data: {
    status: string;
    id_odgovornolice: number;
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
    jmbg: string;
    maticnibroj: string;
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
  | evDETALJIZAHTEVA
  | evDODAJNOVIDETALJZAHTEVA
  | evLISTAZAHTEVA
  | evNOVIDETALJZAHTEVA
  | evNOVZAHTEVKLIJENTA
  | evDODAJNOVZAHTEVKLIJENTA
  | evSTATUSZAHTEVA
  | evNOVISTATUSZAHTEVA
  | evDODAJNOVISTATUSZAHTEVA
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
    // DETALJIZAHTEVA
    ucitajdetaljezahteva: {};
    vidilistudetaljizahteva: {};
    dodajdetaljzahteva: {};
    // STATUSIZAHTEVA
    ucitajstatusezahteva: {};
    vidilistustatusazahteva: {};
    dodajstatuszahteva: {};
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
    trenutnizahtev: 1,
    trenutnoodgovornolice: 1,
    novidetaljzahteva: '',
    novistatuszahteva: '',
    jmbg: '',
    maticnibroj: '',
    tipklijenta: '',
    razlozi: '',
    olaksice: '',
    listaklijenata: [],
    listalogovaklijenta: [],
    listatransakcijaklijenta: [],
    listazhatevaklijenta: [],
    listadetaljizahteva: [
      { id: 1, id_zahtev: 1, odgovornolice: 'mika' },
      { id: 2, id_zahtev: 2, odgovornolice: 'pera' },
    ],
    listastatusazahteva: [
      { id: 1, id_odgovornolice: 1, status: 'u obradi' },
      { id: 2, id_odgovornolice: 1, status: 'vracen' },
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
            // cx?.noviklijent === null || false
            cond: (cx) => {
              if (cx?.noviklijent === null) {
                return true;
              }
              return false;
            },
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
        src: async (cx, ev) => {
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
        src: async (cx, ev) => {
          const [ERRdata, data] = await backendServer
            .query({
              variables: {
                id_klijent: cx.trenutniklijent,
              },
              query: gql`
                query klijentzahtev($id_klijent: Int) {
                  klijentzahtev(where: { id_klijent: { _eq: $id_klijent } }, order_by: { id: desc }, limit: 50) {
                    id_klijent
                    jmbg
                    maticnibroj
                    olaksice
                    razlozi
                    tipklijenta
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
        DETALJIZAHTEVA: [
          {
            actions: [
              assign((cx, ev: evDETALJIZAHTEVA) => {
                cx.trenutnizahtev = ev.data.id;
              }),
            ],
            target: 'ucitajdetaljezahteva', // promeniti u ucitajdetaljezahteva
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
            cond: (cx, ev) => {
              if (cx.tipklijenta) {
                if (cx.jmbg || cx.maticnibroj) {
                  return true;
                }
              }

              return false;
            }, // ovde ovaj uslov treba promeniti videti saMilanom
            target: 'dodajzahtevklijenta',
          },
          {
            target: 'vidilistuzahtevaklijenta',
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
          target: 'ucitajzahteveklijenta',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'vidilistuklijenata',
        },
      },
    },
    ucitajdetaljezahteva: {
      invoke: {
        src: async (cx, ev) => {
          const [ERRdata, data] = await backendServer
            .query({
              variables: {
                id_zahtev: cx.trenutnizahtev,
              },
              query: gql`
                query odgovornolice($id_zahtev: Int) {
                  odgovornolicezahteva(where: { id_zahtev: { _eq: $id_zahtev } }, order_by: { id: desc }, limit: 50) {
                    id_zahtev
                    odgovornolice
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
              // console.log({ ev });
              cx.listadetaljizahteva = ev.data.data.odgovornolicezahteva; // izmeniti//izmenjeno
            }),
          ],
          target: 'vidilistudetaljizahteva',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'vidilistuklijenata',
        },
      },
    },
    vidilistudetaljizahteva: {
      on: {
        STATUSZAHTEVA: [
          {
            actions: [
              assign((cx, ev: evSTATUSZAHTEVA) => {
                cx.trenutnoodgovornolice = ev.data.id;
              }),
            ],
            target: 'ucitajstatuszahteva', // promeniti u ucitajdetaljezahteva
          },
        ],
        NOVIDETALJZAHTEVA: [
          {
            actions: [
              assign((cx, ev: evNOVIDETALJZAHTEVA) => {
                cx.novidetaljzahteva = ev?.data.odgovornolice || ''; // dodati
              }),
            ],
          },
        ],
        DODAJNOVIDETALJZAHTEVA: [
          {
            cond: (cx) => cx?.novidetaljzahteva === null || false,
            target: 'vidilistudetaljizahteva',
          },
          {
            target: 'dodajdetaljzahteva',
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
    dodajdetaljzahteva: {
      invoke: {
        src: async (_cx, ev: evDODAJNOVIDETALJZAHTEVA) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                odgovornolice: ev.data.odgovornolice,
                id_zahtev: ev.data.id_zahtev,
              },
              mutation: gql`
                mutation insertodgovornolice($id_zahtev: Int, $odgovornolice: String) {
                  insert_odgovornolicezahteva(objects: { id_zahtev: $id_zahtev, odgovornolice: $odgovornolice }) {
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
              cx.novidetaljzahteva = null;
            }),
          ],
          target: 'ucitajdetaljezahteva',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'vidilistuklijenata',
        },
      },
    },
    ucitajstatusezahteva: {
      invoke: {
        src: async (cx, ev) => {
          const [ERRdata, data] = await backendServer
            .query({
              variables: {
                id_odgovornolice: cx.trenutnoodgovornolice,
              },
              query: gql`
                query statuszahteva($id_odgovornolice: Int) {
                  statuszahteva(
                    where: { id_odgovornolice: { _eq: $id_odgovornolice } }
                    order_by: { id: desc }
                    limit: 100
                  ) {
                    id_odgovornolice
                    status
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
              // console.log({ ev });
              cx.listastatusazahteva = ev.data.data.statuszahteva; // izmeniti//izmenjeno
            }),
          ],
          target: 'vidilistustatusazahteva',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'vidilistuklijenata',
        },
      },
    },
    vidilistustatusazahteva: {
      on: {
        NOVISTATUSZAHTEVA: [
          {
            actions: [
              assign((cx, ev: evNOVISTATUSZAHTEVA) => {
                cx.novistatuszahteva = ev?.data.status || ''; // dodati
              }),
            ],
          },
        ],
        DODAJNOVISTATUSZAHTEVA: [
          {
            cond: (cx) => cx?.novistatuszahteva === null || false,
            target: 'vidilistustatusazahteva',
          },
          {
            target: 'dodajstatuszahteva',
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
    dodajstatuszahteva: {
      invoke: {
        src: async (_cx, ev: evDODAJNOVISTATUSZAHTEVA) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                status: ev.data.status,
                id_odgovornolice: ev.data.id_odgovornolice,
              },
              mutation: gql`
                mutation insertstatuszahteva($id_odgovornolice: Int, $status: String) {
                  insert_statuszahteva(objects: { id_odgovornolice: $id_odgovornolice, status: $status }) {
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
              cx.novistatuszahteva = null;
            }),
          ],
          target: 'ucitajstatusezahteva',
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
