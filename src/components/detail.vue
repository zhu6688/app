<template>
    <div class="detail">
        <mheader :back="true">详情页面</mheader>
        <ul>
            <li>
                <label for="bookName">书的名称</label>
                <input type="text" v-model="book.bookName" id="bookName">
            </li>
            <li>
                <label for="bookInfo">书的信息</label>
                <input type="text" v-model="book.bookInfo" id="bookInfo">
            </li>
            <li>
                <label for="bookPrice">书的价格</label>
                <input type="text" v-model.number="book.bookPrice" id="bookPrice">
            </li>
            <li>
                <button @click="update">确认修改</button>
            </li>
        </ul>
    </div>
</template>

<script>
import mheader from '@/base/mheader.vue'
import { findOneBook,updataBook } from '@/api'
export default {
    data(){
        return {
            book:{}
        }
    },
    components:{mheader},
    created(){
        this.getOneBook()
    },
    watch:{
        $route(){//只要路径变化重新获取数据
            this.getOneBook()
        }
    },
    methods:{
        getOneBook(){
            findOneBook(this.$route.params.bid).then(res=>{
                this.book = res.data
                //如果是空对象，需要返回列表页
                Object.keys(this.book).length>0?void(0):this.$router.push('/list')
            }).catch(err=>console.log(err))
        },
        update(){
            updataBook(this.$route.params.bid,this.book).then(()=>{
                this.$router.push('/list') //修改完后跳转页面
            });
            
        }
    },
    computed:{
        bid(){
            return this.$route.params.bid
        }
    }
}
</script>

<style scoped lang="less">
.detail{
    position:absolute;
    left: 0;
    top:0;
    bottom:0;
    right:0;
    background: #fff;
    z-index:100;
    padding-top:40px;
}
ul{
    padding: 10px 8px;
    li{
        display:flex;
        flex-direction: column;
        label{
            font-size:18px;
        }
        input{
            padding:5px;
            border:1px solid #333;
            margin:10px 0;
            color:#3c3c3c;
        }
        button{
            width:100px;
            height:34px;
            background:#2aabd2;
            border-radius: 4px;
            border:none;
            color:#fff;
        }
    }
}
</style>