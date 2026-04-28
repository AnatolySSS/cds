import { Item, ItemContent, ItemMedia, ItemTitle } from '@/06-shared'
import { Spinner } from '@/06-shared'

export function LoadingItem() {
  return (
    <div className="flex w-full flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Загрузка...</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  )
}
