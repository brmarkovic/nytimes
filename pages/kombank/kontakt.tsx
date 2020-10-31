/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
 /* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import KombankHeader from 'parts/KombankHeader';
import React from 'react';


const showInfo = true; 
const name = 'Milenko';
const age = 33;
const person = {
  name: 'Milanko',
  lastname: 'Milankovic',
  country: {
    name: 'Srbija',
  },
};
const valute = [
  { label: 'eur', ratio: 1 },
  { label: 'rsd', ratio: 118.5 },
];
const popUpAlerter = () => {
  alert('Upit poslat!');
};


const PrvaKomponenta = ({ nameInput, ageInput, personInput, valuteInput, popUpAlerterInput, showInfoInput }) => {
  return (
    <>
      
      <div>
        Unesite korisnicko ime {' '}
        <span className="font-bold">
          {nameInput} ({ageInput})
        </span>
      </div>
    
      <div>
        Unesite ime i prezime: <span className="font-bold" > {personInput.name}  {personInput.lastname} iz  {personInput.country.name} </span> 
      </div>
      
      {valuteInput.map((r) => {
        return (
          <>
            {r.label} ({r.ratio})<br />
          </>
        );
      })}
      
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

export default function Kontakt() {
  return (
    <div>
      <KombankHeader />
      <div>KONTAKT FORMA</div>
      <PrvaKomponenta
        nameInput={name}
        ageInput={age}
        personInput={person}
        valuteInput={valute}
        popUpAlerterInput={popUpAlerter}
        showInfoInput={showInfo}
      />
    </div>
  );
}
