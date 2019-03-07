---
title: js之Set和Map结构
date: 2019-01-24 23:36:49
tags: js
comments: true
---

### 前言
重读es6标准入门，补写笔记

### Set
Set是种类似数组的结构，可用for...of直接遍历，也可以用...展开。，但是它里面的元素不能重复（类似不能有===关系，但NaN!==NaN,Set里它和自身是相等的）。

 - 初始化
 > let s = new Set();
let s = new Set([1,2,3]);传入具有itreable接口的结构都行，，常见为数组

 - 常用方法
 > 1. add(value): Set
 > 2. delete(value): boolean
 > 3. has(value): boolean
 > 4. clear(): void
 > ———————————遍历方法(遍历顺序就是插入顺序，类似队列)———————————
 > 5. keys()
 > 6. values()//Set的默认遍历器生成函数，所以可以直接for...of(扩展运算符内部使用的也是for...of)
 > 7. entries()
 > 8. forEach(callback)

数组去重：[...new Set([1,2,3,1])];// [1,2,3]
Set转数组：Array.from(set)或者直接[...set]

### Map
Map是一种值对值的数据结构，相比对象的键值对，它的键可以是任和类型的值，不局限于字符串。

 - 初始化
 > let m = new Map();
let m = new Map([['val1','val2']]);由键值对数组组成的数组初始化

 - 常用方法
 > 1.set(key,value)
2.get(key)
3.has(key)
4.delete(key)
5.clear()
遍历方法和Set一样，另外2个都有size属性表示大小。

 - Map与对象，json对象，json数组的相互转换，留着用到的时候填坑-_-
