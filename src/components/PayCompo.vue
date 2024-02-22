<template>
  <div class="d-flex justify-content-center align-items-center">

    <div class="card p-4">
      <div class="d-flex justify-content-between mb-3 w-75">
        <button type="button" class="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" @click="goBack"></button>
      </div>
      <div class="container mt-5">
        <h1 class="mb-4">Your Shopping Cart</h1>
        <h4>if the entered qty is more then available then by default it will take the max available qty</h4>
        <table class="table table-striped mt-4">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in this.$store.state.cartItems" :key="index">
              <td>{{ item.item.name }}</td>
              <td>{{ item.item.rate_per_unit | currency }}</td>
              <td :class="{ 'text-warning': item.Qty === item.item.stock }">{{ item.Qty }}</td>
              <td>{{ (item.item.rate_per_unit * item.Qty) | currency }}</td>
            </tr>
          </tbody>
        </table>

        <h4 class="mt-4">Total: {{ total | currency }}</h4>

        <button @click="payment" class="btn btn-primary mt-3">Proceed to Payment</button>
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
    goBack(){
      this.$router.go(-1)
    },
    goHome(){
      if(this.$route.path!=='/new/view')
        this.$router.push('/new/view')
    },
    async payment() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/orders', {
          method: 'POST',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.$store.state.cartItems),
        });
        if (response.status === 201) {
          const data = await response.json();
          this.$store.commit('emptyCart');
          alert(data.message);
          if(this.$route.path!=='/user')
            this.$router.push('/user')
        } else {
          const data = await response.json();
          alert(data.message);
          alert('Something went wrong');
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    total(){
      return this.$store.getters.totalCartPrice;
    }
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
