# 基于vue3.0的宠物商店购物系统
>从零构建vue + vue-router + vuex，实现基本的系统功能

## 技术栈
vue + element + axios + node.js + mysql

## 项目地址
[宠物商店](http://116.62.108.15:3000/)

管理员：admin 123456

客户：505 123456

360浏览器请切换到急速模式打开

[页面展示](#页面展示) 
## 项目结构
```
 |——— public
 |——— src
	|——— api           #封装axios拦截
	|——— assets        #静态资源文件
	|——— common        #公用组件
	|——— components    #页面
	|——— plugins
	|——— router        #路由
	|——— store         #vuex
	|——— App.vue       #根
	|——— main.js       #入口
|——— babel.config.js
|——— package-lock.json
|——— package.json      #依赖
|——— README.md
|——— vue.config.js     #配置
```

## 完成功能
```
- 登录
- 路由守卫
- 请求拦截和响应拦截
- token本地存储
- vuex存储
- 数据分页和查询
- 收藏夹
- 目录权限
- 购物车
- 留言板
- 购物展示
- 寄养
- 各信息管理
- 消息通知
- 上传头像

```


## 项目运行
```
git clone git@github.com:naanna/petshop.git

cd petshop

npm install

npm run serve
```

## 页面展示

![login](https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/login.gif)

![forpsd](https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/forpsd.gif)

![good](https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/good.gif)

![person](https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/person.gif)

![message](https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/message.gif)

![user](https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/user.gif)

![all](https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/all.gif)