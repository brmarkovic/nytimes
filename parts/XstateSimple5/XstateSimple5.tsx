import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple5Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple5() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple5Machine, {
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
      <div>Simple5 Machine</div>
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
      <div className="font-bold">UPITNIK</div>

      {['idle'].some(ma) && (
        <div>
          <button
            className="p-1 mx-1 text-white bg-purple-800 rounded-lg"
            type="button"
            onClick={() => {
              send({ type: 'UPITNIK' });
            }}
          >
            prijava za mailing listu!
          </button>
        </div>
      )}
      {['pitanje'].some(ma) && (
        <div className="flex flex-col">
          <div> Da li zelite da se prijavite na nasu mailing listu? </div>
          <div>
            <button
              className="p-1 mx-1 bg-gray-500 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'YES' });
              }}
            >
              DA
            </button>
            <button
              className="p-1 mx-1 bg-purple-500 rounded-lg"
              type="button"
              onClick={() => {
                send({ type: 'NO' });
              }}
            >
              NE
            </button>
          </div>
        </div>
      )}
      {['imeprezime'].some(ma) && (
        <div className="flex flex-col">
          <div className="flex flex-col ">
            <div>Unesite vase Ime i prezime!</div>
            <div>
              <textarea
                value={cx?.imeprezime}
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
      {['mail'].some(ma) && (
        <div className="flex flex-col">
          <div className="flex flex-col ">
            <div>Unesite vasu mail adresu!</div>
            <div>
              <textarea
                value={cx?.mail}
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
      {['telefon'].some(ma) && (
        <div className="flex flex-col">
          <div className="flex flex-col ">
            <div>Unesite vas br telefona!</div>
            <div>
              <textarea
                value={cx?.telefon}
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
      {['potvrda'].some(ma) && (
        <div className="flex flex-col">
          <div> Molim vas proverite tacnost unetih podataka </div>
          <div> Ime i Prezime: {cx.imeprezime} </div>
          <div> mail: {cx.mail} </div>
          <div> Telefon: {cx.telefon} </div>
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
                send({ type: 'BACK' });
              }}
            >
              Vrati se nazad
            </button>
          </div>
        </div>
      )}
      {['zahvalnica'].some(ma) && <div> Zahvaljujemo se na prijavi za mailing listu! </div>}
      <pre>{JSON.stringify({ cx }, null, 2)}</pre>
    </div>
  );
}

export default XstateSimple5;
