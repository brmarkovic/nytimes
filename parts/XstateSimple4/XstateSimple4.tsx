import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple4Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple4() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple4Machine, {
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
      <div>Simple4 Machine</div>
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
      </div>
      <hr />
      <div>UPITNIK</div>
      <hr />
      {['idle'].some(ma) && (
        <div>
          <button
            className="p-1 mx-1 bg-red-500 rounded-lg"
            type="button"
            onClick={() => {
              send({ type: 'UPITNIK' });
            }}
          >
            Zapocnite upitnik!
          </button>
        </div>
      )}
      {['pitanje'].some(ma) && (
        <div className="flex flex-col">
          <div> Da li ste klijent Banke? </div>
          <div>
            <button
              className="p-1 mx-1 bg-blue-500 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'YES' });
              }}
            >
              DA
            </button>
            <button
              className="p-1 mx-1 bg-yellow-500 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'NO' });
              }}
            >
              NE
            </button>
            <button
              className="p-1 mx-1 bg-red-500 rounded-lg"
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
      {['racun'].some(ma) && (
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div> Unesite broj TR racuna </div>

            <div>
              <textarea
                value={cx?.brracuna}
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
      {['transakcija'].some(ma) && (
        <div className="flex flex-col">
          <div> Izaberite zeljenu transakciju! </div>
          <div>
            <button
              className="p-1 mx-1 bg-purple-500 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'STANJE' });
              }}
            >
              Proveri stanje po TR
            </button>
            <button
              className="p-1 mx-1 bg-yellow-500 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'CEKOVI' });
              }}
            >
              Poruci Cekove!
            </button>
            <button
              className="p-1 mx-1 bg-red-500 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'BLOKADA' });
              }}
            >
              Blokiraj karticu
            </button>{' '}
          </div>
        </div>
      )}
    </div>
  );
}

export default XstateSimple4;
