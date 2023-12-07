<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="card p-4">
      <div class="d-flex justify-content-between mb-3 w-75">
          <button type="button" class="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" @click="goBack"></button>
    </div>
      <!-- Cart Summary -->
    <div class="container mt-5">
        <h1>Products Report</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Availabe stock</th>
                    <th>Price</th>
                    <th>Sold stock</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data_list" :key="index">
                    <td>{{ item[0] }}</td>
                    <td>{{ item[1] }}</td>
                    <td>{{ item[2] }}</td>
                    <td>{{ item[3] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data_list: [],
    }
  },
  methods: {
    async getReport() {
      try {
        const response = await fetch('http://127.0.0.1:8000/get/report/data', {
          method: 'GET',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          this.data_list=data
          console.log(data)
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
    this.getReport()
  }
}
</script>
