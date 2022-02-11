import {
  mdiAccountOutline,
  mdiCalendarOutline,
  mdiEmailOutline,
  mdiFileDocumentOutline,
  mdiFileOutline,
  mdiMessageTextOutline,
  mdiCogOutline,
  mdiAbacus,
  mdiAccountCogOutline,
  mdiFormSelect,
} from '@mdi/js'

export default [
  {
    subheader: 'CENSIS',
  },

  {
    title: 'Setup',
    icon: mdiCogOutline,
    children: [
      {
        title: 'Institution',
        to: 'censis-setup-institution',
      },
      {
        title: 'Campus',
        to: 'censis-setup-campus',
      },
      {
        title: 'Study Programmes',
        to:'censis-setup-study-programme',
      },
      {
        title: 'Module Manager',
        to: 'censis-module-manager',
      },
      {
        title: 'Customisation',
        to:'censis-setup-customisation' ,
      },
    ],
  },

  {
    title: 'Academics',
    icon: mdiFormSelect,
    children: [
      {
        title: 'College',
        to: 'censis-academics-college',
      },
      {
        title: 'Department',
        to: 'censis-academics-department',
      },
      {
        title: 'Programme',
        to: 'censis-academics-programme',
      },
      {
        title: 'Specialization',
        to: 'censis-academics-specialization',
      },
    ],
  },


  {
    title: 'ACL',
    icon: mdiAbacus,
    children: [
      {
        title: 'Roles and Permissions',
        to:'censis-acl-roles' ,
      },
      {
        title: 'Assignment',
        to: 'censis-acl-permissions',
      },

      // {
      //   title: 'Assign Permission',
      //   to:'censis-assign-permission' ,
      // },
      // {
      //   title: 'Assign Roles"',
      //   to:'cencis-assign-roles' ,
      // },
    ],
  },


  {
    title: 'Users',
    icon: mdiAccountCogOutline,
    children: [
      {
        title: 'Staff',
        to: 'censis-users-staff',
      },
      {
        title: 'Student',
        to: 'censis-users-students',
      },
      {
        title: 'Prospective',
        to: 'censis-users-prospective',
      },
    ],
  },
  {
    title: 'Course Manager',
    icon: mdiAccountCogOutline,
    children: [
      {
        title: 'Curriculum',
        to: 'censis-coursemanager-curriculum',
      },
      {
        title: 'Coursebank',
        to:'censis-coursemanager-coursebank' ,
      },
      {
        title: 'Programme Curriculum',
        to:'censis-coursemanager-programmecurriculum' ,
      },
    ],
  },

]
