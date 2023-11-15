import React from 'react';

import { createDevApp } from '@backstage/dev-utils';

import { MtaPage, mtaPlugin } from '../src/plugin';

createDevApp()
  .registerPlugin(mtaPlugin)
  .addPage({
    element: <MtaPage />,
    title: 'Root Page',
    path: '/mta',
  })
  .render();
