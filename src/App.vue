<template>
  <div id="app">
    <!--需要缓存的内容-->
    <transition name="fadeIn">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <!--不需要缓存的内容-->
    <transition name="fadeIn">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from './base/tab.vue'
export default {
  name: 'App',
  components:{Tab}
}
</script>

<style>
.fadeIn-enter,.fadeIn-leave{
  opacity: 0;
}
.fadeIn-enter-active,.fadeIn-leave-active{
  transition:all 0.3s linear;
}
*{
  margin:0; padding:0; list-style: none;
}
a{
  text-decoration: none;
}
input,button{
  -webkit-appearance: none;
}
.contain{
  position: fixed;
  top:40px;
  bottom:50px;
  width:100%;
  overflow:auto;
}
</style>
