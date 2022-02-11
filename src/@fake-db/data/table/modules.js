import mock from '@/@fake-db/mock'

const data = [
  {
    product: {
      id: 19,
      name: 'OnePlus 7 Pro ',
      slug: 'one-plus-7-pro-19',
      brand: 'Philips',
      category: 'Smart Phone',
      price: 14.99,
      image: require('@/assets/images/eCommerce/9.png'),
      hasFreeShipping: false,
      rating: 4,
      description:
        'The OnePlus 7 Pro features a brand new design, with a glass back and front and curved sides. The phone feels\n    very premium but\u2019s it\u2019s also very heavy. The Nebula Blue variant looks slick but it\u2019s quite slippery, which\n    makes single-handed use a real challenge. It has a massive 6.67-inch \u2018Fluid AMOLED\u2019 display with a QHD+\n    resolution, 90Hz refresh rate and support for HDR 10+ content. The display produces vivid colours, deep blacks\n    and has good viewing angles.',
    },
    date: '30 Apr 2020',
    buyer: {
      name: 'Ana Smith',
      avatar: require('@/assets/images/avatars/3.png'),
    },
    payment: {
      total: 984,
      received_payment_status: 'Fully Paid',
      paid_amount: 984,
      status: 'Completed',
    },
  },
  {
    product: {
      id: 21,
      name: 'Google - Google Home',
      slug: 'google-google-home-white-slate-fabric-21',
      brand: 'Google',
      category: 'Google Home',
      price: 129.29,
      image: require('@/assets/images/eCommerce/7.png'),
      hasFreeShipping: true,
      rating: 4,
      description:
        'Simplify your everyday life with the Google Home, a voice-activated speaker powered by the Google Assistant. Use\n    voice commands to enjoy music, get answers from Google and manage everyday tasks. Google Home is compatible with\n    Android and iOS operating systems, and can control compatible smart devices such as Chromecast or Nest.',
    },
    date: '11 Jul 2020',
    buyer: {
      name: 'Lindsay Green',
      avatar: require('@/assets/images/avatars/8.png'),
    },
    payment: {
      total: 1101,
      received_payment_status: 'Fully Paid',
      paid_amount: 1101,
      status: 'Completed',
    },
  },
  {
    product: {
      id: 17,
      name: 'Nike Air Max',
      slug: '72-9301-speaker-wire-harness-adapter-for-most-plymouth-dodge-and-mitsubishi-vehicles-multi-17',
      description:
        'With a bold application of colorblocking inspired by modern art styles, the Nike Air Max 270 React sneaker is constructed with layers of lightweight material to achieve its artful look and comfortable feel.',
      brand: 'Nike',
      category: 'Shoes',
      price: 81.99,
      image: require('@/assets/images/eCommerce/11.png'),
      hasFreeShipping: true,
      rating: 5,
    },
    date: '06 Jan 2021',
    buyer: {
      name: 'Ethan Lee',
      avatar: require('@/assets/images/avatars/1.png'),
    },
    payment: {
      total: 726,
      received_payment_status: 'Partially Paid',
      paid_amount: 126,
      status: 'Confirmed',
    },
  },

]

mock.onGet('/data-table/modules').reply(() => [200, data])
