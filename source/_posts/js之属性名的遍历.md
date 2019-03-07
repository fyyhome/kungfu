---
title: js之属性名的遍历
date: 2019-01-23 10:42:29
tags: js
comments: true
---

### 前言
js里的属性遍历有很多方式，不同遍历方式获取结果也不一样，反正我自己是经常搞混的，每次忘记了就查mdn，过段时间不用然后又忘记了，所以这里汇总一下，做个笔记方便自己回顾
### 常见的5种属性遍历方式
> * ***for...in***
* ***Object.keys(obj)***
* ***Object.getOwnPropertyNames(obj)***
* ***Object.getOwnPropertySymbols(obj)***
* ***Reflect.ownKeys(obj)***

### for...in  
> 遍历对象**自身**和**继承**的**可枚举属性**（不包括Symbol属性）

### Object.keys(obj)
> 返回一个数组，遍历对象**自身**的**可枚举属性**（不包含Symbol属性）

### Object.getOwnPropertyNames(obj)
> 返回一个数组，遍历对象**自身的所有属性**（不包含Symbol属性，但包含了不可枚举属性）

### Object.getOwnPropertySymbols(obj)
> 返回一个数组，遍历对象**自身的所有Symbol属性**，包括不可枚举属性

### Reflect.ownKeys(obj) 
> 返回一个数组，遍历对象**自身的所有属性**（包含Symbol，可枚举，不可）

根据情况选择遍历方式吧，顺便记录一下，Symbol类型很适合用来实现类似对象的私有属性效果，它并不是私有属性，但是应为Synbol类型的特点，外部难以获取。

每日一图：
{% img https://coding.net/u/home-fyy/p/blog_images/git/raw/master/code_images/1-1Q20GF3293Y.JPG 450 400 upday %}
