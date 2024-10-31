<template>
  <div class="todo-filter">
    <div class="filter-group">
      <label>状态筛选</label>
      <select v-model="todoStore.filter.status">
        <option value="all">全部</option>
        <option value="active">未完成</option>
        <option value="completed">已完成</option>
      </select>
    </div>

    <div class="filter-group">
      <label>优先级筛选</label>
      <select v-model="todoStore.filter.priority">
        <option value="all">全部</option>
        <option value="high">高</option>
        <option value="medium">中</option>
        <option value="low">低</option>
      </select>
    </div>

    <button 
      class="clear-completed"
      @click="todoStore.clearCompleted"
      v-if="hasCompleted"
    >
      清除已完成
    </button>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TodoFilter'
})
</script>

<script setup lang="ts">
import { defineComponent, computed } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()

const hasCompleted = computed(() => {
  return todoStore.todos.some(todo => todo.completed)
})
</script>

<style scoped>
.todo-filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.clear-completed {
  margin-left: auto;
  padding: 0.5rem 1rem;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.clear-completed:hover {
  background: #ff7875;
}

@media (max-width: 768px) {
  .todo-filter {
    flex-direction: column;
    align-items: stretch;
  }

  .clear-completed {
    margin-left: 0;
  }
}
</style> 