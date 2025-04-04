"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload, User } from "lucide-react"

interface VerificationStepProps {
  value: {
    photo: File | null
    document: File | null
    documentType: string
  }
  onChange: (value: any) => void
  onNext: () => void
  onBack: () => void
}

export function VerificationStep({ value, onChange, onNext, onBack }: VerificationStepProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [documentPreview, setDocumentPreview] = useState<string | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileUrl = URL.createObjectURL(file)
      setPhotoPreview(fileUrl)
      onChange({
        ...value,
        photo: file,
      })
    }
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileUrl = URL.createObjectURL(file)
      setDocumentPreview(fileUrl)
      onChange({
        ...value,
        document: file,
      })
    }
  }

  const handleDocumentTypeChange = (documentType: string) => {
    onChange({
      ...value,
      documentType,
    })
  }

  const isFormValid = () => {
    return value.photo && value.document && value.documentType
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Verify your identity</h1>
        <p className="text-muted-foreground">
          For security purposes, we need to verify your identity before your listing can go live.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Your photo</Label>
              <div
                className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors hover:bg-muted/50"
                onClick={() => document.getElementById("photo-upload")?.click()}
              >
                {photoPreview ? (
                  <div className="relative h-32 w-32 overflow-hidden rounded-full">
                    <img
                      src={photoPreview || "/placeholder.svg"}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <>
                    <User className="mb-2 h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload a clear photo of yourself</p>
                  </>
                )}
                <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Document type</Label>
              <RadioGroup value={value.documentType} onValueChange={handleDocumentTypeChange} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aadhar" id="aadhar" />
                  <Label htmlFor="aadhar">Aadhar Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="driving-license" id="driving-license" />
                  <Label htmlFor="driving-license">Driving License</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="passport" id="passport" />
                  <Label htmlFor="passport">Passport</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="voter-id" id="voter-id" />
                  <Label htmlFor="voter-id">Voter ID</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Upload document</Label>
              <div
                className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors hover:bg-muted/50"
                onClick={() => document.getElementById("document-upload")?.click()}
              >
                {documentPreview ? (
                  <div className="relative h-40 w-full overflow-hidden rounded-md">
                    <img
                      src={documentPreview || "/placeholder.svg"}
                      alt="Document preview"
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <>
                    <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Upload a clear photo of your {value.documentType || "document"}
                    </p>
                  </>
                )}
                <input
                  id="document-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleDocumentUpload}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!isFormValid()}>
          Submit Listing
        </Button>
      </div>
    </div>
  )
}

