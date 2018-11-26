### express 应用生成器
sudo npm install express-generator -g
---
express book_service
---
set DEBUG=book_service & npm start
---
### mongoose 
sudo npm i mongoose --save
---
### supervisor 监控代码修改
sudo npm i -g supervisor
---
### Vue的实例属性和方法区分用户定义的属性Vue.xxx
Vue.$el  Vue.$data  Vue.$watch()
---
#### Vue的生命周期钩子
#### RESTful API
### npm 全局安装路径
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
### Vue.js Ajax库 vue-resource
npm i vue-resource
---
### 指令参数 带有v-前缀的特殊属性
v-once 只渲染一次，之后数据改变不再渲染
v-html="xxx" 将字符串渲染成纯html文本
v-model="xxx" 用于表单元素与数据的双向绑定
v-if="xxx" 根据xxx的布尔值判断是否渲染
v-bind:href="url" 响应式的更新标签的属性 可简写成 :href="url"
v-on:click="doSomething" 绑定监听DOM事件 可简写成：@click="doSomething"
---
计算属性和方法
计算属性是基于他们的以来的缓存的，即依赖的数据未发生变化，则再次访问时直接返回之前的计算结果
方法即每次访问都执行一边函数
---
计算属性默认只有getter方法，但需要时也可以提供setter方法
---
v-if="xxx === 'c'" v-else-if="xxx === 'b'" v-else
v-show="xxx"
v-if是真正的条件渲染， 即切换过程在会销毁和重建， v-if也是惰性的，初始状态若为false，则什么都不做知道切换为true
v-show则是简单的切换css中的display: none属性
---
### v-for
#### 数组
1. v-for="item in items" 也可以 v-for="item of items"
2. v-for="(item, index) in items"
#### 对象 {key: value}
1. v-for="value in object"
2. v-for="(value, key) in object"
3. v-for="(value, key, index) in object"
---
v-on: click="say" say方法默认参数是event(原生DOM事件对象)
v-on: click="say('hi')" 传入自定义参数
v-on: click="say('hi', $event)" 用vue的实例变量访问event对象
---
#### 事件修饰符 .stop, .prevent, capture, .self, .once
#### 键值修饰符 keyup.enter, keyup.13 等等
#### 修饰键 keyup.alt.67 相当与alt+ASCII为67的键， click.ctrl ctrl+点击
#### 鼠标的3个按键修饰符 .left, .right, middle
---
#### v-model指令用于表单元素与其数据的双向绑定，实际上就是监听事件的语法糖
type: text， textarea 中v-model的值就是文本框的value
type: checkbox， select>multiple 中v-model的值是checked===true的复选框的value, 绑定的数据初值应设为[]数组
type: radio select 中v-model的值就是选中的单选框的value
---
#### 修饰符 in v-model
.lazy 从keyup转变为change事件同步
.number string->number
.trim 去除字符串开头结尾的空格
---
#### axios 取代 vue.resource 的vue Ajax包
格式如下： axios.method([url], {query}).then(res => {}).catch(err => {})
---
在vue的生命周期中created() 能够访问 methods
---
