interface Props<T> {
  mode: 'operator' | 'preset'
  setLocalValue: (value: T) => void

  operatorValue: T
  presetValue: T
}

export function SwitchModeButtons<T>({
  mode,
  setLocalValue,
  operatorValue,
  presetValue,
}: Props<T>) {
  return (
    <div className="relative flex rounded-md border bg-muted p-1 overflow-hidden">
      {/* slider */}
      <div
        className={`
          absolute top-1 bottom-1 left-1 w-[calc(50%-4px)]
          bg-background shadow rounded-md
          transition-transform duration-200 ease-out
          ${mode === 'preset' ? 'translate-x-full' : 'translate-x-0'}
        `}
      />

      {/* OPERATOR */}
      <button
        type="button"
        onClick={() => setLocalValue(operatorValue)}
        className={`
          relative z-10 w-1/2 px-3 py-1.5 text-sm rounded transition
          ${
            mode === 'operator'
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }
        `}
      >
        Значение
      </button>

      {/* PRESET */}
      <button
        type="button"
        onClick={() => setLocalValue(presetValue)}
        className={`
          relative z-10 w-1/2 px-3 py-1.5 text-sm rounded transition
          ${
            mode === 'preset'
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }
        `}
      >
        Условие
      </button>
    </div>
  )
}
