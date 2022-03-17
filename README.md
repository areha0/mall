# 网上商城

### 前言
项目脱胎于coderwhy老师vuejs课程中的最后项目实战，前台的页面设计可以参考coderwhy老师的[vuejs课程](https://www.bilibili.com/video/BV17j411f74d?spm_id_from=333.999.0.0),coderwhy老师的项目中包含主页面，详情页面，搜索页面，购物车页面以及个人主页，偏重于使用vuejs对前台页面的设计。学习完nodejs课程之后，希望能够自己实现后端接口，实现前后端的交互，最后实现了vuejs+nodejs+mongoDB的全栈网上商城，同时在原有的基础上增加了登录/注册页面，搜索页面，地址管理页面，订单管理页面，订单支付页面，并可以使用支付宝沙箱模拟支付功能。

项目商品数据是使用爬虫直接写入数据库中的，所以项目运行之前需要先获取商品数据

### 技术栈
vue2 + vue-router + vuex + vue-cli + axios + vant + node + express + mongoDB + flex + icomoon

### 接口数据
商品数据的爬取以及后端接口在[mall-db](https://github.com/areha0/mall-db)中，如果数据请求失败可能是商品数据的接口改变

### 项目运行
在运行前端项目之前先将后端项目运行
```
git clone https://github.com/areha0/mall.git

cd mall

npm install

npm run dev
```
### 目录结构
主要是对src目录下的文件简要说明
页面文件夹下的 ...children文件夹中存放的是当前页面中的特定组件
```F:.
├─assets                          // 静态资源
│  ├─css
│  │  └─icomoon
│  │      └─fonts
│  └─img
│      ├─common
│      └─home
├─commen
├─components                      // 封装的一些通用组件
│  ├─commen
│  │  ├─backtop
│  │  ├─navbar
│  │  ├─scroll
│  │  ├─swiper
│  │  ├─tabbar
│  │  └─toast
│  └─content
│      ├─goodslist
│      ├─signform
│      └─tabcontrol
├─network                         // 对axios的二次封装
│  └─user
├─router                          // 路由管理以及前置导航守卫
├─store                           // vuex的状态管理
└─views
    ├─address                     // 地址管理页面
    │  └─addresschildren
    ├─allorders                   // 订单管理页面
    │  └─orderchildren
    ├─category                    // 分类页面
    │  └─catechildren
    ├─detail                      // 详情页面
    │  └─detailchildren
    ├─ensureorder                 // 确认订单页面
    │  └─ensurechildren 
    ├─home                        // 主页面
    │  └─homechildren
    ├─login                       // 登录页面
    │  └─loginchilds 
    ├─payedorder                  // 订单详情页面
    │  └─payorderchildren
    ├─payment                     // 支付完成页面
    ├─profile                     // 个人主页
    │  └─profilechildren
    ├─register                    // 注册页面
    │  └─registerchildren
    ├─search                      // 搜索结果页
    └─shopcart                    // 购物车页面
        └─cartchildren
```
