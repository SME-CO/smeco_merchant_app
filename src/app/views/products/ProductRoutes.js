import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NewProduct = Loadable(lazy(() => import('./new-product/NewProduct')));
const ManageProduct = Loadable(lazy(() => import('./manage-product/ManageProduct')));
const NewPromotion = Loadable(lazy(() => import('./promotions/NewPromotion')));
const SalesReport = Loadable(lazy(() => import('./reports/SalesReport')));

const productRoutes = [
    {
        path: 'products/new',
        element: <NewProduct/>
    },
    {
        path : 'products/manage',
        element: <ManageProduct/>
    },
    {
        path: 'products/promotions/new',
        element: <NewPromotion/>
    },
    {
        path: 'reports',
        element: <SalesReport/>
    },
];

export default productRoutes;