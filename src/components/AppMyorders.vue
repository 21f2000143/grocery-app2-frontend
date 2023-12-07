<template>
  <div class="d-flex justify-content-center align-items-center">
    <section class="mt-5 position-relative">
    <button type="button" class="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" @click="goBack"></button>
      <h2 class="mb-4">Your Order History</h2>
      <button type="button" class="btn-close position-absolute top-0 end-0 m-3" @click="goBack"></button>
      <div class="row">
        <!-- Product Cards (You can loop through your products here) -->
        <div v-for="(item, index) in orders" :key="index" :class="colors[index % 8]" style="max-width: 18rem; margin-bottom: 20px;">
          <div class="card">
            <div class="card-header">{{ item.product_name }}</div>
            <div class="card-body">
              <h5 class="card-title">Quantity: {{ item.quantity }}</h5>
              <h5 class="card-title">Date: {{ item.order_date }}</h5>
              <h5 class="card-title">Total amount: {{ item.amount_paid }}</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      colors: [
      "card text-bg-primary mb-3",
      "card text-bg-secondary mb-3",
      "card text-bg-success mb-3",
      "card text-bg-danger mb-3",
      "card text-bg-warning mb-3",
      "card text-bg-info mb-3",
      "card text-bg-light mb-3",
      "card text-bg-dark mb-3"
      ],
      progress: false,
      orders: []
    }
  },
  methods: {
    goBack(){
      if(this.$route.path!=='/user')
        this.$router.push('/user')
    },
    async loadOrders() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/orders', {
          method: 'GET',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 200) {
          const data = await response.json();
          this.orders = data
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.loadOrders();
  }
}
</script>
