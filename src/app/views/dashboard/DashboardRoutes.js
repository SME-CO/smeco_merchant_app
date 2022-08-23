import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));
const AdminDashboard = Loadable(lazy(() => import('./AdminDashboard')));
const MerchantDashboard = Loadable(lazy(() => import('./MerchantDashboard')));

const dashboardRoutes = [
  { path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },
  { path: '/dashboard/admin', element: <AdminDashboard />, auth: authRoles.admin },
  { path: '/dashboard/merchant', element: <MerchantDashboard />, auth: authRoles.admin },
];

export default dashboardRoutes;
