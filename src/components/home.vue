<template>
    <div>
        <mheader>首页</mheader>
        <div class="contain">
            <loading v-if="loading"></loading>
            <template v-else>
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="(item,index) in slides" :key="index">
                        <img :src="item" />
                    </mt-swipe-item>
                </mt-swipe>
                <!--热门图书-->
                <div class="cont">
                    <h2>热门图书</h2>
                    <ul class="hotbook">
                        <li v-for="book in books" :key="book.id">
                            <img :src="book.bookCover" />
                            <strong>{{ book.bookName }}</strong>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import mheader from '@/base/mheader.vue'
import loading from '@/base/loading.vue'
// 花括号是结构赋值
import { getSliders , getHotBook , getAll } from '../api/index.js'
export default {
    data(){
        return {
            slides:[],
            books:[],
            loading:true
        }
    },
    created(){
        //this.getlunbotu();
        //this.getBook();
        this.getData();
    },
    methods:{
        getData(){
            getAll().then(res=>{
               // console.log(res)
                let [slides,books] = res;
                this.slides = slides.data;
                this.books = books.data;
                this.loading = false;
            })
        }
        // getlunbotu(){
        //     getSliders().then(res=>{
        //         this.slides = res.data;
        //     });
        // },
        // getBook(){
        //     getHotBook().then(res=>{
        //         this.books = res.data;
        //         //console.log(this.books)
        //     }).catch(err=>{
        //         console.log(err)
        //     })
        // }
    },
    components:{mheader,loading}
}
</script>

<style scoped lang="less">
.mint-swipe{
    height:180px;
    img{
        width:100%;
    }
}
.cont{
    padding:0 5px;
    h2{
        font-size:16px;
        line-height: 24px;
        margin:5px;
    }
    ul{
        padding:5px 0;
        width:100%;
        display: flex;
        flex-wrap: wrap;
        li{
            width:45%;
            display:flex;
            flex-direction:column;
            align-items:center;
            padding:5px 0;
            img{
                width:100%;
            }
            strong{
                margin:5px 0;
            }
        }
    }
}
</style>