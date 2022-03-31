export default {
    data: () => {
        return {
        }
    },
  methods: {
    dynamic_route(endUrl) { 
        return `http://co_invest_backend.test/api${endUrl}`;
        // console.log(process.env.VUE_APP_BASE_AUTH_URL);

        return process.env.VUE_APP_BASE_URL+endUrl
      },
      dynamic_auth_route(endUrl) {
        return `http://co_invest_backend.test/api/auth${endUrl}`;
        // return `http://localhost:1000/api/auth${endUrl}`;
        // console.log(process.env);
        return process.env.VUE_APP_BASE_AUTH_URL+endUrl
      },
      logoutUser() {
        this.$toast.error('Login expired, please login again!', {
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
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        return this.$router.push({name: 'Login'});
      }
  }
};
