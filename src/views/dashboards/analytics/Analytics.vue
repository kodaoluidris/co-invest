<template>
  <v-row>

    <v-col
      cols="12"
      md="8"
    >
      <analytics-statistics-card></analytics-statistics-card>
    </v-col>


  
    <v-col
      cols="12"
      md="4"
    >
      <analytics-performance></analytics-performance>
    </v-col>
    <v-col
      cols="12"
      md="8"
    >
      <analytics-card-deposit-and-withdraw></analytics-card-deposit-and-withdraw>
    </v-col>

    <v-col
      cols="12"
      md="4"
    >
      <analytics-card-sales-by-countries></analytics-card-sales-by-countries>
    </v-col>
    <v-col
      cols="12"
      md="8"
    >
      <analytics-user-table></analytics-user-table>
    </v-col>
  </v-row>

</template>

<script>
import { mdiPoll, mdiLabelVariantOutline } from '@mdi/js'
import StatisticsCardProfitLineChart from '@core/components/statistics-card/StatisticsCardProfitLineChart.vue'
import StatisticsCardVertical from '@/@core/components/statistics-card/StatisticsCardVertical.vue'
import StatisticsCardSessionBarChart from '@core/components/statistics-card/StatisticsCardSessionBarChart.vue'

// demos
import AnalyticsCongratulationJohn from './AnalyticsCongratulationJohn.vue'
import AnalyticsStatisticsCard from './AnalyticsStatisticsCard.vue'
import AnalyticsCardTotalEarning from './AnalyticsCardTotalEarning.vue'
import AnalyticsPerformance from './AnalyticsPerformance.vue'
import AnalyticsCardDepositAndWithdraw from './AnalyticsCardDepositAndWithdraw.vue'
import AnalyticsCardSalesByCountries from './AnalyticsCardSalesByCountries.vue'
import AnalyticsUserTable from './AnalyticsUserTable.vue'
import AnalyticsWeeklyOverview from './AnalyticsWeeklyOverview.vue'

export default {
  components: {
    StatisticsCardProfitLineChart,
    StatisticsCardVertical,
    StatisticsCardSessionBarChart,
    AnalyticsCongratulationJohn,
    AnalyticsStatisticsCard,
    AnalyticsCardTotalEarning,
    AnalyticsPerformance,
    AnalyticsCardDepositAndWithdraw,
    AnalyticsCardSalesByCountries,
    AnalyticsUserTable,
    AnalyticsWeeklyOverview,
  },
  setup() {
    const profitLineChart = {
      statTitle: 'Total Profit',
      statistics: '$86.4k',
      series: [
        {
          data: [0, 20, 5, 30, 15, 45],
        },
      ],
    }

    const totalProfitOptions = {
      statTitle: 'Total Profit',
      icon: mdiPoll,
      color: 'secondary',
      subtitle: 'Weekly Project',
      statistics: '$25.6k',
      change: '+42%',
    }

    // vertical card options
    const newProjectOptions = {
      statTitle: 'New Project',
      icon: mdiLabelVariantOutline,
      color: 'primary',
      subtitle: 'Yearly Project',
      statistics: '862',
      change: '-18%',
    }

    const sessionBarChart = {
      statTitle: 'Sessions',
      statistics: '2,856',
      series: [
        {
          name: '2020',
          data: [45, 85, 65, 50, 70],
        },
      ],
    }

    return {
      profitLineChart,
      totalProfitOptions,
      newProjectOptions,
      sessionBarChart,
    }
  },
}
</script>
