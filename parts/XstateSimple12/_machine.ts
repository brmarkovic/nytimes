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
  pibfirma: number;
};
type Iklijentfaktura = {
  id: number;
  fakturabroja: number;
  id_klijentfirma: number;
};
type Istavkefakture = {
  id: number;
  iznosfaktura: number;
  pdvfaktura: number;
  id_faktura: number;
};
type Iklijentplacanje = {
  id: number;
  datumplacanja: number;
  iznosplacanja: number;
  id_klijentfirma: number;
};
// Icontext
export interface Icontext {
  show: boolean;
  listaklijentfirma: Iklijentfirma[];
  noviklijentfirma: string;
  listaklijentfaktura: Iklijentfaktura[];
  novaklijentfaktura: string;
  listaklijentplacanje: Iklijentplacanje[];
  novoklijentplacanje: string;
  novastavkafakture: string;
  listastavkefakture: Istavkefakture[];
  trenutniklijentfirma: number;
  trenutniklijentfaktura: number;
  trenutniklijentplacanje: number;
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

type evNOVIKLIJENTFIRMA = {
  type: 'NOVIKLIJENTFIRMA';
  data: {
    imefirma: string;
    pibfirma: number;
  };
};
type evNOVAKLIJENTFAKTURA = {
  type: 'NOVAKLIJENTFAKTURA';
  data: {
    fakturabroj: number;
    id_klijentfirma: number;
  };
};
type evNOVOKLIJENTPLACANJE = {
  type: 'NOVOKLIJENTPLACANJE';
  data: {
    datum: number;
    iznos: number;
    id_klijentfirma: number;
  };
};
type evNOVASTAVKAFAKTURE = {
  type: 'NOVASTAVKAFAKTURE';
  data: {
    iznosfaktura: number;
    pdvfaktura: number;
    id_faktura: number;
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
    pibfirma: number;
  };
};

type evDODAJNOVAKLIJENTFAKTURA = {
  type: 'DODAJNOVAKLIJENTFAKTURA';
  data: {
    fakturabroj: number;
    id_klijentfirma: number;
  };
};
type evDODAJNOVOKLIJENTPLACANJE = {
  type: 'DODAJNOVOKLIJENTPLACANJE';
  data: {
    datum: number;
    iznos: number;
    id_klijentfirma: number;
  };
};
type evDODAJNOVASTAVKAFAKTURE = {
  type: 'DODAJNOVASTAVKAFAKTURE';
  data: {
    iznosfaktura: number;
    pdvfaktura: number;
    id_faktura: number;
  };
};
export type Ievents =
  | evINPUT
  | evSHOW
  | evNOVIKLIJENTFIRMA
  | evDODAJNOVIKLIJENTFIRMA
  | evNOVAKLIJENTFAKTURA
  | evDODAJNOVAKLIJENTFAKTURA
  | evKLIJENTFAKTURA
  | evKLIJENTPLACANJE
  | evNOVOKLIJENTPLACANJE
  | evDODAJNOVOKLIJENTPLACANJE
  | evSTAVKEFAKTURE
  | evNOVASTAVKAFAKTURE
  | evDODAJNOVASTAVKAFAKTURE
  | { type: 'BROWSER' };

const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    pregledfirma: {};
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
    show: false,
    noviklijentfirma: '',
    listaklijentfirma: [],
    novaklijentfaktura: '',
    listaklijentfaktura: [],
    novoklijentplacanje: '',
    listaklijentplacanje: [],
    novastavkafakture: '',
    listastavkefakture: [],
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
            target: 'pregledfirma',
          },
        ],
      },
    },
    pregledfirma: {
      on: {},
    },
    ucitajklijentfirma: {},
    vidilistuklijentfirma: {},
    dodajnovaklijentfirma: {},
    ucitajklijentfaktura: {},
    vidilistaklijentfaktura: {},
    dodajnovaklijentfaktura: {},
    ucitajstavkefaktura: {},
    vidilistustavkefakture: {},
    dodajnovastavkafakture: {},
    ucitaklijentplacanje: {},
    vidilistuklijentplacanje: {},
    dodajnovoklijentplacanje: {},
  },
});
