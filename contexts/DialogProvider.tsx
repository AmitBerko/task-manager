'use client'

import TaskDialog from '@/components/tasks/TaskDialog'
import { Task } from '@prisma/client';
import { createContext, useContext, useState, type ReactNode } from 'react'

type DialogOptions = { mode: 'Create' } | { mode: 'Edit'; task: Task }

type DialogContextType = {
	isDialogOpen: boolean
  dialogOptions: DialogOptions
	openDialog: (options: DialogOptions) => void
	closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | null>(null)

export function DialogProvider({ children }: { children: ReactNode }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [dialogOptions, setDialogOptions] = useState<DialogOptions>({ mode: 'Create' })

	const openDialog = (mode: DialogOptions) => {
    setDialogOptions(mode)
    setIsDialogOpen(true)
  }
	const closeDialog = () => setIsDialogOpen(false)

	return (
		<DialogContext.Provider value={{ isDialogOpen, dialogOptions, openDialog, closeDialog }}>
			{children}
			<TaskDialog />
		</DialogContext.Provider>
	)
}

export const useDialog = () => {
	const context = useContext(DialogContext)
	if (!context) throw new Error('useDialog must be used within DialogProvider')
	return context
}
