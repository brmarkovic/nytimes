import React, { useState } from 'react';
import { apiRecepies, apiRecepiesI } from '@/pages/api/recepies';
import { apiRecepiesSearch, apiRecepiesSearchI } from '@/pages/api/recepies-search';

export default function Recepti(props: apiRecepiesI) {
  const { title } = props;
  const [receipes, setReceipes]: [apiRecepiesSearchI, any] = useState();

  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-pink-500">{title}</h1>
        <div>
          <input
            className="border border-gray-400 p-3 rounded-lg text-lg"
            placeholder="search..."
            onChange={async (e) => {
              setReceipes(await apiRecepiesSearch({ value: e.target.value }));
            }}
          />
        </div>
      </div>
      {receipes && (
        <div>
          <h2 className="text-2xl font-bold mt-2">Recepti</h2>
          <div className="flex flex-col text-sm">
            {receipes?.results?.map((r) => {
              return (
                <div className="flex">
                  <div className="w-20 h-20 bg-gray-200 mb-2">
                    {r.thumbnail && <img className="w-20 h-20" alt={r.title} src={r.thumbnail} />}
                  </div>
                  <div className="flex flex-col p-2 ">
                    <div className="font-bold text-xl tracking-tight">
                      <a href={r.href} target="_blank" rel="noreferrer">
                        {r.title}
                      </a>
                    </div>
                    <div>{r?.href?.slice(0, 30)}...</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: await apiRecepies(),
  };
}
