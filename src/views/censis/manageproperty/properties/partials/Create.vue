<template>
  <div>
    <VueElementLoading
      :active="loading"
      spinner="bar-fade-scale"
      color="var(--primary)"
      text="Submitting data.."
      duration="0.6"
    />

    <b-form
      @submit.prevent="save"
      @reset="onReset"
    >
      <b-form-group
        label="Name"
        class="mb-3"
      >
        <b-form-input
          v-model="form.name"
          type="text"
          placeholder="Enter property name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Status"
        label-for="input-3"
        class="my-3"
      >
        <select
          v-model="form.status"
          class="form-control custom-select"
        >
          <option value="">
            Please select an option
          </option>
          <option value="active">
            Active
          </option>
          <option value="inactive">
            Inactive
          </option>
        </select>
      </b-form-group>
      <b-form-group
        id="input-group-4"
        label="Description"
        label-for="input-4"
        class="my-3 mb-5"
      >
        <quillEditor
          ref="myQuillEditor"
          v-model="form.description"
          :options="editorOption"
          style="height:300px"
          class="mb-5"
          required
        />
      </b-form-group>
      <div class="container mt-5y">
        <button
          type="button"
          class="btn"
          @click="closeMe()"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="btn text-white btn-primary"
        >
          Submit
        </button>
      </div>
    </b-form>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'

export default {
  components: {
    quillEditor,
    VueElementLoading,
  },
  // eslint-disable-next-line vue/prop-name-casing
  props: ['my_modal'],
  data() {
    return {
      form: {
        status: '',
      },
      editorOption: {
        debug: 'info',
        placeholder: 'Contents..',
        readOnly: true,
        theme: 'snow',
      },
      delta: undefined,
      loading: false,
    }
  },
  watch: {
    // eslint-disable-next-line func-names
    'form.description': function () {
      this.delta = this.$refs.myQuillEditor.quill.getContents()
    },
  },
  methods: {
    save() {
      this.loading = true
      axios
        .post(this.dynamic_route('/properties/'), this.form)
        .then(() => {
          this.loading = false
          delete this.form.name
          delete this.form.status
          delete this.form.description
          this.closeMe()
          this.$emit('submitted')
          this.$toast.success('Added successfully successfully!', {
            position: 'top-center',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false,
          })
        })
        .catch(() => {
          this.loading = false
          this.$toast.error('An error occurred, try again later!', {
            position: 'top-center',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false,
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    onReset(event) {
      event.preventDefault()

      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    closeMe() {
      this.my_modal.hide('add')
    },
  },
}
</script>
<style scoped>
.mt-5y {
  margin-top: 6rem !important;
  text-align: right !important;
}
</style>
