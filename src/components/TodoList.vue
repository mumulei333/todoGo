<template>
  <div class="todo-list">
    <div class="controls">
      <TodoForm @submit="handleAddTodo" />
      <TodoFilter />
      <TodoSort />
    </div>

    <div class="list-container" :class="viewMode">
      <TransitionGroup name="list" tag="div" class="todos">
        <TodoItem
          v-for="todo in todoStore.filteredTodos"
          :key="todo.id"
          :todo="todo"
          @toggle="toggleTodo"
          @edit="editTodo"
          @delete="deleteTodo"
        />
      </TransitionGroup>
    </div>

    <!-- 编辑对话框 -->
    <div v-if="showEditDialog" class="edit-dialog">
      <div class="dialog-content">
        <h2>编辑待办事项</h2>
        <TodoForm
          :edit-mode="true"
          :todo="editingTodo"
          @submit="handleEditSubmit"
        />
        <button @click="showEditDialog = false" class="close-btn">
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TodoList'
})
</script>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import { useTodoStore } from '../stores/todo'
import TodoForm from './TodoForm.vue'
import TodoItem from './TodoItem.vue'
import TodoFilter from './TodoFilter.vue'
import TodoSort from './TodoSort.vue'
import type { Todo } from '../types/todo'

const props = defineProps<{
  viewMode: 'list' | 'card'
}>()

const todoStore = useTodoStore()
const showEditDialog = ref(false)
const editingTodo = ref<Todo | null>(null)

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

const handleAddTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
  todoStore.addTodo(todo)
}

const toggleTodo = (id: string) => {
  const todo = todoStore.todos.find(t => t.id === id)
  if (todo) {
    todoStore.updateTodo(id, { completed: !todo.completed })
  }
}

const editTodo = (todo: Todo) => {
  editingTodo.value = todo
  showEditDialog.value = true
}

const handleEditSubmit = (updates: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
  if (editingTodo.value) {
    todoStore.updateTodo(editingTodo.value.id, updates)
    showEditDialog.value = false
    editingTodo.value = null
  }
}

const deleteTodo = (id: string) => {
  if (confirm('确定要删除这个待办事项吗？')) {
    todoStore.deleteTodo(id)
  }
}
</script>

<style scoped>
.todo-list {
  width: 100%;
}

.controls {
  margin-bottom: 2rem;
}

.list-container {
  width: 100%;
}

.todos {
  display: grid;
  gap: 1rem;
}

/* 列表视图 */
.list .todos {
  grid-template-columns: 1fr;
}

/* 卡片视图 */
.card .todos {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.edit-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
}

/* 过渡动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media (max-width: 768px) {
  .card .todos {
    grid-template-columns: 1fr;
  }
}
</style> 