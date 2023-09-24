<template>
  <div class="container">
    <h1>Update Category</h1>
    <form method="POST" @submit.prevent="updateCategory">
        <div class="mb-3">
            <label for="name" class="form-label">Category Name</label>
            <input type="text" class="form-control" v-model="name"  required>
        </div>
        <div v-if="progress" class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else>
          <button type="submit" class="btn btn-primary">update</button>
          <button type="submit" class="btn btn-danger" @click="deleteCategory">Delete</button>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateCategory',
  props: {
    id: String
  },
  data() {
    return {
      name:'',
      progress:false
    };
  },
  methods:{
    async deleteCategory() {
      try {
        this.progress=true;
        const response = await fetch('http://127.0.0.1:8000/api/categories',{
          method: 'DELETE',
          headers: {
            'Authentication-Token': sessionStorage.getItem('auth_token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.id,
            name: this.name
          }),
        });
        if (response.status === 200) {
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
    },
    async updateCategory() {
      try {
        this.progress=true;
        const response = await fetch('http://127.0.0.1:8000/api/categories',{
          method: 'PUT',
          headers: {
            'Authentication-Token': sessionStorage.getItem('auth_token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.id,
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
    },
    async loadCategory() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories/getters?request_type=first&id=' + this.id, {
          method: 'GET',
          headers: {
            'Authentication-Token': sessionStorage.getItem('auth_token'),
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
  },
  mounted(){
    this.loadCategory()
  }
}
</script>