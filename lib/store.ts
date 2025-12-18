"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Task {
  id: string
  title: string
  description: string
  priority: "Extreme" | "Moderate" | "Low"
  status: "Not Started" | "In Progress" | "Completed"
  date: string
  image?: string
  createdAt: string
}

export interface User {
  firstName: string
  lastName: string
  username: string
  email: string
  contactNumber: string
  position: string
  avatar?: string
}

export interface TaskStatus {
  id: string
  name: string
}

export interface TaskPriority {
  id: string
  name: string
}

interface AppState {
  user: User | null
  tasks: Task[]
  isAuthenticated: boolean
  taskStatuses: TaskStatus[]
  taskPriorities: TaskPriority[]
  setUser: (user: User) => void
  login: (username: string, password: string) => boolean
  register: (user: User, password: string) => boolean
  logout: () => void
  addTask: (task: Omit<Task, "id" | "createdAt">) => void
  updateTask: (id: string, task: Partial<Task>) => void
  deleteTask: (id: string) => void
  updateUserProfile: (user: Partial<User>) => void
  changePassword: (currentPassword: string, newPassword: string) => boolean
  addTaskStatus: (name: string) => void
  updateTaskStatus: (id: string, name: string) => void
  deleteTaskStatus: (id: string) => void
  addTaskPriority: (name: string) => void
  updateTaskPriority: (id: string, name: string) => void
  deleteTaskPriority: (id: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      tasks: [],
      isAuthenticated: false,
      taskStatuses: [
        { id: "1", name: "Not Started" },
        { id: "2", name: "In Progress" },
        { id: "3", name: "Completed" },
      ],
      taskPriorities: [
        { id: "1", name: "Extreme" },
        { id: "2", name: "Moderate" },
        { id: "3", name: "Low" },
      ],

      setUser: (user) => set({ user, isAuthenticated: true }),

      login: (username, password) => {
        const storedCredentials = localStorage.getItem("userCredentials")
        if (storedCredentials) {
          const credentials = JSON.parse(storedCredentials)
          if (credentials.username === username && credentials.password === password) {
            set({ isAuthenticated: true })
            return true
          }
        }
        return false
      },

      register: (user, password) => {
        localStorage.setItem(
          "userCredentials",
          JSON.stringify({
            username: user.username,
            password,
          }),
        )
        set({ user, isAuthenticated: true })
        return true
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      addTask: (task) => {
        const newTask: Task = {
          ...task,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ tasks: [...state.tasks, newTask] }))
      },

      updateTask: (id, updatedTask) => {
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)),
        }))
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },

      updateUserProfile: (updatedUser) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        }))
      },

      changePassword: (currentPassword, newPassword) => {
        const storedCredentials = localStorage.getItem("userCredentials")
        if (storedCredentials) {
          const credentials = JSON.parse(storedCredentials)
          if (credentials.password === currentPassword) {
            localStorage.setItem(
              "userCredentials",
              JSON.stringify({
                ...credentials,
                password: newPassword,
              }),
            )
            return true
          }
        }
        return false
      },

      addTaskStatus: (name) => {
        const newStatus: TaskStatus = {
          id: Math.random().toString(36).substr(2, 9),
          name,
        }
        set((state) => ({ taskStatuses: [...state.taskStatuses, newStatus] }))
      },

      updateTaskStatus: (id, name) => {
        set((state) => ({
          taskStatuses: state.taskStatuses.map((status) => (status.id === id ? { ...status, name } : status)),
        }))
      },

      deleteTaskStatus: (id) => {
        set((state) => ({
          taskStatuses: state.taskStatuses.filter((status) => status.id !== id),
        }))
      },

      addTaskPriority: (name) => {
        const newPriority: TaskPriority = {
          id: Math.random().toString(36).substr(2, 9),
          name,
        }
        set((state) => ({ taskPriorities: [...state.taskPriorities, newPriority] }))
      },

      updateTaskPriority: (id, name) => {
        set((state) => ({
          taskPriorities: state.taskPriorities.map((priority) =>
            priority.id === id ? { ...priority, name } : priority,
          ),
        }))
      },

      deleteTaskPriority: (id) => {
        set((state) => ({
          taskPriorities: state.taskPriorities.filter((priority) => priority.id !== id),
        }))
      },
    }),
    {
      name: "todo-app-storage",
    },
  ),
)
