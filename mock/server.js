const http = require('http');
const fs = require('fs');
const url = require('url');

//获取轮播图 /sliders
let sliders = require('./sliders');

function read(cb){
    fs.readFile('./book.json','utf8',(err,data)=>{
        if(err || data.length==0){// 如果错误，或文件没有
            cb([]); // 没有数据返回kong
        }else{ // 返回数据
            cb(JSON.parse(data));//讲读出来的内容转化成对象
        }
    })
}

// 写入内容
function write(data,cb){
    fs.writeFile('./book.json',JSON.stringify(data),cb)
}

let pageSize = 5;//每页显示5个

http.createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader('Content-Type','application/json;charset=utf8');
    res.setHeader("X-Powered-By",' 3.2.1');
    if(req.method=='OPTIONS') return res.end();//让options请求快速返回
    let {pathname,query} = url.parse(req.url,true);
    
    if(pathname==='/page'){
        let offset = parseInt(query.offset) || 0; //拿到当前前端传递的值
        read(function(books){
            // 每次在偏移的基础上增加5条
            let result = books.reverse().slice(offset,offset+pageSize); // 数据倒序
            let hasMore = true;//默认有更多
            if(books.length<=offset+pageSize){
                //已经显示的数目大于总共条数
                hasMore = false;
            }
            //setTimeout(()=>{
                res.end(JSON.stringify({hasMore,books:result}))
            //},2000)
        })

    }
    
    if(pathname === '/sliders'){
        return res.end(JSON.stringify(sliders));
    }
    if(pathname === '/hotbook'){
        read(function(books){
            let hot = books.reverse().slice(0,6); //截取6个数据
            res.end( JSON.stringify(hot) )
        })
        return 
    }
    if(pathname==='/book'){ //对书的增删改查
        let id = parseInt(query.id); // 取出的是字符串
        switch(req.method){ // ?id=1
            case 'GET':
                if(typeof id !=='undefined' && !isNaN(id)){ // 查询一个
                    read(function(books){
                        let book = books.find(item=>item.bookId===id);
                        if(!book) book = {};//付过没找到就是undefined 返回{}
                        res.end(JSON.stringify(book))
                    })
                }else{//获取所有图书
                    read(function(books){
                        res.end(JSON.stringify(books.reverse()));
                    })
                }
             break;
            case "POST":
                let str = '';
                req.on('data',function(chunk){
                    str += chunk;
                });
                req.on('end',function(){
                    let book = JSON.parse(str);
                    read(function(books){ // 添加id
                        book.bookId = books.length?books[books.length-1].bookId+1 : 1;
                        books.push(book); //将数据放到books中，books在内存中
                        write(books,function(){
                            res.end(JSON.stringify(book))
                        })
                    })
                    
                })
             break;
            case "PUT":
                if(id){ //获取当前要修改的id
                    let str = ''
                    req.on('data',chunk=>{
                        str+=chunk;
                    })
                    req.on('end',()=>{
                        let book = JSON.parse(str);//book要改成什么样
                        read(function(books){
                            books = books.map(item=>{
                                if(item.bookId===id){//找到id相同的那一本书
                                    return book;
                                }
                                return item;//其他的书正常返回
                            })
                            write(books,function(){//将数据写回json中
                                res.end(JSON.stringify(book))
                            })
                        })
                    })
                }
             break;
            case "DELETE":
                read(function(books){
                    books = books.filter((item)=>item.bookId !==id);
                    write(books,function(){
                        res.end(JSON.stringify({}))//删除返回空对象
                    })
                })
             break;
        }
        return 
    }

    // 一下是静态服务，上边都是动态的jiekou
    // 读取一个路径
    // fs.stat('.'+pathname,function(err,stats){
    //     if(err){
    //         res.statusCode = 404;
    //         res.end('NOT FOUND');
    //     }else{ 
    //         if(stats.isDirectory()){//判断是目录
    //            let p = require('path').join('.'+pathname,'./index.html')
    //            console.log(p)
    //             fs.createReadStream(p).pipe(res)
    //             console.log(res)
    //         }else{
    //              fs.createReadStream('.'+pathname).pipe(res);
    //         }        
    //     }
    // })





}).listen(3001);


