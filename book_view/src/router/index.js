/**
 * 路由管理
 */
import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import HelloWorld from '@/components/HelloWorld'
import User from "@/components/User"
import ShowText from "@/components/showText"
import UserProps from "@/components/UserProp"
import JSExpression from "@/components/JSExpression"
import RobotTest from "@/components/RobotTest"
import MovieList from "../Pages/MovieList"
import MovieDetail from "../Pages/movieDetail"
import NewsDetail from "../Pages/NewsDetail"
import LoginPage from "../Pages/LoginPage"
import registerPage from "../Pages/RegisterPage"
import FindPassword from "../Pages/findPassword"
import UserInfo from "../Pages/userInfo"
import SendEmail from "../Pages/SendEmail"


Vue.use(Router)
const vip = { template: '' }
const viewNamed = { template: "<div>默认视图</div>" }
const viewNamedA = { template: "<div>视图A</div>" }
const viewNamedB = { template: "<div>视图B</div>" }

const router = new Router({
  mode: "history",
  routes: [
    /* {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, */
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
    },
    {
      path: '/JSExpression',
      component: JSExpression,
    },
    {
      path: '/RobotTest',
      component: RobotTest,
    },
    {
      path: '/',
      component: resolve => require(['../Pages/index'], resolve),
      meta: {
        title: "home",
      }
    },
    {
      path: '/movieList',
      component: MovieList,
    },
    {
      path: '/movieDetail',
      component: MovieDetail,
    },
    {
      path: '/newsDetail',
      component: NewsDetail,
    },
    {
      path: "/loginPage",
      component: LoginPage,
    },
    {
      path: '/registerPage',
      component: registerPage,
    },
    {
      path: "/findPassword",
      component: FindPassword,
    },
    {
      path: '/userInfo',
      component: UserInfo,
    },
    {
      path: '/sendEmail',
      component: SendEmail,
    },  
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === "/viewNamed")
    next(false)
  else
    next()
})

export default router

