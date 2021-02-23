/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import React from 'react';

const showInfo = true;
const name = 'Peca';
const age = 35;
const person = {
  name: 'Predrag',
  lastname: 'Markovic',
  country: { name: 'Zemun' },
};
const valute = [
  { label: 'eur', ratio: 1 },
  { label: 'rsd', ratio: 185 },
];

const companies = [
  { name: 'one', category: 'finance', start: 1981, end: 2003 },
  { name: 'two', category: 'retail', start: 1992, end: 2008 },
  { name: 'three', category: 'reatil', start: 1999, end: 2007 },
];

const popUpAlerter = () => {
  alert('popUp!');
};

const PrvaKomponenta = ({
  nameInput,
  ageInput,
  personInput,
  valuteInput,
  showInfoInput,
  popUpAlerterInput,
  companiesInput,
}) => {
  return (
    <>
      <div>
        Moje ime je{' '}
        <span className="font-bold text-red-600">
          {' '}
          {nameInput} ({ageInput}){' '}
        </span>
      </div>
      <div>
        <span className="font-bold">
          {' '}
          {personInput.name} {personInput.lastname}
        </span>{' '}
        iz {personInput.country.name}
      </div>
      <div>
        {valuteInput.map((r) => {
          return (
            <>
              {r.label} ({r.ratio})
              <br />
            </>
          );
        })}
      </div>
      {companiesInput.filter((r) => {
        return <>{r.riteal}</>;
      })}
      <div />
      <button className="mx-10 bg-gray-500 rounded" onClick={popUpAlerterInput}>
        Alert!
      </button>
      <div>
        {!showInfoInput && <>Osnovni Info</>}
        {showInfoInput && <> Dodatni Info </>}
      </div>
    </>
  );
};

export default function Peca() {
  return (
    <>
      <PrvaKomponenta
        nameInput={name}
        ageInput={age}
        personInput={person}
        valuteInput={valute}
        showInfoInput={showInfo}
        companiesInput={companies}
        popUpAlerterInput={popUpAlerter}
      />
    </>
  );
}
