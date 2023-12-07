<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="card p-4 position-relative">
      <button type="button" class="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" @click="goBack"></button>
      <h1>Add Category</h1>
      <form method="POST" @submit.prevent="addcategory">
        <div class="mb-3">
          <label for="name" class="form-label">Category Name</label>
          <input type="text" class="form-control" v-model="name" required>
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
      name:'',
    };
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    async addcategory() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories',{
          method: 'POST',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.name
          }),
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
  }
}
</script>