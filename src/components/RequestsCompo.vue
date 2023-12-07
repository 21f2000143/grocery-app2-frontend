<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="p-4 position-relative">
      <button type="button" class="btn-close position-absolute top-0 end-0 m-3" aria-label="Close" @click="goBack"></button>
      <!-- Cart Summary -->
      <div class="mt-5">
        <h2>Request List</h2>
        <ul class="list-group">
          <li v-for="(item, index) in request_list" :key="index" class="list-group-item d-flex justify-content-between align-items-center text-wrap">
            <div class="wrap-text">
              <p>{{ item.request_for }}</p>
              <p>{{ item.data }}</p>
              <p>{{ item.statuscheck }}</p>
            </div>
            <div v-if="$store.getters.authenticateUser.role === 'admin'" class="btn-group" role="group" aria-label="Actions">
              <button v-show="item.statuscheck === 'pending'" type="button" class="btn btn-success" @click="approve(item.id)">Approve</button>
              <button v-show="item.statuscheck === 'pending'" type="button" class="btn btn-dark" @click="decline(item.id)">Decline</button>
            </div>
          </li>
        </ul>
        <p v-if="request_list.length<1">No reuqest</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      request_list: []
    };
  },
  methods: {  
    async approve(id) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/apprequest/response/'+id, {
          method: 'POST',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "response":"approve"
          })
        });
        if (response.status === 200) {
          const data = await response.json();
          alert(data.message)
          this.loadRequests()
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async decline(id) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/apprequest/response/'+id, {
          method: 'POST',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "response":"decline"
          })
        });
        if (response.status === 200) {
          const data = await response.json();
          alert(data.message)
          this.loadRequests()
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    async loadRequests() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/apprequest/get', {
          method: 'GET',
          headers: {
            'Authentication-Token': this.$store.getters.authenticateUser.auth_token,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          console.log(data, "categories fetched")
          this.request_list=data;
          console.log(this.request_list,"loaded data")
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }          
  },
  mounted(){
    this.loadRequests()
  }
};
</script>