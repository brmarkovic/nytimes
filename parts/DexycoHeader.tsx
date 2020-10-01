/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';

export default function DexycoHeader() {
  return (
    <div className="flex flex-col">
      <div className="flex text-white bg-red-600">
        <div className="flex px-2 text-4xl font-bold font bold 1/12">
          <Link href="/dexyco/izbordexyco">
            <a>=</a>
          </Link>
        </div>
        <div className="flex justify-center w-9/12">
          <Link href="/dexyco">
            <a>
              <img className="w-20" src="https://www.dexy.co.rs/files/images/logo/dexyco-logo.webp" alt="" />
            </a>
          </Link>
        </div>
        <div className="flex w-1/12 text-3xl">
          <Link href="/dexyco/pretrazi">
            <a>
              <svg className="mt-4 text-white fill-current w-7 h-7" viewBox="0 0 20 20">
                <path d="M17.545 15.467l-3.779-3.779a6.15 6.15 0 00.898-3.21c0-3.417-2.961-6.377-6.378-6.377A6.185 6.185 0 002.1 8.287c0 3.416 2.961 6.377 6.377 6.377a6.15 6.15 0 003.115-.844l3.799 3.801a.953.953 0 001.346 0l.943-.943c.371-.371.236-.84-.135-1.211zM4.004 8.287a4.282 4.282 0 014.282-4.283c2.366 0 4.474 2.107 4.474 4.474a4.284 4.284 0 01-4.283 4.283c-2.366-.001-4.473-2.109-4.473-4.474z" />
              </svg>
            </a>
          </Link>
        </div>
        <div className="flex justify-center w-1/12 text-3xl bg-green-600">K</div>
      </div>
    </div>
  );
}
