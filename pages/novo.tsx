/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-undef */
import React from 'react';

const showInfo = true;
const name = 'Biljana';
const age = 33;

const person = {
  name: 'Biljana',
  lastname: 'Markovic',
  country: { name: 'Srbija' },
};

const valute = [
  { label: 'eur', ratio: 1 },
  { label: 'rsd', ratio: 18.5 },
];

const popUpAlerter = () => {
  alert('popUp!');
};
const PrvaKomponenta = ({ nameInput, ageInput, personInput, valuteInput, showInfoInput, popUpAlerterInput }) => {
  return (
    <>
      <div>
        Moje ime je {nameInput} ({ageInput})
      </div>
      <div>
        {personInput.name} {personInput.lastname} iz {personInput.country.name}
      </div>
      {valuteInput.map((r) => {
        return (
          <>
            {r.label} ({r.ratio})<br />
          </>
        );
      })}
      <button className="mx-10 bg-gray-500 rounded" onClick={popUpAlerterInput}>
        Alert!
      </button>
      {!showInfoInput && (
        <>
          <div>Osnovni info</div>
        </>
      )}
      {showInfoInput && (
        <>
          <div>Dodatni info</div>
        </>
      )}
    </>
  );
};

export default function Novo() {
  return (
    <>
      <PrvaKomponenta
        nameInput={name}
        ageInput={age}
        personInput={person}
        valuteInput={valute}
        showInfoInput={showInfo}
        popUpAlerterInput={popUpAlerter}
      />
    </>
  );
}
