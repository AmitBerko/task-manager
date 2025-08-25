import { Priority } from "@/lib/types"
import { Box } from "@mui/material"

export function PriorityCircle({ priority }: { priority: Priority }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return '#ef4444'
      case 'Medium':
        return '#eab308'
      case 'Low':
        return '#22c55e'
      default:
        return '#6b7280' // Fallback
    }
  }

  return (
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        bgcolor: getPriorityColor(priority),
      }}
    />
  )
}