/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { XstateSimple2 } from '@/parts/XstateSimple2/XstateSimple2';

import { XstateSimple3 } from '@/parts/XstateSimple3/XstateSimple3';
import { XstateSimple4 } from '@/parts/XstateSimple4/XstateSimple4';
import { XstateSimple5 } from '@/parts/XstateSimple5/XstateSimple5';
import { XstateTodos } from '@/parts/XstateTodos/XstateTodos';

export function PageXstate() {
  return (
    <div className="p-2">
      {/* <XstateSimple2 />
      <XstateSimple3 /> */}
      <XstateSimple4 />
      <XstateSimple5 />
      {/* <XstateTodos /> */}
    </div>
  );
}

export default PageXstate;

// <XstateSimple />
