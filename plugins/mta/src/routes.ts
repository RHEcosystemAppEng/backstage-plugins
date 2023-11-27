import { createRouteRef, createSubRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'mta',
});

export const tagRouteRef = createSubRouteRef({
  id: 'mta-tag',
  parent: rootRouteRef,
  path: '/tag/:digest',
});
