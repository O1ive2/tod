<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { CheckSquare, Calendar, User, Settings, Bell } from 'lucide-vue-next'
import { computed } from 'vue'

const route = useRoute()
const activePath = computed(() => route.path)

const navItems = [
  { name: '任务列表', path: '/', icon: CheckSquare },
  { name: '日历日程', path: '/calendar', icon: Calendar },
]
</script>

<template>
  <div class="flex h-screen bg-background overflow-hidden font-sans antialiased">
    <!-- 侧边栏 Sidebar -->
    <aside class="w-64 bg-background flex flex-col z-20 relative p-4 pr-0">
      <div class="bg-muted/30 h-full rounded-3xl flex flex-col overflow-hidden border border-white/40 shadow-sm">
        <div class="p-6 flex items-center gap-3">
          <div class="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
            <CheckSquare class="w-5 h-5 text-primary-foreground" />
          </div>
          <span class="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Organizer</span>
        </div>

        <nav class="flex-1 px-3 space-y-1.5 mt-4">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 group relative"
            :class="[
              activePath === item.path
                ? 'bg-white text-primary shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)]'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            {{ item.name }}
            <div v-if="activePath === item.path" class="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full"></div>
          </RouterLink>
        </nav>

        <div class="p-4 mt-auto">
          <button class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-muted-foreground hover:bg-white/50 hover:text-foreground transition-all duration-300">
            <Settings class="w-5 h-5" />
            系统设置
          </button>
        </div>
      </div>
    </aside>

    <!-- 主区域 Main Content -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- 顶栏 TopBar -->
      <header class="h-20 flex items-center justify-between px-8 sticky top-0 z-10">
        <div class="flex flex-col">
          <h2 class="text-xl font-bold tracking-tight">
            {{ navItems.find(i => i.path === activePath)?.name || '概览' }}
          </h2>
          <p class="text-xs text-muted-foreground font-medium">欢迎回来，开启高效的一天</p>
        </div>
        
        <div class="flex items-center gap-5">
          <button class="w-10 h-10 flex items-center justify-center rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 relative group">
            <Bell class="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div class="flex items-center gap-3 pl-5">
            <div class="text-right hidden sm:block">
              <p class="text-sm font-bold leading-none">Oliver Wan</p>
              <p class="text-[10px] font-bold text-primary uppercase tracking-wider mt-1 bg-primary/10 px-2 py-0.5 rounded-md inline-block">Pro Account</p>
            </div>
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 cursor-pointer hover:scale-105 transition-transform">
              <User class="w-6 h-6" />
            </div>
          </div>
        </div>
      </header>

      <!-- 内容区 Content area -->
      <main class="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div class="max-w-5xl mx-auto">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.15);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.25);
}

.animate-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
