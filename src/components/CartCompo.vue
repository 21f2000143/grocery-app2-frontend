<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="card p-4">
      <div class="d-flex justify-content-between mb-3 w-75">
          <button type="button" class="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" @click="goBack"></button>
      </div>
      <!-- Cart Summary -->
      <div class="container mt-5">
        <h2 class="mb-4">Your Shopping Cart</h2>
        <ul class="list-group">
          <li v-for="(item, index) in this.$store.state.cartItems" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <span>{{ item.item.name }}</span>
            </div>
            <div class="btn-group" role="group" aria-label="Actions">
              <button type="button" class="btn btn-light">{{ item.Qty }}</button>
              <button type="button" class="btn btn-success" @click="againAddClick(item.id)">Add</button>
              <button type="button" class="btn btn-danger" @click="removeClick(item.id)">Remove</button>
            </div>
          </li>
        </ul>
        <div class="mt-3">
          <a v-if="this.$store.state.cartItems.length > 0" class="btn btn-primary" @click="goToPay">Proceed to Checkout</a>
          <a v-else class="btn btn-warning" disabled>Your Cart is Empty</a>
        </div>
      </div>
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
      authenticated: false,
      role:false,
    };
  },
  methods: {   
    againAddClick(id){
        this.$store.commit('addAgain',id)
    },
    removeClick(id){
        this.$store.commit('removeFromCart',id)
    },    
    goToPay(){
      if(this.$route.path!=='/user/pay')
        this.$router.push('/user/pay')
    },
    goBack(){
      this.$router.go(-1)
    },
    goHome(){
      if(this.$route.path!=='/new/view')
      this.$router.push('/new/view')
    },        
  } 
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
