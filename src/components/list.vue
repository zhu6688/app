<template>
    <div>
        <mheader :back="true">列表页</mheader>
        <div class="contain" ref="ss" @scroll="loadMore">
            <ul class="book">
                <router-link tag="li" :to="{name:'detail',params:{bid:book.bookId}}" v-for="book in allBooks" :key="book.bookId">
                    <img :src="book.bookCover" />
                    <div>
                        <h4>{{ book.bookName }}</h4>
                        <p>{{book.bookInfo}}</p>
                        <b>{{book.bookPrice}}元</b>
                        <div class="btns">
                            <span @click.stop="del(book.bookId)">删除</span>
                            <span @click.stop="addCart(book)">添加</span>
                        </div>
                    </div>
                </router-link>
            </ul>
            <div class="loadmore" @click="more" v-if="hasMore">加载更多</div>
            <div class="loadmore" v-else>亲~没有更多了！！！</div>
        </div>
    </div>
</template>

<script>
import mheader from '@/base/mheader.vue'
import { getBooks , delBook ,page } from '@/api'
import { MessageBox  } from 'mint-ui'
export default {
    data(){
        return {
            allBooks:[],
            offset:0,
            hasMore:true,
            isloading:false , //默认不是正在加载
        }
    },
    created(){
        //this.getbooks()
        this.page5();
    },
    mounted(){
        let obj = this.$refs.ss;
        let top = obj.offsetTop;
        let distance = 0;
        obj.addEventListener('touchstart',(e)=>{
            // 滚动条在最顶端时，并且当前盒子在顶端的时候
            if(obj.scrollTop !=0 || obj.offsetTop != top) return;
            let start = e.touches[0].pageY; //手指点击的开始
            let move = (e)=>{
                let current = e.touches[0].pageY;
                distance = current - start;//拉动的距离,负的就不要了
                if(distance>0){
                    if(distance<=70){
                        obj.style.top = distance + top + 'px';
                    }else{
                        distance = 70;
                        obj.style.top = top + 70 + 'px';
                    }
                }else{ // 如果不在考虑范围  移除掉move和end事件
                    obj.removeEventListener('touchmove',move);
                    obj.removeEventListener('touchend',end);
                }
            }
            let end = (e)=>{
                clearInterval(this.timer1);
                this.timer1 = setInterval(()=>{
                    if(distance<=0){
                        clearInterval(this.timer1);
                        distance = 0;
                        obj.style.top = '40px';
                        /*
                        在这里调用函数刷新数据
                        */
                        obj.removeEventListener('touchmove',move);
                        obj.removeEventListener('touchend',end);
                        return
                    }
                    distance -=1;
                    obj.style.top =top + distance+'px';
                    
                },1)
            }
            obj.addEventListener('touchmove',move)
            obj.addEventListener('touchend',end)

        },false)
    },
    methods:{
        // 添加到购物车
        addCart(book){
            this.$store.commit('addCart',book)
        },
        loadMore(){
            // 卷去的高度    当前可见区域  总高
            // 触发scroll事件，可能触发n次，先进来开一个定时器，下次出发时将上一次定时器清除掉
            clearTimeout(this.timer)
            this.timer = setTimeout(()=>{
                let {scrollTop,clientHeight,scrollHeight} = this.$refs.ss;
                if(scrollTop+clientHeight+20 > scrollHeight){
                    this.more();
                }
                //console.log(this.$refs)
            },30)
            
        },
        more(){
            this.page5();
        },
        page5(){
            if(this.hasMore&& !this.isloading){ //有更多的时候获取数据
                this.isloading = true;
                page(this.offset).then(res=>{
                    this.allBooks = [...this.allBooks,...res.data.books]; // 把书每次请求的放到一起
                    this.hasMore = res.data.hasMore;
                    this.offset = this.allBooks.length;//改变偏移量的值,就是总数的个数
                    this.isloading = false;
                }).catch(err=>console.log(err))
            }
        },
        //加载所有书
        getbooks(){
            getBooks().then(res=>{
                this.allBooks = res.data;
            }).catch(err=>console.log(err))
        },
        del(id){
            MessageBox.confirm('确定删除吗?').then(action => {
                delBook(id).then(res=>{
                    MessageBox.alert('删除成功')
                    //删除前台数据
                    this.allBooks = this.allBooks.filter(item=>item.bookId !== id)
                }).catch(err=>console.log(err))
            }).catch(err=>{ console.log('取消') });
            
        }
    },
    components:{mheader}
}
</script>

<style scoped lang="less">
.book{
    padding:10px;
    li{
        display:flex;
        margin-bottom:10px;
        padding-bottom:10px;
        border-bottom:1px dashed #ccc;
        img{
            width:150px;
            height:130px;
        }
        div{
            h4{
                padding-top:20px;
                font-size:16px;
            }
            p{
                color:#333;
                font-size:14px;
                text-indent: 2em;
            }
            b{
                color:red;
            }
            span{
                display:block;
                background:lightseagreen;
                width:50px;
                text-align: center;
                line-height: 24px;
                font-size:14px;
                margin-top:8px;
                color:#fff;
                border-radius: 12px;
            }
        }
    }
}
.loadmore{
    margin:0 0 20px;
    text-align: center;
}
.btns{
    display:flex;
    justify-content: space-around;
}
</style>