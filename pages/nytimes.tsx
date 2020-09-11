import NYTimesMenu from '@/parts/NYTimesMenu';
import React from 'react';
import Link from 'next/link';

export default function NYTimes() {
  return (
    <div className="flex flex-col">
      <NYTimesMenu />
      <div>
        <div className="flex flex-col">
          <Link href="/nytimes/corona">
            <a>Corona Clanak!</a>
          </Link>
          <Link href="/nytimes/noviclanak">
            <a>Novi clanka</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
