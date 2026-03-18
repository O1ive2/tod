<script setup lang="ts">
import { computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useCalendarStore } from '@/stores/calendar'

const calendarStore = useCalendarStore()

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  initialView: 'dayGridMonth',
  weekends: true,
  events: calendarStore.events,
  height: 'auto',
  contentHeight: 'auto',
  handleWindowResize: true,
  expandRows: true,
  buttonText: {
    today: '今天',
    month: '月',
    week: '周',
    day: '日'
  }
}))
</script>

<template>
  <div class="calendar-card animate-in">
    <div class="calendar-container">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<style>
/* FullCalendar 样式定制 - 彻底移除硬边框 */
:root {
  --fc-border-color: transparent;
  --fc-daygrid-dot-event-lh: 1.5;
  --fc-button-bg-color: transparent;
  --fc-button-border-color: transparent;
  --fc-button-hover-bg-color: hsl(var(--muted));
  --fc-button-hover-border-color: transparent;
  --fc-button-active-bg-color: hsl(var(--primary));
  --fc-button-active-border-color: transparent;
  --fc-event-bg-color: hsl(var(--primary));
  --fc-event-border-color: transparent;
  --fc-today-bg-color: hsl(var(--primary) / 0.03);
}

.calendar-card {
  background-color: white;
  border-radius: 2rem;
  padding: 2rem;
  box-shadow: 0 8px 30px rgb(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.calendar-container .fc {
  font-family: inherit;
  --fc-small-font-size: 0.85em;
  --fc-page-bg-color: transparent;
}

.calendar-container .fc .fc-toolbar-title {
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.025em;
  color: hsl(var(--foreground) / 0.8);
}

.calendar-container .fc .fc-button {
  border-radius: 0.75rem;
  font-weight: 700;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  height: auto;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  background-color: transparent;
  border: none;
}

.calendar-container .fc .fc-button:hover {
  color: hsl(var(--primary));
  background-color: hsl(var(--muted));
}

.calendar-container .fc .fc-button-primary:not(:disabled).fc-button-active,
.calendar-container .fc .fc-button-primary:not(:disabled):active {
  background-color: hsl(var(--primary)) !important;
  color: white !important;
  box-shadow: 0 10px 15px -3px rgba(var(--primary), 0.2);
}

.calendar-container .fc th {
  padding: 1.25rem 0;
  font-weight: 700;
  color: hsl(var(--muted-foreground) / 0.4);
  border: none;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.calendar-container .fc td {
  border-color: hsl(var(--muted) / 0.2) !important;
}

.calendar-container .fc-daygrid-day-number {
  padding: 0.75rem;
  font-weight: 700;
  font-size: 0.875rem;
  color: hsl(var(--foreground) / 0.6);
}

.calendar-container .fc-event {
  border-radius: 0.75rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.calendar-container .fc-event:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.calendar-container .event-completed {
  opacity: 0.4;
  filter: grayscale(0.8);
  text-decoration: line-through;
}

.calendar-container .fc-day-today {
  background-color: hsl(var(--primary) / 0.05) !important;
  border-radius: 1rem;
}

.calendar-container .fc-scrollgrid {
  border: none !important;
}

.calendar-container .fc-theme-standard td, 
.calendar-container .fc-theme-standard th {
  border-color: hsl(var(--muted) / 0.1) !important;
}
</style>
