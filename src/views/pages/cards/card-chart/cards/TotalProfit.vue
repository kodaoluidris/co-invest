<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          sm="7"
          class="total-profit-chart-col"
        >
          <v-card-title class="px-0 pt-0">
            College Statistics
          </v-card-title>
          <vue-apex-charts
            id="total-profit-chart"
            height="320"
            :options="chartOptions"
            :series="chartData"
          ></vue-apex-charts>
        </v-col>

        <v-col
          cols="12"
          sm="5"
        >

          <v-card elevation="0">
            <!-- Title/Header -->
            <v-card-title class="align-start pt-0 flex-nowrap">
            Gender Statistics
            </v-card-title>

            <v-card-text class="pb-0 pt-5">
              <!-- List -->
              <v-list
                two-line
                subheader
              >
                <!-- List Item: Profit -->
                <v-list-item class="pa-0">
                  <v-list-item-avatar
                    class="v-avatar-light-bg success--text justify-center"
                    size="40"
                    rounded
                  >
                    <v-icon
                      size="30"
                      color="success"
                    >
                      {{ icons.mdiGenderFemale }}
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-semibold">
                      48,568
                    </v-list-item-title>
                    <v-list-item-subtitle>Female</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <!-- List Item: Income -->
                <v-list-item class="pa-0">
                  <v-list-item-avatar
                    class="v-avatar-light-bg primary--text justify-center"
                    size="40"
                    rounded
                  >
                    <v-icon
                      size="30"
                      color="primary"
                    >
                      {{ icons.mdiGenderMale }}
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-semibold">
                      38,453
                    </v-list-item-title>
                    <v-list-item-subtitle>Male</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <!-- List Item: Expense -->
                <v-list-item class="pa-0">
                  <v-list-item-avatar
                    color="primary"
                    class="v-avatar-light-bg secondary--text justify-center"
                    size="40"
                    rounded
                  >
                    <v-icon
                      size="30"
                      color="secondary"
                    >
                      {{ icons.mdiGenderMaleFemale }}
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-semibold">
                      200,453
                    </v-list-item-title>
                    <v-list-item-subtitle>Total</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <!-- Action Button -->
              <v-btn
                block
                color="primary"
              >
                View Detailed Report
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
// eslint-disable-next-line object-curly-newline
import { mdiDotsVertical, mdiTrendingUp, mdiCurrencyUsd, mdiChartBar, mdiGenderMale,  mdiGenderFemale, mdiGenderMaleFemale } from '@mdi/js'
import { getVuetify } from '@core/utils'
import { kFormatter } from '@core/utils/filter'

export default {
  components: {
    VueApexCharts,
  },
  setup() {
    const $vuetify = getVuetify()

    const chartOptions = {
      colors: [
        $vuetify.theme.currentTheme.primary,
        $vuetify.theme.currentTheme.success,
        $vuetify.theme.currentTheme.secondary,
      ],
      chart: {
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '35%',
          startingShape: 'rounded',
          endingShape: 'rounded',
        },
      },
      xaxis: {
        categories: ['COHUM', 'COSIT', 'COSMAS', 'COSPED', 'COVTED'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          formatter: value => kFormatter(value, 0),
        },
      },
      grid: {
        strokeDashArray: 7,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      stroke: {
        curve: 'smooth',
        width: 6,
        lineCap: 'round',
        colors: ['#fff'],
      },
      responsive: [
        {
          breakpoint: 1650,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '45%',
              },
            },
          },
        },
      ],
    }

    const chartData = [
      {
        name: 'MALE',
        data: [29000, 22000, 25000, 19000, 30000],
      },
      {
        name: 'FEMALE',
        data: [10000, 16000, 11000, 15000, 10000],
      },

    ]

    return {
      chartOptions,
      chartData,

      icons: {
        mdiDotsVertical,
        mdiTrendingUp,
        mdiCurrencyUsd,
        mdiChartBar,
        mdiGenderMale,
        mdiGenderFemale,
        mdiGenderMaleFemale
      },
    }
  },
}
</script>

<style lang="scss">
@import '~@core/preset/preset/mixins.scss';
@import '~vuetify/src/styles/styles.sass';
@media #{map-get($display-breakpoints, 'sm-and-up')} {
  .total-profit-chart-col {
    @include ltr() {
      border-right: thin solid;
    }
    @include rtl() {
      border-left: thin solid;
    }
  }
}
@include theme--child(total-profit-chart-col) using ($material) {
  @media #{map-get($display-breakpoints, 'sm-and-up')} {
    border-color: map-get($material, 'dividers');
  }
}
</style>
