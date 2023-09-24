import Vue from 'vue'
import VueRouter from 'vue-router'
import UserView from '../views/UserView.vue'
import ManagerView from '../views/ManagerView.vue'
import AdminView from '../views/AdminView.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'user',
    component: UserView,
    // children:[
    //   {
    //     path:'/results/:for',
    //     component: SearchView
    //   }
    // ]
  },
  {
    path: '/manager',
    name: 'manager',
    component: ManagerView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
