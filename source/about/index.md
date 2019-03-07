---
title: about
date: 2018-10-23 15:48:56
layout: page
comments: false
---

<i id="word" class="text">江湖中人，却没有一身本领行走江湖，只得在这漫漫江湖中寻找我的武林秘籍。</i>
<style>
  .text{
    color: green
  }
</style>

<script>
  let myWord = '江湖中人，却没有一身本领行走江湖，只得在这漫漫江湖中寻找我的武林秘籍。';
  let i = 1;
  let html = '';
  function getMySlice() {
    if (i > myWord.length) {
      i = 1;
    }
    html = myWord.slice(0,i);
    i++;
    document.getElementById('word').innerText = html;
    setTimeout(getMySlice, 200);
  }
  getMySlice();
</script>