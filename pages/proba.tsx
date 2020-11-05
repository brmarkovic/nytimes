/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import React from 'react'

const showInfo=false
const name ='Biljana';
const age = 42

const person ={
 name: "Biljana",
 lastname:"Markovic",
 country:{ name:"Serbia" }
}

const valute =[
 { label:"eur", ratio:1 },
 { label:"rsd",ratio:1.85 }
]

const popUpAlerter =() =>{
 alert("popuUp")
}

const PrvaKomponenta =({ nameInput, ageInput, personInput, valuteInput, popUpAlerterInput, showInfoInput })=>{
 return (
  <div className="px-2">
  <div>
   Moje ime je  
   <span className="px-2 font-bold text-red-700">
   {nameInput}    </span>
   ({ageInput})

  </div>

  <div>
   {personInput.name} {personInput.lastname} iz  {personInput.country.name}
  </div>

  <div>
   {valuteInput.map((r)=>{
    return(
     <>
     {r.label} ({r.ratio}) <br/>
     </>
    )
   })}
  </div>
  <button className="mx-10 bg-gray-500 rounded" onClick={popUpAlerterInput}>Alert</button>

  {!showInfoInput&&(
   <>
   <div>osnovni info</div>
   </>
  )}
  {showInfoInput&&(
   <>
   <div>dodatni info</div>
   </>
  )}
  </div>
 )
}
export default function proba () {
 return (
  <>
  <div>
   <PrvaKomponenta
   nameInput ={name}
   ageInput = {age}
   personInput ={person}
   valuteInput ={valute}
   popUpAlerterInput ={popUpAlerter}
   showInfoInput={showInfo}
   />
   
  </div>
  </>
 )
}