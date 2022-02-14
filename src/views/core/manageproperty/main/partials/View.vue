<template>
  <div>
    <div class="card mb-3">
      <div class="card-body">
        <div class="row">
          <div
            v-for="(im, i) in form.image"
            :key="i"
            class="col-3"
          >
            <img
              :src="im.image"
              class="img-thumbnail"
              style="width:100%;max-height:300px; max-width:300px"
            />
          </div>
        </div>
      </div>
    </div>
    <b-form>
      <b-form-group
        label="Name"
        class="mb-3"
      >
        <b-form-input
          v-model="form.name"
          type="text"
          placeholder="Enter property name"
          disabled
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Property Name"
        class="mb-3"
      >
        <b-form-input
          v-model="form.pt_name"
          type="text"
          placeholder="Enter property name"
          disabled
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
          disabled
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
        <div v-html="form.description">
        </div>
      </b-form-group>
      <b-form-group
        id="input-group-4"
        label="Description"
        label-for="input-4"
        class="my-3 mb-5"
      >
        <div v-html="form.pt_desc">
        </div>
      </b-form-group>
      <div class="container mt-5y">
        <button
          type="button"
          class="btn text-white btn-primary"
          @click="closeMe()"
        >
          Cancel
        </button>
      </div>
    </b-form>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor,
  },
  // eslint-disable-next-line vue/prop-name-casing
  props: ['my_modal', 'data'],
  data() {
    return {
      form: this.data,
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
    closeMe() {
      this.my_modal.hide('view_property_type')
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
