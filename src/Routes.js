import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Auth/Login';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import Profile from '@/pages/Auth/Profile';
import Register from '@/pages/Auth/Register';
import ErrorPage from '@/pages/Error/Error';
// Core
import TypographyPage from '@/pages/Typography/Typography';

// Tables
import TablesBasicPage from '@/pages/Tables/Basic';

// Maps
import GoogleMapPage from '@/pages/Maps/Google';

// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';
import Testing from '@/pages/Dashboard/Gaw';
import Properties from '@/pages/ManageProperty/Properties/Index';
import PropertyTypes from '@/pages/ManageProperty/PropertyTypes/Index';
import MainProperty from '@/pages/ManageProperty/MainProperties/Index';

// Charts
import ChartsPage from '@/pages/Charts/Charts';

// Ui
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/app/dashboard',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'AnalyticsPage',
          component: AnalyticsPage,
         
        },
        {
          path: 'profile',
          name: 'ProfilePage',
          component: Profile,
         
        },
        {
          path: 'manage-properties/properties',
          name: 'Properties',
          component: Properties,
        },
        {
          path: 'manage-properties/property-types',
          name: 'PropertiesTypes',
          component: PropertyTypes,
        },
        {
          path: 'manage-properties/main-properties',
          name: 'MainProperty',
          component: MainProperty,
        },
        {
          path: 'test',
          name: 'test',
          component: Testing,
        },
        {
          path: 'typography',
          name: 'TypographyPage',
          component: TypographyPage,
        },
        {
          path: 'components/icons',
          name: 'IconsPage',
          component: IconsPage,
        },
        {
          path: 'notifications',
          name: 'NotificationsPage',
          component: NotificationsPage,
        },
        {
          path: 'components/charts',
          name: 'ChartsPage',
          component: ChartsPage,
        },
        {
          path: 'tables',
          name: 'TablesBasicPage',
          component: TablesBasicPage,
        },
        {
          path: 'components/maps',
          name: 'GoogleMapPage',
          component: GoogleMapPage,
        },
      ],
    },
  ],
});