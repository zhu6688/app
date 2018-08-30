### vue  node 搭的小demo

npm install 
cd mock 
node server.js
npm run dev


##项目用到less
、、、
npm install less less-loader
axios
vuex
、、、

----------------------------------------
-mock模拟数据（后台）
-api所有接口
-base基础组件
-components页面组件
------------------------------------
##热门图书功能
-先写服务端，确保数据能正确返回
-增加api方法，实现调取数据的功能
-在哪个组件中应用这个api，如果是一个基础组件需要用这些数据，在使用这个组件的父级中调用，然后在传递给他
-写一个基础组件 
    创建一个.vue文件
    在需要使用这个组件的父级中引用这个组件
    注册组件
    以标签的形式引入

###路由元信息  meta:{keepAlive:true} 哪个路由上加了就缓存哪个页面
用来做页面的缓存  

## 下拉加载  /page
- 默认每次给5条，前端告诉后台现在要从第几条开始给我找
- /page?offset=5
- 后台返回还要告诉前端是否有更多的数据 hasMore:false

### 代码分割  用于优化


