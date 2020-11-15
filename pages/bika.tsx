/* eslint-disable react/button-has-type */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React from 'react';

const showInfo = true;
const name = 'Biljana';
const age = 32;
const person = {
  name: 'Biljana',
  lastname: 'Markovic',
  country: { name: 'Srbija' },
};

const valute = [
  { label: 'Eur', ratio: 1 },
  { label: 'Rsd', ratio: 185 },
];

const popUpAlerter = () => {
  alert('PopUP!');
};

const PrvaKomponenta = ({ nameInput, ageInput, personInput, valuteInput, showInfoInput, popUpAlerterInput }) => {
  return (
   <>
   <div>
  Moje ime je <span className="font-bold text-red-600">
  {nameInput} </span>
  ({ageInput})
   </div>
   <div>
    {personInput.name} {personInput.lastname} iz {personInput.country.name}
   </div>
   <div>
    {valuteInput.map((r)=>{
     return(
     <>
      {r.label} ({r.ratio})<br/>
     </>
     )
    })}
   </div>
   <button className="mx-10 bg-gray-500 rounded" onClick={popUpAlerterInput}>
    Alert me!
   </button>
  <div>
  {!showInfoInput&&(
    <>Osnovni info</>
   )}
   {showInfoInput&&(
    <>Dodatni info</>
   )}
  </div>
   </>

  );
};

export default function Bika() {
  return (
    <>
      <PrvaKomponenta 
      nameInput={name}
      ageInput={age}
      personInput={person}
      showInfoInput={showInfo}
      valuteInput={valute}
      popUpAlerterInput={popUpAlerter}
      />
      <div>Test</div>
    </>
  );
}
