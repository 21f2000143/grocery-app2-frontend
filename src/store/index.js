import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartItems: [],
    auth: {
      isAuthenticated: false,
      auth_token:'',
      role:'',
      email:''
    },
  },
  getters: {
    totalCartPrice: (state) => {
      let total=0;
      for(let i=0;i<state.cartItems.length;i++){
        total += parseInt(state.cartItems[i].Qty)*parseInt(state.cartItems[i].item.rate_per_unit);
        }
        return total;
    },
    getItemQuantityInCart: (state) => (itemId) => {
      const cartItem = state.cartItems.find(item => item.id === itemId);
      return cartItem ? parseInt(cartItem.Qty) : 0;
    },
    authenticateUser: (state) => {
      return state.auth;
    },
  },
  mutations: {
    addToCart: (state, newItem) => {
      let flag=true;
      for(let i=0;i<state.cartItems.length;i++){
        if(state.cartItems[i].id==newItem.id){
          state.cartItems[i].Qty= (parseInt(state.cartItems[i].Qty)+1).toString();
          flag=false
          break;
        }
      }
      if(flag)
        state.cartItems.push(newItem);
    },
    addAgain: (state, id) => {
      for(let i=0;i<state.cartItems.length;i++){
        if(state.cartItems[i].id==id){
          console.log(state.cartItems[i].Qty,"before")
          state.cartItems[i].Qty= (parseInt(state.cartItems[i].Qty)+1).toString();
          console.log(state.cartItems[i].Qty, "after")
          break;
        }
      }
    },
    emptyCart: (state) => {
      state.cartItems=[];
    },
    removeFromCart: (state, id) => {
      for(let i=0;i<state.cartItems.length;i++){
        if(state.cartItems[i].id==id){
          state.cartItems.splice(i,1) 
          break;
        }
      }
    },
    setAuthStatus: (state, authObj) => {
      state.auth.isAuthenticated=true;
      state.auth.auth_token = authObj.auth_token;
      state.auth.email = authObj.email;
      state.auth.role = authObj.role;
    } 
  }
})
