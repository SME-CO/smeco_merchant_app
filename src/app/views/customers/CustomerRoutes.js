import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NewCustomer = Loadable(lazy(() => import('./new-customer/NewCustomer')));
const ManageCustomers = Loadable(lazy(() => import('./manage-customer/ManageCustomers')));

const customerRoutes = [
    {
        path: 'customers/new',
        element: <NewCustomer/>
    },
    {
        path : 'customers/manage',
        element: <ManageCustomers/>
    }
];

export default customerRoutes;