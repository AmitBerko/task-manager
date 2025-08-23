import TasksProvider from '@/contexts/TasksProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <TasksProvider>{children}</TasksProvider>
}
