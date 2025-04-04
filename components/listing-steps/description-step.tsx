"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface DescriptionStepProps {
  value: {
    attributes: string[]
    text: string
  }
  onChange: (value: any) => void
  onNext: () => void
  onBack: () => void
}

export function DescriptionStep({ value, onChange, onNext, onBack }: DescriptionStepProps) {
  const attributes = [
    { id: "peaceful", label: "Peaceful" },
    { id: "unique", label: "Unique" },
    { id: "family-friendly", label: "Family-friendly" },
    { id: "stylish", label: "Stylish" },
    { id: "central", label: "Central" },
    { id: "spacious", label: "Spacious" },
  ]

  const handleToggleAttribute = (attributeId: string) => {
    const newAttributes = value.attributes.includes(attributeId)
      ? value.attributes.filter((id) => id !== attributeId)
      : [...value.attributes, attributeId]

    onChange({
      ...value,
      attributes: newAttributes,
    })
  }

  const handleTextChange = (text: string) => {
    onChange({
      ...value,
      text,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Describe your place</h1>
        <p className="text-muted-foreground">Tell potential guests what makes your property special.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <Label className="mb-2 block">Select attributes that describe your place</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {attributes.map((attribute) => (
                  <div key={attribute.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={attribute.id}
                      checked={value.attributes.includes(attribute.id)}
                      onCheckedChange={() => handleToggleAttribute(attribute.id)}
                    />
                    <Label htmlFor={attribute.id} className="cursor-pointer">
                      {attribute.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={value.text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Describe your property, the neighborhood, and what guests can expect..."
                className="min-h-[150px]"
              />
              <p className="text-xs text-muted-foreground">{value.text.length}/500 characters</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={value.text.length < 50}>
          Next
        </Button>
      </div>
    </div>
  )
}

