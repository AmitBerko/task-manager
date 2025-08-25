export type ThemeMode = 'light' | 'dark'

export type Priority = 'High' | 'Medium' | 'Low'

export type Task = {
  id: string
  title: string
  description: string
  priority: Priority
  createdAt: Date
}

export type PriorityFilter = 'All' | Priority

export type Filter = {
  search: string
  priority: PriorityFilter
}