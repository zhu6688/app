<template>
    <div>
        <mheader>购物车</mheader>
        <ul class="content">
            <li v-for="(l,index) in cartList" :key="index">
                <img :src="l.bookCover">
                <h3>{{l.bookName}}</h3>
                <br>
                <button>-</button>
                {{l.bookCount}}
                <button>+</button>
                <p>小计：{{ l.bookPrice*l.bookCount }}</p>
                <button>删除</button>
            </li>
            <li>共：{{ $store.getters.count }} 本</li>
            <li>共：{{ count }} 本</li>
        </ul>
    </div>
</template>

<script>
import mheader from '../base/mheader.vue';
// 辅助函数 (语法糖)
import {mapState , mapGetters} from 'vuex'
export default {
    components:{mheader},
    computed:{
        ...mapState(['cartList']),
        ...mapGetters(['count'])
    }
}
</script>

<style scoped lang="less">
.content{
    margin:50px 0;
}
</style>