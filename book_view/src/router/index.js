/**
 * 路由管理
 */
import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import HelloWorld from '@/components/HelloWorld'
import User from "@/components/User"
<<<<<<< HEAD
import ShowText from "@/components/showText"
=======
>>>>>>> bc9c90b71aede9923ec110944d36e6cfae577771
import UserProps from "@/components/UserProp"

Vue.use(Router)
const vip = { template: '' }
const viewNamed = { template: "<div>默认视图</div>" }
const viewNamedA = { template: "<div>视图A</div>" }
const viewNamedB = { template: "<div>视图B</div>" }

const router =  new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      /* id被设置到this.$route.params */
      path: "/user/:id",
      redirect: "/viewNamed",
      alias: "/aaa/:id",
      name: "user",
      component: User,
      children: [{
        path: "vip",
        name: "VIP",
        component: vip,
      }]
    },
    {
      path: "/viewNamed",
      components: {
        default: viewNamed,
        a: viewNamedA,
        b: viewNamedB,
      }
    },
    {
      path: '/UserProps/:id',
      component: UserProps,
      props: true,
    },
    {
      path: '/showText',
      component: ShowText,
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path === "/viewNamed")
    next(false)
  else 
    next()
})

export default router

