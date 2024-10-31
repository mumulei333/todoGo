<template>
  <div class="todo-app">
    <header class="header">
      <h1>TodoGo</h1>
      <div class="view-controls">
        <button @click="toggleView">
          {{ viewMode === 'list' ? '切换到卡片视图' : '切换到列表视图' }}
        </button>
      </div>
    </header>

    <main class="main-content">
      <TodoList :view-mode="viewMode" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ViewMode } from './types/todo'
import TodoList from './components/TodoList.vue'

const viewMode = ref<ViewMode>('list')

const toggleView = () => {
  viewMode.value = viewMode.value === 'list' ? 'card' : 'list'
}
</script>

<style scoped>
.todo-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
}

.main-content {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

@media (max-width: 768px) {
  .todo-app {
    padding: 1rem;
  }
  
  .header {
    flex-direction: column;
    gap: 1rem;
  }
}
</style> 