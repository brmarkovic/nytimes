import React from 'react';

export default function Index() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex">=</div>
        <div className="flex">the NYtimes</div>
        <div className="flex">P</div>
      </div>
      <div className="flex justify-between">
        <div className="flex">Wednesday</div>
        <div className="flex">subscribe</div>
      </div>
      <div className="flex flex-col">
        <div className="flex">title..</div>
        <div className="flex">...</div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
