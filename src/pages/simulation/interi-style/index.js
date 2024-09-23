import { Hero } from '../components/Hero'
import { FurnitureCardGallery } from '../components/furniture-gallery'

const furnitureItems = [
  { id: 1, title: 'Modern Sofa', image: 'https://picsum.photos/200/300', category: 'Living Room' },
  { id: 2, title: 'Minimalist Dining Table', image: 'https://picsum.photos/200/300', category: 'Dining Room' },
  { id: 3, title: 'Rustic Bed Frame', image: 'https://picsum.photos/200/300', category: 'Bedroom' },
  { id: 4, title: 'Industrial Bookshelf', image: 'https://picsum.photos/200/300', category: 'Office' },
  { id: 5, title: 'Scandinavian Armchair', image: 'https://picsum.photos/200/300', category: 'Living Room' },
  { id: 6, title: 'Art Deco Coffee Table', image: 'https://picsum.photos/200/300', category: 'Living Room' },
]

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      {/* <main className="container mx-auto px-4 py-12">
        <FurnitureCardGallery items={furnitureItems} />
      </main> */}
    </div>
  )
}
