import {
  mdiAccountOutline,
  mdiAccountPlusOutline,
  mdiAlertOutline,
  mdiAlphaBBoxOutline,
  mdiAlphaTBoxOutline,
  mdiBellOutline,
  mdiCalendarOutline,
  mdiChartBar,
  mdiChartDonut,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarkedOutline,
  mdiCheckCircleOutline,
  mdiClockOutline,
  mdiCloseOctagonOutline,
  mdiCogOutline,
  mdiContentCopy,
  mdiControllerClassicOutline,
  mdiCreditCardOutline,
  mdiCurrencyUsd,
  mdiDebugStepOver,
  mdiDotsHorizontal,
  mdiEmailOutline,
  mdiEyeOutline,
  mdiFamilyTree,
  mdiFileDocumentOutline,
  mdiFileMusicOutline,
  mdiFileOutline,
  mdiFormatAlignCenter,
  mdiFormatAlignLeft,
  mdiFormatListBulleted,
  mdiHelpCircleOutline,
  mdiHomeOutline,
  mdiInformationOutline,
  mdiKeyOutline,
  mdiLockOutline,
  mdiMapOutline,
  mdiMemory,
  mdiMessageTextOutline,
  mdiPlus,
  mdiPoll,
  mdiPound,
  mdiRadioboxMarked,
  mdiRayVertex,
  mdiStarOutline,
  mdiTagOutline,
  mdiToggleSwitchOffOutline,
  mdiViewGridOutline,
} from '@mdi/js'

/* eslint-disable */
// prettier-ignore
export default [
  { header: 'Pages' },

  // dashboard
  { title: 'CRM', to: { name: 'dashboard-crm' }, icon: mdiHomeOutline },
  { title: 'Analytics', to: { name: 'dashboard-analytics' }, icon: mdiHomeOutline },
  { title: 'eCommerce', to: { name: 'dashboard-eCommerce' }, icon: mdiHomeOutline },

  // Apps
  { title: 'Calendar', to: { name: 'apps-calendar' }, icon: mdiCalendarOutline },
  { title: 'Chat', to: { name: 'apps-chat' }, icon: mdiMessageTextOutline },

  { title: 'Invoice List', to: { name: 'apps-invoice-list' }, icon: mdiFileDocumentOutline },
  {
    title: 'Invoice Preview',
    to: { name: 'apps-invoice-preview', params: { id: 4987 } },
    icon: mdiFileDocumentOutline,
  },
  { title: 'Invoice Edit', to: { name: 'apps-invoice-edit', params: { id: 4987 } }, icon: mdiFileDocumentOutline },
  { title: 'Invoice Add', to: { name: 'apps-invoice-add' }, icon: mdiFileDocumentOutline },

  { title: 'User List', to: { name: 'apps-user-list' }, icon: mdiAccountOutline },
  { title: 'User View', to: { name: 'apps-user-view', params: { id: 21 } }, icon: mdiAccountOutline },
  { title: 'Email', to: { name: 'apps-email' }, icon: mdiEmailOutline },

  // authentication
  { title: 'Login v1', to: { name: 'auth-login-v1' }, icon: mdiLockOutline },
  { title: 'Login v2', to: { name: 'auth-login-v2' }, icon: mdiLockOutline },
  { title: 'Register v1', to: { name: 'auth-register-v1' }, icon: mdiAccountPlusOutline },
  { title: 'Register v2', to: { name: 'auth-register-v2' }, icon: mdiAccountPlusOutline },
  { title: 'Forgot Password v1', to: { name: 'auth-forgot-password-v1' }, icon: mdiKeyOutline },
  { title: 'Forgot Password v2', to: { name: 'auth-forgot-password-v2' }, icon: mdiKeyOutline },
  { title: 'Reset Password v1', to: { name: 'auth-reset-password-v1' }, icon: mdiKeyOutline },
  { title: 'Reset Password v2', to: { name: 'auth-reset-password-v2' }, icon: mdiKeyOutline },


   // setup
   { title: 'Institution', to: { name: 'page-knowledge-base' }, icon: mdiInformationOutline },
   { title: 'Campus Setup', to: { name: 'page-account-settings' }, icon: mdiCogOutline },
   { title: 'Module Manager', to: { name: 'page-pricing' }, icon: mdiCurrencyUsd },
   { title: 'Customisation', to: { name: 'page-faq' }, icon: mdiHelpCircleOutline },
 
    // Academics
    { title: 'Academics', to: { name: 'page-knowledge-base' }, icon: mdiInformationOutline },
    { title: 'College', to: { name: 'page-account-settings' }, icon: mdiCogOutline },
    { title: 'Programme', to: { name: 'page-pricing' }, icon: mdiCurrencyUsd },
    { title: 'Specialization', to: { name: 'page-faq' }, icon: mdiHelpCircleOutline },
 
     // ACL
   { title: 'Permission', to: { name: 'page-knowledge-base' }, icon: mdiInformationOutline },
   { title: 'Roles', to: { name: 'page-account-settings' }, icon: mdiCogOutline },
   { title: 'Assign Permission', to: { name: 'page-pricing' }, icon: mdiCurrencyUsd },
   { title: 'Assign Roles', to: { name: 'page-faq' }, icon: mdiHelpCircleOutline },
 
    // Users
    { title: 'Staff', to: { name: 'censis-user-staff' }, icon: mdiInformationOutline },
    { title: 'Student', to: { name: 'censis-user-student' }, icon: mdiCogOutline },
    { title: 'Prospective', to: { name: 'censis-user-prospective' }, icon: mdiCurrencyUsd },

    // Course Manager
    { title: 'Curriculum', to: { name: 'censis-coursemanager-curriculum' }, icon: mdiInformationOutline },
    { title: 'Course Bank', to: { name: 'censis-coursemanager-coursebank' }, icon: mdiCogOutline },
    { title: 'Programme Currriculum', to: { name: 'censis-coursemanager-programmecurriculum' }, icon: mdiCurrencyUsd },

  // Contacts
  { header: 'Contacts' },
  { avatar: require('@/assets/images/avatars/6.png'), title: 'Rena Brant', email: 'nephrod@preany.co.uk', time: '21/05/2019' },
  { avatar: require('@/assets/images/avatars/4.png'), title: 'Mariano Packard', email: 'seek@sparaxis.org', time: '14/01/2018' },
  { avatar: require('@/assets/images/avatars/3.png'), title: 'Risa Montufar', email: 'vagary@unblist.org', time: '10/08/2019' },
  { avatar: require('@/assets/images/avatars/7.png'), title: 'Maragaret Cimo', email: 'designed@insanely.net', time: '01/12/2019' },
  { avatar: require('@/assets/images/avatars/8.png'), title: 'Jona Prattis', email: 'unwieldable@unblist.org', time: '21/05/2019' },
  { avatar: require('@/assets/images/avatars/5.png'), title: 'Edmond Chicon', email: 'museist@anaphyte.co.uk', time: '15/11/2019' },
  { avatar: require('@/assets/images/avatars/6.png'), title: 'Abbey Darden', email: 'astema@defectively.co.uk', time: '07/05/2019' },
  { avatar: require('@/assets/images/avatars/1.png'), title: 'Seema Moallankamp', email: 'fernando@storkish.co.uk', time: '13/08/2017' },
  { avatar: require('@/assets/images/avatars/3.png'), title: 'Charleen Warmington', email: 'furphy@cannibal.net', time: '11/08/1891' },
  { avatar: require('@/assets/images/avatars/5.png'), title: 'Geri Linch', email: 'insignia@markab.org', time: '18/01/2015' },
  { avatar: require('@/assets/images/avatars/2.png'), title: 'Shellie Muster', email: 'maxillary@equalize.co.uk', time: '26/07/2019' },
  { avatar: require('@/assets/images/avatars/7.png'), title: 'Jesenia Vanbramer', email: 'hypotony@phonetist.net', time: '12/09/2017' },
  { avatar: require('@/assets/images/avatars/1.png'), title: 'Mardell Channey', email: 'peseta@myrica.com', time: '11/11/2019' },



 
]
