import DexycoHeader from 'parts/DexycoHeader';
import React from 'react';

export default function dexyco() {
  return (
    <div className="flex flex-col">
      <DexycoHeader />
      <div>
        <img
          src="https://www.dexy.co.rs/files/images/slideri/main_sliders800x900/LEGO-rancevi-800-x-900_22.webp"
          alt=""
        />
      </div>
      <div className="p-4">
        <img
          src="https://www.dexy.co.rs/files/images/slideri/novi_slider800x400_680x300/Tocak-srece-800x400.webp"
          alt=""
        />
      </div>
      <div className="px-4">
        <img
          src="https://www.dexy.co.rs/files/images/slideri/novi_slider800x400_680x300/a-b-c_800-x-400(1).webp"
          alt=""
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center p-2 text-xl">Poruci telefonom</div>
        <div className="p-4">
          <img
            src="https://www.dexy.co.rs/files/images/slideri/home_baner800x400/Poruci-telefonom_800-x-400-novi_broj.webp"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col p-2">
        <div className="flex justify-center text-xl">Izdvajamo</div>
        <div className="flex flex-wrap">
          <div className="w-1/2">
            {' '}
            <img
              src="https://www.dexy.co.rs/files/thumbs/files/images/slike_proizvoda/thumbs_600/CBF240318_600_600px.jpg"
              alt=""
            />
            <div className="flex justify-center w-1/2 text-xl">Igracke</div>
          </div>
          <div className="w-1/2">
            <img
              src="https://www.dexy.co.rs/files/thumbs/files/images/slike_proizvoda/thumbs_600/AB12000011000_600_600px.jpg"
              alt=""
            />
            <div className="flex justify-center w-1/2 text-xl">Bebe</div>
          </div>
          <div className="w-1/2">
            {' '}
            <img
              src="https://www.dexy.co.rs/files/thumbs/files/images/slike_proizvoda/thumbs_600/IM91634_600_600px.jpg"
              alt=""
            />
          </div>
          <div className="w-1/2">
            <img
              src="https://www.dexy.co.rs/files/thumbs/files/images/slike_proizvoda/thumbs_600/AV10071362049_600_600px.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
    </div>
  );
}
