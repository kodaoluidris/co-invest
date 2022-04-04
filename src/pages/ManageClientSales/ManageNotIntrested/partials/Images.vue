<template>
    <div class="">
       <form action="">
            <h4>{{main_name}} - main property</h4>
            <div class="row">
                <div 
                    class="col-md-6"
                    v-for="(img, i) in data"
                    :key="i"
                >
                    <div class="card">
                        <div class="card-body">

                            <img :src="img.image" alt="" style="width:100%">
                        </div>
                    </div>
                </div>
            </div>
            <v-card-actions class="text-right" style="margin-top:100px">
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
    props:['my_model', 'data','main_name'],
    data() {
        return {
            form:this.data,
            loading:false
        }
    },
    methods:{
        
        closeMe() {
            this.$bvModal.hide("view_image");
        },
    }
}
</script>