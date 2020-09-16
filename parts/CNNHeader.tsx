/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';

export default function CNNHeader() {
  return (
    <div>
      <div className="flex justify-between px-4 text-2xl text-white bg-black">
        <div className="p-2 font-bold bg-red-600 flex-1/8">
          <Link href="/cnn">
            <a>CNN</a>
          </Link>
        </div>
        <div className="flex-1/8"> </div>
        <div className="flex-1/8">@=</div>
      </div>
    </div>
  );
}
