<template>
  <div class="d-flex justify-content-center mt-5">
    <div class="card p-4">
        <button type="button" class="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" @click="goBack"></button>
    <h1>Register</h1>
      <!-- Login Form -->
      <form @submit.prevent="register">
        <!-- Email Input -->
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email" required>
        </div>

        <!-- Password Input -->
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary btn-block">Register</button>
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
      rememberMe: false,
    };
  },
  methods: {
    goBack(){
       if(this.$route.path!=='/')
        this.$router.push('/')
    },    
    async register() {
      try {
          this.presslogin=true
        const response = await fetch('http://127.0.0.1:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            rememberMe: this.rememberMe
          }),
        });
        if (response.status === 201) {
          // Registration successful
          const data = await response.json();
          alert(data.message)
           if(this.$route.path!=='/login')
            this.$router.push('/login')
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
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
