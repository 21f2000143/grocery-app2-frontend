<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="card p-4">
      <div class="d-flex justify-content-between mb-3 w-75">
          <button type="button" class="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" @click="goBack"></button>
    </div>
      <!-- Cart Summary -->
    <div class="container mt-5">
        <h2>Managers</h2>
        <ul>
            <li v-for="(item, index) in managers_list" :key="index" class="list-group-item d-flex justify-content-between align-items-center text-wrap">
                <div class="btn-group" role="group" aria-label="Actions">
                    <p class="me-1"> Manager: </p>
                    <p class="me-1"> {{ item.email }} </p>
                    <button type="button" class="btn btn-success"  @click="withdraw(item.id)">withdraw</button>
                </div>
            </li>
            <p v-if="managers_list.length<1">No managers</p>
        </ul>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      managers_list: []      
    };
  },
  methods: {
    async withdraw(id) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/delete/managers/'+id,{
          method: 'DELETE',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 200) {
          const data = await response.json();
          this.showMessage(data.message)
        } else {
          const data = await response.json();
          alert(data.message);
          this.$emit('closeEvent', 'Something went wrong');
        }
      } catch (error) {
        console.error(error);
      }
    },          
    goBack(){
      this.$router.go(-1)
    },
    goHome(){
      this.$router.push('/new/view')
    },
    async loadManagers() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/get/managers', {
          method: 'GET',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          console.log(data, "categories fetched")
          this.managers_list=data;
          console.log(this.managers_list,"loaded data")
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }            
  },
  mounted() {
    this.loadManagers()
  },  
};
</script>

<style scoped>
/* Add your custom styles here */
.card {
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
</style>
