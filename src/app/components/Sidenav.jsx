import { styled } from '@mui/system';
import { MatxVerticalNav } from 'app/components';
import useSettings from 'app/hooks/useSettings';
// import { navigations } from 'app/navigations';
import { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { useState, useEffect } from "react";

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative',
}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const [navigations, setNavigations] = useState([]);

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

   const loadSideBarItems = () => {
    let navigation_contents = [];
    if(window.localStorage.getItem('role') == 'admin'){
      navigation_contents = [
          { name: 'Dashboard', path: '/dashboard/admin', icon: 'dashboard' },
          {
    
            name: 'Manage Users',
            icon: 'group',
            children: [
              { name: 'Registered Customers', iconText: 'SI', path: 'admin/all-customers' },
              { name: 'Registered Merchants', iconText: 'SU', path: 'admin/all-merchants' },
            ],
          }
      ]
      setNavigations(navigation_contents);
    }

    if(window.localStorage.getItem('role') == 'merchant'){
      navigation_contents = [
          { name: 'Dashboard', path: '/dashboard/merchant', icon: 'dashboard' },
          { name: 'Checkout Customer', path: '/checkout', icon: 'dashboard' },
          {
            name: 'Customers',
            icon: 'group',
            children: [
              { name: 'New Customer', iconText: 'SI', path: '/customers/new' },
              { name: 'Manage Customers', iconText: 'SU', path: '/customers/manage' },
            ],
          },
          {
            name: 'Product',
            icon: 'group',
            children: [
              { name: 'New Product', iconText: 'SI', path: '/products/new' },
              { name: 'Manage Product', iconText: 'SU', path: '/products/manage' },
              
            ],
          },
          {
            name: 'Promotions',
            icon: 'group',
            children: [
              { name: 'Create Promotions', iconText: 'SI', path: 'products/promotions/new' },
              { name: 'Manage Product', iconText: 'SU', path: '/products/manage' },
              
            ],
          },
          { name: 'Sales Reports', path: '/reports', icon: 'dashboard' },
          // {
          //   name: 'Session/Auth',
          //   icon: 'security',
          //   children: [
          //     { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
          //     { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
          //     { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
          //     { name: 'Error', iconText: '404', path: '/session/404' },
          //   ],
          // },
          // { label: 'Components', type: 'label' },
          // {
          //   name: 'Components',
          //   icon: 'favorite',
          //   // badge: { value: '30+', color: 'secondary' },
          //   children: [
          //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
          //     { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
          //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
          //     { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
          //     { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
          //     { name: 'Form', path: '/material/form', iconText: 'F' },
          //     { name: 'Icons', path: '/material/icons', iconText: 'I' },
          //     { name: 'Menu', path: '/material/menu', iconText: 'M' },
          //     { name: 'Progress', path: '/material/progress', iconText: 'P' },
          //     { name: 'Radio', path: '/material/radio', iconText: 'R' },
          //     { name: 'Switch', path: '/material/switch', iconText: 'S' },
          //     { name: 'Slider', path: '/material/slider', iconText: 'S' },
          //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
          //     { name: 'Table', path: '/material/table', iconText: 'T' },
          //   ],
          // },
          // {
          //   name: 'Charts',
          //   icon: 'trending_up',
          //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
          // },
          // {
          //   name: 'Documentation',
          //   icon: 'launch',
          //   type: 'extLink',
          //   path: 'http://demos.ui-lib.com/matx-react-doc/',
          // },
      ]
      setNavigations(navigation_contents);
     }
   }

   useEffect(() => {
    loadSideBarItems();
  },[]);


  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <MatxVerticalNav items={navigations} />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
