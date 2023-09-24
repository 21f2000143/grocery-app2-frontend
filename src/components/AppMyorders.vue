<template>
    <div class="container mt-5">
        <h1>Your Order History </h1>
        <div v-for="( item , index ) in orders" :key="index" :class="colors[index%8]" style="max-width: 18rem;">
            <div class="card-header">{{ item.product_name }}</div>
            <div class="card-body">
                <h5 class="card-title">Quantity: {{ item.quantity }}</h5>
                <h5 class="card-title">Date: {{ item.order_date }}</h5>
                <h5 class="card-title">Total amount: {{ item.amount_paid }}</h5>
            </div>
        </div>
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
    async loadOrders() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/orders', {
          method: 'GET',
          headers: {
            'Authentication-Token': sessionStorage.getItem('auth_token'),
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 200) {
          const data = await response.json();
          this.orders = data
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
  mounted() {
    this.loadOrders();
  }
}
</script>
