import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { ApplicationInventory } from './components/ApplicationInventory  ';
import { rootRouteRef } from './routes';

export const mtaPlugin = createPlugin({
  id: 'mta',
  routes: {
    root: rootRouteRef,
  },
});

export const MtaPage = mtaPlugin.provide(
  createRoutableExtension({
    name: 'MtaPage',
    component: () =>
      import('./components/ApplicationInventory  ').then(
        m => m.ApplicationInventory,
      ),
    mountPoint: rootRouteRef,
  }),
);
