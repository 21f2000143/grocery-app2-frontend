<template>
    <div class="container text-center mb-5">
        <div class="row">
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img src="../assets/bootstrap-logo.svg" alt="Logo" width="30"
                            height="24" class="d-inline-block align-text-top">
                        Bootstrap
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul v-if="authenticated && role" class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item active me-2">
                                <a type="button" class="btn btn-primary" @click="showModal('productModal')">Add Product</a>
                                <div class="modal fade" id="productModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-scrollable">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <AddProduct @closeEvent="hideModal"/>
                                        </div>
                                        </div>
                                    </div>
                                </div>                                
                            </li>
                            <li class="nav-item me-2">
                                <a type="button" class="btn btn-primary" @click="showModal('categoryModal')">Add Category</a>
                                <div class="modal fade" id="categoryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-scrollable">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <AddCategory @closeEvent="hideModal"/>
                                        </div>>
                                        </div>
                                    </div>
                                </div>
                           </li>
                            <li class="nav-item">
                                <a type="button" class="btn btn-primary me-2" @click="Logout">Logout</a>
                            </li>
                        </ul>
                        <ul v-else class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a type="button" class="btn btn-primary me-2" @click="showModal('loginModal')">Login</a>
                                <div class="modal fade" id="loginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-scrollable">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            
                                            <button type="button" class="btn-close" @click="hideModal"></button>
                                        </div>
                                        <div class="modal-body">
                                            <AppLogin :byrole="'manager'" @closeEvent="hideModal" />
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <form class="d-flex me-2" role="search" @submit.prevent="swtichSearchView">
                            <input class="form-control me-2" v-model="filtered_view" type="search" placeholder="Search"
                                aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <button type="button" class="btn btn-primary me-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        Notifications <span v-show="pending_rquests" class="badge text-bg-danger">{{ pending_rquests }}</span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
        <div class="row">
            <div v-show="sseMessage" class="alert alert-warning alert-dismissible fade show" role="alert">
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
                        <img src="../assets/Group-33704.avif" class="d-block curve-corner w-100" alt="#">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="2000">
                        <img src="../assets/Group-33704.avif" class="d-block curve-corner w-100" alt="#">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="../assets/Group-33704.avif" class="d-block curve-corner w-100" alt="#">
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
            <button type="button" v-if="authenticated && role"  @click="showModal(item.id)" class="btn btn-primary m-2 text-nowrap">{{item.name}}</button>
            <button type="button" v-else class="btn btn-primary m-2 text-nowrap" disabled>{{item.name}}</button>
                        <div class="modal fade" :id="item.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="hideModal"></button>
                    </div>
                    <div class="modal-body">
                        <UpdateCategory :id="item.id.toString()" @closeEvent="hideModal"/>
                    </div>
                    </div>
                </div>
            </div>
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
                        <div v-if="authenticated && role" class="position-absolute bottom-0 start-0 m-2 curve-corner">
                            <button @click="showModal(item.id+'product')" class="btn btn-outline-secondary"
                                >Update</button>
                        </div>
                        <div v-if="authenticated && role" class="position-absolute bottom-0 end-0 m-2">
                            <button @click="showModal(item.id+'product')" class="btn btn-outline-secondary"
                                >Delete</button>
                        </div>
                        <div v-else class="position-absolute bottom-0 end-0 m-2">
                            <button class="btn btn-outline-info" @click="showModal('loginModal')">Access</button>
                        </div>
                        <div class="modal fade" :id="item.id + 'product' " data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-scrollable">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <UpdateProduct :id="item.id.toString()" @closeEvent="hideModal"/>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasRightLabel">Request From Managers</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="container mt-5">
                        <h2>Request List</h2>
                        <ul v-if="authenticated && role" class="list-group">
                            <li v-for="(item, index) in request_list" :key="index" class="list-group-item d-flex justify-content-between align-items-center text-wrap">
                                <div class="btn-group" role="group" aria-label="Actions">
                                    <button v-if="item.statuscheck=='pending'" type="button" class="btn btn-primary" disabled >status:{{item.statuscheck}}</button>
                                    <button v-else-if="item.statuscheck=='decline'" type="button" class="btn btn-danger" disabled >status:{{item.statuscheck}}</button>
                                    <button v-else type="button" class="btn btn-success" disabled >status:{{item.statuscheck}}</button>
                                    <button type="button" class="btn btn-info"  @click="read(item.sender, item.to, item.request_for, item.data, item.statuscheck)">Read</button>
                                </div>
                            </li>
                        </ul>
                        <ul v-else >
                          <button type="button" class="btn btn-info" disabled>Please Login to see</button>
                        </ul>
                    </div>
                </div>
                <div v-show="show" class="offcanvas-footer mb-2">
                    <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <li class="card-title">sender: {{sender}}</li>
                        <li class="card-title">to: {{to}}</li>
                        <li class="card-title">request_for: {{request_for}}</li>
                        <li class="card-title">data: {{data}}</li>
                        <li class="card-title">status: {{status}}</li>
                    </div>
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
//import store from '../store';
import AppLogin from '@/components/AppLogin.vue'
import AddCategory from '@/components/AddCategory.vue' 
import AddProduct from '@/components/AddProduct.vue' 
import UpdateCategory from '@/components/UpdateCategory.vue' 
import UpdateProduct from '@/components/UpdateProduct.vue' 
import bootstrap from 'bootstrap/dist/js/bootstrap.js'

export default {
  data() {
    return {
      email: '',
      password: '',
      modalElement:'',
      authenticated: false,
      categories_list: [],
      products_list: [],
      request_list: [],
      filtered_view: null,
      role: false,
      sender:null,
      to: null,
      data: null,
      status: null,
      request_for: null,
      show: false,
      message:'',
      sseMessage:''
    }
  },
  components: {
    AppLogin,
    AddCategory,
    AddProduct,
    UpdateCategory,
    UpdateProduct
  },
  methods:{
    read(sender, to, request_for, data, status){
        this.sender=sender;
        this.to=to;
        this.request_for=request_for;
        this.data=data;
        this.status=status;
        this.show=true;
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
    hideModal(message) {
        console.log(this.modalElement, "calling hideModal");
        if (this.modalElement) {
        this.modalElement.hide();
        if( message ){
        this.showMessage(message)
        }
        this.CheckAuthentication();
        this.loadRequests()
        }
    },
    CheckAuthentication(){
        if(sessionStorage.getItem('auth_token') &&  (sessionStorage.getItem('role').indexOf('manager')==0)){
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
          this.authenticated=false;
          this.role=false;
          sessionStorage.removeItem('auth_token');
          sessionStorage.removeItem('role');
          this.$set(this, 'authenticated', false);
          this.$set(this, 'role', false);
          this.showMessage('logout successful')
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
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  computed: {
    pending_rquests(){
      let count=0;
      for(let i=0;i<this.request_list.length;i++){
        console.log(this.request_list[i].status=='approve')
        if(this.request_list[i].statuscheck==='pending'){
          count=count+1;
          console.log(count)
        }
      }
      return count;
    }
  },
  mounted() {
    const source = new EventSource("http://localhost:8000/api/stream");
    source.addEventListener('notifymanager', event => {
      let data = JSON.parse(event.data);
      this.sseMessage = data.message;
    }, false);
    this.CheckAuthentication();
    this.loadCategories()
    this.loadProducts()
    this.loadRequests()
  },
}
</script>