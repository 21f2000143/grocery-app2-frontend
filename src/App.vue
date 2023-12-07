<template>
  <router-view v-slot="{ Component }">
    <transition name="slide">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
export default {
  methods: {
    async checkAuth() {
      let authToken='';
      const authTokenCookie = document.cookie.split('; ').find(row => row.startsWith('authToken='));
      if (authTokenCookie) {
        authToken = authTokenCookie.split('=')[1];
      } else {
        console.error('Auth token cookie not found');
      }
      try {
        this.presslogin=true;
        const response = await fetch('http://127.0.0.1:8000/api/auth/check', {
          method: 'GET',
          mode: "cors",
          headers: {
            'Authentication-Token': authToken,
            'Content-Type': 'application/json'
          }          
        });
        if (response.status === 200) {
          const data = await response.json();
          const authObj = {'auth_token':data['auth_token'],
          'role':data['role'], 'email':data['email']}
          this.$store.commit('setAuthStatus', authObj);
          if(data['role']==='admin'){
            this.$router.push('/admin')
          }
          else if(data['role']==='manager'){
            this.$router.push('manager')
          }
          else {
            this.$router.push('/user')
          }
        } else {
          if (response.status === 401){
            if (this.$route.path!='/login')
              this.$router.push('/login')
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted(){
    this.checkAuth()
  }
};
</script>