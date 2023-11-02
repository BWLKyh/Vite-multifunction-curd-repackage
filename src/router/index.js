import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/user',
      name: 'user',
      type: 'list',
      component: () => import('../views/user/index.vue')
    },
    {
      path: '/userEdit',
      name: 'userEdit',
      type: 'edit',
      component: () => import('../views/user/edit.vue')
    },
    {
      path: '/role',
      name: 'role',
      type: 'list',
      component: () => import('../views/role/index.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      type: 'list',
      component: () => import('../views/menu/index.vue')
    },
    {
      path: '/menuEdit',
      name: 'menuEdit',
      type: 'edit',
      component: () => import('../views/menu/edit.vue')
    }
  ]
})

export default router
