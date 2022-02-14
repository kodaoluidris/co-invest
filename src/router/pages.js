const pages = [
  {
    path: '/ui/typography',
    name: 'ui-typography',
    component: () => import('@/views/pages/typography/Typography.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/ui/gamification',
    name: 'ui-gamification',
    component: () => import('@/views/pages/gamification/Gamification.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/cards/basic',
    name: 'card-basic',
    component: () => import('@/views/pages/cards/card-basic/Card.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/cards/statistics',
    name: 'card-statistics',
    component: () => import('@/views/pages/cards/card-statistics/CardStatistics.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/cards/actions',
    name: 'card-actions',
    component: () => import('@/views/pages/cards/card-actions/CardActions.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/cards/chart',
    name: 'card-chart',
    component: () => import('@/views/pages/cards/card-chart/CardChart.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/cards/advance',
    name: 'card-advance',
    component: () => import('@/views/pages/cards/card-advance/CardAdvance.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/pages/authentication/login-v1',
    name: 'auth-login-v1',
    component: () => import('@/views/pages/authentication/Login-v1.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/authentication/login-v2',
    name: 'auth-login-v2',
    component: () => import('@/views/pages/authentication/Login-v2.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/authentication/register-v1',
    name: 'auth-register-v1',
    component: () => import('@/views/pages/authentication/Register-v1.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/authentication/register-v2',
    name: 'auth-register-v2',
    component: () => import('@/views/pages/authentication/Register-v2.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/authentication/forgot-password-v1',
    name: 'auth-forgot-password-v1',
    component: () => import('@/views/pages/authentication/ForgotPassword-v1.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/authentication/forgot-password-v2',
    name: 'auth-forgot-password-v2',
    component: () => import('@/views/pages/authentication/ForgotPassword-v2.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/authentication/reset-password-v1',
    name: 'auth-reset-password-v1',
    component: () => import('@/views/pages/authentication/ResetPassword-v1.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/authentication/reset-password-v2',
    name: 'auth-reset-password-v2',
    component: () => import('@/views/pages/authentication/ResetPassword-v2.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/miscellaneous/under-maintenance',
    name: 'misc-under-maintenance',
    component: () => import('@/views/pages/miscellaneous/UnderMaintenance.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/miscellaneous/not-authorized',
    name: 'misc-not-authorized',
    component: () => import('@/views/pages/miscellaneous/NotAuthorized.vue'),
    meta: {
      layout: 'blank',
      resource: 'Public',
    },
  },
  {
    path: '/pages/miscellaneous/error',
    name: 'misc-error',
    component: () => import('@/views/pages/miscellaneous/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/miscellaneous/coming-soon',
    name: 'misc-coming-soon',
    component: () => import('@/views/pages/miscellaneous/ComingSoon.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/knowledge-base',
    name: 'page-knowledge-base',
    component: () => import('@/views/pages/knowledge-base/KnowledgeBase.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/pages/knowledge-base/:category',
    name: 'page-knowledge-base-category',
    component: () => import('@/views/pages/knowledge-base/KnowledgeBaseCategory.vue'),
    meta: {
      layout: 'content',
      navActiveLink: 'page-knowledge-base',
    },
  },
  {
    path: '/pages/knowledge-base/:category/:slug',
    name: 'page-knowledge-base-question',
    component: () => import('@/views/pages/knowledge-base/KnowledgeBaseQuestion.vue'),
    meta: {
      layout: 'content',
      navActiveLink: 'page-knowledge-base',
    },
  },
  {
    path: '/pages/account-settings',
    name: 'page-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/pages/pricing',
    name: 'page-pricing',
    component: () => import('@/views/pages/pricing/Pricing.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/pages/faq',
    name: 'page-faq',
    component: () => import('@/views/pages/faq/Faq.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/pages/icons',
    name: 'ui-icons',
    component: () => import('@/views/pages/icons/Icons.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/pages/access-control',
    name: 'page-access-control',
    component: () => import('@/views/pages/access-control/AccessControl.vue'),
    meta: {
      layout: 'content',
      resource: 'Demo',
    },
  },

  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/core/module-manager',
    name: 'core-module-manager',
    component: () => import('@/views/core/setup/modules/datatable/Datatable.vue'),
    meta: {
      layout: 'content',
    },
  },

  {
    path: '/core/customisation',
    name: 'core-setup-customisation',
    component: () => import('@/views/core/setup/modules/Modules.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/checking-ui',
    name: 'checking-ui',
    component: () => import('@/views/forms/form-elements/file-input/FileInput.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/core/manageproperties/properties',
    name: 'core-manageproperties-properties',
    component: () => import('@/views/core/manageproperty/properties/Index.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/core/manageproperties/types',
    name: 'core-manageproperties-types',
    component: () => import('@/views/core/manageproperty/property_types/Index.vue'),
    meta: {
      layout: 'content',
    },
  },

  {
    path: '/core/manageproperties/main',
    name: 'core-manageproperties-main',
    component: () => import('@/views/core/manageproperty/main/Index.vue'),
    meta: {
      layout: 'content',
    },
  },

]

export default pages
