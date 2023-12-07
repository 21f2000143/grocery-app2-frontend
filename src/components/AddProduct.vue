<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="card p-4 position-relative">
    <button type="button" class="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" @click="goBack"></button>
      <h1>Add Product</h1>
      <form method="POST" @submit.prevent="addproduct">
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="name" class="form-label">Product Name</label>
            <input type="text" class="form-control" id="name" name="name" v-model="product.name" required>
          </div>
          <div class="col-md-6">
            <label for="manufacture_date" class="form-label">Manufacture Date</label>
            <input type="date" class="form-control" id="manufacture_date" name="manufacture_date" v-model="product.manufacture_date" required>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="expiry_date" class="form-label">Expiry Date</label>
            <input type="date" class="form-control" id="expiry_date" name="expiry_date" v-model="product.expiry_date" required>
          </div>
          <div class="col-md-6">
            <label for="rate_per_unit" class="form-label">Rate per Unit</label>
            <input type="number" class="form-control" id="rate_per_unit" name="rate_per_unit" v-model="product.rate_per_unit" min="1" required>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="stock" class="form-label">Stock</label>
            <input type="number" class="form-control" id="stock" name="stock" min="1" v-model="product.stock" required>
          </div>
          <div class="col-md-6">
            <label for="unit" class="form-label">Unit</label>
            <input type="text" class="form-control" id="unit" name="unit" v-model="product.unit" required>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="category_id" class="form-label">Category ID</label>
            <select class="form-select" aria-label="Default select example" name="category_id" v-model="product.category_id" required>
              <option v-for="(item, index) in categories_list" :key="index" :value="item.id">{{item.name}}</option>
            </select>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // Initialize the product object
      product: {
        name: '',
        manufacture_date: '',
        expiry_date: '',
        rate_per_unit: 0,
        stock: 0,
        unit: '',
        img_name: 'NA',
        category_id: '',
      },
      categories_list: [],
    }
  },
  methods: {
    handleFileChange(event) {
      this.product.img_name = event.target.files[0];
    },
    goBack(){
      this.$router.go(-1)
    },    
    async addproduct() {
      const manufactureDate = new Date(this.product.manufacture_date);
      const expiryDate = new Date(this.product.expiry_date);

      if(manufactureDate > expiryDate){
        alert('Manufacture date must be earlier than expiry date')
      }
      else{
        this.invalidData=false
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products', {
          method: 'POST',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.product),
        });
        if (response.status === 201) {
          const data = await response.json();
          alert(data.message)
          this.$router.go(-1);
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
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
  },
  mounted(){
    this.loadCategories();
  }
}
</script>
