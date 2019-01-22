---
title: coding仓库搭博客图床
date: 2019-01-22 16:33:43
tags: hexo
---

### 前言
用hexo搭好博客时就想过了博客的图片存储问题，但是当时仅仅知识想了一下，并没有实际去解决这个问题（懒癌患者），但是当自己开始认真在博客上记录生活与技术时就不得不搞定这个问题了。

-----
  博客图床可以有很多方式做，比如：
  
 - 七牛云存储（要钱要备案）
 - 阿里云静态存储（要钱要备案）
 - 自己服务器上搭个图片服务器，再写个脚本每次部署博客时上传图片并且把链接替换掉
 - github上建个图片仓库？？？，考虑速度问题，可以在coding上建，同样也要写脚本做个转换

我在coding上建了个专门存博客图片的仓库，为了写的时候方便，写博客过程中用相对路径，部署时用脚本替换路径，这样也方便预览。在source目录下建个images文件夹用来存要用到的图片，博客里用`{% img img-url.jpg alt-text %}`相对路径引用图片。写完博客时可以自己先本地预览一下，然后部署时就要自己写个简单的shell脚本来部署，主要是把图片移动到coding图片仓库对应的目录下，然后push上去。在把md文件里的图片链接用脚本替换，然后运行部署命令就可以了。代码大致流程如下：

    #!/bin/bash
    # $1是coding图床的commit信息
    # $2是md文件的相对路径 如 source/_posts/fyy.md
    mv source/images/* /home/fyy/fyy/hexoBlog/blog_images/code_images
    cd /home/fyy/fyy/hexoBlog/blog_images && git add -A && git commit -m "$1" && git push origin master
    cd /home/fyy/fyy/hexoBlog/myblog && file=$2 node replace-picture-url.js
    hexo g -d
上面在部署前运行了个node脚本，用来把链接替换为coding上的链接。一个简单的博客图床就差不多弄好了，但是我感觉还是不够自动化，主要是每次运行这个脚本时还得自己输入要转换的md文件相对路径，有点难受啊，要是能获取到git里已经修改未提交的文件就比较爽了，每次对修改过的md文件做个替换就行。暂时还不知道怎么弄这个，留着以后优化。
来张图片试试行不行：
{% img https://coding.net/u/home-fyy/p/blog_images/git/raw/master/code_images/about.JPG 400 400 测试 %}