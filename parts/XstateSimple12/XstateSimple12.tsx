/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple12Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple12() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple12Machine, {
    show: false,
  });
  const [{ context: cx, matches: ma, value: currentState }, send] = machine || [{}];
  useXstateDebugger({ machine, name: '__' });

  useEffect(() => {
    // boot machine
    send({ type: 'BROWSER' });
  }, []);

  // REACT (HTML+) KOMPONENTA
  return (
    <div className="p-2 flex-flex-col">
      <div>
        <div className="flex flex-col">
          {['vidilistuklijentfirma'].some(ma) && (
            <div className="flex flex-col">
              <div className="text-lg"> Lista firmi </div>
              {cx?.listaklijentfirma?.map((r) => {
                return (
                  <div className="text-base">
                    {r.imefirma} (PIB:{r.pibfirma})
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'KLIJENTFAKTURA',
                          data: {
                            id: r.id,
                          },
                        });
                      }}
                    >
                      Vidi fakture klijenta
                    </button>
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'KLIJENTPLACANJE',
                          data: {
                            id: r.id, // IZMENITI HRADCODOVANU VREDNOST/izmenila
                          },
                        });
                      }}
                    >
                      Vidi placanja klijenta
                    </button>
                  </div>
                );
              })}
              <div className="flex flex-col">
              <div className="text-lg font-bold">Unesite novog klijenta-Firmu</div>
                <div>
                  <div className="flex flex-col">
                  <div>
                   <div>Unesite ime firme </div>
                  <textarea
                    value={cx?.noviklijentfirmaime}
                    onChange={(ev) => {
                      send({
                        type: 'NOVIKLIJENTFIRMAIME',
                        data: {
                          imefirma: ev.target.value,
                        },
                          });
                    }}
                    className="border border-gray-500"
                  />
                    </div>
                    <div>
                     <div>Unesite PIB firme </div>
                    <textarea
                    value={cx?.noviklijentfirmapib}
                    onChange={(ev) => {
                      send({
                        type: 'NOVIKLIJENTFIRMAPIB',
                        data: {
                          pibfirma: ev.target.value,
                        },
                      });
                    }}
                    className="border border-gray-500"
                  />
                      </div>
                    </div>
                  <div className="flex flex-col">
                    <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'DODAJNOVIKLIJENTFIRMA',
                          data: {
                            imefirma: cx.noviklijentfirmaime,
                            pibfirma: cx.noviklijentfirmapib,
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
          {['vidilistaklijentfaktura'].some(ma) && (
           <div className='flex flex-col'>
            {cx?.listaklijentfaktura
            ?.filter((r) => cx.trenutniklijentfirma === r.id_klijentfirma)
            .map((r)=> {
             return (
              <div> Lista faktura klijenta {r.fakturabroj}
              <button
                      className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                      type="button"
                      onClick={() => {
                        send({
                          type: 'STAVKEFAKTURE',
                          data: {
                            id: r.id,
                          },
                        });
                      }}
                    >
                      Vidi  stavke fakture klijenta
                    </button>
                </div>
             )
            }) }
            <div className="flex flex-col ">
                  <div>Unesite novu fakturu</div>
                  <div>
                    <textarea
                      value={cx?.fakturabroj}
                      onChange={(ev) => {
                        send({
                          type: 'NOVAKLIJENTFAKTURA',
                          data: {
                           fakturabroj: ev.target.value,
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
                            type: 'DODAJNOVAKLIJENTFAKTURA',
                            data: {
                              fakturabroj: cx.fakturabroj,
                              id_klijentfirma: cx.trenutniklijentfirma,
                            },
                          });
                        }}
                      >
                        Dodaj novu fakturu klijenta
                      </button>
                      <button
                        className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                        type="button"
                        onClick={() => {
                          send({
                            type: 'BACK',
                            
                          });
                        }}
                      >
                        Vrati se na listu klijenata-FIRMI
                      </button>
                    </div>
                  </div>
                </div>

             </div>  
          )}             
          </div>
          <div className="flex flex-col">  
          {['vidilistustavkefakture'].some(ma) && (
           <div className="flex flex-col">
            {cx?.listastavkefakture
            ?.filter((r) => cx.trenutniklijentfaktura === r.id_faktura)
            .map((r)=> {
             return (
              <div> Iznos fakture {r.iznosfaktura} PDV:{r.pdvfaktura} </div>
             )
            })}
            <div className="flex flex-col">
             <div>
              <div>Unesite iznos fakture </div>
             <textarea
                      value={cx?.iznosfaktura}
                      onChange={(ev) => {
                        send({
                          type: 'NOVASTAVKAFAKTUREIZNOS',
                          data: {
                           iznosfaktura:ev.target.value,
                          },
                          
                        });
                      }}
                      className="border border-gray-500"
                    />
               </div>
              <div>
               <div>Unesite PDV </div>
              <textarea
                      value={cx?.pdvfaktura}
                      onChange={(ev) => {
                        send({
                          type: 'NOVASTAVKAFAKTUREPDV',
                          data: {
                           pdvfaktura: ev.target.value,
                          },
                        });
                      }}
                      className="border border-gray-500"
                    />
                </div> 
                <div className="flex flex-col">
                      <button
                        className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                        type="button"
                        onClick={() => {
                          send({
                            type: 'DODAJNOVASTAVKAFAKTURE',
                            data: {
                              iznosfaktura: cx.iznosfaktura,
                              pdvfaktura: cx.pdvfaktura,
                              id_faktura: cx.trenutniklijentfaktura,
                            },
                          });
                        }}
                      >
                        Dodaj novu stavku fakture klijenta
                      </button>
                      <button
                        className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                        type="button"
                        onClick={() => {
                          send({
                            type: 'BACK',
                            
                          });
                        }}
                      >
                        Vrati se na listu klijenata-FIRMI
                      </button>
                    </div>

              </div>

           </div>
          )}
          </div>
          <div className="flex flex-col">
          {['vidilistuklijentplacanje'].some(ma) && (
           <div className="flex flex-col">
            {cx?.listaklijentplacanje
            ?.filter((r) => cx.trenutniklijentfirma === r.id_klijentfirma)
            .map((r)=> {
             return (
              <div> Lista placanja klijenata {r.datumplacanja} {r.iznosplacanja} </div>
             )
            })}
            <div className="flex flex-col">
             <div>
              <div>Unesite datum placanja </div>
             <textarea
                      value={cx?.datumplacanja}
                      onChange={(ev) => {
                        send({
                          type: 'NOVOKLIJENTPLACANJEDATUM',
                          data: {
                          datumplacanja:ev.target.value,
                          },
                          
                        });
                      }}
                      className="border border-gray-500"
                    />
               </div>
              <div>
               <div>Unesite iznos placanja </div>
              <textarea
                      value={cx?.iznosplacanja}
                      onChange={(ev) => {
                        send({
                          type: 'NOVOKLIJENTPLACANJEIZNOS',
                          data: {
                           iznosplacanja: ev.target.value,
                          },
                        });
                      }}
                      className="border border-gray-500"
                    />
                </div> 
                <div className="flex flex-col">
                      <button
                        className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                        type="button"
                        onClick={() => {
                          send({
                            type: 'DODAJNOVOKLIJENTPLACANJE',
                            data: {
                              datumplacanja: cx.datumplacanja,
                              iznosplacanja: cx.iznosplacanja,
                              id_klijentfirma: cx.trenutniklijentfirma,
                            },
                          });
                        }}
                      >
                        Dodaj placanje klijenta klijenta
                      </button>
                      <button
                        className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
                        type="button"
                        onClick={() => {
                          send({
                            type: 'BACK',
                            
                          });
                        }}
                      >
                        Vrati se na listu klijenata-FIRMI
                      </button>
                    </div>

              </div>
             </div>
          )}              
          </div>
        </div>
        <div>
          <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default XstateSimple12;
