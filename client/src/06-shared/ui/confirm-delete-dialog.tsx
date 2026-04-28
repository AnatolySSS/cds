import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from '@/06-shared'

export function ConfirmDeleteDialog<T>({
  deletedItem,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  onDelete,
  getItemName,
}: {
  deletedItem: T | null
  isDeleteDialogOpen: boolean
  setIsDeleteDialogOpen: any
  onDelete: (item: T) => void
  getItemName: (item: T) => string
}) {
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle> Удалить</DialogTitle>
          <DialogDescription className="whitespace-pre-line">
            Подтвердите удаление:
            <br />
            <b>{deletedItem ? getItemName(deletedItem) : ''}</b>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              if (!deletedItem) return
              onDelete(deletedItem)
              setIsDeleteDialogOpen(false)
            }}
          >
            Удалить
          </Button>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Отмена
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
