/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { Machine } from 'xstate';
import { send as untypedSend } from 'xstate/lib/actions';
import { assign } from '@xstate/immer';
import axios from 'axios';

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
  naziv: string;
  lokacija: {
    longituda?:number;
    latituda?:number;
  };
  prognoza: {
    pritisak?:number;
    temperatura?:number;
  };
  zagadjenje:{
    pm2?:number;
  };
}

// Ievents

type evINPUT = {
  type: 'INPUT';
  data: string;
};

type evVIDILOKACIJA = {
  type: 'VIDILOKACIJA';
  data: {
    naziv: string;
  };
};
export type Ievents = evINPUT | evVIDILOKACIJA | { type: 'BROWSER' };

const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    vidiuslove: {};
    ucitajlokacija: {};
    ucitajprognoza: {};
    ucitajzagadjenje: {};
  };
}

export const XstateSimple13Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple13Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    naziv: '',
    lokacija: {},
    prognoza: {},
    zagadjenje: {},
  },
  // BIKA FOKUS END <<<<<<
  states: {
    // DEFAULT MILAN STATE
    ssr: {
      on: {
        BROWSER: {
          target: 'vidiuslove',
        },
      },
    },
    vidiuslove: {
      on: {
        INPUT: [
          {
            actions: [
              assign((cx, ev: evINPUT) => {
                cx.naziv = ev?.data || '';
              }),
            ],
          },
        ],
        VIDILOKACIJA: [
          {
            cond: (cx) => {
              if (cx?.naziv === '') {
                return true;
              }
              return false;
            },
            // target: 'vidiuslove',
          },
          {
            target: 'ucitajlokacija',
          },
        ],
      },
    },
    ucitajlokacija: {
      invoke: {
        src: async (cx, ev) => {
          const [ERRserverData, serverData] = await axios({
            method: 'get',
            url: `http://api.positionstack.com/v1/forward?access_key=be0165e75645e06764fe1cd76bae3b3c&query=${cx.naziv}`,
          })
            .then((r) => [null, r])
            .catch((e) => [e]);
          if ((serverData && serverData.errors) || ERRserverData) {
            throw new Error('error');
          }
          return serverData;
        },
        onDone: {
          actions: [
            assign((cx, ev) => {
              // jedini isparavn nacin da se formira context sa velikog json sa servera
              // most izmdju contexta i backenda
              cx.lokacija = {
                latituda:ev?.data?.data?.data?.[0]?.latitude,
                longituda:ev?.data?.data?.data?.[0]?.longitude
              };
            }),
          ],
          target: 'ucitajprognoza',
        },
        onError: {
          target: 'vidiuslove',
        },
      },
    },
    ucitajprognoza: {
      invoke: {
        src: async (cx, ev) => {
          const [ERRserverData, serverData] = await axios({
            method: 'get',
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${cx.lokacija.latituda}&lon=${cx.lokacija.longituda}&appid=c9c1cec712999f6b8f02e41994e3ce7d`,
          })
            .then((r) => [null, r])
            .catch((e) => [e]);
          if ((serverData && serverData.errors) || ERRserverData) {
            throw new Error('error');
          }
          return serverData;
        },
        onDone: {
          actions: [
            assign((cx, ev) => {
              // console.log({ ev })
              cx.prognoza = {
                pritisak:ev?.data?.data?.current?.pressure,
                temperatura: ev?.data?.data?.current?.temp
               
              }
            }),
          ],
          target: 'ucitajzagadjenje',
        },
        onError: {
          target: 'vidiuslove',
        },
      },
    },
    ucitajzagadjenje: {
     invoke: {
      src: async (cx, ev) => {
        const [ERRserverData, serverData] = await axios({
          method: 'get',
          url: `http://api.openweathermap.org/data/2.5/air_pollution?lat=${cx.lokacija.latituda}&lon=${cx.lokacija.longituda}&appid=c9c1cec712999f6b8f02e41994e3ce7d`,
        })
          .then((r) => [null, r])
          .catch((e) => [e]);
        if ((serverData && serverData.errors) || ERRserverData) {
          throw new Error('error');
        }
        return serverData;
      },
      onDone: {
        actions: [
          assign((cx, ev) => {
            cx.zagadjenje = {
              pm2: ev?.data?.data?.list?.[0]?.components?.pm2_5
            }
          }),
        ],
        target: 'vidiuslove',
      },
      onError: {
        target: 'vidiuslove',
      },
    },
    },
  },
});
