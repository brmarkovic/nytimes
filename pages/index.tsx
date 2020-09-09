import React from 'react';
import { Button, Slider, Select } from 'antd';

export default function Index() {
  return (
    <div className="p-10 text-center text-6xl text-blue-500">
      <div>Welcome to Next.js!</div>
      <Button type="primary">Click me!</Button>
      <Slider defaultValue={30} />
      <Select defaultValue="lucy" style={{ width: 120 }} onChange={() => {}}>
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
        <Select.Option value="disabled" disabled>
          Disabled
        </Select.Option>
        <Select.Option value="Yiminghe">yiminghe</Select.Option>
      </Select>
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
