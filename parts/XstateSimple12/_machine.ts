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
  trenutniklijentplacanje: number;
  iznosfaktura: string;
  pdvfaktura: string;
  fakturabroj: string;
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
type evNOVOKLIJENTPLACANJE = {
  type: 'NOVOKLIJENTPLACANJE';
  data: {
    datum: string;
    iznos: string;
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
    datum: string;
    iznos: string;
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
  | evNOVOKLIJENTPLACANJE
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
    ucitaklijentplacanje: {};
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
    trenutniklijentplacanje: 1,
  },
  // BIKA FOKUS END <<<<<<
  states: {
    // DEFAULT MILAN STATE
    ssr: {
      on: {
        BROWSER: [
          {
            target: 'vidilistuklijentfirma',
          },
        ],
      },
    },
    ucitajklijentfirma: {},
    vidilistuklijentfirma: {
      on: {
        KLIJENTFAKTURA: [
          {
            actions: [
              assign((cx, ev: evKLIJENTFAKTURA) => {
                cx.trenutniklijentfirma = ev.data.id;
              }),
            ],
            target: 'vidilistaklijentfaktura',
          },
        ],
        KLIJENTPLACANJE: [
          {
            actions: [
              assign((cx, ev: evKLIJENTPLACANJE) => {
                cx.trenutniklijentfirma = ev.data.id;
              }),
            ],
            target: 'vidilistuklijentplacanje',
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
    dodajnovaklijentfirma: {},
    ucitajklijentfaktura: {},
    vidilistaklijentfaktura: {
      on: {
        STAVKEFAKTURE: [
          {
            actions: [
              assign((cx, ev: evSTAVKEFAKTURE) => {
                cx.trenutniklijentfaktura = ev.data.id;
              }),
            ],
            target: 'vidilistustavkefakture',
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
    dodajnovaklijentfaktura: {},
    ucitajstavkefaktura: {},
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
    dodajnovastavkafakture: {},
    ucitaklijentplacanje: {},
    vidilistuklijentplacanje: {},
    dodajnovoklijentplacanje: {},
  },
});
