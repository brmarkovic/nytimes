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

type Ivest = {
  id: number;
  naslov: string;
  slika: string;
  prica: string;
};
// Icontext
export interface Icontext {
  noviclan: string;
  novakomedija: string;
  novavest: string;
  trenutniclan: number;
  trenutnakomedija: number;
  listaclanova: Iclan[];
  listakomedija: Ikomedija[];
  listaiznajmljivanja: Iiznajmljivanje[];
  listavesti: Ivest[];
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

type evNOVAVEST = {
  type: 'NOVAVEST';
  data: {
    naslov: string;
    slika: string;
    prica: string;
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

type evDODAJNOVAVEST = {
  type: 'DODAJNOVAVEST';
  data: {
    naslov: string;
    slika: string;
    prica: string;
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
  | evNOVAVEST
  | evDODAJNOVAKOMEDIJA
  | evDODAJNOVAVEST
  | evDODAJNOVICLAN
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
    // clan
    // ucitajclanove: {};
    // vidilistuclanova: {};
    // dodajnoviclan: {};
    // komedija
    // ucitajkomedije: {};
    // vidilistukomedija: {};
    // dodajnovakomedija: {};
    // vesti
    // ucitajvesti: {};
    // vidilistuvesti: {};
    // dodajnovuvest: {};
    // iznajmljivanje
    // ucitajiznajmljivanje: {};
    // ucitajiznajmljivanjeclan: {};
    // ucitajiznajmljivanjekomedija: {};
    // ucitajiznajmljivanjeiznajmljeno: {};
    // vidilistuiznajmljivanja: {};
    // dodajiznajmljivanje: {};
  };
}

export const XstateSimple11Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple11Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    noviclan: '',
    novakomedija: '',
    novavest: '',
    trenutniclan: 0,
    trenutnakomedija: 0,
    listaclanova: [],
    listakomedija: [],
    listaiznajmljivanja: [],
    listavesti: [],
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
  },
});
