<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        Login
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="register">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" v-model="email" class="form-control" placeholder="Enter your email" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" v-model="password" class="form-control" placeholder="Enter your password" required>
                            </div>
                            <div v-if="presslogin" class="spinner-border text-success" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <button v-else type="submit" class="btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      presslogin: false
    };
  },
  methods:{
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
          }),
        });
        if (response.status === 201) {
          // Registration successful
          const data = await response.json();
          const authToken = data['auth_token'];
          const role = data['role'];
          const email = data['email'];
          sessionStorage.setItem('auth_token', authToken)
          sessionStorage.setItem('role', role)
          sessionStorage.setItem('email', email)
          this.presslogin=false
          this.$store.commit('emptyCart');
          this.$emit('closeEvent', 'You Register successfully');
        } else {
          const data = await response.json();
          alert(data.message);
          this.$emit('closeEvent', 'Something went wrong');
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
}
</script>