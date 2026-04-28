import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, X } from 'lucide-react'
import { cn } from '@/06-shared'
import { Button, FileExcelFilledIcon } from '@/06-shared'
import { createFilesPreviews, readExcelData } from '../lib/excel'
import { toast } from 'sonner'

type FileWithPreview = File & {
  preview?: string
}

interface FileUploaderProps<TData> {
  handleUpload?: (data: TData[]) => Promise<unknown>
}

export function FileUploader<TData>({
  handleUpload,
}: FileUploaderProps<TData>) {
  const [files, setFiles] = useState<FileWithPreview[]>([])

  const onUploadFile = async (file: File) => {
    const data = await safeRead(file)

    if (!data) return

    await safeUpload(data)
  }

  const safeRead = async (file: File) => {
    try {
      return await readExcelData<TData>(file)
    } catch (err) {
      toast.error('Ошибка чтения Excel', {
        description: 'Файл повреждён или имеет неверный формат',
      })
      console.error(err)
      return null
    }
  }

  const safeUpload = async (data: TData[]) => {
    try {
      await handleUpload?.(data)

      toast.success('Сохранено', {
        description: 'Данные успешно загружены',
      })
    } catch (err) {
      toast.error('Ошибка загрузки на сервер', {
        description: 'Произошла ошибка при загрузке данных',
      })
      console.error(err)
    }
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const filesWithPreview = createFilesPreviews(acceptedFiles)
    setFiles((prev) => [...prev, ...filesWithPreview])

    for (const file of acceptedFiles) {
      await onUploadFile(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name))
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative  flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all cursor-pointer',
          'bg-muted/40 hover:bg-muted/60',
          'transition-transform duration-300 ease-out', // анимация
          'hover:scale-101 hover:shadow-lg hover:-translate-y-1', // hover эффект
          'active:scale-98 active:translate-y-0.5', // клик — эффект нажатия
          isDragActive && 'border-primary bg-primary/10 scale-[1.02]',
        )}
      >
        <input {...getInputProps()} />

        <UploadCloud className="h-10 w-10 mb-3 text-muted-foreground transition-transform duration-300 ease-out group-hover:scale-110" />

        <p className="text-sm font-medium">
          {isDragActive ? 'Отпускай файл 👇' : 'Перетащи файлы сюда или кликни'}
        </p>

        <p className="text-xs text-muted-foreground mt-1">XLS, XLSX до 10MB</p>
      </div>
      {/* File list */}
      <div className="flex-1 overflow-y-auto border rounded-2xl  p-3">
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between rounded-xl border p-3 bg-background shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <FileExcelFilledIcon />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFile(file.name)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
