import { createRouter, createWebHistory } from 'vue-router'
import TodolistView from '@/views/TodolistView.vue'
import CalendarView from '@/views/CalendarView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todolist',
      component: TodolistView
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView
    }
  ]
})

export default router
