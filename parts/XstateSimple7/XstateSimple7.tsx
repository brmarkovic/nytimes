import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple7Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple7() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple7Machine, {
    show: false,
  });
  const [{ context: cx, matches: ma }, send] = machine || [{}];
  useXstateDebugger({ machine, name: '__' });

  useEffect(() => {
    // boot machine
    send({ type: 'idle' });
  }, []);

  // REACT (HTML+) KOMPONENTA
  return (
    <div className="p-2">
      <div>KOMERCIJALNA BANKA AD BEOGRAD</div>
      <div>
        <button
          type="button"
          onClick={() => {
            send({ type: 'SHOW', data: !cx.show });
          }}
        >
          toggle show
        </button>
        {cx?.show && <div>prikazujem...</div>}
        {cx.prijave.map((r) => {
          return (
            <div className="flex flex-col">
              Tip klijenta ({r.tipklijenta}) JMBG ({r.jmbg}) Maticni broj firme ({r.maticnibroj}) Razlozi za olaksicu (
              {r.razlozi}) Vrsta olaksice ({r.olaksice})
            </div>
          );
        })}
        {['idle'].some(ma) && (
          <div>
            <button
              className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'FORMULAR' });
              }}
            >
              Zahtev za olaksicu!
            </button>
          </div>
        )}
        {['zahtev'].some(ma) && (
          <div className="flex flex-col">
            <div>
              <button
                className="p-1 mx-1 bg-gray-500 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'PODNESIZAHTEV' });
                }}
              >
                Poupuni zahtev
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
                    type: 'SUBMIT',
                  });
                }}
              >
                Potvrdi
              </button>
              <button
                className="p-1 mx-1 bg-red-500 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'BACK' });
                }}
              >
                Vrati se nazad
              </button>
            </div>
          </div>
        )}
        {['potvrda'].some(ma) && <div> Vas zahtev je uspesko kreiran! </div>}
        <pre>{JSON.stringify({ cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple7;
