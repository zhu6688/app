const mutations = {
    addCart:(state,book)=>{ 
        // book 是添加的一本书，如果有这本书累加数量，没有的话数量为1，放到cartList中
        let product = state.cartList.find(item=>{
            return item.bookId===book.bookId
        });
        if(product){
            product.bookCount +=1;
            state.cartList = [...state.cartList] // 更新掉原数组，否则不会更新
        }else{
            book.bookCount = 1;
            state.cartList = [...state.cartList,book] // 用新数组替换掉老数组
        }
    },
}

export default mutations;