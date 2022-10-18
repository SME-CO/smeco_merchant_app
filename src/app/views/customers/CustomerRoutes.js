import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NewCustomer = Loadable(lazy(() => import('./new-customer/NewCustomer')));
const ManageCustomers = Loadable(lazy(() => import('./manage-customer/ManageCustomers')));
const AllCustomers = Loadable(lazy(() => import('../admin/AllCustomers')));
const AllMerchants = Loadable(lazy(() => import('../admin/AllMerchants')));
const Faq = Loadable(lazy(() => import('../admin/faq')));

const customerRoutes = [
    {
        path: 'customers/new',
        element: <NewCustomer/>
    },
    {
        path : 'customers/manage',
        element: <ManageCustomers/>
    },
    {
        path : 'admin/all-customers',
        element: <AllCustomers/>
    },
    {
        path : 'admin/all-merchants',
        element: <AllMerchants/>
    },
    {
        path : 'dashboard/faq',
        element: <Faq/>
    }
];

export default customerRoutes;