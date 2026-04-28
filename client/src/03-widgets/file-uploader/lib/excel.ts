import { DateAdapter } from '@/06-shared/lib/date/date-adapter'
import * as XLSX from 'xlsx'

// Тип для данных из Excel
export type ExcelRowData = Record<string, any>

// Тип для файла с превью
export type FileWithPreview = File & { preview: string }

export const createFilesPreviews = (files: File[]): FileWithPreview[] => {
  return files.map(createFilePreview)
}

export const readExcelData = async <T>(file: File): Promise<T[]> => {
  try {
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { cellNF: true })

    if (!workbook.SheetNames.length) {
      throw new Error('Excel файл не содержит листов')
    }

    const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
    return transformExcelSheet<T>(firstSheet)
  } catch (error) {
    throw new Error(`Ошибка чтения файла ${file.name}: ${error}`)
  }
}

const createFilePreview = (file: File): FileWithPreview => {
  return Object.assign(file, { preview: URL.createObjectURL(file) })
}

const transformExcelSheet = <T>(sheet: XLSX.WorkSheet): T[] => {
  const processedSheet = normalizeCells(sheet)

  const rows = XLSX.utils.sheet_to_json(processedSheet, {
    defval: null,
    raw: true,
  }) as Record<string, any>[]

  return rows.map(normalizeRow) as T[]
}

const normalizeCells = (sheet: XLSX.WorkSheet): XLSX.WorkSheet => {
  const newSheet = structuredClone(sheet)

  for (const cell in newSheet) {
    if (cell.startsWith('!')) continue

    const cellObj = newSheet[cell]

    // 📅 даты
    if (isExcelDateCell(cellObj)) {
      cellObj.v = ExcelDateToJSDate(cellObj.v)
      cellObj.t = 'd'
      continue
    }

    // ✅ boolean из Excel (t: 'b')
    if (cellObj.t === 'b') {
      cellObj.v = Boolean(cellObj.v)
      continue
    }

    // 🔁 строковые TRUE / FALSE
    if (cellObj.t === 's' && typeof cellObj.v === 'string') {
      const value = cellObj.v.trim().toLowerCase()

      if (value === 'true' || value === 'истина') {
        cellObj.v = true
        cellObj.t = 'b'
      }

      if (value === 'false' || value === 'ложь') {
        cellObj.v = false
        cellObj.t = 'b'
      }
    }
  }

  return newSheet
}

function ExcelDateToJSDate(serial: number) {
  const utc_days = Math.floor(serial - 25569)
  const utc_value = utc_days * 86400
  const date_info = new Date(utc_value * 1000)

  const fractional_day = serial - Math.floor(serial) + 0.0000001
  const total_seconds = Math.floor(86400 * fractional_day)
  const seconds = total_seconds % 60

  const hours = Math.floor(total_seconds / 3600)
  const minutes = Math.floor(total_seconds / 60) % 60

  const date = new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds,
  )

  return DateAdapter.toApiDateOnly(date)
}

export function isExcelDateCell(cell: any) {
  if (!cell) return false

  // должен быть number
  if (cell.t !== 'n') return false

  // диапазон дат Excel
  if (cell.v < 60 || cell.v > 2958465) return false

  // если есть формат — проверяем его
  if (cell.z && /[ymd]/i.test(cell.z)) return true

  return false
}
const normalizeRow = (row: Record<string, any>) => {
  for (const key in row) {
    const value = row[key]

    if (typeof value === 'string') {
      const trimmed = value.trim()
      row[key] = trimmed === '' ? null : trimmed
    } else {
      row[key] = value ?? null
    }
  }

  return row
}
