import { mdiCogOutline } from '@mdi/js'

export default [
  {
    subheader: 'CENSIS',
  },

  {
    title: 'Manage Property',
    icon: mdiCogOutline,
    children: [
      {
        title: 'Properties',
        to: 'censis-manageproperties-properties',
      },
      {
        title: 'Property Types',
        to: 'censis-manageproperties-types',
      },
      {
        title: 'Main Properties',
        to: 'censis-manageproperties-main',
      },

    ],
  },

]
