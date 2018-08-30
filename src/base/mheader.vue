<template>
    <div class="header">
        <slot></slot>
        <i class="iconfont icon-fanhui" @click="goBack()" v-if="back"></i>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:{
        back:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped lang="less">
.header{
    background: #26a2ff;
    height:40px;
    line-height: 40px;
    color:#fff;
    text-align: center;
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    .iconfont{
        position: absolute;
        left:10px;
        top:0;
        font-size:20px;
    }
}
</style>
