<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        Co Invest
        <i class="fa fa-circle text-danger"></i>
      </h5>
     
      <Widget v-if="sent" class="widget-auth mx-auto" title="<h3 class='mt-0'>Email </h3>" customHeader>
        <p class="widget-auth-info">
            {{message}}
        </p>
        <b-button  size="sm" class="auth-btn mb-3" variant="inverse">
            <router-link class="d-block text-center" to="/login">Back to login</router-link>

        </b-button>

      </Widget>
       <Widget v-else class="widget-auth mx-auto" title="<h3 class='mt-0'>Email </h3>" customHeader>
        <p class="widget-auth-info">
            Provide your email for password reset link.
        </p>
        <v-form class="mt" @submit.prevent="Reset">
          <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
          <v-text-field
            v-model="form.email"
            :rules="nameRules"
            label="Email"
            type="email"
            required
          ></v-text-field>
          <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse">Reset</b-button>
          
        </v-form>
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
  name: 'ResetPage',
  components: { Widget,VueElementLoading },
  data() {
    return {
      errorMessage: null,
      form:{},
      nameRules: [
        v => !!v || 'This field  is required',
      ],
      loading: false,
      message:'',
      sent:false,
    };
  },
  methods: {
    Reset() {
     
      if(Object.keys(this.form).length < 1) {
        return this.$toast.error('Email field is required!', {
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
        axios.post(this.dynamic_route('/reset-password-request'), this.form)
        .then(res => {
          this.sent=true;
          this.message=res.data.message;
          this.loading=false;
          this.$toast.success(res.data.message, {
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
            // this.$router.push('/login');
        }).catch(err => {
          this.loading=false;
          if(err.response.status == 404)  {
            return this.$toast.error(err.response.data.message, {
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
      this.$router.push('/app/main/analytics');
    }
  },
};
</script>
