<template>
  <div>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          offset-md="8"
          md="4"
        >
          <v-text-field
            v-model="search"
            label="Search"
            dense
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="productList"
      :search="search"
      :items-per-page="5"
      class="table-kitchen-sink"
    >
      <!-- product -->
      <template #[`item.product.name`]="{item}">
        <div class="d-flex align-center">
          <v-avatar
            v-for="(category,index) in categoryIconFilter(item.product.category)"
            :key="index"
            size="46"
            :color="category.color"
            :class="`primary--text`"
            class="v-avatar-light-bg m-2"
          >
            <v-icon
              size="30"
              :color="`primary--text`"
              class="rounded-0"
            >
              {{ category.icon }}
            </v-icon>
          </v-avatar>
          <span class="ms-1 text-no-wrap font-weight-semibold">{{ item.product.name }}</span>
        </div>
      </template>

      <template #[`item.date`]="{item}">
        <span class="text-no-wrap">{{ item.date }}</span>
      </template>

      <!-- category -->
      <template #[`item.category`]="{item}">
        <div class="d-flex align-center">
          <span class="ms-1 text-no-wrap">{{ item.category }}</span>
        </div>
      </template>

      <!-- version -->
      <template #[`item.version`]="{item}">
        <div class="d-flex align-center">
          <span class="text-no-wrap font-weight-semibold text--primary ms-2">{{ item.version }}</span>
        </div>
      </template>

      <!-- payment -->
      <template #[`item.payment`]="{item}">
        <div class="d-flex flex-column">
          <span class="text-xs text-no-wrap">{{ item.payment.received_payment_status }}</span>
        </div>
      </template>

      <!-- status -->
      <template #[`item.status`]="{item}">
        <v-chip
          :color="statusColor[item.payment.status]"
          :class="`${statusColor[item.payment.status]}--text`"
          class="v-chip-light-bg"
          small
        >
          {{ item.payment.status }}
        </v-chip>
      </template>
      <template #[`item.delete`]="">
        <a><v-icon>{{ icons.mdiDeleteOutline }}</v-icon></a>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import {
  mdiMagnify,
  mdiDeleteOutline,
  mdiMouse,
  mdiGlasses,
  mdiWatchVariant,
  mdiBagPersonalOutline,
  mdiTapeDrive,
  mdiBluetooth,
  mdiControllerClassicOutline,
  mdiHomeOutline,
  mdiVirtualReality,
  mdiShoeSneaker,
  mdiFlash,
  mdiProjector,
  mdiIpod,
  mdiKeyboardVariant,
  mdiCellphone,
  mdiTelevision,
  mdiGoogleHome,
  mdiApple,
  mdiHeadphones,
  mdiDesktopMac,
} from '@mdi/js'

export default {
  setup() {
    const search = ref('')
    const productList = ref([])
    const categoryIcons = [
      { name: 'Mouse', icon: mdiMouse, color: 'warning' },
      { name: 'Glass', icon: mdiGlasses, color: 'primary' },
      { name: 'Smart Watch', icon: mdiWatchVariant, color: 'success' },
      { name: 'Bag', icon: mdiBagPersonalOutline, color: 'info' },
      { name: 'Storage Device', icon: mdiTapeDrive, color: 'warning' },
      { name: 'Bluetooth', icon: mdiBluetooth, color: 'error' },
      { name: 'Gaming', icon: mdiControllerClassicOutline, color: 'warning' },
      { name: 'Home', icon: mdiHomeOutline, color: 'error' },
      { name: 'VR', icon: mdiVirtualReality, color: 'primary' },
      { name: 'Shoes', icon: mdiShoeSneaker, color: 'success' },
      { name: 'Electronics', icon: mdiFlash, color: 'info' },
      { name: 'Projector', icon: mdiProjector, color: 'warning' },
      { name: 'IPod', icon: mdiIpod, color: 'error' },
      { name: 'Keyboard', icon: mdiKeyboardVariant, color: 'primary' },
      { name: 'Smart Phone', icon: mdiCellphone, color: 'success' },
      { name: 'Smart TV', icon: mdiTelevision, color: 'info' },
      { name: 'Google Home', icon: mdiGoogleHome, color: 'warning' },
      { name: 'Mac', icon: mdiApple, color: 'error' },
      { name: 'Headphone', icon: mdiHeadphones, color: 'primary' },
      { name: 'IMac', icon: mdiDesktopMac, color: 'success' },
      { name: 'IPhone', icon: mdiApple, color: 'warning' },
    ]
    const statusColor = { Confirmed: 'primary', Completed: 'success', Cancelled: 'error' }

    const categoryIconFilter = categoryName => {
      const index = categoryIcons.findIndex(category => category.name === categoryName)

      if (index !== -1) return [{ icon: categoryIcons[index].icon, color: categoryIcons[index].color }]

      return false
    }



    return {
      icons: {
        mdiMagnify,
        mdiDeleteOutline,
      },
      search,
      statusColor,
      headers: [

        { text: 'MODULE NAME', value: 'product.name' },
        { text: 'DESCRIPTION', value: 'date' },
        { text: 'CATEGORY', value: 'category' },
        { text: 'VERSION', value: 'buyer.name' },
        { text: 'PAYMENT', value: 'payment', sortable: false },
        { text: 'STATUS', value: 'status', sortable: false },
        { text: 'ACTIONS', value: 'delete', sortable: false },
      ],
      categoryIconFilter,
      productList,
      categoryIcons,
    }
  },
  created() {
    this.productList = [
      {
    version: 'V1',
    product: {
      id: 19,
      name: 'Admission',
      brand: 'Philips',
      category: 'Smart Phone',
      image: require('@/assets/images/eCommerce/9.png'),
      hasFreeShipping: false,
      rating: 4,
      description:
        'The OnePlus 7 Pro features a brand new design, with a glass back and front and curved sides. The phone feels\n    very premium but\u2019s it\u2019s also very heavy. The Nebula Blue variant looks slick but it\u2019s quite slippery, which\n    makes single-handed use a real challenge. It has a massive 6.67-inch \u2018Fluid AMOLED\u2019 display with a QHD+\n    resolution, 90Hz refresh rate and support for HDR 10+ content. The display produces vivid colours, deep blacks\n    and has good viewing angles.',
    },
    date: '30 Apr 2020',
    buyer: {
      name: 'V1',
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
    version: 'V1', 
    product: {
      id: 21,
      name: 'Bursary',
      slug: 'bursary',
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
    version: 'V1',
    product: {
      id: 17,
      name: 'Registrations',
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
  }
    ];
    // this.$http.get('/data-table/data').then(res => {
    //   this.productList = res.data
    //   //console.log(res.data);
    // })
  },
}
</script>

<style lang="scss" scoped>
.table-kitchen-sink ::v-deep {
  .v-data-table-header {
    white-space: nowrap;
  }
}
</style>
