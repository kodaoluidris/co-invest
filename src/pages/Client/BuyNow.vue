<template>
    <Content>
        <div class="details-banner">
            <div class="wrapper">
                <div class="container">
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, a!</h1>
                </div>
            </div>
        </div>
    </Content>
</template>

<script>
import Content from '@/pages/Client/Layout/Content'
import { mapState, mapActions, mapGetters } from 'vuex';
import axios from "axios"

export default {
    components: {
        Content
    }, 
    data(){return {
        data:{}
    }},
    created (){
        this.data = JSON.parse(localStorage.getItem('checkout_data'))
        console.log(this.data);
    }
}
</script>