<template>
  <div class="container text-center mt-5">
    <div v-show="message" class="alert alert-primary alert-dismissible fade show" role="alert">
        {{message}}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <!-- Header Section -->
    <header class="mb-4">
      <h1 class="display-4">User: {{this.$store.getters.authenticateUser['email']}} </h1>
      <p class="lead">Your one-stop shop for fresh and quality groceries delivered to your doorstep.</p>
    </header>

    <!-- Actions Section -->
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card-group">
          <!-- My orders -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Order History</h5>
              <p class="card-text">Click here to see your orders.</p>
              <button class="btn btn-primary" @click="goOrders">orders</button>
            </div>
          </div>

          <!-- Add to cart-->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Basket</h5>
              <p class="card-text">Click on to see items inside it.</p>
              <div v-show="this.$store.state.cartItems.length>0" class="position-relative">
                <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="position-absolute top-50 start-50 translate-middle">
                  <span class="badge bg-secondary">{{this.$store.state.cartItems.length}}</span>
                </div>
              </div>
              <button class="btn btn-dark" @click="goCart">View</button>
            </div>
          </div>

          <!-- Logout card -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Logout</h5>
              <p class="card-text">click here to logout</p>
              <button class="btn btn-success" @click="Logout">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Featured Products Section -->
    <div class="btn-group mt-3" role="group" aria-label="Basic outlined example">
      <button type="button" class="btn btn-outline-primary" @click="switchView('category')">View by Category</button>
      <button type="button" class="btn btn-outline-primary" @click="switchView('product')">View by Product</button>
    </div>
    <div class="class=card mt-3 mb-3"> <router-view :catName="catName"></router-view> </div>
    <form method="get">
      <input @input="swtichSearchView" v-model="search" placeholder="type to search" />
    </form>
    <div v-if="search">
      <section v-show="view=='product'" class="mt-5"> 
        <h2 class="mb-3">Searching for {{search}}...</h2>
        <div class="row">
          <div class="col-md-4 mb-4" v-for="(product, index) in products_list" :key="index">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.DESCR }}</p>
                <p class="card-text">Price: {{ product.rate_per_unit }}</p>
                <button class="btn btn-dark" @click="editPro(product.id)">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section v-show="view=='category'" class="mt-5">
        <h2 class="mb-4">Searching for {{search}}...</h2>
        <div class="row">
          <!-- Product Cards (You can loop through your products here) -->
          <div class="col-md-4 mb-4" v-for="(cat, index) in categories_list" :key="index">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ cat.name }}</h5>
                <p class="card-text">See all items in this category</p>
                <button class="btn btn-dark" @click="editCat(cat.id)">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <p v-if="categories_list.length<1 && products_list.length<1"> no result found</p>      
    </div>
    <div v-else>
    <section v-show="view=='product'" class="mt-5">
      <h2 class="mb-4">Featured Products</h2>
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
    <section v-show="view=='category'" class="mt-5">
      <h2 class="mb-4">Featured Category</h2>
      <div class="row">
        <!-- Product Cards (You can loop through your products here) -->
        <div class="col-md-4 mb-4" v-for="(cat, index) in categories_list" :key="index">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ cat.name }}</h5>
              <p class="card-text">See all items in this category</p>
              <button class="btn btn-danger" @click="seeMore(cat.name)"
              >See more</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      view:'product',
      message:'',
      catName:'',
      search:'',
      categories_list: [],
      products_list: []
    };
  },
  methods: {
    showMessage(content){
      this.message=content
    },
    seeMore(name){
      this.catName=name
      if(this.$route.path!=='/user/cat/products')
        this.$router.push('/user/cat/products')
    },
    async Logout(){
        try {
        const response = await fetch('http://127.0.0.1:8000/api/logout', {
          method: 'POST',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 200) {
          this.authenticated=false;
          this.role=false;
          sessionStorage.clear()
          this.$set(this, 'authenticated', false);
          this.$set(this, 'role', false);
          this.$router.push('/')
        } else {
          const data = await response.json();
          alert(data.message);
        }
        } catch (error) {
        console.error(error);
        }
    },
    switchView(id){
      this.view=id
    },    
    async swtichSearchView() {
      try {
        this.view='product';
        const response = await fetch('http://127.0.0.1:8000/api/products/by?word='+this.search, {
          method: 'GET',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          this.products_list=data.product;
          this.categories_list=data.category;
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }

    }, 
    goOrders(){
      if(this.$route.path!=='/user/orders')
        this.$router.push('/user/orders')
    },         
    available(item){
       return this.$store.getters.getItemQuantityInCart(item.id)
    },
    addClick(item){
      const order={"id": item.id,"item": item, "Qty": 1}
      this.$store.commit('addToCart',order)
    },
    againAddClick(id){
        this.$store.commit('addAgain',id)
    },
    removeClick(id){
        this.$store.commit('removeFromCart',id)
    },  
    goCart(){
      if(this.$route.path!=='/user/cart')
        this.$router.push('/user/cart')
    },
    async loadCategories() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories/getters?request_type=all', {
          method: 'GET',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          console.log(data, "categories fetched")
          this.categories_list=data;
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },    
    async loadProducts() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products/getters?request_type=all', {
          method: 'GET',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          console.log(data, "categories fetched")
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
    this.loadProducts()
    this.loadCategories()
    const source = new EventSource("http://localhost:8000/api/stream");
    source.addEventListener(this.$store.getters.authenticateUser['email'], event => {
      let data = JSON.parse(event.data);
      alert(data.message);
    }, false);    
  }
};
</script>
