/* eslint-disable jsx-a11y/anchor-is-valid */
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
    <div className="flex flex-col bg-gray-100 ">
      <div className="fixed top-0 left-0 flex flex-col bg-blue-700 ">
        <div className="flex flex-row ">
          <div className="flex items-center justify-start w-1/2 h-24">
            <img className="mt-2 ml-3 " 
            src="https://www.calculus.rs/templates/OP/skins/main/images/logo/logo.png" alt=""/>
          </div>
          <div className="flex items-center justify-end w-1/2">
            <a>
            <svg className="w-16 text-white h-7"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg> 
            </a>
          </div>
        </div> 
      </div>
      <div className="flex items-center justify-center w-full h-12 mt-24 bg-gradient-to-tr from-blue-300 via-blue-500 to-blue-800 ">
          <div className="font-bold text-teal-300 ">CALCULUS-ELEKTRONSKA RAZMENA RACUNA</div>
      </div>
      <div className="w-auto mt-5 ml-2 mr-2 flex-flex-col">
      <div className="flex flex-col">
      <div className="w-full bg-white ">
        <img style={{ width:500 }} src="https://www.calculus.rs/cached/www.calculus.rs/Images/Calculus-eRacun-730x0-0000007087.jpg" alt=""/> </div>
      <div className="-mt-10 text-xl text-white ">CALCULUS - E-RACUN</div>
      </div>
      <div className="flex flex-col w-full mt-5 mr-2 ml 2">
        <div >
          <img className="h-40" src="https://www.calculus.rs/virtualimage.axd?content_header_uid=14c209c4-1c00-4061-ae9a-35ea0306767f" alt=""/>
        </div>
        <div className="text-gray-500 bg-white ">
           <div className="mt-5 ml-5 text-lg font-thin ">nedelja, 05.april 2020</div>
           <div className="mt-4 ml-5 text-xl font-semibold text-gray-600">Calculusu u Cloudu </div>
           <div className="mt-4 ml-5 font-sans text-lg">Calculus Cloud - Calculus 12 za rad preko interneta. Zelite calculus 12 na Oblaku za vasu kompaniju i to odmah? ...</div>
           
        </div>
      </div>
      </div>    
      <div>
        <div className="flex flex-col mt-4 ml-2 mr-2">
          {['vidilistuklijentfirma'].some(ma) && (
            <div className="flex flex-col bg-blue-100"> 
              <div className="text-lg text-center text-blue-700"> Lista firmi sa kojima CALCULUS saradjuje </div>
              {cx?.listaklijentfirma?.map((r) => {
                return (
                  <div className="flex flex-col font-semibold text-blue-600 ">
                    <div>{r.imefirma} (PIB:{r.pibfirma}) </div>
                    <div className="flex flex-row">
                    <button
                      className="p-1 mx-1 text-white bg-blue-800 rounded-lg"
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
                      className="p-1 mx-1 text-white bg-blue-800 rounded-lg"
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
                  </div>
                );
              })}
              <div className="flex flex-col">
              <div className="text-lg text-center text-blue-700">Unesite novog klijenta-Firmu</div>
                <div>
                  <div className="flex flex-col">
                  <div>
                   <div className="ml-2 text-blue-700">Unesite ime firme </div>
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
                     <div className="ml-2 text-blue-700">Unesite PIB firme </div>
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
                      className="p-1 mx-1 text-white bg-blue-800 rounded-lg"
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
                      className="p-1 mx-1 text-white bg-blue-800 rounded-lg"
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
                        className="p-1 mx-1 text-white bg-blue-800 rounded-lg"
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
                        className="p-1 mx-1 text-white bg-blue-800 rounded-lg"
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
                        className="p-1 mx-1 text-white bg-blue-800 rounded-lg"
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
                        className="p-1 mx-1 text-white bg-blue-800 rounded-lg"
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
                        className="p-1 mx-1 text-white bg-blue-800 rounded-lg"
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
                        className="p-1 mx-1 text-white bg-blue-800 rounded-lg"
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
