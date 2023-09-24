<template>
  <div class="container mt-5">
      <h1>Your Shopping Cart</h1>
      <h4>Qty with yellow colors shows the max available stock!</h4>
      <table class="table">
          <thead>
              <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item, index) in this.$store.state.cartItems" :key="index">
                  <td>{{ item.item.name }}</td>
                  <td>{{ item.item.rate_per_unit }}</td>
                  <td>{{ item.Qty }}</td>
                  <td>{{ item.item.rate_per_unit * item.Qty }}</td>
              </tr>
          </tbody>
      </table>
      <h4>Total: {{ total }}</h4>
      <button @click="payment" class="btn btn-primary">Make the payment</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: false,
    }
  },
  methods: {
    async payment() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/orders', {
          method: 'POST',
          headers: {
            'Authentication-Token': sessionStorage.getItem('auth_token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.$store.state.cartItems),
        });
        if (response.status === 201) {
          const data = await response.json();
          this.$store.commit('emptyCart');
          this.$emit('closeEvent', data.message);
        } else {
          const data = await response.json();
          alert(data.message);
          this.$emit('closeEvent', 'Something went wrong');
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
}
</script>
