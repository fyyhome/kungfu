---
title: js类和原型
date: 2019-02-03 23:32:58
tags: js
---

### 前言
说起面向对象编程，大家应该都知道，也能脱口就道出哪些语言是面向对象的。封装，继承，多态也是随手就可以粘来的词语，我自己也是早就背的滚瓜乱熟了。但是当要把这些概念放到具体语言中理解时，我也不能说出个所以然来。js中的继承就比较特别（和c++,java相比），随着es6+的拓展，js里也有class的概念了。class只是个语法糖，js任然是基于原型的。

### 函数与对象，prototype和\__proto__
首先要说的是,\__proto__是各主流浏览器对对象[[prototype]]属性的实现，现在不建议使用\__proto__属性，可以用Object.getPrototypeOf(obj)代替。
> 都说js中一切建皆对象，我个人理解的这句话是：
> - 基本类型都有对应的包装对象，相互之间可以转化;
> - 数组是对象的子集，有自身的属性和方法;
> - 函数是Function构造的实例，也算是对象;

> 但是，函数与对象又不太一样，
> - 函数可以用new操作符构造新的实例对象，普通对象不能。
> - 函数有prototype和\__proto__属性，普通对象没有，它只有\__proto__属性

#### 补知识来了
 - **如何看待数组是对象？**
 简单的总结就是数组下标是对象中的key，下标对应的值是value,数组长度是length属性对应的值，并且length只代表数组对象中数值最大的那个键（因为可能存在空值）。

```
let a = [];
a.foo = 'foo';
a['hello'] = 'hello';
a['9'] = 55;
console.log(a.length); // 10
```

 - **一切皆对象，那基本类型能像对象一样给属性赋值吗？**
可以，是的，你没有看错，it`s ok。给基本类型添加属性并赋值，它会转化成对应的包装对象，然后执行复制语句，然后就立马销毁这个包装对象。

```
let m = 1;
m.fn = function () { alert(233) };
m.fn();
```
这段代码会报错，因为调用fn时，m的包装对象已经被销毁了。

<p style="text-align: center; font-size: 18px;">2019.3.1补<p>
------

prototype属性是为了函数存在的，每一个函数都有自己独一无二的prototype对象,为什么说是独一无二的呢，我自己一开始也是不理解，实例对象的\__proto__是对构造函数prototype的引用，为了实现继承链，函数原型对象是对谁的引用呢。

```
function Foo() {
    this.a = 1;
    this.b = 2;
}
let foo = new Foo();
foo.__proto__ == Foo.prototype; // foo是Foo函数构造
Foo.__proto__ == Function.prototype; // Foo是Function函数构造
Foo.prototype == ??? // 这是自己一开始疑惑的地方
```

其实仔细一想，Foo.prototype.constructor只能是Foo函数，所以它是Foo自己独一无二的原型对象，不是其他谁的引用，但是又是怎么实现原型链的呢？既然原型是对象，自然有\__proto__属性，它是对构造它自己的构造函数的prototype引用。

```
// 下面两条语句是一个意思
foo.__proto__.__proto__ == Object.prototype
Foo.prototype.__proto__ == Object.prototype
// 说明Foo函数的原型对象是有Object函数构造
Object.prototype.__proto__ == null;
// 说明原型链的终点是null，可以理解为Object函数的原型对象不需要构造了，因为是null
```

终于摸到点皮毛了，自己最开的疑问其实就是函数的原型对象从何而来，结论：**函数的原型对象（prototype）都是由Object函数构造（在没有人为改变它的原型对象的情况下），对象的原型对象（\__proto__）指向它的构造函数的原型对象**

看图：
{% img https://coding.net/u/home-fyy/p/blog_images/git/raw/master/code_images/prototype_chains.png 原型%}

### 原型链与继承
原型链就是每个原型对象又有自己的（\__proto__）原型对象，由\__proto__不断指向，最终到达null。
通过原型链实现继承：
```
function friut(color) {
    this.color = color;
}

function apple(color, weight) {
    friut.call(this, color);
    this.weight = weight;
}
 apple.prototye = new friut();
```

还有很多种方法可以实现继承，下次复习new操作符时再整理一下了。