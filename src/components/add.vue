<template>
    <div>
        <mheader>添加</mheader>
        <div class="content">
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
                    <label for="bookCover">书的封面</label>
                    <input type="text" v-model="book.bookCover" id="bookCover">
                </li>
                <li>
                    <button @click="add">添加</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import mheader from '@/base/mheader.vue'
import { addBook } from '@/api'
export default {
    data(){
        return {
            book:{}
        }
    },
    components:{mheader},
    methods:{
        add(){
            addBook(this.book).then(()=>{
                this.$router.push('/list')
            });
            
        }
    }
}
</script>

<style scoped lang="less">
.content{
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
