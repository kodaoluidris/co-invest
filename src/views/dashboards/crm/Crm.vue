<template>
  <div>
      <v-row class="mb-5">
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card>
          <v-card-text class="d-flex align-center justify-space-between pa-4">
            <div>
              <h2 class="font-weight-semibold mb-1">
                123
              </h2>
              <span>Colleges</span>
            </div>

            <v-avatar
              color="success"
              :class="`v-avatar-light-bg primary--text`"
            >
              <v-icon
                size="25"
                 color="primary"
                class="rounded-0"
              >
               {{ icons.mdiSchool }}
              </v-icon>
            </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card>
          <v-card-text class="d-flex align-center justify-space-between pa-4">
            <div>
              <h2 class="font-weight-semibold mb-1">
                123
              </h2>
              <span>Departments</span>
            </div>

           <v-avatar
              color="success"
              :class="`v-avatar-light-bg success--text`"
            >
              <v-icon
                size="25"
                 color="success"
                class="rounded-0"
              >
               {{ icons.mdiSchool }}
              </v-icon>
            </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>



         <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card>
          <v-card-text class="d-flex align-center justify-space-between pa-4">
            <div>
              <h2 class="font-weight-semibold mb-1">
                123
              </h2>
              <span>Programmes</span>
            </div>

           <v-avatar
              color="success"
              :class="`v-avatar-light-bg info--text`"
            >
              <v-icon
                size="25"
                 color="info"
                class="rounded-0"
              >
               {{ icons.mdiSchool }}
              </v-icon>
            </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>

       <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card>
          <v-card-text class="d-flex align-center justify-space-between pa-4">
            <div>
              <h2 class="font-weight-semibold mb-1">
                123
              </h2>
              <span>Courses</span>
            </div>

           <v-avatar
              color="success"
              :class="`v-avatar-light-bg secondary--text`"
            >
              <v-icon
                size="25"
                 color="secondary"
                class="rounded-0"
              >
               {{ icons.mdiSchool }}
              </v-icon>
            </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>




    </v-row>

    <v-row class="match-height">
      <v-col
        cols="12"
        md="8"
      >
        <total-profit></total-profit>
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <total-visitors></total-visitors>
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <weekly-sales></weekly-sales>
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <total-revenue></total-revenue>
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <weekly-overview></weekly-overview>
      </v-col>
    </v-row>
    <v-row class="ml-2">
        Modules
    </v-row>
     <v-row>
      <!-- horizontal statistics card -->
      <v-col
        cols="12"
        md="3"
        sm="6"
      >
       <a href="" style="text-decoration: none">
          <statistics-card-horizontal
          color="primary"
          :icon="icons.mdiAccountOutline"
          statistics="Admissions"
        ></statistics-card-horizontal>
       </a>
      </v-col>

       <v-col
        cols="12"
        md="3"
        sm="6"
      >
       <a href="" style="text-decoration: none">
          <statistics-card-horizontal
          color="success"
          :icon="icons.mdiCurrencyUsd"
          statistics="Bursary"
        ></statistics-card-horizontal>
       </a>
      </v-col>

       <v-col
        cols="12"
        md="3"
        sm="6"
      >
       <a href="" style="text-decoration: none">
          <statistics-card-horizontal
          color="info"
          :icon="icons.mdiAccountPlus"
          statistics="Registration"
        ></statistics-card-horizontal>
       </a>
      </v-col>

       <v-col
        cols="12"
        md="3"
        sm="6"
      >
       <a href="" style="text-decoration: none">
          <statistics-card-horizontal
          color="warning"
          :icon="icons.mdiBookAccount"
          statistics="Result"
        ></statistics-card-horizontal>
       </a>
      </v-col>

       <v-col
        cols="12"
        md="3"
        sm="6"
      >
       <a href="" style="text-decoration: none">
          <statistics-card-horizontal
          color="info"
          :icon="icons.mdiLaptop"
          statistics="E-Learning"
        ></statistics-card-horizontal>
       </a>
      </v-col>

       <v-col
        cols="12"
        md="3"
        sm="6"
      >
       <a href="" style="text-decoration: none">
          <statistics-card-horizontal
          color="success"
          :icon="icons.mdiBookCheck"
          statistics="E-Assessment"
        ></statistics-card-horizontal>
       </a>
      </v-col>

       <v-col
        cols="12"
        md="3"
        sm="6"
      >
       <a href="" style="text-decoration: none">
          <statistics-card-horizontal
          color="warning"
          :icon="icons.mdiAccountGroup"
          statistics="Senate Decision"
        ></statistics-card-horizontal>
       </a>
      </v-col>

        <v-col
        cols="12"
        md="3"
        sm="6"
      >
       <a href="" style="text-decoration: none">
          <statistics-card-horizontal
          color="secondary"
          :icon="icons.mdiBottleTonicPlus"
          statistics="Health Center"
        ></statistics-card-horizontal>
       </a>
      </v-col>

        <v-col
        cols="12"
        md="3"
        sm="6"
      >
       <a href="" style="text-decoration: none">
          <statistics-card-horizontal
          color="error"
          :icon="icons.mdiCertificate"
          statistics="O'Level Service"
        ></statistics-card-horizontal>
       </a>
      </v-col>

        <v-col
        cols="12"
        md="3"
        sm="6"
      >
       <a href="" style="text-decoration: none">
          <statistics-card-horizontal
          color="primary"
          :icon="icons.mdiCastEducation"
          statistics="Teaching Practice"
        ></statistics-card-horizontal>
       </a>
      </v-col>

      <!--/ horizontal statistics card -->
    </v-row>
  </div>
</template>

<script>
import TotalProfit from '../../pages/cards/card-chart/cards/TotalProfit.vue'
import TotalVisitors from '../../pages/cards/card-chart/cards/TotalVisitors.vue'
import WeeklySales from '../../pages/cards/card-chart/cards/WeeklySales.vue'
import TotalRevenue from '../../pages/cards/card-chart/cards/TotalRevenue.vue'
import WeeklyOverview from '../../pages/cards/card-chart/cards/WeeklyOverview.vue'
import { mdiSchool, mdiAccountOutline, mdiCurrencyUsd, mdiTrendingUp, mdiPoll,mdiAccountPlus, mdiBookAccount, mdiLaptop, mdiBookCheck, mdiAccountGroup, mdiBottleTonicPlus, mdiCertificate, mdiCastEducation } from '@mdi/js'
import StatisticsCardHorizontal from '@/@core/components/statistics-card/StatisticsCardHorizontal.vue'
import StatisticsCard from '../../pages/cards/card-statistics/CardStatisticsCard.vue'




export default {
  components: {
    TotalProfit,
    TotalVisitors,
    WeeklySales,
    TotalRevenue,
    WeeklyOverview,
    StatisticsCardHorizontal,
    StatisticsCard
  },
    setup() {
      // transparent background card
    const newCustomerOptions = {
      icon: mdiAccountOutline,
      color: 'primary',
    }

    // transparent background card
    const totalRevenueOptions = {
      statTitle: 'Total Revenue',
      statistics: '28.6k',
      change: '+25.8%',
      icon: mdiCurrencyUsd,
      color: 'success',
    }

    // transparent background card
    const newTransactions = {
      statTitle: 'New Transactions',
      statistics: '13.6k',
      change: '-25.8%',
      icon: mdiTrendingUp,
      color: 'info',
    }

    // transparent background card
    const totalProfit = {
      statTitle: 'Total Profit',
      statistics: '2,856',
      change: '+25.8%',
      icon: mdiPoll,
      color: 'warning',
    }



    // card with images
    const ratingsOptions = {
      statTitle: 'Ratings',
      statistics: '13k',
      change: '+38%',
      chipText: 'Year of 2021',
      chipColor: 'primary',
      avatar: require('@/assets/images/avatars/9.png'),
      avatarWidth: '112',
    }



    return {
      icons: {
        mdiSchool,
         mdiAccountOutline, mdiCurrencyUsd, mdiAccountPlus,mdiBookAccount, mdiLaptop, mdiBookCheck, mdiAccountGroup,mdiBottleTonicPlus, mdiCertificate, mdiCastEducation
      },
       newCustomerOptions,
      totalRevenueOptions,
      newTransactions,
      totalProfit,
    }
  },

}
</script>
