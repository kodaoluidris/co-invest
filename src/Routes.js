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
import MyInvestment from '@/pages/MyAssets/Assets/Index';
import ViewInvestment from '@/pages/MyAssets/Assets/partials/View';
import MarketPlace from '@/pages/MyAssets/MarketPlace/Index';

// Charts
import ChartsPage from '@/pages/Charts/Charts';

// Ui
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';

// Client Page
const LandingPage = () => import('@/pages/Client/Index')
const MainPropertyDetails = () => import('@/pages/Client/MainPropertyDetails')
const MainPropertyGroupDetails = () => import('@/pages/Client/MainPropertyGroupDetails')
const BuyNow = () => import('@/pages/Client/BuyNow')
const Users = () => import('@/pages/ManageUsers/Index')


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: LandingPage,
    },
    {
      path: '/home/main-property/details/:mainPropertyId',
      name: 'MainPropertyDetails',
      component: MainPropertyDetails,
    },
    {
      path: '/home/main-property/groups/details/:mainGroupPropertyId',
      name: 'MainPropertyGroupDetails',
      component: MainPropertyGroupDetails,
    },
    {
      path: '/home/checkout-main-property/:mainGroupPropertyId',
      name: 'BuyNow',
      component: BuyNow,
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
          path: 'users',
          name: 'ManageUsers',
          component: Users,
        },
        {
          path: 'my-investments/index',
          name: 'Investment',
          component: MyInvestment,
        },
      
        {
          path: 'my-investments/:id/view',
          name: 'ViewInvestment',
          component: ViewInvestment,
        },
        {
          path: 'market-place/index',
          name: 'MarketPlace',
          component: MarketPlace,
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
        { path: "/:pathMatch(.*)*", component: AnalyticsPage }
      ],
    },
  ],
});
