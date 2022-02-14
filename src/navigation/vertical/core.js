import { mdiCogOutline } from '@mdi/js'

export default [
  {
    subheader: 'Core',
  },

  {
    title: 'Property',
    icon: mdiCogOutline,
    children: [
      {
        title: 'Properties',
        to: 'core-manageproperties-properties',
      },
      {
        title: 'Property Types',
        to: 'core-manageproperties-types',
      },
      {
        title: 'Main Properties',
        to: 'core-manageproperties-main',
      },

    ],
  },

]
