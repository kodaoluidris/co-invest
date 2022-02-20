<template>
    <div class="_body">
        <form action="">
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
                        sm="12"
                        md="12"
                    >
                    <div v-html="form.description" style="height:400px">

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
                    Cancel
                </button>
            </v-card-actions>

        </form>
    </div>
</template>
<script>
export default {
    props:['my_model', 'data'],
    data() {
        return {
            form:this.data
        }
    },
    methods:{
        
        closeMe() {
            this.$bvModal.hide("view");
        },
    }
}
</script>