import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Todo, Priority, TodoState } from '../types/todo'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const filter = ref({
    priority: 'all' as Priority | 'all',
    status: 'all' as 'all' | 'completed' | 'active'
  })
  const sort = ref({
    by: 'createdAt' as 'dueDate' | 'priority' | 'createdAt',
    order: 'desc' as 'asc' | 'desc'
  })

  // 获取过滤后的待办事项
  const filteredTodos = computed(() => {
    return todos.value
      .filter(todo => {
        if (filter.value.priority !== 'all' && todo.priority !== filter.value.priority) return false
        if (filter.value.status === 'completed' && !todo.completed) return false
        if (filter.value.status === 'active' && todo.completed) return false
        return true
      })
      .sort((a, b) => {
        const order = sort.value.order === 'asc' ? 1 : -1
        switch (sort.value.by) {
          case 'dueDate':
            return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * order
          case 'priority':
            const priorityMap = { high: 3, medium: 2, low: 1 }
            return (priorityMap[a.priority] - priorityMap[b.priority]) * order
          default:
            return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order
        }
      })
  })

  // 添加待办事项
  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    todos.value.push(newTodo)
    saveTodos()
  }

  // 更新待办事项
  const updateTodo = (id: string, updates: Partial<Todo>) => {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index !== -1) {
      todos.value[index] = {
        ...todos.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      saveTodos()
    }
  }

  // 删除待办事项
  const deleteTodo = (id: string) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
    saveTodos()
  }

  // 清除已完成的待办事项
  const clearCompleted = () => {
    todos.value = todos.value.filter(todo => !todo.completed)
    saveTodos()
  }

  // 保存到本地存储
  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }

  // 从本地存储加载
  const loadTodos = () => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos)
    }
  }

  // 初始化时加载数据
  loadTodos()

  return {
    todos,
    filter,
    sort,
    filteredTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    clearCompleted
  }
}) 