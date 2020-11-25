import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple3Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple3() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple3Machine, {
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
      <div>Simple3 Machine</div>
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
      <div>
        <div>FORMULAR</div>
        <hr />
        {['idle'].some(ma) && (
          <div>
            <button
              className="p-1 mx-1 bg-red-500 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'FORMULAR' });
              }}
            >
              Ime I prezime
            </button>
          </div>
        )}
        {['imeprezime'].some(ma) && (
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div> Unesite Ime i Prezime </div>
              <div>
                <textarea
                  value={cx?.imePrezime}
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
                Posalji
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
        {['pol'].some(ma) && (
          <div>
            <button
              className="p-1 mx-1 bg-blue-500 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'MUSKI' });
              }}
            >
              MUSKI
            </button>
            <button
              className="p-1 mx-1 bg-yellow-500 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'ZENSKI' });
              }}
            >
              ZENSKI
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
        )}
        {['parfem'].some(ma) && (
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div> Unesite omiljeni parfem </div>
              <div>
                <textarea
                  value={cx?.parfemTekst}
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
                Posalji
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
        {['auto'].some(ma) && (
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div> Unesite omiljeni auto </div>
              <div>
                <textarea
                  value={cx?.autoTekst}
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
                Posalji
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
        {['zahvalnica'].some(ma) && <div> Zahvaljujemo se na pounjenom formularu! </div>}
      </div>
    </div>
  );
}

export default XstateSimple3;
