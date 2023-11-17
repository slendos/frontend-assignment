import {Route} from '@tanstack/react-router';

import {rootRoute} from './rootRoute';

function NotFound() {
  return <span>404 Not found</span>;
}

export const notFoundPage = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});
