/* eslint-disable no-undef */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';

const showInfo = true;
const name = 'Vasa';
const age = 2;
const person = {
  name: 'Vasilije',
  lastname: 'Markovic',
  coutry: { name: 'Zemun' },
};
const valute = [
  { label: 'Eur', ratio: 1 },
  { label: 'Rsd', ratio: 185 },
];

const popUpAlerter = () => {
  alert('PopUp');
};

const PrvaKomponenta = ({ nameInput, ageInput, personInput, valuteInput, showInfoInpt, popUpAlerterInput }) => {
  return (
    <>
      <div>
        Moje ime je <span className="font-bold text-red-600"> {nameInput} </span> ({ageInput})
      </div>
      <div>
        {personInput.name} {personInput.lastname} iz {personInput.coutry.name}
      </div>
      <div>
        {valuteInput.map((r) => {
          return (
            <>
              {r.label} ({r.ratio})<br />
            </>
          );
        })}
      </div>
      <button className="mx-20 bg-gray-400 rounded" onClick={popUpAlerterInput}>
        Alert!
      </button>
      <div>
        {!showInfoInpt && <> Dodatni info </>}
        {showInfoInpt && <> Osnovni Info </>}
      </div>
    </>
  );
};
export default function Vasa() {
  return (
    <>
      <PrvaKomponenta
        nameInput={name}
        ageInput={age}
        personInput={person}
        valuteInput={valute}
        showInfoInpt={showInfo}
        popUpAlerterInput={popUpAlerter}
      />
      <div>Test</div>
    </>
  );
}
