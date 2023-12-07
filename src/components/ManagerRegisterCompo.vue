<template>
  <div class="d-flex justify-content-center mt-5">
    <div class="card p-4 position-relative">
      <button type="button" class="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" @click="goBack"></button>
      <h1>Manager Register</h1>
      <form @submit.prevent="applyformanager">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email" required>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary btn-block">Apply</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    goBack(){
       if(this.$route.path!=='/')
        this.$router.push('/')
    },    
    async applyformanager() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/apprequest/apply/manager', {
          method: 'POST',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "request_for":"manager_role",
            "data":this.email + "," + this.password
          })
        });
        if (response.status === 200) {
          const data = await response.json();
          alert(data.message);
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }, 
  },
};
</script>

<style scoped>
/* Add your custom styles here */
.card {
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
</style>
