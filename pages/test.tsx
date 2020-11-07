/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';

const showInfo = true;
const name = 'Biljana';
const age = 42;
const person = {
  name: 'Biljana',
  lastname: 'Markovic',
  country: { name: 'Srbija' },
};
const valute = [
  { label: 'Eur', ratio: 1 },
  { label: 'Rsd', ratio: 118 },
];
const popUpAlerter = () => {
  alert('popUp!');
};

const PrvaKomponenta = ({ nameInput, ageInput, personInput, valuteInput, popUpAlerterInput, showInfoInput }) => {
  return (
    <>
      <div>
        Moje ime je <span className="font-bold">{nameInput} ({ageInput})</span>
      </div>
      <div>
        {personInput.name} {personInput.lastname} iz {personInput.country.name}
      </div>
      <div>
       {valuteInput.map ((r)=>{
        return(
         <>
         {r.label} ({r.ratio})<br/>
         </>
        )
       })}
      </div>
      <button className="mx-10 bg-gray-600 rounded" onClick={popUpAlerterInput}>
       Alert me!
      </button>
      {!showInfoInput&&(
       <>
       <div>Osnovni info</div>
       </>
      )}
      {showInfoInput&& (
       <>
       <div>Dodatni info</div>
       </>
      )}
    </>
  );
};

export default function Test() {
  return (
    <>
      <PrvaKomponenta
        nameInput={name}
        ageInput={age}
        personInput={person}
        valuteInput={valute}
        popUpAlerterInput={popUpAlerter}
        showInfoInput={showInfo}
      />
     
    </>
  );
}
