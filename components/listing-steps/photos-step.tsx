"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface PhotosStepProps {
  value: string[]
  onChange: (value: string[]) => void
  onNext: () => void
  onBack: () => void
}

export function PhotosStep({ value, onChange, onNext, onBack }: PhotosStepProps) {
  const [dragActive, setDragActive] = useState(false)

  // In a real implementation, this would upload to a storage service
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newPhotos = [...value]

    Array.from(files).forEach((file) => {
      // Create a temporary URL for preview
      const fileUrl = URL.createObjectURL(file)
      newPhotos.push(fileUrl)
    })

    onChange(newPhotos)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...value]
    newPhotos.splice(index, 1)
    onChange(newPhotos)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add photos of your place</h1>
        <p className="text-muted-foreground">
          Upload high-quality photos to showcase your property. You can add multiple images.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div
            className={`mb-6 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("photo-upload")?.click()}
          >
            <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="mb-1 text-sm font-medium">Drag and drop your photos here</p>
            <p className="text-xs text-muted-foreground">or click to browse files</p>
            <input
              id="photo-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </div>

          {value.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {value.map((photo, index) => (
                <div key={index} className="group relative aspect-square overflow-hidden rounded-md">
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt={`Property photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemovePhoto(index)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={value.length === 0}>
          Next
        </Button>
      </div>
    </div>
  )
}

