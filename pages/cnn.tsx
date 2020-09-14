import CNNHeader from '@/parts/CNNHeader';
import Link from 'next/dist/client/link';
import React from 'react';

export default function CNN() {
  return (
    <div className="flex flex-col">
      <CNNHeader />
      <div>
        <div className="flex flex-col">
          <Link href="/cnn/article1">
            <a>Trump Clanak!</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
