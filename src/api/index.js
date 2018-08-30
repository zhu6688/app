import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
//或者
//axios.defaults.baseURL = '//localhost:3001';
//拦截器
axios.interceptors.response.use((response)=>{
    return response; // 在这里统一拦截结果 把结果处理成res.data
})


// 获取轮播图数据
export let getSliders = () => {
    return axios.get('/sliders')  //返回的是promise对象
}

// 获取热门图书
export let getHotBook = () => {
    return axios.get('./hotbook')
}

// 获取全部图书
export let getBooks = () => {
    return axios.get('./book');
}

// 删除某一本图书
export let delBook = (id) => {
    return axios.delete(`/book?id=${id}`);
}

// 获取某一本书
export let findOneBook = (id) => {
    return axios.get(`/book?id=${id}`);
}

// 修改图书
/**
 * @param  id
 * @param  data 数据 请求体发送
 * @returns {promise}
*/
export let updataBook = (id,data) => {
    return axios.put(`/book?id=${id}`,data);
}


// 添加图书
export let addBook = (data)=>{
    return axios.post('/book',data);
}

export let getAll = () => {
    return axios.all([getSliders(),getHotBook()])
}

// 加载更多
export let page = (offset) => {
    return axios.get(`/page?offset=${offset}`)
}


