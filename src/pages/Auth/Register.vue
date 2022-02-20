<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        Register App
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <Widget class="widget-auth mx-auto" title="<h6 class='mt-0'>Create your Web Account</h6>" customHeader>
        <p class="widget-auth-info">
            <!-- Use your email to sign in. -->
        </p>
        <v-form
          ref="form"
          lazy-validation
          @submit.prevent="login"

        >
        <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
        />
          <v-text-field
            v-model="form.fname"
            :rules="nameRules"
            :counter="255"
            label="First name"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.lname"
            :counter="255"
            :rules="nameRules"
            label="Last name"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            :counter="255"
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
           <v-text-field
            v-model="form.password_confirmation"
            :rules="nameRules"
            label="Confirm Password"
            type="password"
            required
          ></v-text-field>
          <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse">Create account</b-button>
        </v-form>
       
        <p class="widget-auth-info">
         Have an account ? Login  now!
        </p>
        <router-link class="d-block text-center" to="login">Login</router-link>
      </Widget>
    </b-container>
    <!-- <footer class="auth-footer">
      2019 &copy; Sing App Vue Admin Dashboard Template - Made by <a href="https://flatlogic.com/">Flatlogic</a>
    </footer> -->
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'

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
      if(Object.keys(this.form).length !=5) {
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
      }
      else if(this.form.password.length < 8) {
        return this.$toast.error('Password must be at least 8 characters!', {
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
      } else if(this.form.password !== this.form.password_confirmation) {
        return this.$toast.error('Password do not match!', {
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
      }
      this.loading=true;
      axios.post(this.dynamic_auth_route('/register'), this.form)
      .then(res => {
        this.loading=false;
        this.$toast.success('Registration successful!', {
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
          this.$toast.error('Unauthorized!', {
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
    },
  },
  created() {
    if (window.localStorage.getItem('auth_token') != null) {
      this.$router.push('/app/dashboard');
    }
  },
};
</script>
