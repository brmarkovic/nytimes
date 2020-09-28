/* eslint-disable prettier/prettier */
import React from 'react';
import DexycoHeader from 'parts/DexycoHeader';
import Link from 'next/link';

export default function Izbordexyco() {
  return (
    <div>
     <DexycoHeader/>
      <div className="flex flex-col text-white bg-red-600"> 
      
      <div className="px-2 text-black">RS</div>
      <div className="px-2 text-black">HR</div>
      <div className="px-2 text-black">BA</div>
      <div className="px-2 text-black">RO</div>
      <div className="px-2 text-black">MK</div>
      <div className="p-2 text-base font-bold bg-gray-500">PRIJAVITE SE</div>
      <div className="p-2 text-base font-bold bg-gray-500 border-t-2 border-white">REGISTRUJTE SE</div>
      <div className="p-3 font-bold">HOME</div>
      <div className="p-3 font-bold">SKOLA</div>
      <div className="p-3 font-bold">IGRACKE</div>
      <div className="p-3 font-bold">BEBE</div>
      <div className="p-3 font-bold">ODECA</div>
      <div className="p-3 font-bold">OBUCA</div>
      <div className="p-3 font-bold">KNJIZARA</div>
      <div className="p-3 font-bold">GAMING</div>
      <div className="p-3 font-bold">BRENDOVI</div>
      <div className="p-3 font-bold">LEGO</div>
      
      </div>
    </div>
  );
}
