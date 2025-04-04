"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PropertyTypeStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
}

export function PropertyTypeStep({ value, onChange, onNext }: PropertyTypeStepProps) {
  const propertyTypes = [
    { id: "marriage-garden", label: "Marriage Garden" },
    { id: "community-house", label: "Community House" },
    { id: "flat", label: "Flat" },
    { id: "home", label: "Home" },
    { id: "hostel", label: "Hostel" },
    { id: "restaurant", label: "Restaurant" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">What type of property are you listing?</h1>
        <p className="text-muted-foreground">Choose the category that best describes your property.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
            {propertyTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <RadioGroupItem value={type.id} id={type.id} />
                <Label htmlFor={type.id} className="cursor-pointer">
                  {type.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!value}>
          Next
        </Button>
      </div>
    </div>
  )
}

