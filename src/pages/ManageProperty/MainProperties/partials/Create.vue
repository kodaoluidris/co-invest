<template>
    <div class="_body">
        <form action="" @submit.prevent="save">
            <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
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
            <!-- <v-card-title>
                <span class="text-h5">Create Property</span>
            </v-card-title> -->
            <v-card-text class="_body">
            <v-container class="px-0">
                <v-row>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <v-file-input
                            ref="input_file"
                            v-model="main_data"
                            multiple
                            label="Click to upload images"
                            required
                            @change="onFileChange"
                        ></v-file-input>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                        label="Name*"
                        :rules="nameRules"
                        v-model="form.name"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                            v-model="form.price"
                            type="number"
                            label="Price *"
                            :rules="priceRules"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                            v-model="form.group"
                            type="number"
                            label="No Groups *"
                            :rules="groupRules"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-select
                            v-model="form.status"
                            :items="['active', 'inactive']"
                            label="Status*"
                            :rules="statusRules"
                            required
                        ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <v-select
                            v-model="form.property_type_id"
                            :hint="`${select.name}, ${select.status}`"
                            :items="property_types"
                            item-text="name"
                            item-value="id"
                            label="Property Type Name*"
                            :rules="propertyTypeRules"
                            persistent-hint
                            dense
                            required
                        ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <quillEditor
                            v-model="form.description"
                            ref="myQuillEditor"
                            :options="editorOption"
                            style="height:150px"
                            required
                                    
                            />
                    </v-col>
                </v-row>
            </v-container>
            </v-card-text>
            <v-card-actions style="margin-top:100px">
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="closeMe()"
                >
                    Close
                </v-btn>
                <button
                    class="btn btn-primary"
                    type="submit"
                >
                    Save
                </button>
            </v-card-actions>

        </form>
    </div>
</template>
<script>
import 'quill/dist/quill.snow.css';
import { quillEditor } from 'vue-quill-editor';
import VueElementLoading from 'vue-element-loading'
import axios from 'axios'

export default {
    props:['my_model', 'property_types', 'auth_token'],
    components:{ quillEditor,VueElementLoading },
    data() {
        return {
            select:{ name: this.property_types[0].name,status: this.property_types[0].status },
            loading:false,
            dialog_modal:this.dialog,
            nameRules: [
                v => !!v || 'Name is required',
            ],
            priceRules: [
                v => !!v || 'Price is required',
            ],
            groupRules: [
                v => !!v || 'Group is required',
            ],
            statusRules:[
                v => !!v || 'Status is required',
            ],
            propertyTypeRules:[
                v => !!v || 'Property type is required',
            ],
            editorOption: {
                debug: 'info',
                placeholder: 'Contents..',
                readOnly: true,
                theme: 'snow'
            },
            delta: undefined,
            form:{},
            image_data: [],
            main_data: [],
        }
    },
    watch: {
        "form.description"() {
            this.delta = this.$refs.myQuillEditor.quill.getContents()
        }
    },
    mounted() {
        // eslint-disable-next-line no-console
    },
    methods:{
        closeMe() {
            this.$bvModal.hide("create");
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
        save() {
            this.loading = true;
            const productImgArray = this.image_data.map(item => item.file)
            const payload = new FormData();
            payload.append('name', this.form.name)
            payload.append('description', this.form.description)
            payload.append('price', this.form.price)
            payload.append('groups', this.form.group)
            payload.append('property_type_id', this.form.property_type_id)
            for (let i = 0; i < productImgArray.length; i++) {
                payload.append('image[]', productImgArray[i])
            }
            
            axios
            .post(this.dynamic_route('/main_properties/'), payload, {
                headers:{
                  authorization: `Bearer ${this.auth_token}`

                }
            })
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
            .catch((err) => {
                this.loading = false;
                if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                    return this.logoutUser();
                }
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
    }
}
</script>
<style scoped>
    .modal-body {
       background: white !important;
    }

    ._body {
        height:auto !important;
    }
</style>