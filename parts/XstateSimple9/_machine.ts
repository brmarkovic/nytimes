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

export type Ievents = evNOVICLAN | evNOVAKOMEDIJA | evDODAJNOVICLAN | evDODAJNOVAKOMEDIJA | { type: 'BROWSER' };

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
  };
}

export const XstateSimple9Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple9Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    noviclan: '',
    novakomedija: '',
    listaclanova: [
      { id: 1, imeclan: 'Biljana Markovic' },
      { id: 2, imeclan: 'Ivana Savic' },
    ],
    listakomedija: [
      { id: 1, imekomedija: 'Alfi' },
      { id: 2, imekomedija: 'Rastanak' },
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
    videoklub: {},
    ucitajclanove: {},
    vidilistuclanova: {},
    dodajnoviclan: {},
    ucitajkomedije: {},
    vidilistukomedije: {},
    dodajnovukomediju: {},
  },
});
