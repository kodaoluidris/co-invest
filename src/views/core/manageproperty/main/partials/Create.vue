<template>
  <div>
    <VueElementLoading
      :active="loading"
      spinner="bar-fade-scale"
      color="var(--primary)"
      text="Submitting data.."
      duration="0.6"
    />
    <div
      v-show="image_data.length"
      class="card text-center shadow-sm mb-0"
    >
      <div class="card-body">
        <div
          ref="show_images"
          class="row"
        >
        </div>
      </div>
    </div>

    <b-form
      @submit.prevent="save"
      @reset="onReset"
    >
      <div class="mb-3">
        <v-file-input
          ref="input_file"
          v-model="main_data"
          multiple
          label="Click to upload images"
          required
          @change="onFileChange"
        ></v-file-input>
      </div>
      <!-- <input

        type="file"
        placeholder=""
        multiple
        required
        style="visibility:hidden"

      />
      <span
        class="btn border-0 border-none w-100 btn-block"
        @click.prevent="handleClick"
      >
        <i class="mdi mdi-cloud-upload"></i> Upload Image
      </span> -->

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
        label="Price"
        class="mb-3"
      >
        <b-form-input
          v-model="form.price"
          type="number"
          placeholder="Enter price"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="No Of Groups"
        class="mb-3"
      >
        <b-form-input
          v-model="form.group"
          type="number"
          placeholder="Enter group number"
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
        id="input-group-3"
        label="Property type"
        label-for="input-3"
        class="my-3"
      >
        <select
          v-model="form.property_type_id"
          class="form-control custom-select"
          required
        >
          <option value="">
            Please select an option
          </option>
          <option
            v-for="(p,i) in property_types"
            :key="i"
            :value="p.id"
          >
            {{ p.name }}
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
  props: ['my_modal', 'property_types'],
  data() {
    return {
      form: {
        status: '',
        property_type_id: '',
      },
      editorOption: {
        debug: 'info',
        placeholder: 'Contents..',
        readOnly: true,
        theme: 'snow',
      },
      delta: undefined,
      loading: false,
      image_data: [],
      main_data: [],
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
      const productImgArray = this.image_data.map(item => item.file)
      const payload = new FormData()
      payload.append('name', this.form.name)
      payload.append('description', this.form.description)
      payload.append('price', this.form.price)
      payload.append('groups', this.form.group)
      payload.append('property_type_id', this.form.property_type_id)
      for (let i = 0; i < productImgArray.length; i++) {
        payload.append('image[]', productImgArray[i])
      }
      axios
        .post(this.dynamic_route('/main_properties/'), payload)
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
        .catch(err => {
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
          console.log(err)
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
    onFileChange() {
      const file = this.main_data
      for (let i = 0; i < file.length; i++) {
        this.image_data.push({
          name: file[i].name,
          url: URL.createObjectURL(file[i]),
          file: file[i],
        })
      }
      this.show_image(this.image_data)
    },
    show_image(data) {
      this.$refs.show_images.innerHTML = ''

      for (let i = 0; i < data.length; i++) {
        this.$refs.show_images.innerHTML += `
                    <div class="col-3" style="position:relative">
                        <span 
                            title="Click to remove image" 
                            class="font-weight-bold cancel_img" 
                            style="cursor:pointer;
                                color:;
                                position: absolute;
                                right: 1%;
                                top: -6%;
                                font-size: 28px;"
                                
                            >
                            <i class="mdi mdi-close-thick"></i>
                        </span>
                        <img src="${data[i].url}" class="img-thumbnail" style="width:100%;max-height:300px; max-width:300px" />
                    </div>
               `
      }

      this.remove()
    },
    remove() {
      const button = document.querySelectorAll('.cancel_img')
      button.forEach((but, i) => {
        but.addEventListener('click', () => {
          this.image_data.splice(i, 1)
          this.main_data.splice(i, 1)
          this.show_image(this.image_data)
        })
      })
    },
    handleClick() {
      this.$refs.input_file.click()
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
