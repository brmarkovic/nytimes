import React from 'react';
import MetroMenu from 'parts/MetroMenu';
import Link from 'next/link';

export default function musko() {
  return (
    <div>
      <MetroMenu />
      <div className="flex flex-col text-white bg-red-600" />
    </div>
  );
}
