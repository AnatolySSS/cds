interface Props<T> {
  localValue: T
  onApply: (value: T) => void
  onReset: () => void
}

export function ActionButtons<T>({ localValue, onApply, onReset }: Props<T>) {
  return (
    <div className="flex gap-2 pt-2">
      <button
        type="button"
        onClick={() => onApply(localValue)}
        className="
          w-full px-3 py-1.5 text-sm rounded
          bg-primary text-primary-foreground
          transition-transform duration-100
          hover:opacity-90
          active:translate-y-[1px]
        "
      >
        Применить
      </button>

      <button
        type="button"
        onClick={onReset}
        className="
          w-full px-3 py-1.5 text-sm rounded border
          text-muted-foreground
          transition-transform duration-100
          hover:text-foreground
          active:translate-y-[1px]
        "
      >
        Сбросить
      </button>
    </div>
  )
}
