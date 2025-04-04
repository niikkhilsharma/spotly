"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PricingStepProps {
  value: number
  onChange: (value: number) => void
  onNext: () => void
  onBack: () => void
}

export function PricingStep({ value, onChange, onNext, onBack }: PricingStepProps) {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number.parseInt(e.target.value)
    if (!isNaN(price) && price >= 0) {
      onChange(price)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Set your price</h1>
        <p className="text-muted-foreground">
          You can change your price anytime. Consider starting with a lower price to attract initial bookings.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Label htmlFor="price">Price per night (₹)</Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-muted-foreground">₹</span>
              </div>
              <Input
                id="price"
                type="number"
                value={value || ""}
                onChange={handlePriceChange}
                className="pl-8"
                placeholder="0"
                min="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={value <= 0}>
          Next
        </Button>
      </div>
    </div>
  )
}

