import { toast } from 'sonner'

export const handleCopyToClipboard = (value: string | number) => {
  navigator.clipboard.writeText(String(value))
  toast('Скопировано в буфер обмена!', { position: 'top-center' })
}
