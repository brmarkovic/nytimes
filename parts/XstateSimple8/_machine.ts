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
  imeklijenta: string;
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
}

// Ievents
type evNOVIKLIJENT = {
  type: 'NOVIKLIJENT';
  data: {
    // id: number; // ovo je automatski u hasuri
    imeklijenta: string;
  };
};
type evNOVILOGKLIJENTA = {
  type: 'NOVILOGKLIJENTA';
  data: {
    logtekst: string;
    id_klijenta: number;
  };
};
type evLOGKLIJENTA = {
  type: 'LOGKLIJENTA';
  data: {
    id: number;
  };
};
export type Ievents =
  // eventovi sa data kljucem
  | evNOVIKLIJENT
  | evNOVILOGKLIJENTA
  | evLOGKLIJENTA
  // eventovi bez data kljuca, samo type
  | { type: 'BROWSER' }
  | { type: 'ABORT' }
  | { type: 'IDLE' };
const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

// state UVEK mora da ima GLAGOL kao prvu rec "vidi,ucitaj,dodaj..."
interface Istates {
  states: {
    ssr: {};
    // KLIJENT
    ucitajklijente: {}; // sa servera da povuce listu klijenata (invoke)
    vidilistuklijenata: {}; // lista klijanta
    dodajnovogklijenta: {}; // snima novog klijenta u bazu (invoke)
    // LOGOVI KLIJENTA
    ucitajlogoveklijenta: {}; // sa servera vuce listu lgoova (invoke)
    vidilistulogovaklijenta: {};
    dodajlogklijenta: {}; // snima novi log u bazu (invoke)
  };
}

export const XstateSimple8Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple8Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    noviklijent: '',
    novikomentar: '',
    listaklijenata: [
      { id: 1, klijent: 'Biljana' },
      { id: 2, klijent: 'Ivana' },
      { id: 3, klijent: 'Peca' },
    ],
    listalogovaklijenta: [
      { id: 1, id_klijent: 1, komentar: 'zaposlen' },
      { id: 2, id_klijent: 2, komentar: 'bolovanje' },
      { id: 3, id_klijent: 1, komentar: 'kratka kosa' },
      { id: 4, id_klijent: 3, komentar: 'auto' },
    ],
  },
  // BIKA FOKUS END <<<<<<
  states: {
    // DEFAULT MILAN STATE
    ssr: {
      on: {
        BROWSER: [
          {
            target: 'listaklijenata',
          },
        ],
      },
    },
    listaklijenata: {
      on: {
        LOGKLIJENTA: {},
        NOVIKLIJENT: {},
      },
    },
    listalogovaklijenta: {
      on: {
        NOVIKOMENTAR: {},
        VIDILISTUKLIJENATA: [
          {
            target: 'listaklijenata',
          },
        ],
      },
    },
  },
});
