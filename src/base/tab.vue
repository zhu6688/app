<template>
    
    <div class="tabbar">
        <router-link to="/home">
            <i class="iconfont icon-weibiaoti1"></i>
            首页
        </router-link>
        <router-link to="/list">
            <i class="iconfont icon-liebiao"></i>
            列表
        </router-link>
        <router-link to="/collect">
            <i class="iconfont icon-gouwuchekong"></i>
            购物车控
        </router-link>
        <router-link to="/add">
            <i class="iconfont icon-huiyuan"></i>
            会员
        </router-link>
    </div>
   
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.tabbar{
    height:50px;
    position: fixed;
    bottom:0;
    left:0;
    width:100%;
    border-top:1px solid #ccc;
    box-shadow: 0 -3px 5px #ccc;
    display:flex;
    a{
        display:flex;
        flex-direction:column;
        align-items: center;
        justify-content: center;
        flex:1;
        font-size:14px;
        color:#333;
        .iconfont{
            font-size:26px;
        }
        &.active{
            color:#26a2ff;
        }
    }
}
</style>
