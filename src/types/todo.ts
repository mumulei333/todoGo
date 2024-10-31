export type Priority = 'low' | 'medium' | 'high'
export type ViewMode = 'list' | 'card'

export interface Todo {
  id: string
  title: string
  description: string
  priority: Priority
  dueDate: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface TodoState {
  todos: Todo[]
  filter: {
    priority: Priority | 'all'
    status: 'all' | 'completed' | 'active'
  }
  sort: {
    by: 'dueDate' | 'priority' | 'createdAt'
    order: 'asc' | 'desc'
  }
  viewMode: ViewMode
} 