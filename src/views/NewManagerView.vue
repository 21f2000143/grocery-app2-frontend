<template>
  <div class="container text-center mt-5">
    <div v-show="message" class="alert alert-primary alert-dismissible fade show" role="alert">
        {{message}}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>  
    <!-- Header Section -->
    <header class="mb-4">
      <h1 class="display-4">Manager Dashboard</h1>
      <p class="lead">You are allowed to manage the store.</p>
    </header>

    <!-- Actions Section -->
    <div class="row justify-content-center">
      <div class="col-md-6 mt-3">
        <div class="card-group">
          <!-- Managers -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Your are a manager</h5>
              <p class="card-text">Click to quit the job.</p>
              <button class="btn btn-primary" @click="goToManagers">Leave</button>
            </div>
          </div>

          <!-- Add Product -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Add Product</h5>
              <p class="card-text">Click here to add product.</p>
              <button class="btn btn-dark" @click="addPro">Add</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <div class="card-group">
          <!-- Add Category -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Add Category</h5>
              <p class="card-text">Click here to add Category.</p>
              <button class="btn btn-success" @click="addCat">Add</button>
            </div>
          </div>

          <!-- Get Report -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Get Report</h5>
              <p class="card-text">Click here to add Category.</p>
              <div v-if="requestedReport=='yes'" class="position-relative">
                <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div v-else>
              </div>
              <button v-if="requestedReport=='no'" class="btn btn-info" @click="getReport">Prepare</button>
              <button v-else-if="requestedReport=='ready'" class="btn btn-success" @click="goReport">ready</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <div class="card-group">
          <!-- Received Requests -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Requests</h5>
              <p class="card-text">Click here to add Category.</p>
              <button class="btn btn-danger" @click="goToRequests">see</button>
            </div>
          </div>

          <!-- Logout -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Logout</h5>
              <p class="card-text">Click here to add Category.</p>
              <button class="btn btn-secondary" @click="Logout">Logout</button>
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
    <div class="class=card mt-3 mb-3"> <router-view></router-view></div>
    <div class="class=card mt-3 mb-3">
    <form method="get">
      <input @input="swtichSearchView" v-model="search" placeholder="type to search" />
    </form>
    </div>
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
                <button class="btn btn-dark" @click="editPro(product.id)">Edit</button>
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
                <button class="btn btn-dark" @click="editCat(cat.id)">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
//import store from '../store'; 

export default {
  data() {
    return {
      view:'product',
      search:'',
      message:'',      
      categories_list: [],
      products_list: [],
      requestedReport:"no",
    };
  },
  methods: {
    showMessage(content){
      this.message=content
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
    async getReport(){
      this.requestedReport='yes'
      try {
        const response = await fetch('http://127.0.0.1:8000/get/report', {
          method: 'GET',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          alert(data.message)
          this.requestedReport='ready'
        } else {
          const data = response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
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
    switchView(id){
      this.view=id
    }, 
    async goToManagers() {
      try {
          this.presslogin=true
        const response = await fetch('http://127.0.0.1:8000/api/leave/job', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.$store.getters.authenticateUser.email,
          }),
        });
        if (response.status === 200) {
          // Registration successful
          const data = await response.json();
          alert(data.message)
          this.$router.push('/')
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }, 
    goReport(){
      if(this.$route.path!=='/manager/report')
        this.$router.push('/manager/report')
    },  
    goToRequests(){
      if(this.$route.path!=='/manager/requests')
        this.$router.push('/manager/requests')
    },  
    addCat(){
      if(this.$route.path!=='/manager/category')
        this.$router.push('/manager/category')
    },   
    editCat(id){
      if(this.$route.path!=='/manager/edit/cat/'+id)
        this.$router.push('/manager/edit/cat/'+id)
    },   
    addPro(){
      if(this.$route.path!=='/manager/product')
        this.$router.push('/manager/product')
    },   
    editPro(id){
      if(this.$route.path!=='/manager/edit/pro/'+id)
        this.$router.push('/manager/edit/pro/'+id)
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
    const source = new EventSource("http://localhost:8000/api/stream");
    source.addEventListener('notifymanager', event => {
      let data = JSON.parse(event.data);
      alert(data.message);
    }, false);    
    this.loadProducts()
    this.loadCategories()
  }
};
</script>
