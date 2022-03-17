export default {
    data: () => {
        return {
        }
    },
  methods: {
    dynamic_route(endUrl) {
        return `https://co-invest-backend.herokuapp.com/api${endUrl}`
      },
      dynamic_auth_route(endUrl) {
        return `https://co-invest-backend.herokuapp.com/api/auth${endUrl}`
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
