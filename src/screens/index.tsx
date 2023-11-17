import {Router} from '@tanstack/react-router';

import {editTaskRoute} from './authenticated/EditTaskPage';
import {createTaskRoute} from './authenticated/CreateTaskPage';
import {dashboardRoute} from './authenticated/TasksDashboardPage';

import {loginRoute} from './LoginPage';
import {rootRoute} from './rootRoute';
import {notFoundPage} from './NotFoundPage';

const routeTree = rootRoute.addChildren([
  loginRoute,
  dashboardRoute,
  editTaskRoute,
  createTaskRoute,
  notFoundPage,
]);

export const router = new Router({routeTree});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
