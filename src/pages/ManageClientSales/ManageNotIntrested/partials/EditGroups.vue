/* eslint-disable no-console */
<template>
    <div class="_body">
        <form action="" class="p" @submit.prevent="save" v-if="data.length">
            <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
            <div class="alert alert-secondary shadow-sm  mb-3" v-for="(l,i) in main_property.groups" :key="i">
                <p class="p-0 m-0">For Group <b>{{i +1}}</b></p>
                <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                        label="No of people *"
                        :rules="nameRules"
                        v-model="data[i].no_of_people"
                        type="number"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                        type="number"
                        label="Group price *"
                        :rules="groupRules"
                        v-model="data[i].group_price"
                        disabled
                        ></v-text-field>
                    </v-col>

                </v-row>
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
                    Update
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
                v => !!v || 'No of people is required',
            ],
            groupRules: [
                v => !!v || 'Group price is required',
            ],
            form:{},
            data:[],
        }
    },
    mounted() {
        // eslint-disable-next-line no-console
        for(let i =0; i < this.main_property.groups;i++) {
            this.data.push({
                id: this.main_property.group_allocated[i].id,
                main_property_id: this.main_property.id,
                groups: this.main_property.groups,
                no_of_people: this.main_property.group_allocated[i].no_of_people,
                group_price: this.main_property.price
            })
        }
    },
    methods:{
        closeMe() {
            this.$bvModal.hide("edit_groups");
        },
        save() {
            //  let status = this.check_price(this.data);
            // if(status) {
                this.loading = true;
                let payload = {
                    main_property_id: this.main_property.id,
                    groups: this.main_property.groups,
                    values: this.data
                }
                axios
                .post(this.dynamic_route(`/main_properties/manage_groups/${this.main_property.id}`), payload, {
                    headers:{
                      authorization: `Bearer ${this.authToken}`
    
                    }
                })
                .then(() => {
                    this.loading = false;
                    this.closeMe()
                    this.$emit('submitted')
                    this.$toast.success('Updated successfully!', {
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

            // }
        },
        // check_price(pricesAr) {
        //     let total = pricesAr.map(item =>  parseInt(item.price))
        //     .reduce((ac, val) => ac + val,0);
        //     if(total > parseInt(this.main_property.price)) {
        //          this.$toast.error('The total price is greater than the actual price!', {
        //             position: 'top-center',
        //             timeout: 5000,
        //             closeOnClick: true,
        //             pauseOnFocusLoss: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             draggablePercent: 0.6,
        //             showCloseButtonOnHover: false,
        //             hideProgressBar: true,
        //             closeButton: 'button',
        //             icon: true,
        //             rtl: false,
        //         });
        //         return false;
        //     } else {
        //         return true;
        //     }
        // }
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