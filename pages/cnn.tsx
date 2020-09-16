/* eslint-disable jsx-a11y/anchor-is-valid */
import CNNHeader from 'parts/CNNHeader';
import Link from 'next/link';
import React from 'react';

export default function CNN() {
  return (
    <div className="flex flex-col">
      <CNNHeader />
      <div>
        <div className="flex flex-col px-2">
          <Link href="/cnn/article1">
            <a>Trump Clanak!</a>
          </Link>
        </div>
        <div className="flex flex-col px-2">
          <Link href="/cnn/article2">
            <a>Trump Clanak novosti!</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
