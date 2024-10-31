<template>
  <div class="todo-sort">
    <div class="sort-group">
      <label>排序方式</label>
      <select v-model="todoStore.sort.by">
        <option value="createdAt">创建时间</option>
        <option value="dueDate">截止日期</option>
        <option value="priority">优先级</option>
      </select>
    </div>

    <div class="sort-group">
      <label>排序顺序</label>
      <select v-model="todoStore.sort.order">
        <option value="desc">降序</option>
        <option value="asc">升序</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TodoSort'
})
</script>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
</script>

<style scoped>
.todo-sort {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  align-items: center;
}

.sort-group {
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

@media (max-width: 768px) {
  .todo-sort {
    flex-direction: column;
    align-items: stretch;
  }
}
</style> 