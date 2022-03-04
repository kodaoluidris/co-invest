<template>
    <div class="landing-page">
        <Header />
            <slot></slot>
        <Footer />
    </div>
</template>

<script>
import Header from '@/pages/Client/Layout/Header'
import Footer from '@/pages/Client/Layout/Footer'

export default {
    components: {
        Header, Footer
    } 
}
</script>

<style scoped>
.landing-page {
    font: 16px Montserrat, sans-serif !important;
}
</style>