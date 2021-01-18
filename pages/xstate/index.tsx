/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { XstateSimple2 } from '@/parts/XstateSimple2/XstateSimple2';

import { XstateSimple3 } from '@/parts/XstateSimple3/XstateSimple3';
import { XstateSimple4 } from '@/parts/XstateSimple4/XstateSimple4';
import { XstateSimple5 } from '@/parts/XstateSimple5/XstateSimple5';
import { XstateSimple6 } from '@/parts/XstateSimple6/XstateSimple6';
import { XstateSimple7 } from '@/parts/XstateSimple7/XstateSimple7';
import { XstateSimple8 } from '@/parts/XstateSimple8/XstateSimple8';
import { XstateTodos } from '@/parts/XstateTodos/XstateTodos';

export function PageXstate() {
  return (
    <div className="p-2">
      <XstateSimple2 />
      {/* <XstateSimple3 /> */}
      {/* <XstateSimple4 /> */}
      {/* <XstateSimple5 /> */}
      {/* <XstateSimple6 /> */}
      <XstateSimple7 />
      <XstateSimple8 />
      {/* <XstateTodos /> */}
    </div>
  );
}

export default PageXstate;

// <XstateSimple />
