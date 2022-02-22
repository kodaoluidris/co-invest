<template>
    <div>
        <nav class="navbar navbar-expand-md bg-white landing-nav navbar-light py-2 fixed-top">
            <div class="container-fluid contain">
                <!-- Brand -->
                <a class="navbar-brand logo" href="#">
                    <h5><span style="color: #1abc9c">Co</span><span>Invest</span></h5>
                </a>

                <!-- Toggler/collapsibe Button -->
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Navbar links -->
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <b-link :to="{name: 'Login'}" class="nav-link">Login</b-link>
                        </li>
                        <li class="nav-item">
                            <b-link :to="{name: 'Register'}" class="nav-link">Signup</b-link>
                        </li>
                        <li class="nav-item">
                            <b-link class="nav-link" :to="{name: 'AnalyticsPage'}">Dashboard</b-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.landing-nav, .nav-item a {
    color: #111111 !important;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    padding: 20px 0;
} 
.logo h5    {
    color: #111111 !important;
    font-size: 20px;
    font-weight: 600;
}
</style>