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
                  send({ type: 'FL' });
                }}
              >
                Fizicko lice!
              </button>
              <button
                className="p-1 mx-1 bg-yellow-500 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'POLJOPRIVREDNIK' });
                }}
              >
                Poljoprivrednik!
              </button>
              <button
                className="p-1 mx-1 bg-red-500 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'PREDUZETNIK' });
                }}
              >
                Preduzetnik
              </button>{' '}
              <button
                className="p-1 mx-1 bg-yellow-700 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'PRAVNOLICE' });
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
                  send({ type: 'RAZLOG1' });
                }}
              >
                Razlog1
              </button>
              <button
                className="p-1 mx-1 bg-yellow-500 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'RAZLOG2' });
                }}
              >
                Razlog2
              </button>
              <button
                className="p-1 mx-1 bg-red-500 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'RAZLOG3' });
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
                  send({ type: 'TRPOZAJMICA' });
                }}
              >
                Pozajmica po TR
              </button>
              <button
                className="p-1 mx-1 bg-yellow-500 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'KREDITNEKARTICE' });
                }}
              >
                Kreditne kartice
              </button>
              <button
                className="p-1 mx-1 bg-red-500 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'KARTICESAODLPLACANJEM' });
                }}
              >
                Kartice sa odlozenim placanjem
              </button>{' '}
              <button
                className="p-1 mx-1 bg-red-500 rounded-lg"
                type="button"
                onClick={() => {
                  send({ type: 'KREDIT' });
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
            <div> Tip klijenta: {} </div>
            <div> jmbg: {cx.jmbg} </div>
            <div> maticnibroj: {cx.maticnibroj} </div>
            <div> Razlog: {} </div>
            <div> Ti olaksice: {} </div>
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
