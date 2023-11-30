import {
  configApiRef,
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';

import { MtaApiClient, mtaApiRef } from './api';
import { rootRouteRef, tagRouteRef } from './routes';

export const mtaPlugin = createPlugin({
  id: 'mta',
  routes: {
    root: rootRouteRef,
    tag: tagRouteRef,
  },
  apis: [
    createApiFactory({
      api: mtaApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        configApi: configApiRef,
        identityApi: identityApiRef,
      },
      factory: ({ discoveryApi, configApi, identityApi }) =>
        new MtaApiClient({ discoveryApi, configApi, identityApi }),
    }),
  ],
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
