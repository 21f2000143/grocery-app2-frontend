import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
import NewManagerView from '../views/NewManagerView.vue'
import NewUserView from '../views/NewUserView.vue'
import NewAdminView from '../views/NewAdminView.vue'
import HomeView from '../views/HomeView.vue'
import LoginCompo from '../components/LoginCompo.vue'
import RegisterCompo from '../components/RegisterCompo.vue'
import ManagerRegisterCompo from '../components/ManagerRegisterCompo.vue'
import CartCompo from '../components/CartCompo.vue'
import PayCompo from '../components/PayCompo.vue'
import AddCategory from '@/components/AddCategory.vue' 
import AddProduct from '@/components/AddProduct.vue' 
import UpdateCategory from '@/components/UpdateCategory.vue' 
import UpdateProduct from '@/components/UpdateProduct.vue'
import ManagersCompo from '@/components/ManagersCompo.vue'
import RequestsCompo from '@/components/RequestsCompo.vue'
import AppProductReport from '@/components/AppProductReport.vue'
import AppMyorders from '@/components/AppMyorders.vue'
import CatProducts from '@/components/CatProducts.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: HomeView,
    children:[
      {
        path: '/login',
        name: 'login-page',
        component: LoginCompo
      },
      {
        path: '/register',
        name: 'register-page',
        component: RegisterCompo
      },
      {
        path: '/apply/register',
        name: 'apply-page',
        component: ManagerRegisterCompo
      },
    ]
  },
  {
    path: '/manager',
    name: 'manager',
    component:  NewManagerView,
    meta: { requiresAuth: true },
    // beforeEnter: (to, from, next) => {
    //   // Perform some authentication or authorization logic
    //   const isAuthenticated = /* Check authentication */;
    //   if (isAuthenticated) {
    //     next(); // Allow navigation to the '/about' route
    //   } else {
    //     next('/'); // Redirect to the home page if not authenticated
    //   }
    // },
    children: [
      {
        path: '/manager/category',
        name: 'manager-category',
        meta: { requiresAuth: true },
        component:  AddCategory
      },
      {
        path: '/manager/product',
        name: '/manager-product',
        meta: { requiresAuth: true },
        component:  AddProduct
      },
      {
        path: '/manager/edit/cat/:id',
        name: '/manager-cat-edit',
        meta: { requiresAuth: true },
        component:  UpdateCategory
      },
      {
        path: '/manager/edit/pro/:id',
        name: '/manager-pro-edit',
        meta: { requiresAuth: true },
        component:  UpdateProduct
      },
      {
        path: '/manager/report',
        name: '/manager-report',
        meta: { requiresAuth: true },
        component:  AppProductReport
      },
      {
        path: '/manager/requests',
        name: '/manager-requests',
        meta: { requiresAuth: true },
        component:  RequestsCompo
      },
    ]      
  },
  {
    path: '/user',
    name: 'user',
    component:  NewUserView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/user/cart',
        name: 'user-cart',
        meta: { requiresAuth: true },
        component:  CartCompo
      },
      {
        path: '/user/orders',
        name: 'user-orders',
        meta: { requiresAuth: true },
        component:  AppMyorders
      },
      {
        path: '/user/cat/products',
        name: 'user-products',
        meta: { requiresAuth: true },
        component:  CatProducts
      },
      {
        path: '/user/pay',
        name: 'user-pay',
        meta: { requiresAuth: true },
        component:  PayCompo
      }
    ]
    // beforeEnter: (to, from, next) => {
    //   // Perform some authentication or authorization logic
    //   const isAuthenticated = /* Check authentication */;
    //   if (isAuthenticated) {
    //     next(); // Allow navigation to the '/about' route
    //   } else {
    //     next('/'); // Redirect to the home page if not authenticated
    //   }
    // },
  },
  {
    path: '/admin',
    name: 'admin',
    component:  NewAdminView,
    meta: { requiresAuth: true },
    // beforeEnter: (to, from, next) => {
    //   // Perform some authentication or authorization logic
    //   const isAuthenticated = /* Check authentication */;
    //   if (isAuthenticated) {
    //     next(); // Allow navigation to the '/about' route
    //   } else {
    //     next('/'); // Redirect to the home page if not authenticated
    //   }
    // },
    children: [
      {
        path: '/admin/category',
        name: 'admin-category',
        meta: { requiresAuth: true },
        component:  AddCategory
      },
      {
        path: '/admin/product',
        name: 'admin-product',
        meta: { requiresAuth: true },
        component:  AddProduct
      },
      {
        path: '/admin/edit/cat/:id',
        name: 'admin-cat-edit',
        meta: { requiresAuth: true },
        component:  UpdateCategory
      },
      {
        path: '/admin/edit/pro/:id',
        name: 'admin-pro-edit',
        meta: { requiresAuth: true },
        component:  UpdateProduct
      },
      {
        path: '/admin/managers',
        name: 'admin-managers',
        meta: { requiresAuth: true },
        component:  ManagersCompo
      },
      {
        path: '/admin/report',
        name: 'admin-report',
        meta: { requiresAuth: true },
        component:  AppProductReport
      },
      {
        path: '/admin/requests',
        name: 'admin-requests',
        meta: { requiresAuth: true },
        component:  RequestsCompo
      },
    ]
  },
  ]
  
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.auth.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
