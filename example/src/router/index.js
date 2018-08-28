import Vue from 'vue'
import Router from 'vue-router'
import VueMarkdownIt from '@/components/VueMarkdownIt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VueMarkdownIt',
      component: VueMarkdownIt
    }
  ]
})
