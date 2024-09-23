import { FurnitureCard } from './furniture-card';

interface FurnitureItem {
  id: number
  title: string
  image: string
  category: string
}

interface GalleryProps {
  items: FurnitureItem[]
}

export function FurnitureCardGallery({ items }: GalleryProps) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <FurnitureCard key={item.id} {...item} />
          ))}
        </div>
    )
}