<template>
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
</template>

<script>
export default {
  props: {
    requestedReport: String
  },
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
            'Authentication-Token': sessionStorage.getItem('auth_token'),
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
          this.$emit('closeEvent', 'Something went wrong');
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    requestedReport: function () {
      if(this.requestedReport==='ready')
        this.getReport();
    }
  }
}
</script>
