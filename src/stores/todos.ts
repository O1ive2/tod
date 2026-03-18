import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface Todo {
  id: number
  text: string
  completed: boolean
  date: string // ISO date string (YYYY-MM-DD)
  time?: string // Time string (HH:mm)
}

const STORAGE_KEY = 'todos-vue'

const getLocalDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const useTodosStore = defineStore('todos', () => {
  const storedTodos = localStorage.getItem(STORAGE_KEY)
  const initialTodos: Todo[] = storedTodos ? JSON.parse(storedTodos) : []
  
  // 确保所有数据都有日期字段，并统一格式
  const todos = ref<Todo[]>(initialTodos.map(todo => ({
    ...todo,
    date: todo.date || getLocalDate()
  })))

  let nextId = todos.value.reduce((maxId, todo) => Math.max(maxId, todo.id), -1) + 1

  watch(todos, (newTodos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
  }, { deep: true })

  const completedTodos = computed(() => todos.value.filter(todo => todo.completed))
  const pendingTodos = computed(() => todos.value.filter(todo => !todo.completed))

  function addTodo(text: string, date: string, time?: string) {
    todos.value.push({ 
      id: nextId++, 
      text, 
      completed: false,
      date: date || getLocalDate(),
      time: time || undefined
    })
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  function removeTodo(id: number) {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  return { todos, completedTodos, pendingTodos, addTodo, toggleTodo, removeTodo }
})
