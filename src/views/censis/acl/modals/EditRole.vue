<template>
  <v-dialog
    v-model="isDialogVisible"
    persistent
    max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Open Dialog
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">Edit Role</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>

            <v-col cols="12">
              <v-text-field
                label="Role Name"
                dense
                 type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                dense
                label="Role Display Name"
                type="text"
              ></v-text-field>
            </v-col>
             <v-col cols="12">
              <v-text-field
                dense
                label="Role Description"
                type="text"
              ></v-text-field>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          outlined
          @click="isDialogVisible = false"
        >
          Close
        </v-btn>
        <v-btn
          color="success"
          @click="isDialogVisible = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  setup() {
    const isDialogVisible = ref(false)

    return { isDialogVisible }
  },
}
</script>
