export const logger = (...args: unknown[]) => {
	if (process.env.NEXT_PUBLIC_ENV !== 'development') return
	console.log(...args)
}
