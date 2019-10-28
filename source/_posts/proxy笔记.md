---
title: proxy笔记
date: 2019-01-25 23:32:33
tags: js
comments: true
---

### 前言
proxy，中文名叫代理，这很容易让人想到服务器的代理。比如正向代理，类似通过自己境外服务器搭的ssr获取围墙外面的网页，还有反向代理，大概意思应该是将收到的请求转发到不同的处理服务器。emmm，以上纯属是为了复习一下正反向代理的区别。今天要说的是ES6里的proxy。说到代理我还想到了java里的动态代理机制，在一个公众号里看过一篇相关文章，但是没看懂java的代理到底是怎么实现的，所以我也不知道ES6的proxy是不是参照了它的思想。

### Proxy构造函数

```
    let obj = {};
    let p = new Proxy(obj,{});  //接收2个参数，第一个是被代理的对象，第二个是代理配置，可以配置拦截函数
    obj.count = 1;
    p.count; // 上面拦截配置是空对象，所以没有拦截效果
```

其次，proxy实例与所代理的对象是没有直接联系的，所以要**通过proxy实例访问对象属性才有拦截效果**，
proxy实例可以作为原型对象

### Proxy的一些拦截方法
 - **get(target, prop[, receiver])**
  拦截对象属性的读取，例如p.foo, p['foo']。
 - **set(target, prop, value[, receiver]): boolean**
  拦截对象属性的设置，如p.foo = 1, p['foo'] = function() {}
 - **defineProperty(target, prop, propDesc): boolean**
  拦截Object.defineProperty,Object.defineProperties。vue3.0版本之前的双向绑定就是通过Object.defineProperty实现的，不过3.0好像就要用proxy实现了，目测是拦截set方法吧。
 - **has(target, prop): boolean**
  拦截 in 操作，prop in obj。
 - 其他待补充
 
### proxy怎么用
 - 数据双向绑定，拦截set做视图更新
 - 实现私有属性，拦截get，如果访问的是下划线开头的属性则抛出错误，拦截has防止私有属性被for...in 遍历
 - web客户端数据请求的通用接口函数

参照《ES6标准入门》代码：

```
    function createWebService(baseurl) {
        return new Proxy({}, {
            get: function(target, prop) {
                return () => httpGet(`${baseurl}/prop`)
            }
        })
    }
    
    const service = createWebService('http://127.0.0.1:8080')
    service.fetchData().then(callback)
```

感觉通用接口函数的用法很妙啊，几行代码就搞定了从不同api获取数据的函数。

### 补充
<a href="https://github.com/fyyhome/Fvue/tree/feature-proxy" target="_blank" style="text-decoration: underline">proxy替代defineProperty实现双向数据绑定</a><br><br>

