import React from 'react';

export default function Index() {
  return (
    <div>
      <div>index..</div>
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
