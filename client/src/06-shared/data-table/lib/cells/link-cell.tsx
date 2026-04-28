import type { CellContext } from '@tanstack/react-table'

export function createLinkCell(columnName: string) {
  return ({ row }: CellContext<any, unknown>) => {
    const value = row.getValue(columnName) as string | null | undefined

    if (!value) return null

    const href = value.startsWith('http') ? value : `https://${value}`

    return (
      <div className="whitespace-normal line-clamp-1 break-words">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {value}
        </a>
      </div>
    )
  }
}
