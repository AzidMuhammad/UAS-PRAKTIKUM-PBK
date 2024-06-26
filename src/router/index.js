import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PageNotFound from '../components/PageNotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/not-found', name: 'NotFound', component: PageNotFound },
  { path: '/:catchAll(.*)', redirect: '/not-found' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
