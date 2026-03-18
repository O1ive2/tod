import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useTodosStore } from './todos'

export const useCalendarStore = defineStore('calendar', () => {
  const todosStore = useTodosStore()

  const events = computed(() => {
    return todosStore.todos.map(todo => {
      const event: any = {
        id: `todo-${todo.id}`,
        title: todo.text,
        start: todo.date,
        allDay: true,
        classNames: todo.completed ? ['event-completed'] : []
      }

      // 如果有时间，将其合并到 start 中，并设置 allDay 为 false
      if (todo.time) {
        event.start = `${todo.date}T${todo.time}:00`
        event.allDay = false
      }

      return event
    })
  })

  return { events }
})
