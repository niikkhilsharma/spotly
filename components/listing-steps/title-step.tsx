"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TitleStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export function TitleStep({ value, onChange, onNext, onBack }: TitleStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Give your place a title</h1>
        <p className="text-muted-foreground">Create a title that highlights what makes your place special.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="e.g., Cozy apartment in the heart of the city"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">{value.length}/100 characters</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={value.length < 10}>
          Next
        </Button>
      </div>
    </div>
  )
}

