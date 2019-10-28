---
title: js那些剪不断，理还乱的继承
date: 2019-03-04 21:21:16
tags: js
---

### 前言
曾几何时，自己看过了多少篇的有关js继承的文章，原型链，继承这些挂在一起的概念，本以为自己已经理解了，但是最近再认真梳理时却发现： “原型链和继承， 剪不断，理还乱”。所以这次决定理清楚点。

### 原型链， 继承， new关键字，本是一家人
为什么把这三个家伙归为一家人呢，因为js里有原型对象，原型对象被串成原型链，js的继承恰好是通过原型链实现的，而new关键字，则是继承的实例化操作者，它根据构造函数创建相应的对象，并且把对象与构造函数的原型（prototype）通过__proto__串起来了。ok，这个实例对象就是继承之后的体现了，它能访问原型链上的各种函数。所以说，原型链，继承，new是一家人，关系剪不断。

### ES5的继承实现方法

 - 实例化法

```
function Animal(name, age) {
  this.name = name;
  this.age = age;
}

Animal.prototype.nameReverse = function () {
  console.log(this.name.split('').reverse().join(''));
}

/**
 * 实例化原型继承
 */
function Cat0(name, age, tailLength) {
  Animal.call(this, name, age);
  this.tailLength = tailLength;
}

Cat0.prototype = new Animal(null, null);
Cat0.prototype.constructor = Cat0; // 不要忘记修正constructor属性
```
缺点： 此时Cat0.prototype.\__proto__ === Animal.prototype,已经达到继承目的，但是在Cat0的prototype对象上产生了多余的父类实例属性

 - 直接引用法

```
function Cat1(name, age, tailLength) {
  Animal.call(this, name, age);
  this.tailLength = tailLength;
}

Cat1.prototype = Animal.prototype; 
Cat1.prototype.constructor = Cat1; // 再次提醒（自己）不要忘记了修正constructor属性
```

缺点： 子类原型指向父类，它没有自己独立的原型对象，所以当添加属性时会映射到父类，无法形成原型链。

 - 构造原型链法
 
```
function Cat2(name, age, tailLength) {
  Animal.call(this, name, age);
  this.tailLength = tailLength;
}

Cat2.prototype = Object.create(Animal.prototype);
Cat2.prototype.constructor = Cat2; // 注意这里并不是修正了，而是添加constructor属性，因为Cat2.prototype是个空对象，只有[[prototypr]]属性(__proto__)
```

缺点： 这种继承方式比较常见，缺点不怎么明显，本人暂时不知。

 - 拷贝继承
这个没写示例了（因为那啥，拷贝嘛，浅拷贝大家都懂，深拷贝我还得看看书去）
缺点： 共用方法会在后续的子类的原型中都存有一份拷贝，**很浪费内存**。假设第n代构造函数原型上有n个自己的共用方法，那么它原型上的共用方法有 1+2+3+......+n个。

### ES6的继承

```
 class Person {
   constructor(name, age) {
     this.name = name;
     this.age = age;
   }

   say() {
     console.log(`My name is ${this.name} and I am ${this.age} years old`);
   }
 }

 class Student extends Person {
   constructor(school, ...rest) {
     super(...rest);
     this.school = school;
   }

   getSchool() {
      console.log(this.school);
   }
 }
```

它的原理和构造原型链继承十分相似，不同的是子类的\__proto__属性会指向父类，ES5的继承是只有一条__proto__链的，它串联了构造函数的原型对象prototype。ES6里通过\__proto__串联了2条链,如下：
Object.setPrototypeOf(Student, Person)
Object.setPrototypeOf(Student.prototype, Person.prototype)。

### ES5继承和ES6的class区别

 1. ES6可以继承内置类型，比如Array, Date, String等，ES5不行。
 2. ES6有两条链被\__proto__串起，ES5只有1条。


### 总结：我真的理清楚了吗？
 ES5的继承还是理清头绪了的，但是ES6的还有如下疑问：
 
- ES6可以继承内置类型而ES5不行，如果ES6是语法糖，它都能实现的功能而ES5却不行，为什么？
- 《ES6标准入门》里说ES6是先构造父类的this对象，父类里的this对象又是指向子类的（很疑惑），而ES5是先构造子函数的this，再通过上下文绑定实现，所以ES6的类语法真的只是封装ES5的继承的语法糖这么简单吗？

这些问题当个记录了，下次自己来补答案。