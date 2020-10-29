/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';

export default function KombankHeader() {
  return (
    <div>
      <div className="flex justify-between p-2 bg-purple-900">
        <div className="flex w-40 h-8 w-10/18">
          <Link href="/kombank">
            <a>
              <img src="https://www.kombank.com/images/komercijalna-banka-beograd-logo-beli.png" alt="" />
            </a>
          </Link>
        </div>
        <div className="flex mt-2 text-lg font-bold text-center text-purple-800 bg-white rounded-md fill-current w-2/18 h-7">
          EN
        </div>
        <div className="flex px-2 w-2/18">
          <svg className="w-6 mt-2 text-purple-800 bg-white rounded-md fill-current h-7" viewBox="0 0 20 20">
            <path d="M11.229 11.229c-1.583 1.582-3.417 3.096-4.142 2.371-1.037-1.037-1.677-1.941-3.965-.102-2.287 1.838-.53 3.064.475 4.068 1.16 1.16 5.484.062 9.758-4.211 4.273-4.274 5.368-8.598 4.207-9.758-1.005-1.006-2.225-2.762-4.063-.475-1.839 2.287-.936 2.927.103 3.965.722.725-.791 2.559-2.373 4.142z" />
          </svg>
        </div>
        <div className="flex justify-end px-2 ">
          <Link href="/kombank/kontakt">
            <a>
              <svg className="w-6 mt-2 text-purple-800 bg-white rounded-md fill-current h-7" viewBox="0 0 20 20">
                <path d="M1.574 5.286l7.5 4.029c.252.135.578.199.906.199.328 0 .654-.064.906-.199l7.5-4.029c.489-.263.951-1.286.054-1.286H1.521c-.897 0-.435 1.023.053 1.286zm17.039 2.203l-7.727 4.027c-.34.178-.578.199-.906.199s-.566-.021-.906-.199-7.133-3.739-7.688-4.028C.996 7.284 1 7.523 1 7.707V15c0 .42.566 1 1 1h16c.434 0 1-.58 1-1V7.708c0-.184.004-.423-.387-.219z" />
              </svg>
            </a>
          </Link>
        </div>
        <div className="flex justify-end px-2 w-2/18">
          <svg className="mt-2 mb-2 text-white fill-current w-7 h-7" viewBox="0 0 20 20">
            <path d="M17.545 15.467l-3.779-3.779a6.15 6.15 0 00.898-3.21c0-3.417-2.961-6.377-6.378-6.377A6.185 6.185 0 002.1 8.287c0 3.416 2.961 6.377 6.377 6.377a6.15 6.15 0 003.115-.844l3.799 3.801a.953.953 0 001.346 0l.943-.943c.371-.371.236-.84-.135-1.211zM4.004 8.287a4.282 4.282 0 014.282-4.283c2.366 0 4.474 2.107 4.474 4.474a4.284 4.284 0 01-4.283 4.283c-2.366-.001-4.473-2.109-4.473-4.474z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
