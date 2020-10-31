/* eslint-disable no-alert */
/* eslint-disable spaced-comment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import DexycoHeader from 'parts/DexycoHeader';

const showInfo = true;
const proizvod = 'Obuca';
const pol = 'Decaci';
const specifikacija = {
  proizvod: 'Obuca',
  opis: 'Zimska',
  vreme: {
    naziv: 'Suvo',
  },
};
const velicina = [
  { num: 20, godine: '1 do 2 godine' },
  { num: 21, godine: '2 do 3 godine' },
  { num: 22, godine: '3 do 4 godine' },
];
const popUpAlerter = () => {
  alert('Upit poslat!');
};

const PrvaKomponenta = ({
  proizvodInput,
  polInput,
  specifikacijaInput,
  velicinaInput,
  popUpAlerterInput,
  showInfoInput,
}) => {
  return (
    <>
      <div className="px-2">
        Unesite rec za pretragu{' '}
        <span className="font-bold">
          {proizvodInput} ({polInput})
        </span>
      </div>

      <div className="px-2">
        Unesite dodatne podatke :{' '}
        <span className="font-bold">
          {' '}
          {specifikacijaInput.proizvod} {specifikacijaInput.opis} za {specifikacijaInput.vreme.naziv} vreme{' '}
        </span>
      </div>

      <div className="px-2">
        {velicinaInput.map((r) => {
          return (
            <>
              broj {r.num} ({r.godine})<br />
            </>
          );
        })}
      </div>
      <button className="mx-10 bg-gray-500 rounded" onClick={popUpAlerterInput}>
        Posalji upit!
      </button>

      {!showInfoInput && (
        <>
          <div>osnovni info</div>
        </>
      )}
      {showInfoInput && (
        <>
          <div>ovo je dodatni info...</div>
        </>
      )}
    </>
  );
};

export default function pretrazi() {
  return (
    <div>
      <DexycoHeader />
      <div className="p-4 text-xl text-gray-500 border-b-2 border-gray-500">Pretrazi sajt</div>
      <PrvaKomponenta
        proizvodInput={proizvod}
        polInput={pol}
        specifikacijaInput={specifikacija}
        velicinaInput={velicina}
        popUpAlerterInput={popUpAlerter}
        showInfoInput={showInfo}
      />
    </div>
  );
}
