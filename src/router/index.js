/*
# ██╗██╗███╗   ██╗████████╗
# ██║██║████╗  ██║╚══██╔══╝
# ██║██║██╔██╗ ██║   ██║
# ██║██║██║╚██╗██║   ██║
# ██║██║██║ ╚████║   ██║
# ╚═╝╚═╝╚═╝  ╚═══╝   ╚═╝
# @Time    : 2022-05-10 19:56:36.000-05:00
# @Author  : 𝕫𝕙𝕒𝕠𝕤𝕙𝕖𝕟𝕘
# @email   : zhaosheng@nuaa.edu.cn
# @Blog    : http://iint.icu/
# @File    : 
# @Describe: None
*/

import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import register from '../views/about.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/register',
    name: 'register',
    component: register
  }
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
