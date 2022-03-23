<template>
    <div>
        <form action="" @submit.prevent="update">
            <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
            <v-card-text class="_body">
                <v-container class="px-0">
                    <v-row>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                            label="Lastname*"
                            :rules="lnameRules"
                            v-model="form.lname"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                            label="Firstname*"
                            :rules="fnameRules"
                            v-model="form.fname"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                            label="Middlename"
                            :rules="mnameRules"
                            v-model="form.mname"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                            label="Email*"
                            :rules="emailRules"
                            v-model="form.email"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                            label="Username"
                            :rules="usernameRules"
                            v-model="form.username"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                            label="Phone"
                            :rules="phoneRules"
                            v-model="form.phone"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-select
                                v-model="form.gender"
                                :items="['male', 'female']"
                                label="Gender"
                                :rules="genderRules"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-select
                                v-model="form.status"
                                :items="['active', 'inactive']"
                                label="Status*"
                                :rules="statusRules"
                            ></v-select>
                        </v-col>
                        <!-- <v-col
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
                                label="Property Name*"
                                :rules="propertyRules"
                                persistent-hint
                                dense
                            ></v-select>
                        </v-col> -->
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
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
import VueElementLoading from 'vue-element-loading'
import { mapState, mapActions } from 'vuex';
import axios from "axios"

export default {
    props: ['user'],
    components: {
        VueElementLoading
    },
    data() {
        return {
            loading: false,
            form: this.user
        }
    },
    methods: {
        closeMe() {
            this.$bvModal.hide('edit')
        }
    }
}
</script>