import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


// import Home from '@/components/home'
// import Add from '@/components/add'
// import Collect from '@/components/collect'
// import List from '@/components/list'
// import Detail from '@/components/detail'


export default new Router({
  routes: [
    //路由原信息meta来做缓存
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:()=>import('@/components/home'),
      meta:{keepAlive:true,title:'首页'}
    },
    {
      path:'/collect',
      component:()=>import('@/components/collect')
    },
    {
      path:'/add',
      component:()=>import('@/components/add'),
      meta:{title:'添加'}
    },
    {
      path:'/detail/:bid',
      component:()=>import('@/components/detail') ,
      name:'detail'
    },
    {
      path:'/list',
      component:()=>import('@/components/list'),
      meta:{title:'列表'}
    },
  ],
  linkActiveClass:'active'
})
