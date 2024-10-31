<template>
  <div
    class="todo-item"
    :class="[
      `priority-${todo.priority}`,
      { completed: todo.completed }
    ]"
  >
    <div class="todo-content">
      <div class="todo-header">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="$emit('toggle', todo.id)"
        >
        <h3>{{ todo.title }}</h3>
        <span class="priority-badge">{{ priorityText[todo.priority] }}</span>
      </div>
      
      <p class="description">{{ todo.description }}</p>
      
      <div class="todo-footer">
        <span class="due-date">
          截止日期: {{ formatDate(todo.dueDate) }}
        </span>
        <div class="actions">
          <button @click="$emit('edit', todo)" class="edit-btn">
            编辑
          </button>
          <button @click="$emit('delete', todo.id)" class="delete-btn">
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TodoItem'
})
</script>

<script setup lang="ts">
import { defineComponent } from 'vue'
import type { Todo } from '../types/todo'

defineProps<{
  todo: Todo
}>()

defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'edit', todo: Todo): void
  (e: 'delete', id: string): void
}>()

const priorityText = {
  low: '低',
  medium: '中',
  high: '高'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.todo-item {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.todo-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.todo-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.todo-header h3 {
  margin: 0;
  flex: 1;
}

.description {
  color: #666;
  margin: 0.5rem 0;
}

.todo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.priority-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.priority-high {
  border-left: 4px solid #ff4d4f;
}

.priority-medium {
  border-left: 4px solid #faad14;
}

.priority-low {
  border-left: 4px solid #52c41a;
}

.completed {
  opacity: 0.6;
}

.completed h3 {
  text-decoration: line-through;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .delete-btn {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background: #1890ff;
  color: white;
}

.delete-btn {
  background: #ff4d4f;
  color: white;
}
</style> 