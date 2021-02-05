/* eslint-disable no-unreachable */
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
  naslov: string;
  prica: string;
  slika: string;
  novinaslov: string;
  novaslika: string;
  novaprica: string;
  trenutniclan: number;
  trenutnakomedija: number;
  greska: string;
  listaclanova: Iclan[];
  listakomedija: Ikomedija[];
  listaiznajmljivanja: Iiznajmljivanje[];
  listavesti: Ivest[];
  showMainMenu: boolean;
  mainMenu: {
    title: string;
    type: any;
  }[];
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

type evNOVAVESTNASLOV = {
  type: 'NOVAVESTNASLOV';
  data: {
    naslov: string;
  };
};
type evNOVAVESTSLIKA = {
  type: 'NOVAVESTSLIKA';
  data: {
    slika: string;
  };
};
type evNOVAVESTPRICA = {
  type: 'NOVAVESTPRICA';
  data: {
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

type evSHOWMAINMENU = {
  type: 'SHOWMAINMENU';
};

export type Ievents =
  | evNOVICLAN
  | evNOVAKOMEDIJA
  | evNOVAVESTNASLOV
  | evNOVAVESTPRICA
  | evNOVAVESTSLIKA
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
  | { type: 'VIDIVESTI' }
  | evSHOWMAINMENU
  | { type: 'BROWSER' };

const send = (sendEvent: Ievents, sendOptions?: any) => untypedSend(sendEvent, sendOptions);

interface Istates {
  states: {
    ssr: {};
    videoklub: {};
    // clan
    ucitajclanove: {};
    vidilistuclanova: {};
    dodajnoviclan: {};
    // komedija
    ucitajkomedije: {};
    vidilistukomedija: {};
    dodajnovakomedija: {};
    // vesti
    ucitajvesti: {};
    vidilistuvesti: {};
    dodajnovuvest: {};
    // iznajmljivanje
    ucitajiznajmljivanje: {};
    ucitajiznajmljivanjeclan: {};
    ucitajiznajmljivanjekomedija: {};
    ucitajiznajmljivanjeiznajmljeno: {};
    vidilistuiznajmljivanja: {};
    dodajiznajmljivanje: {};
  };
}

export const XstateSimple11Machine = Machine<Icontext, Istates, Ievents>({
  id: 'XstateSimple11Machine',
  initial: 'ssr',
  // BIKA FOKUS >>>>>>>>>>
  context: {
    showMainMenu: false,
    mainMenu: [
      {
        title: 'Clanovi kluba',
        type: 'VIDICLAN',
      },
      {
        title: 'Izbor filmova',
        type: 'VIDIKOMEDIJA',
      },
      {
        title: 'Iznajmi film',
        type: 'ZAPOCNIIZNAJMI',
      },
      {
        title: 'Novosti u svetu filma',
        type: 'VIDIVESTI',
      },
    ],
    noviclan: '',
    novakomedija: '',
    novavest: '',
    naslov: '',
    prica: '',
    slika: '',
    novinaslov: '',
    novaslika: '',
    novaprica: '',
    greska: '',
    trenutniclan: 0,
    trenutnakomedija: 0,
    listaclanova: [
      { id: 1, imeclan: 'BILJANA MARKOVIC' },
      { id: 2, imeclan: 'PETAR PETROVIC' },
    ],
    listakomedija: [
      { id: 1, imekomedija: 'PETAK 13' },
      { id: 2, imekomedija: 'PUTOVANJE' },
    ],
    listaiznajmljivanja: [
      { id: 1, id_clan: 1, id_komedija: 2 },
      { id: 2, id_clan: 2, id_komedija: 1 },
    ],
    listavesti: [
      { id: 1, naslov: 'KUSTENDORF', slika: 'http:url...', prica: 'ZAVRSEN KUSTENDORF' },
      { id: 2, naslov: 'NAJBOLJI GLUMAC', slika: 'http:URL', prica: 'NAJBOLJI GLUMAC U 2020 ' },
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
    videoklub: {
      on: {},
    },
    ucitajclanove: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              query: gql`
                query clanovikluba {
                  clanovikluba {
                    id
                    imeclan
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
              cx.listaclanova = ev.data.data.clanovikluba;
            }),
          ],
          target: 'vidilistuclanova',
        },
        onError: {
          target: 'vidilistuclanova',
        },
      },
    },
    vidilistuclanova: {
      on: {
        NOVICLAN: {
          actions: [
            assign((cx, ev: evNOVICLAN) => {
              cx.noviclan = ev?.data.imeclan || '';
            }),
          ],
        },
        DODAJNOVICLAN: [
          {
            cond: (cx) => {
              if (cx?.noviclan === null) {
                return true;
              }
              return false;
            },
            target: 'vidilistuclanova',
          },
          {
            target: 'dodajnoviclan',
          },
        ],
        HOME: {
          target: 'videoklub',
        },
      },
    },
    dodajnoviclan: {
      invoke: {
        src: async (_cx, ev: evDODAJNOVICLAN) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                imeclan: ev.data.imeclan,
              },
              mutation: gql`
                mutation insertclanovikluba($imeclan: String) {
                  insert_clanovikluba(objects: { imeclan: $imeclan }) {
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
              cx.noviclan = null;
            }),
          ],
          target: 'ucitajclanove',
        },
        onError: {
          target: 'ucitajclanove',
        },
      },
    },
    ucitajkomedije: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              query: gql`
                query listakomedija {
                  listakomedija {
                    id
                    imekomedija
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
              cx.listakomedija = ev.data.data.listakomedija;
            }),
          ],
          target: 'vidilistukomedija',
        },
        onError: {
          target: 'vidilistukomedija',
        },
      },
    },
    vidilistukomedija: {
      on: {
        NOVAKOMEDIJA: [
          {
            actions: [
              assign((cx, ev: evNOVAKOMEDIJA) => {
                cx.novakomedija = ev?.data.imekomedija || '';
              }),
            ],
          },
        ],
        DODAJNOVAKOMEDIJA: [
          {
            cond: (cx) => {
              if (cx?.novakomedija === null) {
                return true;
              }
              return false;
            },
            target: 'vidilistukomedija',
          },
          {
            target: 'dodajnovakomedija',
          },
        ],

        HOME: {
          target: 'videoklub',
        },
      },
    },
    dodajnovakomedija: {
      invoke: {
        src: async (_cx, ev: evDODAJNOVAKOMEDIJA) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                imekomedija: ev.data.imekomedija,
              },
              mutation: gql`
                mutation insertlistakomedija($imekomedija: String) {
                  insert_listakomedija(objects: { imekomedija: $imekomedija }) {
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
              cx.novakomedija = null;
            }),
          ],
          target: 'ucitajkomedije',
        },
        onError: {
          target: 'ucitajkomedije',
        },
      },
    },
    ucitajvesti: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query klubvesti {
                  klubvesti(order_by: { id: desc }) {
                    id
                    naslov
                    prica
                    slika
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
              cx.listavesti = ev.data.data.klubvesti;
            }),
          ],
          target: 'vidilistuvesti',
        },
        onError: {
          target: 'vidilistuvesti',
        },
      },
    },
    vidilistuvesti: {
      on: {
        NOVAVESTNASLOV: [
          {
            actions: [
              assign((cx, ev: evNOVAVESTNASLOV) => {
                cx.novinaslov = ev?.data.naslov || '';
              }),
            ],
          },
        ],
        NOVAVESTSLIKA: [
          {
            actions: [
              assign((cx, ev: evNOVAVESTSLIKA) => {
                cx.novaslika = ev?.data.slika || '';
              }),
            ],
          },
        ],
        NOVAVESTPRICA: [
          {
            actions: [
              assign((cx, ev: evNOVAVESTPRICA) => {
                cx.novaprica = ev?.data.prica || '';
              }),
            ],
          },
        ],
        DODAJNOVAVEST: [
          {
            cond: (cx) => {
              if ((cx?.novinaslov === null, cx?.novaslika === null, cx?.novaprica === null)) {
                return true;
              }
              return false;
            },
            target: 'vidilistuvesti',
          },
          {
            target: 'dodajnovuvest',
          },
        ],
        HOME: {
          target: 'videoklub',
        },
      },
    },
    dodajnovuvest: {
      invoke: {
        src: async (cx, ev: evDODAJNOVAVEST) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                naslov: ev.data.naslov,
                slika: ev.data.slika,
                prica: ev.data.prica,
              },
              mutation: gql`
                mutation insertklubvesti($naslov: String, $slika: String, $prica: String) {
                  insert_klubvesti(objects: { naslov: $naslov, prica: $prica, slika: $slika }) {
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
              cx.novinaslov = null;
              cx.novaslika = null;
              cx.novaprica = null;
            }),
          ],
          target: 'ucitajvesti',
        },
        onError: {
          target: 'videoklub',
        },
      },
    },
    ucitajiznajmljivanje: {
      after: {
        1: 'ucitajiznajmljivanjeclan',
      },
    },
    ucitajiznajmljivanjeclan: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query clanovikluba {
                  clanovikluba {
                    id
                    imeclan
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
              // console.log({ ev });
              cx.listaclanova = ev.data.data.clanovikluba;
            }),
          ],
          target: 'ucitajiznajmljivanjekomedija',
        },
        onError: {
          actions: [
            assign((cx, ev) => {
              cx.greska = 'Server nije ucitao clanove!';
            }),
          ],
          target: 'vidilistuiznajmljivanja',
        },
      },
    },
    ucitajiznajmljivanjekomedija: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query listakomedija {
                  listakomedija {
                    id
                    imekomedija
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
              // console.log({ ev });
              cx.listakomedija = ev.data.data.listakomedija;
            }),
          ],
          target: 'ucitajiznajmljivanjeiznajmljeno',
        },
        onError: {
          actions: [
            assign((cx, ev) => {
              cx.greska = 'Server nije ucitao filmove!';
            }),
          ],
          target: 'vidilistuiznajmljivanja',
        },
      },
    },
    ucitajiznajmljivanjeiznajmljeno: {
      invoke: {
        src: async () => {
          const [ERRdata, data] = await backendServer
            .query({
              // u navodnicima je ono sto smo u Hasuri definisali i radi
              query: gql`
                query listaiznajmljivanja($id_clan: Int, $id_komedija: Int) {
                  listaiznajmljivanja(
                    where: { id_clan: { _eq: $id_clan }, id_komedija: { _eq: $id_komedija } }
                    order_by: { id: desc }
                    limit: 100
                  ) {
                    id
                    id_clan
                    id_komedija
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
              cx.listaiznajmljivanja = ev.data.data.listaiznajmljivanja;
            }),
          ],
          target: 'vidilistuiznajmljivanja',
        },
        onError: {
          actions: [
            assign((cx, ev) => {
              cx.greska = 'Server nije ucitao iznajmljivanje!';
            }),
          ],
          target: 'vidilistuiznajmljivanja',
        },
      },
    },
    vidilistuiznajmljivanja: {
      on: {
        IZABERICLAN: [
          {
            actions: [
              assign((cx, ev: evIZABERICLAN) => {
                cx.trenutniclan = ev?.data.id;
              }),
            ],
          },
        ],
        IZABERIKOMEDIJA: [
          {
            actions: [
              assign((cx, ev: evIZABERIKOMEDIJA) => {
                cx.trenutnakomedija = ev?.data.id;
              }),
            ],
          },
        ],
        IZNAJMI: {
          target: 'dodajiznajmljivanje',
        },
        HOME: {
          target: 'videoklub',
        },
      },
    },
    dodajiznajmljivanje: {
      invoke: {
        src: async (cx, ev: evIZNAJMI) => {
          const [ERRdata, data] = await backendServer
            .mutate({
              variables: {
                id_clan: ev.data.id_clan,
                id_komedija: ev.data.id_komedija,
              },
              mutation: gql`
                mutation listaiznajmljivanja($id_clan: Int, $id_komedija: Int) {
                  insert_listaiznajmljivanja(objects: { id_clan: $id_clan, id_komedija: $id_komedija }) {
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
            assign((cx, ev) => {
              cx.greska = '';
              cx.trenutnakomedija = 0;
              cx.trenutniclan = 0;
            }),
          ],
          target: 'ucitajiznajmljivanje',
        },
        onError: {
          actions: [
            assign((cx, ev) => {
              cx.greska = 'Iznajmljivanje nije uspelo! Kliknite ponovo!';
            }),
          ],
          target: 'ucitajiznajmljivanje',
        },
      },
    },
  },
  // on kljuc ovde znaci da sve sto se u njemu nalazi treba da se izvuce u posebnu masinu
  // root se ne koristi ako je moguce nikada!!!
  // REDUX ovako radi!!!
  on: {
    // samo glavni meni, uvek i svuda mora da radi
    SHOWMAINMENU: {
      actions: [
        assign((cx) => {
          cx.showMainMenu = !cx.showMainMenu;
        }),
      ],
    },
    VIDICLAN: {
      target: 'ucitajclanove',
    },
    VIDIKOMEDIJA: {
      target: 'ucitajkomedije',
    },
    ZAPOCNIIZNAJMI: {
      target: 'ucitajiznajmljivanje',
    },
    VIDIVESTI: {
      target: 'ucitajvesti',
    },
  },
});
