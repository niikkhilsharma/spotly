"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface SecurityStepProps {
  value: {
    hasCamera: boolean
    hasNoiseMonitor: boolean
    hasWeapons: boolean
  }
  onChange: (value: any) => void
  onNext: () => void
  onBack: () => void
}

export function SecurityStep({ value, onChange, onNext, onBack }: SecurityStepProps) {
  const handleToggle = (field: string, checked: boolean) => {
    onChange({
      ...value,
      [field]: checked,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Security Information</h1>
        <p className="text-muted-foreground">
          For transparency, please indicate if your property has any of the following:
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="hasCamera"
                checked={value.hasCamera}
                onCheckedChange={(checked) => handleToggle("hasCamera", checked as boolean)}
              />
              <div>
                <Label htmlFor="hasCamera" className="cursor-pointer">
                  Security camera / recording device
                </Label>
                <p className="text-xs text-muted-foreground">
                  Includes indoor cameras, video doorbells, or any device that records or transmits audio, video, or
                  still images.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="hasNoiseMonitor"
                checked={value.hasNoiseMonitor}
                onCheckedChange={(checked) => handleToggle("hasNoiseMonitor", checked as boolean)}
              />
              <div>
                <Label htmlFor="hasNoiseMonitor" className="cursor-pointer">
                  Noise decibel monitor present
                </Label>
                <p className="text-xs text-muted-foreground">
                  Devices that measure noise levels but don't record or transmit audio.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="hasWeapons"
                checked={value.hasWeapons}
                onCheckedChange={(checked) => handleToggle("hasWeapons", checked as boolean)}
              />
              <div>
                <Label htmlFor="hasWeapons" className="cursor-pointer">
                  Weapons on the property
                </Label>
                <p className="text-xs text-muted-foreground">
                  Any weapons that are on the property, even if secured or not accessible to guests.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}

