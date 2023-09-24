<template>
  <div id="app">
    <ul class="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm" role fixed-bottom="tablist" style="--bs-nav-link-color: var(--bs-white); --bs-nav-pills-link-active-color: var(--bs-primary); --bs-nav-pills-link-active-bg: var(--bs-white);">
      <li class="nav-item" role="presentation">
        <button :class="currentRouteClass1" class="nav-link rounded-5" id="home-tab2" data-bs-toggle="tab" type="button" role="tab"  @click="SwtichAdmin()">Admin: Hi I am a Admin</button>
      </li>
      <li class="nav-item" role="presentation">
        <button :class="currentRouteClass2" class="nav-link rounded-5" id="profile-tab2" data-bs-toggle="tab" type="button" role="tab"  @click="SwtichUser()">User: Hi I am a User</button>
      </li>
      <li class="nav-item" role="presentation">
        <button :class="currentRouteClass3" class="nav-link rounded-5" id="contact-tab2" data-bs-toggle="tab" type="button" role="tab"  @click="SwtichManager()">Manager:  Hi I am a Manager</button>
      </li>
    </ul>
    <router-view/>  
  </div>
</template>

<style>
  .scroll-container {
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    margin-bottom: 20px;
  }

  .scroll-item {
    display: inline-block;
    width: 200px;
    height: 50px;
    margin-right: 10px;
    margin-bottom: 5px;
    background-image:"../assets/Group-33704.avif";
  }

  .curve-corner {
    border-radius: 2% 2% 2% 2%;
  }
</style>

<script>
import router from './router';

export default {
  methods:{
    SwtichUser() {
      (this.$route.path.indexOf('/')==0 && this.$route.path.indexOf('/manager')!=0) && this.$route.path.indexOf('/admin')!=0 ?' ' : router.push('/');
    },
    SwtichManager() {
      this.$route.path.indexOf('/manager')==0 ? '' : router.push('/manager');

    },
    SwtichAdmin() {
      this.$route.path.indexOf('/admin')==0 ? '' : router.push('/admin'); 
    }
  },
  computed: {
    currentRouteClass1() {
      return this.$route.path.indexOf('/admin')==0 ? 'active' : '';
    },
    currentRouteClass3() {
      return this.$route.path.indexOf('/manager')==0 ? 'active' : '';
    },
    currentRouteClass2() {
      return (this.$route.path.indexOf('/')==0 && this.$route.path.indexOf('/manager')!=0) && this.$route.path.indexOf('/admin')!=0 ? 'active' : '';
    }
  }
}
</script>