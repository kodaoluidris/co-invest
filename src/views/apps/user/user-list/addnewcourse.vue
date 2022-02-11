<template>
  <v-navigation-drawer
    :value="isAddNewCourseSidebarActive"
    temporary
    touchless
    :right="!$vuetify.rtl"
    :width="$vuetify.breakpoint.smAndUp ? 550 : '200%'"
    app
    @input="val => $emit('update:is-add-new-course-sidebar-active', val)"
  >
    <v-card height="100%;">
      <div class="mt-4 ml-5" style="width: 90%">
        <p>Courses</p>
        <v-combobox v-model="select" :items="items" multiple solo></v-combobox>
      </div>

      <div class="ml-5" style="width: 90%">
        <p>Study Mode</p>
        <v-combobox v-model="study" :items="mode" multiple solo></v-combobox>
      </div>

      <div class="ml-5" style="width: 90%">
        <p>Entry Mode</p>
        <v-combobox v-model="entry" :items="modes" multiple solo></v-combobox>
      </div>

      <div class="ml-5" style="width: 90%">
        <p>Level</p>
        <v-combobox v-model="level" :items="levels" multiple solo></v-combobox>
      </div>

      <div class="ml-5" style="width: 90%">
        <p>Award Degree</p>
        <v-combobox v-model="award" :items="degree" multiple solo></v-combobox>
      </div>

      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
          <v-btn color="primary" class="me-3" type="submit"> Add </v-btn>
          <v-btn color="secondary" outlined type="reset" @click="resetuserData"> Cancel </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mdiClose } from '@mdi/js'
import countries from '@/@fake-db/data/other/countries'
import store from '@/store'
import { ref } from '@vue/composition-api'
import { required, emailValidator } from '@core/utils/validation'

export default {
  model: {
    prop: 'isAddNewCourseSidebarActive',
    event: 'update:is-add-new-course-sidebar-active',
  },
  props: {
    isAddNewCourseSidebarActive: {
      type: Boolean,
      required: true,
    },
    roleOptions: {
      type: Array,
      required: true,
    },
    planOptions: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const blankUserData = {
      fullName: '',
      username: '',
      email: '',
      role: null,
      currentPlan: null,
      company: '',
      country: '',
      contact: '',
    }

    //StudyProgramme studymode
    const select = ref(['Undergraduate'])
    const study = ref(['Full Time'])
    const entry = ref(['UTME'])
    const level = ref(['100'])
    const award = ref(['BSc'])
    const items = ['Undergraduate', 'Postgraduate', 'Prelim']
    const mode = ['Full Time', 'Part Time']
    const modes = ['UTME', 'DE']
    const levels = ['100', '200', '300', '400', '500']
    const degree = ['BSc', 'BA.Ed', 'Msc', 'Ph.D', 'PGD', 'PGDE']

    const valid = ref(false)
    const form = ref(null)

    const validate = () => {
      form.value.validate()
    }

    const resetForm = () => {
      form.value.reset()
    }

    const userData = ref(JSON.parse(JSON.stringify(blankUserData)))
    const resetuserData = () => {
      userData.value = JSON.parse(JSON.stringify(blankUserData))
      resetForm()
      emit('update:is-add-new-course-sidebar-active', false)
    }

    const onSubmit = () => {
      if (valid.value) {
        store.dispatch('app-user/addUser', userData.value).then(() => {
          emit('refetch-data')
          emit('update:is-add-new-course-sidebar-active', false)
        })

        resetuserData()
      } else {
        validate()
      }
    }

    return {
      resetuserData,
      form,
      onSubmit,
      countries,
      userData,
      valid,
      validate,
      select,
      items,
      study,
      mode,
      entry,
      modes,
      level,
      levels,
      award,
      degree,
      // validation
      validators: { required, emailValidator },
      icons: {
        mdiClose,
      },
    }
  },
}
</script>
