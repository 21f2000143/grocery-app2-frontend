<template>
  <div class="container text-center mt-5 mb-3">
    <div v-show="message" class="alert alert-primary alert-dismissible fade show" >
        {{message}}
      <button type="button" @click="closeMessage" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>   
    <!-- Header Section -->
    <header class="mb-4">
      <h1 class="display-4">Welcome to Grocery Express</h1>
      <p class="lead">Your one-stop shop for fresh and quality groceries delivered to your doorstep.</p>
    </header>

    <!-- Actions Section -->
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card-group">
          <!-- Login Card -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Log In</h5>
              <p class="card-text">Sign in to your account.</p>
              <button class="btn btn-primary" @click="login">Log In</button>
            </div>
          </div>
          <!-- Manager Register Card -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Register as Manager</h5>
              <p class="card-text">Wait for approval from the admin.</p>
              <button class="btn btn-dark" @click="managerRegister">Register</button>
            </div>
          </div>
          <!-- Register Card -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Register</h5>
              <p class="card-text">Create a new account and enjoy our services.</p>
              <button class="btn btn-success" @click="register">Register</button>
            </div>
          </div>
        </div>
      </div>
    <div class="class=card"><router-view @custom-event-name="showMessage"></router-view> </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      message:'', 
    }
  },
  methods: {
    showMessage(content){
      this.message=content
    },     
    closeMessage(){
      this.message='';
    },     
    login(){
       if(this.$route.path!=='/login')
        this.$router.push('/login')
    },
    register(){
       if(this.$route.path!=='/register')
        this.$router.push('/register')
    },
    managerRegister(){
       if(this.$route.path!=='/apply/register')
        this.$router.push('/apply/register')
    },   
  }
};
</script>
