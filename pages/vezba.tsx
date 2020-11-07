/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */
import React  from 'react'

const showInfo=true
const name ="Pera"
const age =22
const person ={
 name:"Pera",
 lastname:"Peric",
 country:{ name:"Srbija" }
}
const valute =[
 { label:"RSD", ratio:185 },
 { label:"EUR", ratio:1 }
]

const popUpAlerter =()=>{
 alert("popUp")
}

const PrvaKomponenta=({
 showInfoInput,
 nameInput,
 ageInput,
 personInput,
 valuteInput,
 popUpAlerterInput
})=>{
 return(
  <>
  <div>
   Moje ime je <span className="font-bold" > {nameInput} ({ageInput}) </span>
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
  <button className="mx-10 bg-gray-600 rounded" onClick={popUpAlerterInput}>
 Alert me!
</button>

{!showInfoInput&&(
 <>
 <div>Osnovni info</div>
 </>
)}
{showInfoInput&&(
 <>
 <div>Dodatni info</div>
 </>
)}
  </>
 )
}

export default function Vezba () {
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
 )
}