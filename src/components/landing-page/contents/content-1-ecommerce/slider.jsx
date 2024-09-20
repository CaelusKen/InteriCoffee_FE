"use client"

import { useEffect, useRef, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from 'next/image'

const carouselItems = [
  {
    leftImage: "https://picsum.photos/300/400?random=1",
    rightTopImage: "https://picsum.photos/300/200?random=2",
    rightBottomImage: "https://picsum.photos/300/200?random=3",
  },
  {
    leftImage: "https://picsum.photos/300/400?random=4",
    rightTopImage: "https://picsum.photos/300/200?random=5",
    rightBottomImage: "https://picsum.photos/300/200?random=6",
  },
  {
    leftImage: "https://picsum.photos/300/400?random=7",
    rightTopImage: "https://picsum.photos/300/200?random=8",
    rightBottomImage: "https://picsum.photos/300/200?random=9",
  },
]

const Slider = () => {
  const carouselRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  const initializeCarousel = () => {
    const carousel = carouselRef.current
    if (carousel) {
      const scrollHeight = carousel.scrollHeight
      const clientHeight = carousel.clientHeight
      const animationDuration = scrollHeight * 50 // Adjust speed here

      carousel.style.setProperty('--scroll-height', `${scrollHeight}px`)
      carousel.style.setProperty('--client-height', `${clientHeight}px`)
      carousel.style.setProperty('--animation-duration', `${animationDuration}ms`)
      carousel.classList.add('auto-scroll')
    }
  }

  useEffect(() => {
    if (loaded) {
      initializeCarousel()

      // Re-initialize after a short delay to ensure all content is loaded
      const timer = setTimeout(initializeCarousel, 100)

      return () => clearTimeout(timer)
    }
  }, [loaded])

  // Function to track image loading
  const handleImageLoad = () => {
    setLoaded(true)
  }

  return (
    <div className="w-full max-w-md mx-auto h-[400px] overflow-hidden">
      <style jsx>{`
        .auto-scroll {
          animation: scroll var(--animation-duration) linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-1 * var(--scroll-height) + var(--client-height))); }
        }
      `}</style>
      <Carousel
        ref={carouselRef}
        className="w-full h-full"
        orientation="vertical"
      >
        <CarouselContent className="-mt-1 pt-1">
          {carouselItems.concat(carouselItems).map((item, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/1">
              <div className="flex p-1 h-[400px]">
                <div className="w-1/2 pr-1">
                  <Image
                    src={item.leftImage}
                    alt={`Left image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    width={300}
                    height={400}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className="w-1/2 pl-1 flex flex-col">
                  <Image
                    src={item.rightTopImage}
                    alt={`Right top image ${index + 1}`}
                    className="w-full h-[198px] object-cover rounded-lg mb-1"
                    width={300}
                    height={400}
                    onLoad={handleImageLoad}
                  />
                  <Image
                    src={item.rightBottomImage}
                    alt={`Right bottom image ${index + 1}`}
                    className="w-full h-[198px] object-cover rounded-lg mt-1"
                    width={300}
                    height={400}
                    onLoad={handleImageLoad}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Slider;
