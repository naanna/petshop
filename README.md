# 基于vue的宠物商店购物系统
>从零构建vue + vue-router + vuex，实现基本的系统功能

## 技术栈
vue + element + axios + node.js + mysql

## 项目地址
[点击访问宠物商店(第一次加载较慢)](http://116.62.108.15:8080/)

客户：505 123456

[查看页面展示](#页面展示) 
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
- 上传图片
- 视频投稿审核观看
- 首页天气预报
- 多人聊天室
- 监听在线用户
- 数据导入导出、打印
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

![message](https://mmzdpicture.oss-cn-hangzhou.aliyuncs.com/message.gif)
