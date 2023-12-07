<template>
  <div class="container text-center mt-5">
    <section class="mt-5 position-relative">
      <h2 class="mb-4">{{catName}}</h2>
      <button type="button" class="btn-close position-absolute top-0 end-0 m-3" @click="goBack"></button>
      <div class="row">
        <!-- Product Cards (You can loop through your products here) -->
        <div class="col-md-4 mb-4" v-for="(product, index) in products_list" :key="index">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ product.DESCR }}</p>
              <p class="card-text">Price: {{ product.rate_per_unit }}</p>
              <button class="btn btn-outline-primary" v-if="product.stock > available(product)" @click="addClick(product)">Add to Cart</button>
              <button v-else class="btn btn-danger">Out of stock</button>
            </div>
          </div>
        </div>
      </div>
    </section>    
  </div>
</template>
<script>
export default {
  props: ['catName'],
  data() {
    return {
      products_list: []
    }
  },
  methods: {
    goBack(){
       if(this.$route.path!=='/user')
        this.$router.push('/user')
    },
    available(item){
       return this.$store.getters.getItemQuantityInCart(item.id)
    },
    addClick(item){
      const order={"id": item.id,"item": item, "Qty": 1}
      this.$store.commit('addToCart',order)
    },
    async swtichSearchView() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products/by?word='+this.catName, {
          method: 'GET',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          this.products_list=data;
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
    this.swtichSearchView()
  }
}
</script>
