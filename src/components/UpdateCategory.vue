<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="card p-4">
    <button type="button" class="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" @click="goBack"></button>
    <h1>Update Category</h1>
    <form method="POST" @submit.prevent="updateCategory">
        <div class="mb-3">
            <label for="name" class="form-label">Category Name</label>
            <input type="text" class="form-control" v-model="name"  required>
        </div>
        <div>
          <button type="submit" class="btn btn-primary">update</button>
          <a class="btn btn-danger" @click="deleteCategory">Delete</a>
        </div>
    </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateCategory',
  data() {
    return {
      name:'',
    };
  },
  methods:{
    async deleteCategory() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories',{
          method: 'DELETE',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.$route.params.id,
            name: this.name
          }),
        });
        if (response.status === 200) {
          const data = await response.json();
          alert(data.message)
        } else {
          const data = await response.json();
          alert(data.message);

        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateCategory() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories',{
          method: 'PUT',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.$route.params.id,
            name: this.name
          }),
        });
        if (response.status === 201) {
          const data = await response.json();
          alert(data.message)
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async loadCategory() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories/getters?request_type=first&id=' + this.$route.params.id, {
          method: 'GET',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          console.log(data, "categories fetched")
          this.name=data.name;
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    goBack(){
      this.$router.go(-1)
    }    
  },
  mounted(){
    this.loadCategory()
  }
}
</script>