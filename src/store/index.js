import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // admin_notifications:0,
    cartItems: [],
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
  },
  mutations: {
    // setAdminNotifications(state, message) {
    //   state.admin_notifications = message;
    // },
    // clearAdminNotifications(state) {
    //   state.admin_notifications = '';
    // },
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
  },
  actions: {

    // addToCart: ({ commit, state }, newItem) => {
    //   // Perform async operations if needed
    //   commit('addToCart', newItem);
    //   // Optionally, dispatch other actions or update the server
    // },
  },
  modules: {
    cart: {
      state: { cartItems: [] },
      getters: { /* ... */ },
      mutations: { /* ... */ },
      actions: { /* ... */ },
    },
    auth: {
      state: { /* ... */ },
      getters: { /* ... */ },
      mutations: { /* ... */ },
      actions: { /* ... */ },
    },
  }
})
