'use client'

import { Button, ButtonProps, CircularProgress } from '@mui/material'
import { useTransition } from 'react'

type LoadingButtonProps = {
	onClickAsync: () => Promise<void> | void
} & ButtonProps

export default function LoadingButton({ onClickAsync, ...props }: LoadingButtonProps) {
	const [isPending, startTransition] = useTransition()
	return (
		<Button
			{...props}
			startIcon={
				<div
					style={{
						visibility: isPending ? 'hidden' : 'visible',
						display: 'inline-flex',
					}}
				>
					{props.startIcon}
				</div>
			}
			disabled={isPending || props.disabled}
			onClick={() => {
				startTransition(async () => {
					await onClickAsync()
				})
			}}
			sx={{
				position: 'relative',
				...props.sx,
			}}
		>
			{/* Doing this to preserve same height/width */}
			<span style={{ visibility: isPending ? 'hidden' : 'visible' }}>{props.children}</span>
			{isPending && (
				<CircularProgress sx={{ position: 'absolute' }} color="inherit" size={20} thickness={5} />
			)}
		</Button>
	)
}
