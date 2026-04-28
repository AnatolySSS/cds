import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/06-shared'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/06-shared'
import { MoreHorizontal } from 'lucide-react'

export type ActionItem<TData, TMeta = unknown> = {
  label: string
  variant?: 'default' | 'destructive'
  onClick: (row: TData, meta: TMeta) => void
  hidden?: (row: TData, meta: TMeta) => boolean
}

export function createActionsColumn<TData, TMeta = unknown>(config: {
  actions: ActionItem<TData, TMeta>[]
  size?: number
  label?: string
}): ColumnDef<TData> {
  return {
    id: 'actions',

    header: () => null,

    cell: ({ row, table }) => {
      const data = row.original
      const meta = table.options.meta as TMeta

      const visibleActions = config.actions.filter(
        (action) => !action.hidden?.(data, meta),
      )

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                {config.label ?? 'Действия'}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {visibleActions.map((action, idx) => (
                <DropdownMenuItem
                  key={idx}
                  variant={action.variant}
                  onClick={() => action.onClick(data, meta)}
                >
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },

    size: config.size ?? 50,
    enableSorting: false,
    enableHiding: false,
  }
}
