"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const openModal = (image: string, index: number) => {
    setSelectedImage(image)
    setSelectedIndex(index)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)
    setSelectedImage(images[(selectedIndex - 1 + images.length) % images.length])
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length)
    setSelectedImage(images[(selectedIndex + 1) % images.length])
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => openModal(image, index)}
            className="relative overflow-hidden rounded-lg cursor-pointer group h-48 md:h-56"
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${title} - Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                View
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>

            <img
              src={selectedImage || "/placeholder.svg"}
              alt={`${title} - Full view`}
              className="w-full h-full object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors cursor-pointer"
                >
                  ←
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors cursor-pointer"
                >
                  →
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
