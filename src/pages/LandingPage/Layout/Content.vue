<template>
    <div class="landing-page">
        <Header />
            <slot></slot>
        <Footer />
    </div>
</template>

<script>
import Header from '@/pages/LandingPage/Layout/Header'
import Footer from '@/pages/LandingPage/Layout/Footer'

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