<template>
  <div class="container text-center mb-5">
    <div class="row">
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="../assets/bootstrap-logo.svg" alt="Logo" width="30" height="24"
                        class="d-inline-block align-text-top">
                    Bootstrap
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li v-if="authenticated && role" class="nav-item">
                            <a type="button" class="btn btn-primary me-2" @click="Logout">Logout</a>
                        </li>
                        <li v-else class="nav-item">
                            <a type="button" class="btn btn-primary me-2" @click="showModal('loginModal')">Login</a>
                            <div class="modal fade" id="loginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-scrollable">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="btn-close" @click="hideModal(null)"></button>
                                    </div>
                                    <div class="modal-body">
                                        <AppLogin :byrole="'user'" @closeEvent="hideModal" />
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li v-if="authenticated && role" class="nav-item">
                            <a type="button" class="btn btn-primary me-2" @click="showModal('myOrders')">My orders</a>
                            <div class="modal fade" id="myOrders" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-scrollable">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                        <button type="button" class="btn-close" @click="hideModal(null)"></button>
                                    </div>
                                    <div class="modal-body">
                                        <AppMyorders />
                                    </div>
                                    </div>
                                </div>
                            </div>                               
                        </li>
                        <li v-else class="nav-item">
                            <a type="button" class="btn btn-primary me-2" @click="showModal('registerModal')">Register</a>
                            <div class="modal fade" id="registerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-scrollable">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                        <button type="button" class="btn-close" @click="hideModal(null)"></button>
                                    </div>
                                    <div class="modal-body">
                                        <AppRegister @closeEvent="hideModal"/>
                                    </div>
                                    </div>
                                </div>
                            </div>                               
                        </li>
                        <li class="nav-item">
                            <div v-if="authenticated">
                              <a v-if="eligibility=='eligible'" type="button" class="btn btn-primary me-2" @click="applyformanager()">Apply for manage</a>
                              <button v-else type="button" class="btn btn-primary me-2" disabled>{{ eligibility }}</button>
                            </div>
                        </li>
                    </ul>
                    <form class="d-flex me-2" role="search" @submit.prevent="swtichSearchView">
                        <input class="form-control me-2" v-model="filtered_view" type="search" placeholder="Search"
                            aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <a href="#">
                        <button type="button" class="btn btn-primary position-relative" @click="showCanvas('offcanvasRight')">
                            My Cart
                            <span v-show="this.$store.state.cartItems.length" id="cart-count"
                                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {{this.$store.state.cartItems.length}}
                            </span>
                        </button>
                    </a> 
                </div>
            </div>
        </nav>
    </div>
    <div class="row">
        <div v-show="sseMessage" class="alert alert-info alert-dismissible fade show" role="alert">
          <strong>Holy guacamole!</strong> {{ sseMessage }}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                    <img src="../assets/Group-33704.avif" class="d-block curve-corner w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                </div>
                <div class="carousel-item" data-bs-interval="2000">
                    <img src="../assets/Group-33704.avif" class="d-block curve-corner w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="../assets/Group-33704.avif" class="d-block curve-corner w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    <div class="row">
        <div  v-for="(item, index) in categories_list" :key="index" class="col">
          <button type="button" v-if="authenticated && role"  @click="productByCategory(item.name)" class="btn btn-primary m-2 text-nowrap">{{item.name}}</button>
          <button type="button" v-else class="btn btn-primary m-2 text-nowrap" disabled>{{item.name}}</button>
        </div>
    </div>
    <div class="row">
        <h3 v-show="filtered_view">Search results for {{filtered_view}}</h3>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" v-for="(item, index) in products_list" :key="index" >
                <div class="card h-100 position-relative">
                    <img src="../assets/beauty-WEB.avif" class="card-img-top" alt="#">
                    <div class="card-body">
                        <h5 class="card-title">{{item.name}}</h5>
                    </div>
                    <div class="position-absolute bottom-0 end-0 m-2">
                        <button v-if="item.stock > available(item)" @click="addClick(item)"  class="btn btn-outline-secondary">Add to cart</button>
                        <button v-else class="btn btn-danger">Out of stock</button>
                    </div> 
                    <div class="position-absolute bottom-0 start-0 m-2 curve-corner">
                        <button class="btn btn-outline-secondary" disabled> &#8377; {{ item.rate_per_unit }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">You can see cart items here</h5>
            <button type="button" class="btn-close" @click="hideCanvas"></button>
        </div>
        <div class="offcanvas-body">
            <div v-if="authenticated && role" class="container mt-5">
                <h2>Items In Your Cart</h2>
                <ul class="list-group">
                    <li v-for="(item, index) in this.$store.state.cartItems" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                        {{item.item.name}}
                        <div class="btn-group" role="group" aria-label="Actions">
                            <button type="button" class="btn btn-light">{{item.Qty}}</button>
                            <button type="button" class="btn btn-success" @click="againAddClick(item.id)">Add</button>
                            <button type="button" class="btn btn-danger" @click="removeClick(item.id)">Remove</button>
                        </div>
                    </li>
                </ul>
                <a type="button" v-if="this.$store.state.cartItems.length > 0" class="btn btn-primary" @click="callPaymentModal('checkoutModal')">Check Out</a>
                <a type="button" v-else class="btn btn-warning" disabled>Nothing in your cart</a>
            </div>
        </div>
    </div>
    <div class="modal fade" id="checkoutModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
          <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <AppCart @closeEvent="hideModal"/>
          </div>
          </div>
      </div>
    </div>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Bootstrap</strong>
          <small>few mins ago</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppLogin from '@/components/AppLogin.vue'
import AppRegister from '@/components/AppRegister.vue' 
import AppMyorders from '@/components/AppMyorders.vue' 
import AppCart from '@/components/AppCart.vue' 
import bootstrap from 'bootstrap/dist/js/bootstrap.js'

export default {
  data() {
    return { 
      email: '',
      password: '',
      modalElement:'',
      toastElement:'',
      canvasElemet:'',
      authenticated: false,
      categories_list: [],
      products_list: [],
      request_list: [],
      filtered_view: null,
      role:false,
      eligibility:'',
      message:'',
      sseMessage:''
    };
  },
  components: {
    AppLogin,
    AppRegister,
    AppCart,
    AppMyorders
  },
  methods:{
    available(item){
       return this.$store.getters.getItemQuantityInCart(item.id)
    },
    showMessage(message){
      this.hideToast()
      this.message=message;
      this.showToast("liveToast")
    },
    showToast(toastId) {
      const toastElement = document.getElementById(toastId);
      this.toastElement = new bootstrap.Toast(toastElement, { keyboard: false });
      this.toastElement.show();
    },
    hideToast() {
      console.log(this.toastElement, "calling hideToast");
      if (this.toastElement) {
      this.toastElement.hide();
      this.CheckAuthentication();
      } 
    },
    addClick(item){
        const order={"id": item.id,"item": item, "Qty": 1}
        this.$store.commit('addToCart',order)
    },
    againAddClick(id){
        this.$store.commit('addAgain',id)
    },
    removeClick(id){
        this.$store.commit('removeFromCart',id)
    },
    async productByCategory(category){
      this.filtered_view = category;
      this.swtichSearchView()
    },
    async swtichSearchView() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products/by?word='+this.filtered_view, {
          method: 'GET',
          headers: {
            'Authentication-Token': sessionStorage.getItem('auth_token'),
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
    showModal(modalId) {
        const modalElement = document.getElementById(modalId);
        this.modalElement = new bootstrap.Modal(modalElement, { keyboard: false });
        this.modalElement.show();
    },
    async callPaymentModal(modalId){
      await this.hideCanvas()
      this.showModal(modalId)
    },
    hideModal(message) {
        this.isEligibleForManager();
        console.log(this.modalElement, "calling hideModal");
        if (this.modalElement) {
        this.modalElement.hide();
        if(message){
          
          this.showMessage(message);
        }
        this.CheckAuthentication();
        } 
    },
    showCanvas(offcanvasRight) {
        const canvasElemet = document.getElementById(offcanvasRight)
        this.canvasElemet = new bootstrap.Offcanvas(canvasElemet);
        this.canvasElemet.show();
    },
    hideCanvas() {
        if (this.canvasElemet) {
        this.canvasElemet.hide();
        this.CheckAuthentication();
        }
    },
    CheckAuthentication(){
        if(sessionStorage.getItem('auth_token') &&  (sessionStorage.getItem('role').indexOf('user')==0)){
            this.$set(this, 'authenticated', true);
            this.$set(this, 'role', true);
        }
    },
    async Logout(){
        try {
        const response = await fetch('http://127.0.0.1:8000/api/logout', {
          method: 'POST',
          headers: {
            'Authentication-Token': sessionStorage.getItem('auth_token'),
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 200) {
          const data = await response.json();
          console.log(data.apitest)
          this.authenticated=false;
          this.role=false;
          sessionStorage.removeItem('auth_token');
          sessionStorage.removeItem('role');
          this.$set(this, 'authenticated', false);
          this.$set(this, 'role', false);
          this.$store.commit('emptyCart');
          this.showMessage('Logout successful')
        } else {
          const data = await response.json();
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
            'Authentication-Token': sessionStorage.getItem('auth_token'),
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
    async loadProducts() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products/getters?request_type=all', {
          method: 'GET',
          headers: {
            'Authentication-Token': sessionStorage.getItem('auth_token'),
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
    async loadRequests() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/apprequest/get', {
          method: 'GET',
          headers: {
            'Authentication-Token': sessionStorage.getItem('auth_token'),
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          console.log(data, "categories fetched")
          this.request_list=data;
          if(this.request_list.length>0){
            this.noApplied = this.request_list[0].statuscheck
          }
          console.log(this.request_list, "got list")
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async applyformanager() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/apprequest', {
          method: 'POST',
          headers: {
            'Authentication-Token': sessionStorage.getItem('auth_token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "request_for":"manager_role",
            "data":"Apply for manager"
          })
        });
        if (response.status === 200) {
          const data = await response.json();
          console.log(data, "categories fetched")
          alert(data.message);
          this.isEligibleForManager();
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async isEligibleForManager() {
      try {
        const response = await fetch('http://127.0.0.1:8000/check/eligibility', {
          method: 'GET',
          headers: {
            'Authentication-Token': sessionStorage.getItem('auth_token'),
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 200) {
          const data = await response.json();
          console.log(data, "categories fetched")
          this.eligibility=data.eligibility;
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
    source.addEventListener(sessionStorage.getItem('email'), event => {
      let data = JSON.parse(event.data);
      this.sseMessage = data.message;
    }, false);
    this.CheckAuthentication();
    this.loadCategories()
    this.loadProducts()
    this.loadRequests()
    this.isEligibleForManager()
  },
}
</script>