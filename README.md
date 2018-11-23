# express 应用生成器
sudo npm install express-generator -g
---
express book_service
---
set DEBUG=book_service & npm start
---
# mongoose 
sudo npm i mongoose --save
---
# supervisor 监控代码修改
sudo npm i -g supervisor
---
# Vue的实例属性和方法区分用户定义的属性Vue.xxx
Vue.$el  Vue.$data  Vue.$watch()
---
## Vue的生命周期钩子
## RESTful API
# npm 全局安装路径
npm root -g
---
router.push({path: 'reqister', query: {plan: "private"}}) = 
<router-link :to="{path: 'reqister', query: {plan: 'private'}}"></router-link>
变成 '/reqister?plan=private'
path与params搭配是无效的， 只能有效于命名路由
---
router.place() = <router-link :to="" replace></router-link>
push是将输入的地址压入history栈， place是替换当前栈顶的url
---
router.go(n) 在history记录中向前或向后多少步
---
routes:[
    {path: "/a", redirect: '/b'}
]
route: [
    {path: "/a", alias: '/b'}
]
---
组建与路由解耦
不使用高度耦合的$router.params.xx
路由中添加 props: true
组件中添加 export default {
    props: ["xx"]
}
原来的$router.params.xx还是可以使用的
---
# Vue.js Ajax库 vue-resource
npm i vue-resource
