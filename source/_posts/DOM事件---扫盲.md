---
title: DOM事件---扫盲
date: 2019-02-02 11:42:29
tags: js
comments: true
---

### DOM事件
事件就是浏览器的一种通知，主要要了解这么些东西：

 - 事件类型：键盘（keydown，keyup，keypress），鼠标（mousedown，mousemove，click），触屏（touchstart，touchmove，touchend），表单（submit，click，focus），拖拽，文档加载事件。  
 - 事件对象：触发事件时生成的event对象，包含许多相关属性，如event.target，event.currentTarget，event.keyCode，event.type.
 - 事件流传播：向上冒泡，向下捕获，DOM2级事件的三个阶段。
 - 事件取消：取消事件关联的默认操作，如a标签的重定向
 - 事件注册：三种注册方式，DOM0,DOM2,html属性注册
 - 事件处理程序中的this指向

### 事件流
我们都知道“向上冒泡，向下捕获”，这其实是2种事件流的传播方式，是因为IE和NetScape两家公司对事件流的不同实现，为什么会出现两种截然相反的事件流实现呢？我见过比较通俗易懂的解释就是“类比同心圆法”，假设一张白纸上有多个同心圆，我们手指放在圆心上，那么我们指向的是多个圆。
### 事件捕获
> 当窗口监听到事件发生时，先从离事件源最远的父元素开始通知，比如window最先获得事件通知，然后是document，然后是document.documentElement,接着是body，一级一级往下传播。
**document.documentElement是获取文档的根元素，如HTML文档的html元素**

### 事件冒泡
> 事件先从事件源的元素通知，然后逐级向上级父元素通知，与捕获相反，最后通知到window对象。大部分事件都会冒泡，但是也有例外，focus，blur，scroll就不冒泡。

### DOM2级事件
> 由于事件流机制的不统一，开发过程会带来额外的麻烦。ECMAScript在DOM2中统一了事件流标准，基本是以上两者的结合，事件先从window对象向下捕获，然后到达事件源的元素，再向上冒泡回window对象。
DOM2事件有3个阶段，按照事件流通知顺序分别是：**捕获阶段--->目标阶段----->冒泡阶段**。
图片来自：{% link 链接 https://www.w3.org/TR/DOM-Level-3-Events/#event-flow %}
{% img https://coding.net/u/home-fyy/p/blog_images/git/raw/master/code_images/event_stream.png 400 400 event-stream %}

### 事件注册
3种事件注册方式

 - **设置HTML属性注册**
直接在html元素上设置事件处理程序，但是不能包含函数声明，只能是调用函数，或者是代码块。当为代码块形式调用时，this指向当前元素，与event.currentTarget相同。当this是在处理程序的内部开始的指向时，它指向全局对象Window
```
<button onclick="console.log(this.type)"></button>  // this指向button元素
<div onclick="myLog()"></div>
<script>
function myLog() {
    console.log(this)  // this指向Window对象
}
</script>
```

 - **设置对象属性（DOM0级事件系统）**
事件处理程序中this指向当前处理事件的元素
```
let btn = document.getElementById("btn");
btn.onclick = function(event) {
    event = event || window.event;  //兼容IE8及以下版本
    console.log(this)；  //指向id为btn的元素
}
```

 - **addEventListener(): (DOM2级事件系统)**
用该函数添加事件处理程序，可以为同一个事件添加多个处理函数，（同一个事件流模式下）他们会按添加顺序分别执行，**注意第3个参数：false（指定事件为冒泡模式，在冒泡到达时生效）;true（指定事件为捕获模式，在捕获到后函数生效）;默认是false。**结合DOM2的事件流机制可以更好理解。
```
let btn = document.getElementById("btn");
btn.addEventListener("click", function(event) {
    console.loh("click1");
    console.log(this);  // this指向当前处理事件的元素，与event.currentTarget相同
}, false);
btn.addEventListener("click", function(event) {
    console.log(click2);  // 在上面click1和this输出后打印‘click2’
})
```

### 事件取消
事件取消的方法都是在事件对象event上，有下面三种：

 - **preventDefault()：**阻止与事件关联的默认行为，如a标签的重定向与click事件关联。
 - **stopPropagation()：**阻止捕获和冒泡阶段中当前事件的进一步传播。
 - **stopImmediatePropagation()：**不但阻止事件传播，还会阻止在该处理函数后面注册的事件处理函数
 

### 最后
sf上看到一道事件流相关的题目，把它版过来，方便检验对事件流的理解，如下：

```
#a{
    width: 300px;
    height: 300px;
    background: pink;
}
#b{
    width: 200px;
    height: 200px;
    background: blue;
}
#c{
    width: 100px;
    height: 100px;
    background: yellow;
}
<div id="a">
    <div id="b">
        <div id="c"></div>
    </div>
</div>
```

```
var a = document.getElementById("a"),
    b = document.getElementById("b"),
    c = document.getElementById("c");
c.addEventListener("click", function (event) {
    console.log("c1");
    // 注意第三个参数没有传进 false , 因为默认传进来的是 false
    //，代表冒泡阶段调用，个人认为处于目标阶段也会调用的
});
c.addEventListener("click", function (event) {
    console.log("c2");
}, true);
b.addEventListener("click", function (event) {
    console.log("b");
}, true);
a.addEventListener("click", function (event) {
    console.log("a1");
}, true);
a.addEventListener("click", function (event) {
    console.log("a2")
});
a.addEventListener("click", function (event) {
    console.log("a3");
    event.stopImmediatePropagation();
}, true);
a.addEventListener("click", function (event) {
    console.log("a4");
}, true);
```

页面结构如下
{% img https://coding.net/u/home-fyy/p/blog_images/git/raw/master/code_images/event_stream_test.png 200 200 test %}

问题如下：

 - 如果点击c或者b，输出什么?（答案是a1、a3） 
 - 如果点击a，输出什么?（答案是 a1、a2、a3）