<template>
    <div class="_body">
        <form action="" @submit.prevent="update">
            <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
            <!-- <v-card-title>
                <span class="text-h5">Create Property</span>
            </v-card-title> -->
            <v-card-text class="_body">
            <v-container class="px-0">
                <v-row>
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
                        <v-select
                            v-model="form.status"
                            :items="['active', 'inactive']"
                            label="Status*"
                            :rules="statusRules"
                        ></v-select>
                    </v-col>
                     <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <v-select
                            v-model="form.property_id"
                            :hint="`${select.name}, ${select.status}`"
                            :items="properties"
                            item-text="name"
                            item-value="id"
                            label="Property Name*"
                            :rules="propertyRules"
                            persistent-hint
                            dense
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
                            style="height:400px"
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
                    Update
                </button>
            </v-card-actions>

        </form>
    </div>
</template>
<script>
import 'quill/dist/quill.snow.css';
import { quillEditor } from 'vue-quill-editor';
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'

export default {
    props:['my_model', 'data', 'properties'],
    components:{ quillEditor,VueElementLoading },
    data() {
        return {
            select:{ name: this.properties[0].name,status: this.properties[0].status },
            form:this.data,
            nameRules: [
                v => !!v || 'Name is required',
            ],
            statusRules:[
                v => !!v || 'Status is required',
            ],
            propertyRules:[
                v => !!v || 'Property is required',
            ],
            editorOption: {
                debug: 'info',
                placeholder: 'Contents..',
                readOnly: true,
                theme: 'snow'
            },
            delta: undefined,
            loading:false
        }
    },
    watch: {
        "form.description"() {
            this.delta = this.$refs.myQuillEditor.quill.getContents()
        }
    },
    methods:{
        closeMe() {
            this.$bvModal.hide("edit");
        },
        update() {
            this.loading = true
            axios
            .post(this.dynamic_route(`/property_types/update/${this.form.id}`), this.form)
            .then(() => {
                this.loading = false
                this.closeMe()
                this.$emit('updated')
                this.$toast.success('Updated successfully successfully!', {
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