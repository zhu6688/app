const getters = {
    count:(state)=>{
        return state.cartList.reduce((pre,next)=>{
            return pre+next.bookCount
        },0)
    }
};


export default getters;