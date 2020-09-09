import React, { useState } from 'react';
import { apiRecepies, apiRecepiesI, apiRecepiesSearch, apiRecepiesSearchI } from '@/pages/api/recepies';

export default function Recepti(props: apiRecepiesI) {
  const { title } = props;
  const [receipes, setReceipes]: [apiRecepiesSearchI, any] = useState();

  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-pink-500">{title}</h1>
        <div>
          <input
            className="p-3 text-lg border border-gray-400 rounded-lg"
            placeholder="search..."
            onChange={async (e) => {
              setReceipes(await apiRecepiesSearch({ value: e.target.value }));
            }}
          />
        </div>
      </div>
      {receipes && (
        <div>
          <h2 className="mt-2 text-2xl font-bold">Recepti</h2>
          <div className="flex flex-col text-sm">
            {receipes?.results?.map((r) => {
              return (
                <div className="flex mt-2 divide-y divide-gray-300" key={r.href}>
                  <div className="w-1/6 mb-2 bg-gray-200">
                    {r.thumbnail && <img className="object-cover w-full h-full" alt={r.title} src={r.thumbnail} />}
                  </div>
                  <div className="flex flex-col w-5/6 p-2 pl-4">
                    <div className="text-2xl font-bold leading-none tracking-tight">
                      <a href={r.href} target="_blank" rel="noreferrer">
                        {r.title}
                      </a>
                    </div>

                    <div className="mt-1">{r?.ingredients}</div>
                    <div className="flex justify-start text-gray-600">
                      <div className="text-right">
                        <svg className="w-4 h-4 mt-1 mr-2 text-blue-500 fill-current" viewBox="0 0 20 20">
                          <path d="M15 15H2V6h2.595s.689-.896 2.17-2H1c-.553 0-1 .449-1 1v11c0 .553.447 1 1 1h15c.553 0 1-.447 1-1v-3.746l-2 1.645V15zm-1.639-6.95v3.551L20 6.4l-6.639-4.999v3.131C5.3 4.532 5.3 12.5 5.3 12.5c2.282-3.748 3.686-4.45 8.061-4.45z" />
                        </svg>
                      </div>
                      <div>{r?.href?.slice(0, 30)}...</div>
                    </div>
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
    props: {
      ...(await apiRecepies()),
    },
  };
}
