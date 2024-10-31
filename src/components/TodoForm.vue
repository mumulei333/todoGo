<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <div class="form-group">
      <label for="title">标题</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        required
        placeholder="输入待办事项标题"
      >
    </div>

    <div class="form-group">
      <label for="description">描述</label>
      <textarea
        id="description"
        v-model="form.description"
        placeholder="输入待办事项描述"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="priority">优先级</label>
      <select id="priority" v-model="form.priority">
        <option value="low">低</option>
        <option value="medium">中</option>
        <option value="high">高</option>
      </select>
    </div>

    <div class="form-group">
      <label for="dueDate">截止日期</label>
      <input
        id="dueDate"
        v-model="form.dueDate"
        type="datetime-local"
        required
      >
    </div>

    <button type="submit" class="submit-btn">
      {{ editMode ? '更新' : '添加' }}
    </button>
  </form>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TodoForm'
})
</script>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import type { Todo, Priority } from '../types/todo'

const props = defineProps<{
  editMode?: boolean
  todo?: Todo
}>()

const emit = defineEmits<{
  (e: 'submit', todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): void
}>()

const form = ref({
  title: props.todo?.title ?? '',
  description: props.todo?.description ?? '',
  priority: props.todo?.priority ?? 'medium' as Priority,
  dueDate: props.todo?.dueDate ?? '',
  completed: props.todo?.completed ?? false
})

const handleSubmit = () => {
  emit('submit', {
    ...form.value,
    dueDate: new Date(form.value.dueDate).toISOString()
  })
  if (!props.editMode) {
    // 重置表单
    form.value = {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      completed: false
    }
  }
}
</script>

<style scoped>
.todo-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: bold;
}

input, textarea, select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-btn {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #45a049;
}
</style> 