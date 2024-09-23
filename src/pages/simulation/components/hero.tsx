import { motion } from 'framer-motion'

export const Hero = () => {
  return (
    <div className="relative h-96 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-4">Furniture Styles Gallery</h1>
        <p className="text-xl">Discover inspiring designs for your home</p>
      </motion.div>
    </div>
  )
}