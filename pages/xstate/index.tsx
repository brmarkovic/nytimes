/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { XstateSimple2 } from '@/parts/XstateSimple2/XstateSimple2';

import { XstateSimple3 } from '@/parts/XstateSimple3/XstateSimple3';
import { XstateSimple } from '../../parts/XstateSimple/XstateSimple';

export function PageXstate() {
  return (
    <div className="p-2">
      <XstateSimple2 />
      <XstateSimple3 />
    </div>
  );
}

export default PageXstate;

// <XstateSimple />
