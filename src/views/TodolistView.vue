<script setup lang="ts">
import { ref } from 'vue'
import { useTodosStore } from '@/stores/todos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2, Plus, ListTodo, Sparkles, Calendar as CalendarIcon, Clock } from 'lucide-vue-next'

const getLocalDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const todosStore = useTodosStore()
const newTodoText = ref('')
const selectedDate = ref(getLocalDate())
const selectedTime = ref('')

function addTodo() {
  if (newTodoText.value.trim()) {
    todosStore.addTodo(newTodoText.value, selectedDate.value, selectedTime.value || undefined)
    newTodoText.value = ''
    selectedTime.value = ''
  }
}

function formatDate(dateStr: string) {
  const parts = dateStr.split('-')
  if (parts.length === 3) {
    const year = parseInt(parts[0] as string)
    const month = parseInt(parts[1] as string)
    const day = parseInt(parts[2] as string)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }
  return dateStr
}

function isToday(dateStr: string) {
  return dateStr === getLocalDate()
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-10 pb-12">
    <!-- 头部统计 Header Stats -->
    <header class="flex items-center justify-between">
      <div class="flex items-center gap-5">
        <div class="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center shadow-sm">
          <Sparkles class="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 class="text-3xl font-black tracking-tight text-foreground/90">今日焦点</h1>
          <p class="text-sm text-muted-foreground font-medium mt-1">
            已完成 <span class="text-primary font-bold">{{ todosStore.completedTodos.length }}</span> / {{ todosStore.todos.length }} 项任务
          </p>
        </div>
      </div>
      <div class="hidden sm:flex gap-3">
        <div class="px-4 py-2 rounded-2xl bg-white shadow-sm border border-white/60 flex flex-col items-center min-w-[80px]">
          <span class="text-xs text-muted-foreground font-bold uppercase tracking-widest">进行中</span>
          <span class="text-xl font-black text-primary">{{ todosStore.pendingTodos.length }}</span>
        </div>
      </div>
    </header>

    <!-- 输入区域 Input Section -->
    <div class="relative group">
      <div class="absolute -inset-1 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-[2rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200"></div>
      <div class="relative flex flex-col gap-3 p-4 bg-white rounded-[1.8rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
        <div class="flex-1 flex items-center min-w-0">
          <Input 
            v-model="newTodoText" 
            @keyup.enter="addTodo" 
            placeholder="有什么新计划吗？" 
            class="border-none focus-visible:ring-0 text-lg py-4 px-4 h-auto shadow-none bg-transparent placeholder:text-muted-foreground/50 font-medium"
          />
        </div>
        
        <div class="flex flex-wrap items-center gap-3 px-2">
          <!-- 日期选择 -->
          <div class="relative flex items-center bg-muted/50 rounded-xl px-3 py-2 group/date hover:bg-muted transition-colors">
            <CalendarIcon class="w-4 h-4 text-muted-foreground" />
            <input 
              type="date" 
              v-model="selectedDate"
              class="bg-transparent border-none text-sm font-bold text-foreground/70 outline-none ml-2 cursor-pointer w-[120px]"
            />
          </div>

          <!-- 时间选择 -->
          <div class="relative flex items-center bg-muted/50 rounded-xl px-3 py-2 group/time hover:bg-muted transition-colors">
            <Clock class="w-4 h-4 text-muted-foreground" />
            <input 
              type="time" 
              v-model="selectedTime"
              class="bg-transparent border-none text-sm font-bold text-foreground/70 outline-none ml-2 cursor-pointer w-[90px]"
            />
          </div>
          
          <Button @click="addTodo" size="lg" class="rounded-2xl px-8 h-auto py-4 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 ml-auto">
            <Plus class="w-6 h-6 mr-1" /> 
            <span class="font-bold whitespace-nowrap">添加</span>
          </Button>
        </div>
      </div>
    </div>

    <!-- 任务列表 Task List -->
    <div v-if="todosStore.todos.length" class="space-y-4">
      <transition-group 
        name="list" 
        tag="div" 
        class="space-y-4"
      >
        <div 
          v-for="todo in todosStore.todos" 
          :key="todo.id" 
          class="group flex items-center gap-5 p-5 rounded-[1.5rem] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-white/60 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:scale-[1.01] transition-all duration-300"
          :class="{ 'opacity-60 bg-white/50': todo.completed }"
        >
          <div class="flex items-center justify-center relative">
            <Checkbox 
              :checked="todo.completed" 
              @update:checked="() => todosStore.toggleTodo(todo.id)" 
              class="w-7 h-7 rounded-xl border-2 border-muted hover:border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all duration-300"
            />
          </div>
          
          <div class="flex-1 flex flex-col">
            <span 
              class="text-lg transition-all duration-300"
              :class="{ 'line-through text-muted-foreground/60 italic': todo.completed, 'font-bold text-foreground/80': !todo.completed }"
            >
              {{ todo.text }}
            </span>
            <div class="flex items-center gap-3 mt-1">
              <span 
                class="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md"
                :class="isToday(todo.date) ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'"
              >
                <CalendarIcon class="w-3 h-3" />
                {{ isToday(todo.date) ? '今天' : formatDate(todo.date) }}
              </span>
              <span 
                v-if="todo.time"
                class="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600"
              >
                <Clock class="w-3 h-3" />
                {{ todo.time }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button 
              variant="ghost" 
              size="icon" 
              class="w-10 h-10 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-xl"
              @click="() => todosStore.removeTodo(todo.id)"
            >
              <Trash2 class="w-5 h-5" />
            </Button>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- 空状态 Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-24 text-center space-y-6">
      <div class="w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-black/5 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
        <ListTodo class="w-12 h-12 text-primary/30" />
      </div>
      <div class="space-y-2">
        <h3 class="text-2xl font-black text-foreground/80">一切就绪！</h3>
        <p class="text-muted-foreground font-medium max-w-xs mx-auto">现在还没有任何任务，尝试添加一个目标来开始您的高效之旅吧。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.list-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.9) translateX(20px);
}

/* 优化原生日期和时间选择器的体验 */
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}
</style>
