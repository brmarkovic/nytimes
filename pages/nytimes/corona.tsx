import NYTimesMenu from 'parts/NYTimesMenu';
import React from 'react';

export default function Corona() {
  return (
    <div>
      <NYTimesMenu />
      <div>
        <div className="flex flex-col">
          <div className="flex flex-col p-6">
            <div className="text-xs font-extrabold tracking-widest text-red-700 uppercase">Live</div>
            <div className="mt-1 font-serif text-xl font-bold leading-tight">
              China Uses the Promise of a Coronavirus Vaccine as a Diplomatic Carrot
            </div>
            <div className="mt-3 font-serif text-base leading-tight text-gray-700">
              China is launching a charm offensive aimed at repairing ties and bringing friends closer in regions deemed
              vital to its interests. Here’s the latest.
            </div>
            <div className="mt-4 font-bold">Coronavirus Cases at U.S. Colleges</div>
            <div>
              <img
                src="https://static01.nyt.com/images/2020/09/11/us/covid-college-cases-tracker-promo-1599840058820/covid-college-cases-tracker-promo-1599840058820-square640.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
