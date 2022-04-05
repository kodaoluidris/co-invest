<template>
  <div class="sidebar-wrapper">
    <nav
        :class="{sidebar: true, sidebarStatic, sidebarOpened}"
        @mouseenter="sidebarMouseEnter"
        @mouseleave="sidebarMouseLeave"
    >
      <header class="logo">
        <router-link to="/app/dashboard"><span class="primary-word">CO</span> <span class="secondary-word"> Invest</span></router-link>
      </header>

      <!-- <a class="generator-link navTitle" target="_blank" href="https://flatlogic.com/generator">Main modules</a> -->

      <!-- <h5 class="navTitle first">
        APP
      </h5> -->
      <ul class="nav">
        <NavLink
            :activeItem="activeItem"
            header="Dashboard"
            link="/app/dashboard"
            iconName="flaticon-home"
            index="dashboard"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            v-if="authType.name == 'superadmin'"
            header="Properties"
            link="/app/manage-properties/properties"
            iconName="flaticon-home"
            index="properties"
            isHeader
        />
         <NavLink
            :activeItem="activeItem"
            v-if="authType.name == 'superadmin'"
            header="Property Types"
            link="/app/manage-properties/property-types"
            iconName="flaticon-home"
            index="property-types"
            isHeader
        />
         <NavLink
            :activeItem="activeItem"
            v-if="authType.name == 'superadmin'"
            header="Main Properties"
            link="/app/manage-properties/main-properties"
            iconName="flaticon-home"
            index="main-properties"
            isHeader
        />
        <NavLink
          v-if="authType.name == 'superadmin'"
          :activeItem="activeItem"
          header="Manage Users"
          link="/app/users"
          iconName="flaticon-user"
          index="users"
          isHeader
        />
        <NavLink
          v-if="authType.name == 'superadmin'"
          :activeItem="activeItem"
          header="Final Sale Requests"
          link="/app/sale-requests"
          iconName="flaticon-market"
          index="sale-requests"
          isHeader
        />
         <NavLink
          v-if="authType.name == 'superadmin'"
          :activeItem="activeItem"
          header="Admin Quick Sales"
          link="/app/manage-sales/quick-sales"
          iconName="flaticon-user"
          index="admin"
          isHeader
        />
         <NavLink
          v-if="authType.name == 'user'"
          :activeItem="activeItem"
          header="Investment"
          link="/app/my-investments/index"
          iconName="flaticon-home"
          index="investment"
          isHeader
        />
         <NavLink
          v-if="authType.name == 'user'"
          :activeItem="activeItem"
          header="Market Place"
          link="/app/market-place/index"
          iconName="flaticon-home"
          index="market"
          isHeader
        />
        <!-- <NavLink
          v-if="authType.name == 'user'"
          :activeItem="activeItem"
          header="My Investment"
          link="/app/my-investments"
          iconName="flaticon-network"
          index="my"
          :childrenLinks="[
            { header: 'Investment', link: '/app/my-investments/index' },
            { header: 'Market Place', link: '/app/market-place/index' },
          ]"
        /> -->
      </ul>
      <!-- <h5 class="navTitle">
      </h5>
      <ul class="sidebarLabels">
        <li>
          <a href="#">
            <i class="fa fa-circle text-danger"/>
            <span class="labelName">Core</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-circle text-primary"/>
            <span class="labelName">UI Elements</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-circle text-success"/>
            <span class="labelName">Forms</span>
          </a>
        </li>
      </ul>
      <h5 class="navTitle">
        PROJECTS
      </h5>
      <div class="sidebarAlerts">
        <b-alert
            v-for="alert in alerts"
            :key="alert.id"
            class="sidebarAlert" variant="transparent"
            show dismissible
        >
          <span>{{alert.title}}</span><br/>
          <b-progress class="sidebarProgress progress-xs mt-1"
                      :variant="alert.color" :value="alert.value" :max="100"/>
          <small>{{alert.footer}}</small>
        </b-alert>
      </div> -->
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';
import axios from "axios";
export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      authType:'',
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'danger',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'primary',
        },
      ],
    };
  },
  methods: {
    ...mapActions('page', ['getAuthData']),
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
     getUserType(){
        const auth_user = JSON.parse(localStorage.getItem('auth_user')) || null;
        if(auth_user) {
          axios
            .post(this.dynamic_auth_route('/user_type'), 
            {id:auth_user.id },
            {
              headers:{
                authorization: `Bearer ${this.authToken}`
              }
            })
            .then(res => {
              this.authType = res.data;
            })
            .catch(err => {
             
            })
            .finally(() => {
              this.loading = false
            });
          
        }
    },
  },
  created() {
    this.setActiveByRoute();
  },
  mounted() {
    this.getAuthData();
    this.getUserType({url:this.dynamic_auth_route('/user_type'), token:this.authToken});
  },
  computed: {
    ...mapState('page', ['authToken']),
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
