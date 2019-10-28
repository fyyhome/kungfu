---
title: ES6--Reflect对象
date: 2019-01-26 22:31:00
tags: js
---

### 前言
Reflect对象是ES6提供的一个新的功能型api对象，就是把Object上的一些方法部署到了Reflect上，这些方法主要是语言本身的方法，比如Object.defineProperty(),现在可以通过Reflect.defineProperty()来调用。
Reflect与Object对象相比，主要有这么些区别：

 - **Object上相对语言本身的方法，转移到Reflect上**
 - **对与转移到Reflect的方法，修改部分方法返回值，更符合语义，如defineProperty**
 - **将Object操作转为函数，如in，delete操作用Reflect.has(), Reflect.deleteProperty()代替**
 - **与Proxy对象可以拦截的操作一一对应，保证拦截操作中可以执行原生方法**
如
```
let p = new Proxy({}, {
    get(target, prop) {
        console.log('读取拦截')
        return Reflect.get(target, prop)
    }
})
```

下面说说转移到Reflect的一些方法
#### Reflect.get(target, prop [,reciver])
它是和Proxy的拦截方法get对应的，最后一个参数reciver是**绑定get中this的指向**
```
let obj = {
    one: 1,
    two: 2,
    get sum() {
        return this.one + this.two
    }
}
let recObj = {
    one: 3,
    two: 4
}
Reflect.get(obj, sum)  // 3
Reflect.get(obj, sum, recObj) // 7
```

可以改变get，set里的this指向应该是相对原来定义访问器属性（具有存取描述符）的一个较大的提升，根据MDN上说：get，set里的this指向某个被访问和修改属性的对象。也就是当没有传入reciver参数时，this是原来的指向方式。
#### Reflect.deleteProperty(target, prop)
次此方法等同于delete target[prop], 但是它作为转移到Reflect上的新方法，返回布尔值。
#### Reflect.ownKeys(target)
等价于原来Object.getPropertyNames(obj) + Object.getPropertySymbols(obj)，返回的是对象自身的所有属性，包括不可枚举，Symbol属性.
#### Reflect.getPrototypeOf(obj)
用于获取对象的\__proto__属性，对应Object.getPrototypeOf(obj)

####  
其他的方法和Object上的基本对应，就不搬砖了。个人感觉还是get，set第三个参数绑定this的方法要多注意，因为涉及到继承的问题，原来存取器里this的绑定是固定的（上面提过），继承加this绑定搞一起就很容易让人头晕，自己指定this绑定就可以很明确了。