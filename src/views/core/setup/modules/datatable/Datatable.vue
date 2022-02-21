<template>
  <v-row>
    <!-- kitchen sink -->
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <span class="headline">Module Manager</span>
        </v-card-title>
        <demo-datatable-kitchen-sink></demo-datatable-kitchen-sink>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AppCardCode from '@/@core/components/app-card-code/AppCardCode.vue'

// demos
import DemoDatatableKitchenSink from './demos/DemoDatatableKitchenSink.vue'

// code
import {
  datatableKitchenSink,
} from './demos/code'

export default {
  components: {
    AppCardCode,
    DemoDatatableKitchenSink,
  },
  setup() {
    return {
      codeSnippets: {
        datatableKitchenSink,
      },
    }
  },
}
</script>
