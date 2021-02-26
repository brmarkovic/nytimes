/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
// import { inspect } from '@xstate/inspect';
import { useXstateDebugger } from '../../helpers/xstate';

// import { useMachine } from '../../helpers/useMachine';
import { XstateSimple20Machine } from './_machine';

// inspect({
//  // options
//  // url: 'https://statecharts.io/inspect', // (default)
//  iframe: false, // open in new window
// });

export function XstateSimple20() {
  // STARTOVANJE MASINE
  const machine = useMachine(XstateSimple20Machine, {
    show: false,
  });
  const [{ context: cx, matches: ma, value: currentState }, send] = machine || [{}];
  useXstateDebugger({ machine, name: '__' });

  useEffect(() => {
    // boot machine
    send({ type: 'BROWSER' });
  }, []);

  // REACT (HTML+) KOMPONENTA
  return (
    <div className="flex flex-col">
      <div className="bg-white ">
        <div className="flex bg-black">
          <div className="w-5/6 ml-4 md:w-1/6 md:flex md:justify-end md:mr-5">
            <img
              className="w-10 h-10"
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
          <div className="md:flex md:text-white sm:hidden md:items-center md:justify-start md:font-semibold md:w-4/6">
            <div className="md:ml-5">World</div>
            <div className="md:ml-5">US Polittics</div>
            <div className="md:ml-5">Business</div>
            <div className="md:ml-5">Healtih</div>
            <div className="md:ml-5">Entertaintment</div>
            <div className="md:ml-5">Style</div>
            <div className="md:ml-5">Travel </div>
            <div className="md:ml-5">Sports</div>
            <div className="md:ml-5">Videos</div>
          </div>
          <div className="flex w-1/6 mr-7 md:justify-end md:mr-48 md:text-white">
            <div className="md:flex md:items-center md:justify-end md:mr-5 md:font-semibold ">Edition</div>
            <div className="md:flex md:items-center sm:hidden md:mr-5">
              <svg
                className="text-white w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex items-center justify-end md:mr-5 ">
              <svg
                className="text-white w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex items-center">
              <svg
                className="text-white w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          </div>
        </div>
        <div className="md:text-sm md:font-bold md:flex md:ml-56 md:mr-56 md:p-3 md:justify-between sm:hidden">
          <div className="mr-2 ">
            <span className="text-red-600 ">Covid 19:</span>Live updates
          </div>
          <div className="border-r-2 border-gray-400 ">Tracking corona virus vaccinations worldwide</div>
          <div>
            <span className="text-red-600 ">TRANDING:</span>Lawrence Ferllingheti
          </div>
          <div>Rolerrblading cops</div>
          <div>Gerard Depardeiu</div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-5 ">
          <div className="md:flex md:col-span-2 md:ml-56">
            <div className="md:flex-flex-col">
              <div className="ml-5 mr-5 text-4xl font-bold leading-tight text-center md:mt-3 md:text-3xl hover:text-red-600 md:flex md:ml-1">
                Former capitol Polce Chief says rioters'came prepared for war'
              </div>
              <div className="p-2 md:p-0">
                <img
                  className="object-cover w-full "
                  src="https://cdn.cnn.com/cnnnext/dam/assets/210205104923-104-january-6-capitol-riots-small-tease.jpg"
                  alt=""
                />
              </div>
              <div className="flex w-1/4 ml-2 -mt-40 text-white md:mt-0 md:ml-0 ">
                <div className="p-2 font-bold bg-red-600 md:-mt-16 ">LIVE UPDATES</div>
              </div>
              <div className="h-32 ml-2 mr-2 bg-gray-100 opacity-75 md:ml-0 md:mr-0 md:bg-white md:h-auto md:mt-3 ">
                <div className="p-2 text-2xl font-bold leading-tight text-left hover:text-red-600 md:p-0 md:text-lg md:mr-2 md:ml-2">
                  Law enforcement says they readied for a protest but didnt knowe they needed to prep for a battle{' '}
                </div>
              </div>
              <div className="p-1 mt-2 ml-2 mr-2 text-xl font-thin leading-tight text-gray-900 bg-white border-b border-gray-400 md:border-t md:border-gray-400 md:text-lg hover:text-red-600 md:">
                Police officer describes suffering chemical burns on her face
              </div>
              <div className="p-1 ml-2 mr-2 text-xl font-thin leading-tight text-gray-900 bg-white border-b border-gray-400 md:text-lg hover:text-red-600">
                Capitol security officials point fingers over disastrous january 6 riot response
              </div>
              <div className="flex p-2 ml-2 mr-2 text-xl font-thin leading-tight text-gray-900 bg-white border-b border-gray-400 hover:text-red-600 md:text-lg">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-red-600 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-2 text-left">Capitol Officer recounts responding to insurrection</div>
              </div>
              <div className="p-1 ml-2 mr-2 text-xl font-thin leading-tight text-gray-900 bg-white md:text-lg hover:text-red-600">
                Inside a 'Patriot Party' rally where Trump loyalists search for path forward
              </div>
            </div>
          </div>{' '}
          <div className="md:flex md:col-span-1 md:ml-5 ">
            <div className=" md:flex-col">
              <div className="flex p-2 md:p-0 md:mt-2">
                <img
                  src="https://cdn.cnn.com/cnnnext/dam/assets/210222211637-01-boeing-aircraft-engine-failure-ntsb-exlarge-tease.jpg"
                  alt=""
                />
              </div>
              <div className="ml-2 mr-2 -mt-48 bg-gray-100 opacity-75 md:ml-0 md:mr-0 md:mt-2 md:bg-white ">
                <div className="p-2 text-3xl leading-tight text-left font-tini hover:text-red-600 md:text-xl md:font-bold md:p-0">
                  Unitedd Airlines flight engine failure findings released.Here`s what we know
                </div>
                <div className="mt-2 ml-2 mr-2 text-base list-disc list-inside hover:text-red-600 md:ml-0 md:mr-2">
                  Captain 'Sully' explains why its very rare to hear someone say 'Mayday' on radio
                </div>
              </div>

              <div className="p-2 mt-2 bg-white md:p-0 ">
                <div>
                  <img
                    src="https://cdn.cnn.com/cnnnext/dam/assets/170417184020-cnnmoney-trump-tax-returns-exlarge-tease.jpg"
                    alt=""
                  />
                </div>
                <div className="flex w-1/4 -mt-48 text-white md:mt-0 ">
                  <div className="p-2 font-bold bg-black border border-black md:-mt-10">ANALYSIS</div>
                </div>
                <div className="bg-gray-100 opacity-75 md:bg-white ">
                  <div className="ml-2 text-3xl leading-tight text-left md:ml-0 font-tini hover:text-red-600 md:text-xl md:font-bold">
                    Why has Trump fought so hard keep his tax returns secret?
                  </div>
                  <div className="h-16 mt-4 ml-2 mr-2 text-base list-disc list-inside hover:text-red-600 md:ml-0 md:mr-0">
                    What the Supreme Court ruling means for Manhatns DA`s Trump criminal probe
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex md:col-span-1 md:ml-5">
            <div className="md:flex-col">
              <div className="p-2 mt-2 md:p-0">
                <div>
                  <img
                    src="https://cdn.cnn.com/cnnnext/dam/assets/210223011600-01-coronavirus-los-angeles-icu-0217-exlarge-tease.jpg"
                    alt=""
                  />
                </div>
                <div className="-mt-20 bg-gray-100 opacity-75 md:mt-0 md:bg-white ">
                  <div className="h-20 ml-2 text-3xl leading-tight text-left md:ml-0 md:mt-2 md:text-xl md:font-bold font-tini hover:text-red-600 md:h-20">
                    'We've done worse than most any other country, fauci says
                  </div>
                </div>
              </div>
              <div className="p-1 ml-2 mr-2 text-xl font-thin leading-tight text-gray-900 bg-white border-b border-gray-400 md:text-lg md:ml-0 md:mr-0 hover:text-red-600">
                <span className="text-red-600">LIVE</span> Johnson & Johnson vaccine doses will be 'backloaded with more
                coming later'
              </div>
              <div className="flex p-2 ml-2 mr-2 text-xl font-thin leading-tight text-gray-900 bg-white border-b border-gray-400 md:text-lg md:p-1 md:ml-0 md:mr-0 hover:text-red-600">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-red-600 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-2 text-left md:ml-0">
                  Lithuanian FM: Russia 'absolutely' playing politics with its vaccine
                </div>
              </div>
              <div className="p-1 ml-2 mr-2 text-xl font-thin leading-tight text-gray-900 bg-white border-b border-gray-400 md:text-lg md:ml-0 md:mr-0 hover:text-red-600">
                Biden admin.prepares to impose sanctions on Russia over navalny poisioning
              </div>
              <div className="p-1 ml-2 mr-2 text-xl font-thin leading-tight text-gray-900 bg-white border-b border-gray-400 hover:text-red-600 md:text-lg md:ml-0 md:mr-0">
                Garland draws sharp contrast with Barr
              </div>
              <div className="p-1 ml-2 mr-2 text-xl font-thin leading-tight text-gray-900 bg-white border-b border-gray-400 hover:text-red-600 md:text-lg md:ml-0 md:mr-0">
                princePhilip being treated for an infection
              </div>
              <div className="p-1 ml-2 mr-2 text-xl font-thin leading-tight text-gray-900 bg-white border-b border-gray-400 hover:text-red-600 md:text-lg md:ml-0 md:mr-0">
                Corruption inquiry wants former president jailed for two years after no-show
              </div>
              <div className="p-1 ml-2 mr-2 text-xl font-thin leading-tight text-gray-900 bg-white border-b border-gray-400 hover:text-red-600 md:text-lg md:ml-0 md:mr-0">
                Biden admin.prepares to impose sanctions on Russia over navalny poisioning
              </div>
              <div className="p-1 ml-2 mr-2 text-xl font-thin leading-tight text-gray-900 bg-white border-b border-gray-400 hover:text-red-600 md:text-lg md:ml-0 md:mr-0">
                4 reasonns Teslas stock is tumbling
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 ">
          <div className="md:flex-col md:col-span-1 md:max-w-xl md:ml-56">
            <img
              className="p-2 mt-5"
              src="https://cdn.cnn.com/cnnnext/dam/assets/210222175906-01-laurence-philomene-puberty-series-exlarge-tease.jpg"
              alt=""
            />

            <div className="flex flex-col ml-8 mr-8 -mt-16">
              <div className="p-1 text-2xl font-bold leading-tight text-center bg-gray-400 ">
                Photographer shows beauty of their transition trough vivid self-portratias
              </div>
            </div>

            <img
              className="p-2 mt-5 "
              src="https://cdn.cnn.com/cnnnext/dam/assets/210223205529-rollerblading-cops-exlarge-tease.jpg"
              alt=""
            />
            <div className="flex flex-col ml-8 mr-8 bg-gray-400">
              <div className="flex justify-center mt-2 leading-tight ">
                <svg
                  className="w-6 h-6 text-red-600 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="p-1 -mt-16 text-2xl font-bold leading-tight text-center bg-gray-400 ">
                Internet reacst to Pakistan's rollerblading cops
              </div>
            </div>
          </div>

          <div className="md:flex-col md:col-span-1 md:max-w-xl">
            <img
              className="p-2 mt-5"
              src="https://cdn.cnn.com/cnnnext/dam/assets/210222175906-01-laurence-philomene-puberty-series-exlarge-tease.jpg"
              alt=""
            />

            <div className="flex flex-col ml-8 mr-8 -mt-16">
              <div className="p-1 text-2xl font-bold leading-tight text-center bg-gray-400 ">
                Photographer shows beauty of their transition trough vivid self-portratias
              </div>
            </div>

            <img
              className="p-2 mt-5 "
              src="https://images.outbrainimg.com/transform/v3/eyJpdSI6ImZiZmJlMWM1YjdmOTJlOGVhYzE5MjRlYTZiNTQxYzE3ODYyMDUyOWQzNzg3YWU5MDQ0NmQ3YzBmMjQ0YmQ3NmQiLCJ3Ijo1NDAsImgiOjMwMywiZCI6MS41LCJjcyI6MCwiZiI6NH0.webp"
              alt=""
            />

            <div className="flex flex-col ml-8 mr-8 -mt-16 md:mt-5 ">
              <div className="p-1 text-2xl font-bold leading-tight text-center bg-gray-400 md:-mt-16 ">
                Watch a bilion years of tectoinic plates moving in one minute
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <pre>{JSON.stringify({ currentState, cx }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default XstateSimple20;
