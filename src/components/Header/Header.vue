<template>
  <b-navbar class="header d-print-none app-header">
    <b-nav>
      <b-nav-item>
        <a class="d-md-down-none px-2" href="#" @click="toggleSidebarMethod" id="barsTooltip">
          <i class='fi flaticon-menu' />
        </a>
        <a class="fs-lg d-lg-none" href="#" @click="switchSidebarMethod">
          <i class='fi flaticon-menu' />
        </a>
      </b-nav-item>
    </b-nav>
    <b-nav>
      <b-form class="d-sm-down-none ml-5" inline>
        <b-form-group>
          <b-input-group class="input-group-no-border">
            <!-- <template v-slot:prepend>
              <b-input-group-text><i class='fi flaticon-search-2'/></b-input-group-text>
            </template> -->
            <!-- <b-form-input id="search-input" placeholder="Search Dashboard" /> -->
            <router-link :to="'/'">
        visit site
      </router-link>
          </b-input-group>
        </b-form-group>
      </b-form>
      
    </b-nav>
    <!-- <a class="navbarBrand d-md-none">
      <i class="fa fa-circle text-danger" />
      &nbsp;
      sing
      &nbsp;
      <i class="fa fa-circle text-primary" />
    </a> -->
    <b-nav class="ml-auto">
      <b-nav-item-dropdown
        class="notificationsMenu d-sm-down-none mr-2"
        menu-class="notificationsWrapper py-0 animate__animated animate__animated-fast animate__fadeIn"
        right>
        <template slot="button-content">
            <span class="notify" v-if="notificationsData.length"></span>

          <span class="avatar rounded-circle thumb-sm float-left mr-2">
            <img class="rounded-circle" src="../../assets/people/a7.png" alt="..." />
          </span>
          <span class="px-2">{{authData.username ? authData.username : authData.fname + ' ' +  authData.lname}}</span>
          <!-- <span class="ml-1 mr-2 circle text-white fw-bold avatar-badge">9</span> -->
          <i class='fi flaticon-arrow-down px-2' />
        </template>
        <Notifications @replied="fetchNotification" :notificationsData="notificationsData" />
      </b-nav-item-dropdown>
      <b-nav-item-dropdown id="v-step-2" class="settingsDropdown d-sm-down-none" no-caret right>
        <template slot="button-content">
          <i class='fi flaticon-settings-10 px-2' />
        </template>
        <b-dropdown-item @click="navigate"><i class='fi flaticon-person px-3 mr-2' />My Account</b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item><i class='fi flaticon-person px-3 mr-2' />Password</b-dropdown-item>
        <!-- <b-dropdown-item><i class='fi flaticon-email px-3 mr-3' />
          Inbox &nbsp;&nbsp;<b-badge variant="inverse" pill class="animate__animated animate__bounceIn" style="padding: 6px 9px;">9</b-badge>
        </b-dropdown-item> -->
        <b-dropdown-divider />
        <b-dropdown-item-button @click="logout">
          <i class="fi flaticon-power-1 px-3 mr-3" /> Log Out
        </b-dropdown-item-button>
      </b-nav-item-dropdown>
    </b-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Notifications from '@/components/Notifications/Notifications';
import axios from "axios"

export default {
  name: 'Header',
  components: { Notifications },
  computed: {
    ...mapState('layout', ['sidebarClose', 'sidebarStatic']),
    ...mapState('page', ['authData', 'authToken'])
    
  },
  data(){
    return {
       notificationsData:[]
    }
  },
  mounted() {
    this.getAuthData()
     this.fetchNotification();
  },
  methods: {
    ...mapActions('layout', ['toggleSidebar', 'switchSidebar', 'changeSidebarActive']),
    ...mapActions('page', ['getAuthData']),
     fetchNotification(){
      axios.post(this.dynamic_route('/client/my-investments/quick-sale-notification'), {id: this.authData.id},{
        headers:{
          authorization: `Bearer ${this.authToken}`
        }
      }).then(res => {
        this.notificationsData = res.data;
      }).catch(err => {
        if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
          return this.logoutUser();
        }
      })
    },
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    toggleSidebarMethod() {
      if (this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      } else {
        this.toggleSidebar();
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    logout() {
      window.localStorage.removeItem('auth_token');
      window.localStorage.removeItem('auth_user');
      this.$router.push('/home');
    },
    navigate() {
      this.$router.push({name: 'ProfilePage'});
    }
  }
};
</script>

<style src="./Header.scss" lang="scss"></style>
<style scoped>
  .notify {
    background: orange;
    width: 13px;
    height: 13px;
    position: absolute;
    z-index: 20;
    top: 15%;
    left: 22%;
    border-radius: 50%;
  }
  @media (max-width: 767.98px){
    .d-sm-down-none {
      display: inline-flex !important;
    }

    .notificationsMenu{
        right: 80% !important;
    }
  }
 
</style>