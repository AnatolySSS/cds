import type { CellContext } from '@tanstack/react-table'

export function createObjectCell<TValue>(
  mapValue: (value: TValue) => React.ReactNode,
) {
  return ({ getValue }: CellContext<any, unknown>) => {
    const raw = getValue() as TValue | null | undefined

    if (raw == null) return null

    return (
      <div className="whitespace-normal line-clamp-2 break-words">
        {mapValue(raw)}
      </div>
    )
  }
}
