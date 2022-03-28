/* eslint-disable no-console */
<template>
    <div class="_body">
        <form action="" class="p" @submit.prevent="save">
            <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
           <p class="text-right">
               <span title="Add more" style="font-size:30px;cursor:pointer" @click="generateJson"><i class="mdi mdi-plus" ></i></span>
           </p>
            <div class="alert alert-secondary shadow-sm  mb-3" v-for="(l,i) in data" :key="i">
                <!-- <p class="p-0 m-0">For Group <b>{{i +1}}</b></p> -->
                <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                        label="Title *"
                        :rules="nameRules"
                        v-model="data[i].name"
                        type="text"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                        type="text"
                        label="Value *"
                        :rules="valueRules"
                        v-model="data[i].value"
                        required
                        ></v-text-field>
                    </v-col>

                </v-row>
                <p class="text-right m-0 p-0">
                    <span title="Remove" @click="remove(i)" style="cursor:pointer;font-size:25px">
                        <i class="mdi mdi-delete-forever"></i>
                    </span>
                </p>
            </div>
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
    props:['my_model', 'main_property', 'authToken'],
    components:{ quillEditor,VueElementLoading },
    data() {
        return {
            loading:false,
            dialog_modal:this.dialog,
            nameRules: [
                v => !!v || 'Title is  required',
            ],
            valueRules: [
                v => !!v || 'Value  is required',
            ],
            form:{},
            data:[
                {name: '', value:''}
            ],
            num:'',
            status:false,
        }
    },
    mounted() {
    },
    methods:{
        closeMe() {
            this.$bvModal.hide("more_info");
        },
        generateJson()
        {
            this.data.push({name:'', value:''})
        },
        remove(i) {
            this.data.splice(i, 1)
        },
        save() {
             let status = this.check_price(this.data);
            if(status) {
                this.loading = true;
                let payload = {
                    main_property_id: this.main_property.id,
                    values: this.data
                }
                axios
                .post(this.dynamic_route('/main_properties/add-more'), payload, {
                    headers:{
                      authorization: `Bearer ${this.authToken}`
    
                    }
                })
                .then(() => {
                    this.loading = false;
                    this.closeMe()
                    this.$emit('submitted')
                    this.$toast.success('Added successfully!', {
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

            }
        },
        check_price(pricesAr) {
            let total = pricesAr.map(item =>  parseInt(item.price))
            .reduce((ac, val) => ac + val,0);
            console.log(total);
            if(total > parseInt(this.main_property.price)) {
                 this.$toast.error('The total price is greater than the actual price!', {
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
                });
                return false;
            } else {
                return true;
            }
        }
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