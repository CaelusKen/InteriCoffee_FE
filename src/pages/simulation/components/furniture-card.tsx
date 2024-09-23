import { motion } from 'framer-motion'
import Image from 'next/image'

interface FurnitureCardProps {
  title: string
  image: string
  category: string
}

export function FurnitureCard({ title, image, category }: FurnitureCardProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="object-cover w-full h-64"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-300">{category}</p>
      </div>
    </motion.div>
  )
}