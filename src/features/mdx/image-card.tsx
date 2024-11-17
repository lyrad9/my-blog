"use client"

import { useState } from "react"
import { Card, CardContent } from "@/src/components/ui/card"
import { X } from "lucide-react"

export function ImageCard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="relative min-h-screen w-full bg-gray-100 p-4">
      <Card className="mx-auto max-w-sm overflow-hidden">
        <CardContent className="p-0">
          <img
            src="/placeholder.svg?height=300&width=400"
            alt="Placeholder image"
            className="w-full cursor-pointer object-cover transition-transform hover:scale-105"
            onClick={openModal}
          />
        </CardContent>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative max-h-screen max-w-screen-lg">
            <button
              onClick={closeModal}
              className="absolute -right-4 -top-4 rounded-full bg-white p-2 text-gray-800 shadow-md hover:bg-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="Enlarged placeholder image"
              className="max-h-[80vh] w-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}