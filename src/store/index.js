import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'
Vue.use(Vuex)
import mutations from './mutations.js'
import getters from './getters.js'
const state = {
    cartList:[]
};

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    plugins:[logger()],
    strict:true, //只能通过mutation来更改状态，不支持异步
})

export default store;



