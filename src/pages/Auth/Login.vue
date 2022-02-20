<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        Co Invest
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Login to your Web App</h3>" customHeader>
        <p class="widget-auth-info">
            <!-- Use your email to sign in. -->
        </p>
        <v-form class="mt" @submit.prevent="login">
          <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <v-text-field
            v-model="form.email"
            :rules="nameRules"
            label="Email"
            type="email"
            required
          ></v-text-field>
           <v-text-field
            v-model="form.password"
            :rules="nameRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse">Login</b-button>
          <router-link class="d-block text-left" to="/forgot-password">Forgot Password ?</router-link>
          
        </v-form>
        <p class=" widget-auth-info mt-3">
          Don't have an account? Sign up now!
        </p>
        <router-link class="d-block text-center" to="/register">Create an Account</router-link>
        <p class="float-right mt-2">

        </p>
      </Widget>
    </b-container>
    <!-- <footer class="auth-footer">
      2019 &copy; Sing App Vue Admin Dashboard Template - Made by <a href="https://flatlogic.com/">Flatlogic</a>
    </footer> -->
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import VueElementLoading from 'vue-element-loading'
import axios from 'axios'

export default {
  name: 'LoginPage',
  components: { Widget,VueElementLoading },
  data() {
    return {
      errorMessage: null,
      form:{},
      nameRules: [
        v => !!v || 'This field  is required',
      ],
      loading: false,
    };
  },
  methods: {
    login() {
     
      if(Object.keys(this.form).length < 2) {
        return this.$toast.error('All fields are required!', {
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
      } else {
        this.loading=true;
        axios.post(this.dynamic_auth_route('/login'), this.form)
        .then(res => {
          this.loading=false;
          this.$toast.success('Login successful!', {
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
            if(res.data.access_token) {
              localStorage.setItem("auth_token", res.data.access_token);
              localStorage.setItem("auth_user", JSON.stringify(res.data.data));
              this.$router.push('/app/dashboard');
            }
        }).catch(err => {
          this.loading=false;
          if(err.response.status == 401)  {
            return this.$toast.error('Invalid Credentials!', {
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
          }
          this.$toast.error('An error occurred, please try again!', {
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
        }).finally(() =>{
          this.loading=false;
        })
      }
    },
  },
  created() {
    if (window.localStorage.getItem('authenticated') === 'true') {
      this.$router.push('/app/dashboard');
    }
  },
};
</script>
