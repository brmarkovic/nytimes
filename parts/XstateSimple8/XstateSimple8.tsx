/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple8Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

// redux hronologija dogadjaja
// 1. okine se event (isto kao xstate) >>>>>>>>  (korisnik okida event - redux, invoke okida event - redux saga)
// 2. hvata se event (isto kao xstate)  --------  EXTREMNO STANDARDIZOVAN!!
// 3. menja se context (isto kao xstate) <<<<<<<

// redux
// redux = hvata event i menja context (evengt okida korisnik ili saga)
// redux saga = invoke ide na server i kada zavrsi okida event, onda ga redux hvata
// !!!!! states = ne postoji reduxu ==== gomila if-ova svuda (kao u xstateu)

export function XstateSimple8() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple8Machine, {
    show: false,
  });
  const [{ context: cx, matches: ma }, send] = machine || [{}];
  useXstateDebugger({ machine, name: '__' });

  useEffect(() => {
    // boot machine
    send({ type: 'BROWSER' });
  }, []);

  // REACT (HTML+) KOMPONENTA
  return (
    <div className="p-2">
      {/* <div style={{ position: 'relative' }}>
        <div>
          <div style={{ position: 'absolute', left: 50, bottom: 10 }}>
            ponasa se kao fixed, tj. cela strana mu je igraliste ili prvi relative
          </div>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 50, bottom: 10 }}>
          ponasa se kao absolute, samo parent prostor mu je igraliste
        </div>
      </div> */}

      <div className="font-extrabold bg-gray-600">Pogledaj listu klijenata njihove logove,transakcije i zahteve</div>

      <div>
        <div className="flex flex-col">
          {['vidilistuklijenata'].some(ma) && (
            <div className="flex flex-col">
              {cx.listaklijenata.map((r) => {
                return (
                  <div>
                    Lista klijenata
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'LOGKLIJENTA',
                          data: {
                            id: r.id,
                          },
                        });
                      }}
                    >
                      Vidi logove klijenta
                    </button>
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'TRANSAKCIJAKLIJENTA',
                          data: {
                            id: r.id, // IZMENITI HRADCODOVANU VREDNOST/izmenila
                          },
                        });
                      }}
                    >
                      Vidi transakcije klijenta
                    </button>
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'ZAHTEVKLIJENTA',
                          data: {
                            id: r.id, // IZMENITI HRADCODOVANU VREDNOST/
                          },
                        });
                      }}
                    >
                      Vidi zahteve klijenta
                    </button>
                    {r.klijent}{' '}
                  </div>
                );
              })}
              <div className="flex flex-col ">
                <div className="text-lg font-bold">Unesite novog klijenta</div>
                <div>
                  <textarea
                    value={cx?.noviklijent}
                    onChange={(ev) => {
                      send({
                        type: 'NOVIKLIJENT',
                        data: {
                          klijent: ev.target.value,
                        },
                      });
                    }}
                    className="border border-gray-500"
                  />
                  <div className="flex flex-col">
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'DODAJNOVIKLIJENT',
                          data: {
                            klijent: cx.noviklijent,
                          },
                        });
                      }}
                    >
                      Dodaj klijenta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col">
            {['vidilistulogovaklijenta'].some(ma) && (
              <div className="flex flex-col">
                {cx?.listalogovaklijenta
                  ?.filter((r) => cx.trenutniklijent === r.id_klijent)
                  .map((r) => {
                    return <div> Lista logova klijenta {r.logtekst} </div>;
                  })}
                <div className="flex flex-col ">
                  <div>Unesite novog log za klijenta</div>
                  <div>
                    <textarea
                      value={cx?.novilogklijenta}
                      onChange={(ev) => {
                        send({
                          type: 'NOVILOGKLIJENTA',
                          data: {
                            logtekst: ev.target.value,
                          },
                        });
                      }}
                      className="border border-gray-500"
                    />
                    <div className="flex flex-col">
                      <button
                        className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                        type="button"
                        onClick={() => {
                          send({
                            type: 'DODAJNOVILOGKLIJENTA',
                            data: {
                              logtekst: cx.novilogklijenta,
                              id_klijent: cx.trenutniklijent,
                            },
                          });
                        }}
                      >
                        Dodaj novi log klijenta
                      </button>
                      <button
                        className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                        type="button"
                        onClick={() => {
                          send({
                            type: 'LISTAKLIJENATA',
                            data: {
                              id_klijent: 0,
                            },
                          });
                        }}
                      >
                        Vrati se na listuklijenata
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            {['vidilistutransakcijaklijenta'].some(ma) && (
              <div className="flex flex-col">
                {cx?.listatransakcijaklijenta
                  ?.filter((r) => cx.trenutniklijent === r.id_klijent)
                  .map((r) => {
                    // dodati filter/dodala
                    return <div> Lista transakcija klijenta {r.transakcijatekst} </div>;
                  })}
                <div className="flex flex-col">
                  <div> Unesite novu transakciju za klijenta </div>
                  <div>
                    <textarea
                      value={cx?.novatransakcijaklijenta}
                      onChange={(ev) => {
                        send({
                          type: 'NOVATRANSAKCIJAKLIJENTA',
                          data: {
                            transakcijatekst: ev.target.value,
                          },
                        });
                      }}
                      className="border border-gray-500"
                    />
                    <div className="flex flex-col">
                      <button
                        className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                        type="button"
                        onClick={() => {
                          send({
                            type: 'DODAJNOVUTRANSAKCIJUKLIJENTA',
                            data: {
                              transakcijatekst: cx.novatransakcijaklijenta,
                              id_klijent: cx.trenutniklijent, // izmeniti
                            },
                          });
                        }}
                      >
                        Dodaj novu transakciju klijenta
                      </button>
                      <button
                        className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                        type="button"
                        onClick={() => {
                          send({
                            type: 'LISTAKLIJENATA',
                            data: {
                              id_klijent: 0,
                            },
                          });
                        }}
                      >
                        Vrati se na listuklijenata
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col">
              {['vidilistuzahtevaklijenta'].some(ma) && (
                <div className="flex flex-col">
                  {cx?.listazhatevaklijenta?.map((r) => {
                    return (
                      <div>
                        <button
                          className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                          type="button"
                          onClick={() => {
                            send({
                              type: 'DETALJIZAHTEVA',
                              data: {
                                id: r.id,
                              },
                            });
                          }}
                        >
                          Vidi detalje zahteva
                        </button>{' '}
                        Lista zahteva klijenta Tip klijenta: ({r.tipklijenta}) JMBG: ({r.jmbg}) MB:({r.maticnibroj})
                        Razlozi:({r.razlozi}) Olaksice: ({r.olaksice}){' '}
                      </div>
                    );
                  })}
                  <div className="flex-col flec">
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'PODNESIZAHTEV',
                        });
                      }}
                    >
                      Podnesi zahtev
                    </button>
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'LISTAKLIJENATA',
                          data: {
                            id_klijent: 0,
                          },
                        });
                      }}
                    >
                      Vrati se na listuklijenata
                    </button>
                  </div>
                </div>
              )}
              {['tipklijenta'].some(ma) && (
                <div className="flex flex-col">
                  <div> Izaberite odgovarajuci tip klijenta! </div>
                  <div className="flex flex-col">
                    <button
                      className="p-1 mx-1 bg-purple-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'SET_CLIENT', data: 'fizickolice' });
                      }}
                    >
                      Fizicko lice!
                    </button>
                    <button
                      className="p-1 mx-1 bg-yellow-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'SET_CLIENT', data: 'poljoprivrednik' });
                      }}
                    >
                      Poljoprivrednik!
                    </button>
                    <button
                      className="p-1 mx-1 bg-red-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'SET_CLIENT', data: 'preduzetnik' });
                      }}
                    >
                      Preduzetnik
                    </button>{' '}
                    <button
                      className="p-1 mx-1 bg-yellow-700 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'SET_CLIENT', data: 'pravnolice' });
                      }}
                    >
                      Pravno lice!
                    </button>{' '}
                  </div>
                </div>
              )}
              {['jmbg'].some(ma) && (
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <div> Unesite vas JMBG </div>

                    <div>
                      <textarea
                        value={cx?.jmbg}
                        onChange={(ev) => {
                          send({ type: 'INPUT', data: ev.target.value });
                        }}
                        className="border border-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      className="p-1 mx-1 bg-green-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'SUBMIT' });
                      }}
                    >
                      Potvrdi
                    </button>
                    <button
                      className="p-1 mx-1 bg-red-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'ABORT' });
                      }}
                    >
                      Odustani
                    </button>
                  </div>
                </div>
              )}
              {['maticnibroj'].some(ma) && (
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <div> Unesite vas MB firme </div>

                    <div>
                      <textarea
                        value={cx?.maticnibroj}
                        onChange={(ev) => {
                          send({ type: 'INPUT', data: ev.target.value });
                        }}
                        className="border border-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      className="p-1 mx-1 bg-green-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'SUBMIT' });
                      }}
                    >
                      Potvrdi
                    </button>
                    <button
                      className="p-1 mx-1 bg-red-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'ABORT' });
                      }}
                    >
                      Odustani
                    </button>
                  </div>
                </div>
              )}
              {['razlozi'].some(ma) && (
                <div className="flex flex-col">
                  <div> Izaberite odgovarajuci razlog podnosenja zahteva! </div>
                  <div className="flex flex-col">
                    <button
                      className="p-1 mx-1 bg-purple-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'SET_RAZLOG', data: 'razlog1' });
                      }}
                    >
                      Razlog1
                    </button>
                    <button
                      className="p-1 mx-1 bg-yellow-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'SET_RAZLOG', data: 'razlog2' });
                      }}
                    >
                      Razlog2
                    </button>
                    <button
                      className="p-1 mx-1 bg-red-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'SET_RAZLOG', data: 'razlog3' });
                      }}
                    >
                      Razlog3
                    </button>{' '}
                    <button
                      className="p-1 mx-1 bg-yellow-700 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'ABORT' });
                      }}
                    >
                      Odustani
                    </button>{' '}
                  </div>
                </div>
              )}
              {['olaksice'].some(ma) && (
                <div className="flex flex-col">
                  <div> Izaberite olaksicu za koju podnosite zahtev </div>
                  <div className="flex flex-col">
                    <button
                      className="p-1 mx-1 bg-purple-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'SET_OLAKSICE', data: 'trpozajmica' });
                      }}
                    >
                      Pozajmica po TR
                    </button>
                    <button
                      className="p-1 mx-1 bg-yellow-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'SET_OLAKSICE', data: 'kreditnekartice' });
                      }}
                    >
                      Kreditne kartice
                    </button>
                    <button
                      className="p-1 mx-1 bg-red-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'SET_OLAKSICE', data: 'karticesaodlplacanjem' });
                      }}
                    >
                      Kartice sa odlozenim placanjem
                    </button>{' '}
                    <button
                      className="p-1 mx-1 bg-red-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'SET_OLAKSICE', data: 'krediti' });
                      }}
                    >
                      Kredit
                    </button>{' '}
                    <button
                      className="p-1 mx-1 bg-yellow-700 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({ type: 'ABORT' });
                      }}
                    >
                      Odustani
                    </button>{' '}
                  </div>
                </div>
              )}
              {['provera'].some(ma) && (
                <div className="flex flex-col">
                  <div> Molim vas proverite tacnost unetih podataka </div>
                  <div> Tip klijenta: {cx.tipklijenta} </div>
                  <div> jmbg: {cx.jmbg} </div>
                  <div> maticnibroj: {cx.maticnibroj} </div>
                  <div> Razlog: {cx.razlozi} </div>
                  <div> Tip olaksice: {cx.olaksice} </div>
                  <div>
                    <button
                      className="p-1 mx-1 bg-green-500 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'DODAJNOVZAHTEVKLIJENTA',
                          data: {
                            tipklijenta: cx.tipklijenta,
                            jmbg: cx.jmbg,
                            maticnibroj: cx.maticnibroj,
                            razlozi: cx.razlozi,
                            olaksice: cx.olaksice,
                            id_klijent: cx.trenutniklijent,
                          },
                        });
                      }}
                    >
                      Dodaj zahtev klijenta
                    </button>
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'LISTAKLIJENATA',
                          data: {
                            id_klijent: 0,
                          },
                        });
                      }}
                    >
                      Vrati se na listuklijenata
                    </button>
                  </div>
                </div>
              )}
              {['provera'].some(ma) && (
                <div className="p-10 text-white bg-red-500" style={{ position: 'fixed', top: 100, left: 100 }}>
                  Prihvatate?
                  <button
                    type="button"
                    onClick={() => {
                      send({
                        type: 'DODAJNOVZAHTEVKLIJENTA',
                        data: {
                          tipklijenta: cx.tipklijenta,
                          jmbg: cx.jmbg,
                          maticnibroj: cx.maticnibroj,
                          razlozi: cx.razlozi,
                          olaksice: cx.olaksice,
                          id_klijent: cx.trenutniklijent,
                        },
                      });
                    }}
                  >
                    Da
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      send({
                        type: 'LISTAKLIJENATA',
                        data: {
                          id_klijent: 0,
                        },
                      });
                    }}
                  >
                    Ne
                  </button>
                </div>
              )}
              {['vidilistudetaljizahteva'].some(ma) && (
                <div className="flex flex-col">
                  {cx?.listadetaljizahteva?.map((r) => {
                    return (
                      <div>
                        {' '}
                        Statusi zahteva
                        <button
                          className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                          type="button"
                          onClick={() => {
                            send({
                              type: 'STATUSZAHTEVA',
                              data: {
                                id: 1,
                              },
                            });
                          }}
                        >
                          Vidi statuse zahteva
                        </button>{' '}
                        {r.odgovornolice}{' '}
                      </div>
                    );
                  })}
                  <div className="flex flex-col ">
                    <div>Unesite odgovorno lice za zahtev</div>
                    <div>
                      <textarea
                        value={cx?.novidetaljzahteva}
                        onChange={(ev) => {
                          send({
                            type: 'NOVIDETALJZAHTEVA',
                            data: {
                              odgovornolice: ev.target.value,
                            },
                          });
                        }}
                        className="border border-gray-500"
                      />
                      <div className="flex flex-col">
                        <button
                          className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                          type="button"
                          onClick={() => {
                            send({
                              type: 'DODAJNOVIDETALJZAHTEVA',
                              data: {
                                odgovornolice: cx.novidetaljzahteva,
                                id_zahtev: cx.trenutnizahtev,
                              },
                            });
                          }}
                        >
                          Dodaj odgovorno lice za zahtev
                        </button>
                        <button
                          className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                          type="button"
                          onClick={() => {
                            send({
                              type: 'LISTAKLIJENATA',
                              data: {
                                id_klijent: 0,
                              },
                            });
                          }}
                        >
                          Vrati se na listuklijenata
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {['vidilistustatusazahteva'].some(ma) && (
                <div className="flex flex-col">
                  {cx?.listastatusazahteva?.map((r) => {
                    return <div>Lista statusa zahteva {r.status} </div>;
                  })}
                  <div className="flex flex-col ">
                    <div>Unesite status zahteva</div>
                    <div>
                      <textarea
                        value={cx?.novistatuszahteva}
                        onChange={(ev) => {
                          send({
                            type: 'NOVISTATUSZAHTEVA',
                            data: {
                              status: ev.target.value,
                            },
                          });
                        }}
                        className="border border-gray-500"
                      />
                      <div className="flex flex-col">
                        <button
                          className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                          type="button"
                          onClick={() => {
                            send({
                              type: 'DODAJNOVISTATUSZAHTEVA',
                              data: {
                                status: cx.novistatuszahteva,
                                id_odgovornolice: cx.trenutnoodgovornolice,
                              },
                            });
                          }}
                        >
                          Dodaj status zahteva
                        </button>
                        <button
                          className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                          type="button"
                          onClick={() => {
                            send({
                              type: 'LISTAKLIJENATA',
                              data: {
                                id_klijent: 0,
                              },
                            });
                          }}
                        >
                          Vrati se na listuklijenata
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <pre>{JSON.stringify({ cx }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default XstateSimple8;
