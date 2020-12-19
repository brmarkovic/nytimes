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

// Icontext
export interface Icontext {
  show: boolean;
  imeprezime: string;
  mail: string;
  telefon: string;
  prijave: {
    id: number;
    imeprezime: string;
    mail: string;
    telefon: string;
  }[];
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

type evDELETE = {
  type: 'DELETE';
  data: {
    id: number;
  };
};

type evSUBMIT = {
  type: 'SUBMIT';
  data: {
    imeprezime: string;
    telefon: string;
    mail: string;
  };
};

type evIZMENIIME = {
  type: 'IZMENIIME';
  data: {
    id: number;
    value: string;
  };
};

type evIZMENIMAIL = {
  type: 'IZMENIMAIL';
  data: {
    id: number;
    value: string;
  };
};

type evIZMENITELEFON = {
  type: 'IZMENITELEFON';
  data: {
    id: number;
    value: string;
  };
};

export type Ievents =
  | evINPUT
  | evSHOW
  | evDELETE
  | evSUBMIT
  | evIZMENIIME
  | evIZMENIMAIL
  | evIZMENITELEFON
  | { type: 'idle' }
  | { type: 'YES' }
  | { type: 'NO' }
  | { type: 'ABORT' }
  | { type: 'UPITNIK' }
  | { type: 'POTVRDI' }
  | { type: 'BACK' };

const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    idle: {};
    pitanje: {};
    imeprezime: {};
    mail: {};
    telefon: {};
    potvrda: {};
    zahvalnica: {};
    snimiubazu: {};
    maillistread: {};
    deletesinglbaza: {};
  };
}

export const XstateSimple5Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple5Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    show: false,
    imeprezime: '',
    mail: '',
    telefon: '',
    prijave: [],
  },
  // BIKA FOKUS END <<<<<<
  states: {
    // DEFAULT MILAN STATE
    ssr: {
      on: {
        idle: [
          {
            target: 'maillistread',
          },
        ],
      },
    },
    maillistread: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query maillista {
                  maillista {
                    id
                    imeprezime
                    mail
                    telefon
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
              cx.prijave = ev.data.data.maillista;
            }),
          ],
          target: 'idle',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'idle',
        },
      },
    },
    idle: {
      on: {
        SHOW: [
          {
            actions: [
              assign((cx, ev: evSHOW) => {
                cx.show = ev.data;
              }),
              // send ne moze ovde jer je unutar "on"
            ],
            // target: 'dkdk' // unutar "on" se koristi "target", a van "send"
          },
        ],
        UPITNIK: [
          {
            target: 'pitanje',
          },
        ],
        DELETE: [
          {
            target: 'deletesinglbaza',
          },
        ],
        IZMENIIME: [
          {
            actions: [
              assign((cx, ev: evIZMENIIME) => {
                cx.prijave = cx.prijave.map((r) => {
                  if (r.id === ev.data.id) {
                    return {
                      ...r,
                      imeprezime: ev.data.value,
                    };
                  }
                  return r;
                });
              }),
            ],
          },
        ],
        IZMENIMAIL: [
          {
            actions: [
              assign((cx, ev: evIZMENIMAIL) => {
                cx.prijave = cx.prijave.map((r) => {
                  if (r.id === ev.data.id) {
                    return {
                      ...r,
                      mail: ev.data.value,
                    };
                  }
                  return r;
                });
              }),
            ],
          },
        ],
        IZMENITELEFON: [
          {
            actions: [
              assign((cx, ev: evIZMENITELEFON) => {
                cx.prijave = cx.prijave.map((r) => {
                  if (r.id === ev.data.id) {
                    return {
                      ...r,
                      telefon: ev.data.value,
                    };
                  }
                  return r;
                });
              }),
            ],
          },
        ],
      },
    },
    pitanje: {
      on: {
        YES: [
          {
            target: 'imeprezime',
          },
        ],
        NO: [
          {
            target: 'idle',
          },
        ],
      },
    },
    imeprezime: {
      on: {
        INPUT: [
          {
            actions: [
              assign((cx, ev: evINPUT) => {
                cx.imeprezime = ev?.data || '';
              }),
            ],
          },
        ],
        POTVRDI: [
          {
            cond: (cx) => cx?.imeprezime?.length === 0 || false,
            target: 'imeprezime',
          },
          {
            target: 'mail',
          },
        ],
        ABORT: [
          {
            actions: [
              assign((cx) => {
                cx.imeprezime = '';
              }),
            ],
            target: 'idle',
          },
        ],
      },
    },
    mail: {
      on: {
        INPUT: [
          {
            actions: [
              assign((cx, ev: evINPUT) => {
                cx.mail = ev?.data || '';
              }),
            ],
          },
        ],
        POTVRDI: [
          {
            cond: (cx) => cx?.mail === null || false,
            target: 'mail',
          },
          {
            target: 'telefon',
          },
        ],
        ABORT: [
          {
            actions: [
              assign((cx) => {
                cx.mail = null;
              }),
            ],
            target: 'idle',
          },
        ],
      },
    },
    telefon: {
      on: {
        INPUT: [
          // default
          {
            actions: [
              assign((cx, ev: evINPUT) => {
                cx.telefon = ev?.data || '';
              }),
            ],
          },
        ],
        POTVRDI: [
          // cond1
          {
            cond: (cx) => cx?.telefon?.length === 0 || false,
            target: 'telefon',
          },
          // default
          {
            target: 'potvrda',
          },
        ],
        ABORT: [
          {
            actions: [
              assign((cx) => {
                cx.telefon = '';
              }),
            ],
            target: 'idle',
          },
        ],
      },
    },
    potvrda: {
      on: {
        SUBMIT: [
          {
            target: 'snimiubazu',
          },
        ],
        BACK: [
          {
            target: 'imeprezime',
          },
        ],
      },
    },
    snimiubazu: {
      invoke: {
        src: async (cx, ev: evSUBMIT) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                imeprezime: ev.data.imeprezime,
                mail: ev.data.mail,
                telefon: ev.data.telefon,
              },
              mutation: gql`
                mutation insertmaillista($imeprezime: String, $mail: String, $telefon: String) {
                  insert_maillista(objects: { imeprezime: $imeprezime, mail: $mail, telefon: $telefon }) {
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
              cx.imeprezime = null;
              cx.mail = null;
              cx.telefon = null;
            }),
          ],
          target: 'zahvalnica',
        },
        onError: {
          // kada server napravi gresku
          // internet ne radi, ne vidi server
          target: 'potvrda',
        },
      },
    },
    deletesinglbaza: {
      invoke: {
        src: async (cx, ev: evDELETE) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                id: ev.data.id,
              },
              mutation: gql`
                mutation deletemaillista($id: Int) {
                  delete_maillista(where: { id: { _eq: $id } }) {
                    affected_rows
                  }
                }
              `,
            })
            .then((r) => [null, r])
            .catch((e) => [e]);
          if (data?.errors || ERRdata) {
            throw new Error('error');
          }
          return data;
        },
        onDone: [
          {
            cond: (cx, ev: any) => ev?.data?.data?.delete_maillista?.affected_rows === 1 || false,
            target: 'maillistread',
          },
          {
            target: 'idle',
          },
        ],
        onError: [
          {
            // kada server napravi gresku
            // internet ne radi, ne vidi server
            target: 'idle',
          },
        ],
      },
    },
    zahvalnica: {
      after: {
        1000: [
          {
            target: 'maillistread',
          },
        ],
      },
    },
  },
});
