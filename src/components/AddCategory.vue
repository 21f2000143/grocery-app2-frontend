<template>
  <div class="container">
    <h1>Add Category</h1>
    <form method="POST" @submit.prevent="addcategory">
        <div class="mb-3">
            <label for="name" class="form-label">Category Name</label>
            <input type="text" class="form-control" v-model="name"  required>
        </div>
        <div v-if="progress" class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <button v-else type="submit" class="btn btn-primary" @click="addcategory">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:'',
      progress:false
    };
  },
  methods:{
    async addcategory() {
      try {
        this.progress=true;
        const response = await fetch('http://127.0.0.1:8000/api/categories',{
          method: 'POST',
          headers: {
            'Authentication-Token': sessionStorage.getItem('auth_token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.name
          }),
        });
        if (response.status === 201) {
          const data = await response.json();
          this.progress=false
          this.$emit('closeEvent', data.message);
        } else {
          const data = await response.json();
          alert(data.message);
          this.$emit('closeEvent', 'Something went wrong');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>