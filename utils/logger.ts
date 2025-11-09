export class Logger {
	static #instance: Logger

	private constructor() {}

	public static get instance(): Logger {
		if (!Logger.#instance) {
			Logger.#instance = new Logger()
		}

		return Logger.#instance
	}

	public log(...args: unknown[]) {
		if (process.env.NEXT_PUBLIC_ENV !== 'development') return
		console.log(...args)
	}
}
