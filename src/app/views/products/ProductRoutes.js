import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NewProduct = Loadable(lazy(() => import('./new-product/NewProduct')));
const ManageProduct = Loadable(lazy(() => import('./manage-product/ManageProduct')));

const productRoutes = [
    {
        path: 'products/new',
        element: <NewProduct/>
    },
    {
        path : 'products/manage',
        element: <ManageProduct/>
    }
];

export default productRoutes;