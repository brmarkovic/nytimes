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

type Iklijentfirma = {
  id: number;
  imefirma: string;
  pibfirma: string;
};
type Iklijentfaktura = {
  id: number;
  fakturabroj: string;
  id_klijentfirma: number;
};
type Istavkefakture = {
  id: number;
  iznosfaktura: string;
  pdvfaktura: string;
  id_faktura: number;
};
type Iklijentplacanje = {
  id: number;
  datumplacanja: string;
  iznosplacanja: string;
  id_klijentfirma: number;
};
// Icontext
export interface Icontext {
  listaklijentfirma: Iklijentfirma[];
  noviklijentfirmaime: string;
  noviklijentfirmapib: string;
  listaklijentfaktura: Iklijentfaktura[];
  novaklijentfaktura: string;
  listaklijentplacanje: Iklijentplacanje[];
  novoklijentplacanje: string;
  novastavkafakture: string;
  listastavkefakture: Istavkefakture[];
  trenutniklijentfirma: number;
  trenutniklijentfaktura: number;
  iznosfaktura: string;
  pdvfaktura: string;
  fakturabroj: string;
  datumplacanja: string;
  iznosplacanja: string;
}

// Ievents

type evINPUT = {
  type: 'INPUT';
  data: string;
};

type evNOVIKLIJENTFIRMAIME = {
  type: 'NOVIKLIJENTFIRMAIME';
  data: {
    imefirma: string;
  };
};
type evNOVIKLIJENTFIRMAPIB = {
  type: 'NOVIKLIJENTFIRMAPIB';
  data: {
    pibfirma: string;
  };
};
type evNOVAKLIJENTFAKTURA = {
  type: 'NOVAKLIJENTFAKTURA';
  data: {
    fakturabroj: string;
  };
};
type evNOVOKLIJENTPLACANJEDATUM = {
  type: 'NOVOKLIJENTPLACANJEDATUM';
  data: {
    datumplacanja: string;
  };
};
type evNOVOKLIJENTPLACANJEIZNOS = {
  type: 'NOVOKLIJENTPLACANJEIZNOS';
  data: {
    iznosplacanja: string;
  };
};
type evNOVASTAVKAFAKTUREIZNOS = {
  type: 'NOVASTAVKAFAKTUREIZNOS';
  data: {
    iznosfaktura: string;
  };
};
type evNOVASTAVKAFAKTUREPDV = {
  type: 'NOVASTAVKAFAKTUREPDV';
  data: {
    pdvfaktura: string;
  };
};
type evKLIJENTFAKTURA = {
  type: 'KLIJENTFAKTURA';
  data: {
    id: number;
  };
};
type evSTAVKEFAKTURE = {
  type: 'STAVKEFAKTURE';
  data: {
    id: number;
  };
};
type evKLIJENTPLACANJE = {
  type: 'KLIJENTPLACANJE';
  data: {
    id: number;
  };
};
type evDODAJNOVIKLIJENTFIRMA = {
  type: 'DODAJNOVIKLIJENTFIRMA';
  data: {
    imefirma: string;
    pibfirma: string;
  };
};

type evDODAJNOVAKLIJENTFAKTURA = {
  type: 'DODAJNOVAKLIJENTFAKTURA';
  data: {
    fakturabroj: string;
    id_klijentfirma: number;
  };
};
type evDODAJNOVOKLIJENTPLACANJE = {
  type: 'DODAJNOVOKLIJENTPLACANJE';
  data: {
    datumplacanja: string;
    iznosplacanja: string;
    id_klijentfirma: number;
  };
};
type evDODAJNOVASTAVKAFAKTURE = {
  type: 'DODAJNOVASTAVKAFAKTURE';
  data: {
    iznosfaktura: string;
    pdvfaktura: string;
    id_faktura: number;
  };
};
type evLISTAKLIJENTFIRMA = {
  type: 'LISTAKLIJENTFIRMA';
  data: {
    id_klijentfirma: number;
  };
};
export type Ievents =
  | evNOVIKLIJENTFIRMAIME
  | evINPUT
  | evNOVIKLIJENTFIRMAPIB
  | evDODAJNOVIKLIJENTFIRMA
  | evNOVAKLIJENTFAKTURA
  | evDODAJNOVAKLIJENTFAKTURA
  | evKLIJENTFAKTURA
  | evKLIJENTPLACANJE
  | evNOVOKLIJENTPLACANJEIZNOS
  | evNOVOKLIJENTPLACANJEDATUM
  | evDODAJNOVOKLIJENTPLACANJE
  | evSTAVKEFAKTURE
  | evNOVASTAVKAFAKTUREIZNOS
  | evNOVASTAVKAFAKTUREPDV
  | evDODAJNOVASTAVKAFAKTURE
  | evLISTAKLIJENTFIRMA
  | { type: 'BACK' }
  | { type: 'BROWSER' };

const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};

    // firma
    ucitajklijentfirma: {};
    vidilistuklijentfirma: {};
    dodajnovaklijentfirma: {};
    // faktura
    ucitajklijentfaktura: {};
    vidilistaklijentfaktura: {};
    dodajnovaklijentfaktura: {};
    // stavke fakture
    ucitajstavkefaktura: {};
    vidilistustavkefakture: {};
    dodajnovastavkafakture: {};
    // placanje
    ucitajklijentplacanje: {};
    vidilistuklijentplacanje: {};
    dodajnovoklijentplacanje: {};
  };
}

export const XstateSimple12Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple12Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    noviklijentfirmaime: '',
    noviklijentfirmapib: '',
    listaklijentfirma: [
      { id: 1, imefirma: 'BILJKADOO', pibfirma: '232323' },
      { id: 2, imefirma: 'VASADOO', pibfirma: '999999' },
    ],
    novaklijentfaktura: '',
    listaklijentfaktura: [
      { id: 1, fakturabroj: '34', id_klijentfirma: 1 },
      { id: 2, fakturabroj: '39', id_klijentfirma: 2 },
    ],
    novoklijentplacanje: '',
    listaklijentplacanje: [
      { id: 1, datumplacanja: '20.02.2020', iznosplacanja: '200.000,00', id_klijentfirma: 1 },
      { id: 2, datumplacanja: '10.01.2020', iznosplacanja: '100.000,00', id_klijentfirma: 2 },
    ],
    novastavkafakture: '',
    iznosfaktura: '',
    pdvfaktura: '',
    fakturabroj: '',
    listastavkefakture: [
      { id: 1, iznosfaktura: '120.000,00', pdvfaktura: '12.000,00', id_faktura: 1 },
      { id: 2, iznosfaktura: '150.000,00', pdvfaktura: '15.000,00', id_faktura: 2 },
    ],
    trenutniklijentfirma: 1,
    trenutniklijentfaktura: 1,
    datumplacanja: '',
    iznosplacanja: '',
  },
  // BIKA FOKUS END <<<<<<
  states: {
    // DEFAULT MILAN STATE
    ssr: {
      on: {
        BROWSER: [
          {
            target: 'ucitajklijentfirma',
          },
        ],
      },
    },
    ucitajklijentfirma: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query klijentfirma {
                  klijentfirma(order_by: { id: desc }) {
                    imefirma
                    pibfirma
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
              cx.listaklijentfirma = ev.data.data.klijentfirma;
            }),
          ],
          target: 'vidilistuklijentfirma',
        },
        onError: {
          target: 'ucitajklijentfirma',
        },
      },
    },
    vidilistuklijentfirma: {
      on: {
        KLIJENTFAKTURA: [
          {
            actions: [
              assign((cx, ev: evKLIJENTFAKTURA) => {
                cx.trenutniklijentfirma = ev.data.id;
              }),
            ],
            target: 'ucitajklijentfaktura',
          },
        ],
        KLIJENTPLACANJE: [
          {
            actions: [
              assign((cx, ev: evKLIJENTPLACANJE) => {
                cx.trenutniklijentfirma = ev.data.id;
              }),
            ],
            target: 'ucitajklijentplacanje',
          },
        ],
        NOVIKLIJENTFIRMAIME: [
          {
            actions: [
              assign((cx, ev: evNOVIKLIJENTFIRMAIME) => {
                cx.noviklijentfirmaime = ev?.data.imefirma || '';
              }),
            ],
          },
        ],
        NOVIKLIJENTFIRMAPIB: [
          {
            actions: [
              assign((cx, ev: evNOVIKLIJENTFIRMAPIB) => {
                cx.noviklijentfirmapib = ev?.data.pibfirma || '';
              }),
            ],
          },
        ],
        DODAJNOVIKLIJENTFIRMA: [
          {
            // cx?.noviklijent === null || false
            cond: (cx) => {
              if ((cx?.noviklijentfirmaime === null, cx?.noviklijentfirmapib === null)) {
                return true;
              }
              return false;
            },
            target: 'vidilistuklijentfirma',
          },
          {
            target: 'dodajnovaklijentfirma',
          },
        ],
      },
    },
    dodajnovaklijentfirma: {
      invoke: {
        src: async (cx, ev: evDODAJNOVIKLIJENTFIRMA) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                imefirma: ev.data.imefirma,
                pibfirma: ev.data.pibfirma,
              },
              mutation: gql`
                mutation MyMutation($imefirma: String, $pibfirma: String) {
                  insert_klijentfirma(objects: { imefirma: $imefirma, pibfirma: $pibfirma }) {
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
              cx.noviklijentfirmaime = null;
              cx.noviklijentfirmapib = null;
            }),
          ],
          target: 'ucitajklijentfirma',
        },
        onError: {
          target: 'vidilistuklijentfirma',
        },
      },
    },
    ucitajklijentfaktura: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query klijentfakture {
                  klijentfakture(order_by: { id: desc }) {
                    fakturabroj
                    id
                    id_klijentfirma
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
              cx.listaklijentfaktura = ev.data.data.klijentfakture;
            }),
          ],
          target: 'vidilistaklijentfaktura',
        },
        onError: {
          target: 'ucitajklijentfirma',
        },
      },
    },
    vidilistaklijentfaktura: {
      on: {
        STAVKEFAKTURE: [
          {
            actions: [
              assign((cx, ev: evSTAVKEFAKTURE) => {
                cx.trenutniklijentfaktura = ev.data.id;
              }),
            ],
            target: 'ucitajstavkefaktura',
          },
        ],
        NOVAKLIJENTFAKTURA: [
          {
            actions: [
              assign((cx, ev: evNOVAKLIJENTFAKTURA) => {
                cx.fakturabroj = ev?.data.fakturabroj || '';
              }),
            ],
          },
        ],
        DODAJNOVAKLIJENTFAKTURA: [
          {
            cond: (cx) => {
              if (cx?.fakturabroj === null) {
                return true;
              }
              return false;
            },
            target: 'vidilistaklijentfaktura',
          },
          {
            target: 'dodajnovaklijentfaktura',
          },
        ],
        BACK: {
          target: 'vidilistuklijentfirma',
        },
      },
    },
    dodajnovaklijentfaktura: {
      invoke: {
        src: async (cx, ev: evDODAJNOVAKLIJENTFAKTURA) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                fakturabroj: ev.data.fakturabroj,
                id_klijentfirma: ev.data.id_klijentfirma,
              },
              mutation: gql`
                mutation klijentfakture($fakturabroj: String, $id_klijentfirma: Int) {
                  insert_klijentfakture(objects: { fakturabroj: $fakturabroj, id_klijentfirma: $id_klijentfirma }) {
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
              cx.fakturabroj = null;
            }),
          ],
          target: 'ucitajklijentfaktura',
        },
        onError: {
          target: 'vidilistuklijentfirma',
        },
      },
    },
    ucitajstavkefaktura: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query stavkefakture {
                  stavkefakture(order_by: { id: desc }) {
                    id
                    id_faktura
                    iznosfaktura
                    pdvfaktura
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
              cx.listastavkefakture = ev.data.data.stavkefakture;
            }),
          ],
          target: 'vidilistustavkefakture',
        },
        onError: {
          target: 'ucitajklijentfirma',
        },
      },
    },
    vidilistustavkefakture: {
      on: {
        NOVASTAVKAFAKTUREIZNOS: [
          {
            actions: [
              assign((cx, ev: evNOVASTAVKAFAKTUREIZNOS) => {
                cx.iznosfaktura = ev?.data.iznosfaktura || '';
              }),
            ],
          },
        ],
        NOVASTAVKAFAKTUREPDV: [
          {
            actions: [
              assign((cx, ev: evNOVASTAVKAFAKTUREPDV) => {
                cx.pdvfaktura = ev?.data.pdvfaktura || '';
              }),
            ],
          },
        ],
        DODAJNOVASTAVKAFAKTURE: [
          {
            cond: (cx) => {
              if ((cx?.iznosfaktura === null, cx?.pdvfaktura === null)) {
                return true;
              }
              return false;
            },
            target: 'vidilistustavkefakture',
          },
          {
            target: 'dodajnovastavkafakture',
          },
        ],
        BACK: {
          target: 'vidilistuklijentfirma',
        },
      },
    },
    dodajnovastavkafakture: {
      invoke: {
        src: async (cx, ev: evDODAJNOVASTAVKAFAKTURE) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                iznosfaktura: ev.data.iznosfaktura,
                pdvfaktura: ev.data.pdvfaktura,
                id_faktura: ev.data.id_faktura,
              },
              mutation: gql`
                mutation stavkefakture($id_faktura: Int, $iznosfaktura: String, $pdvfaktura: String) {
                  insert_stavkefakture(
                    objects: { id_faktura: $id_faktura, iznosfaktura: $iznosfaktura, pdvfaktura: $pdvfaktura }
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
          actions: [
            assign((cx) => {
              cx.iznosfaktura = null;
              cx.pdvfaktura = null;
            }),
          ],
          target: 'ucitajstavkefaktura',
        },
        onError: {
          target: 'vidilistuklijentfirma',
        },
      },
    },
    ucitajklijentplacanje: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query klijentplacanje {
                  klijentplacanje(order_by: { id: desc }) {
                    datumplacanja
                    id
                    id_klijentfirma
                    iznosplacanja
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
              cx.listaklijentplacanje = ev.data.data.klijentplacanje;
            }),
          ],
          target: 'vidilistuklijentplacanje',
        },
        onError: {
          target: 'ucitajklijentfirma',
        },
      },
    },
    vidilistuklijentplacanje: {
      on: {
        NOVOKLIJENTPLACANJEDATUM: [
          {
            actions: [
              assign((cx, ev: evNOVOKLIJENTPLACANJEDATUM) => {
                cx.datumplacanja = ev?.data.datumplacanja || '';
              }),
            ],
          },
        ],
        NOVOKLIJENTPLACANJEIZNOS: [
          {
            actions: [
              assign((cx, ev: evNOVOKLIJENTPLACANJEIZNOS) => {
                cx.iznosplacanja = ev?.data.iznosplacanja || '';
              }),
            ],
          },
        ],
        DODAJNOVOKLIJENTPLACANJE: [
          {
            cond: (cx) => {
              if ((cx?.iznosplacanja === null, cx?.datumplacanja === null)) {
                return true;
              }
              return false;
            },
            target: 'vidilistuklijentplacanje',
          },
          {
            target: 'dodajnovoklijentplacanje',
          },
        ],
        BACK: {
          target: 'ucitajklijentfirma',
        },
      },
    },
    dodajnovoklijentplacanje: {
      invoke: {
        src: async (cx, ev: evDODAJNOVOKLIJENTPLACANJE) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                datumplacanja: ev.data.datumplacanja,
                iznosplacanja: ev.data.iznosplacanja,
                id_klijentfirma: ev.data.id_klijentfirma,
              },
              mutation: gql`
                mutation klijentplacanje($datumplacanja: String, $id_klijentfirma: Int, $iznosplacanja: String) {
                  insert_klijentplacanje(
                    objects: {
                      datumplacanja: $datumplacanja
                      id_klijentfirma: $id_klijentfirma
                      iznosplacanja: $iznosplacanja
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
          actions: [
            assign((cx) => {
              cx.datumplacanja = null;
              cx.iznosplacanja = null;
            }),
          ],
          target: 'ucitajklijentplacanje',
        },
        onError: {
          target: 'vidilistuklijentfirma',
        },
      },
    },
  },
});
