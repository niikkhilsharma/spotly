"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PlaceTypeStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export function PlaceTypeStep({ value, onChange, onNext, onBack }: PlaceTypeStepProps) {
  const placeTypes = [
    { id: "entire-place", label: "An entire place" },
    { id: "room", label: "A room" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">What type of place will guests have?</h1>
        <p className="text-muted-foreground">Choose the option that best describes what guests will book.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
            {placeTypes.map((type) => (
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

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!value}>
          Next
        </Button>
      </div>
    </div>
  )
}

