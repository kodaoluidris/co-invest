<template>
    <div class="">
         <form action="" @submit.prevent="save">
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
                        v-model="form.name"
                        disabled
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
                            disabled
                        ></v-select>
                    </v-col>
                     <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <v-text-field
                        label="Groups No*"
                        v-model="form.groups"
                        disabled
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
                            disabled
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <v-select
                            disabled
                            v-model="form.property_type_id"
                            :items="property_types"
                            item-text="name"
                            item-value="id"
                            label="Property Name*"
                            persistent-hint
                            dense
                        ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <div v-html="form.description">

                        </div>
                    </v-col>
                </v-row>
            </v-container>
            </v-card-text>
            <v-card-actions style="margin-top:100px">
                <v-spacer></v-spacer>
                <button
                    class="btn btn-primary"
                    @click="closeMe()"

                >
                    Close
                </button>
            </v-card-actions>

        </form>
    </div>
</template>
<script>
export default {
    props:['my_model', 'data', 'property_types'],
    data() {
        return {
            form:this.data,
            loading:false
        }
    },
    methods:{
        
        closeMe() {
            this.$bvModal.hide("view");
        },
    }
}
</script>