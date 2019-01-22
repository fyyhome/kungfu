#!/bin/bash

# $time2是coding图床的commit信息
# $1是md文件的相对路径 如 source/_posts/fyy.md
time2=$(date "+%Y%m%d%H%M%S")
mv source/images/* /home/fyy/fyy/hexoBlog/blog_images/code_images
cd /home/fyy/fyy/hexoBlog/blog_images && git add -A && git commit -m "$time2" && git push origin master
cd /home/fyy/fyy/hexoBlog/myblog && file=$1 node replace-picture-url.js
hexo g -d
