---
title: docker部署前端dist文件入门
date: 2018-05-03 21:58:19
tags: docker
category: 前端之外
---

### 前言
之前一直想学习一下怎仫在服务器上部署web项目，因为每次自己写完页面都要找后端部署，而且每次修改一个bug就要让后端在服务器上更新一下，这样多改几次bug就会让前后端都很烦。于是我就跟着教程学了一下docker，了解了一下nginx，下面是制作nginx镜像部署web的一个学习笔记。

### 正文
* 1.安装docker
请根据自己的系统自行安装
* 2.查看是否安装成功
        docker -version
* 3.了解docker
        docker三大支柱：镜像库、镜像、容器。
        容器是一个独立的运行环境，所以它解决了应用的移植问题，只需制作相应的镜像就可以在任何装有docker的环境下运行。
        *镜像是一个特殊的文件系统，包含一些配置，依赖，程序库等等资源。镜像原理主要是镜像层，其依赖于一系列底层技术，也就是镜像最低层的base层。
* 4.本文用到的docker命令
        docker images//查看镜像
        docker pull xx镜像//从创库拉取xx镜像
        docker run -p xxxx:xx -d xx镜像//以后台方式运行xx镜像的容器，-p指定端口映射
        docker ps//查看在运行的镜像
        docker rm xx//删除容器
        docker stop xx//停止容器
        docker rmi xx//删除镜像
        docker build -t image-name .//创建镜像，“.”是Dockerfile文件所在目录，可以指定绝对路径
        docker exec -it bash//进入容器的伪终端，参数请参阅 –help
        cat、touch、vim这几个Linux终端命令也会用到
* 5.拉取官方nginx镜像
        docker search nginx
        docker pull nginx//如果网速太慢可以到网易的镜像库拉取
* 6.把自己的dist文件夹传到主机API文件夹下，修改默认nginx配置
        touch default.conf
        vim default.conf
        //从标准nginx的默认配置复制default.conf内容，然后编辑内容如下
        server {
          listen       80;  
          server_name  localhost;

          #charset koi8-r;
          #access_log  /var/log/nginx/host.access.log  main;

          location / {
              root   /usr/share/nginx/html/dist;  //主要是修改这里
              index  index.html index.htm;
          }

          #error_page  404              /404.html;

          # redirect server error pages to the static page /50x.html
          #
          error_page   500 502 503 504  /50x.html;
          location = /50x.html {
              root   /usr/share/nginx/html;
          }

          # proxy the PHP scripts to Apache listening on 127.0.0.1:80
          #
          #location ~ \.php$ {
          #    proxy_pass   http://127.0.0.1;
          #}

          # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
          #
          #location ~ \.php$ {
          #    root           html;
          #    fastcgi_pass   127.0.0.1:9000;
          #    fastcgi_index  index.php;
          #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
          #    include        fastcgi_params;
          #}

          # deny access to .htaccess files, if Apache's document root
          # concurs with nginx's one
          #
          #location ~ /\.ht {
          #    deny  all;
          #}
        }
* 7.制作Dockerfile，文件放在和API同一个目录下
        touch Dockerfile
        vim Dockerfile
        //编辑如下
        FROM nginx
        MAINTAINER fyy
        ADD API /usr/share/nginx/html  //把API文件夹下的文件复制到容器的相应文件夹下
        COPY default.conf /etc/nginx/conf.d/default.conf  //用自己编辑的配置文件替换nginx容器内的默认配置
* 8.生成自己的nginx镜像,然后运行
        docker build -t my-nginx .
        docker run -p 8080:80 -d my-nginx
到此结束，你可以访问看看是否成功。以上只是自己入门过程的一些理解，不一定是最正确的，只是当作一个笔记让自己以后方便复习。

写nginx配置时只要写server指令块，如果有其他event和http这些指令会报错（主要因为它会第二次加载其他配置） 然后用该配置替换docker里的nginx默认default.conf。

### 补记
docker构建可以理解为多个docker commit，Dockerfile里的每条指令都会commit一次，产生一个镜像层，所以执行一些shell命令时尽量用一个RUN指令。
docker构建是基于c/s形式的，本地客户端运行命令实际是操作远程服务端的docker引擎
> docker build [选项] <上下文路径/URL/->

注意上下文路径的理解，构建过程中我们经常会用到本地的一些文件资源，然而构建实在远程服务端，所以构建时客户端会把指定上下文的路径下所有的文件上传到服务端，当运行COPY指令时指定的**源文件路径**实际是**相对上下文路径**的，**目标文件路径**则是**绝对路径或者相对（WORKDIR）的路径**！