"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function PreferencesPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [preferences, setPreferences] = useState({
    name: "",
    email: "",
    interests: [] as string[],
    experience: "",
    goals: "",
    notifications: false,
  })

  const steps = ["Basic Info", "Interests", "Experience", "Goals", "Notifications"]

  const interestOptions = [
    "Technology",
    "Design",
    "Business",
    "Marketing",
    "Health",
    "Education",
    "Entertainment",
    "Sports",
  ]

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setPreferences((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }))
    } else {
      setPreferences((prev) => ({
        ...prev,
        interests: prev.interests.filter((i) => i !== interest),
      }))
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("userPreferences", JSON.stringify(preferences))
    router.push("/dashboard")
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">Welcome!</CardTitle>
          <CardDescription className="text-lg">
            Let's personalize your experience by learning about your preferences
          </CardDescription>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(parseInt(value))}>
            <TabsContent value="0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={preferences.name}
                    onChange={(e) => setPreferences((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={preferences.email}
                    onChange={(e) => setPreferences((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="1">
              <div className="space-y-4">
                <Label>What topics interest you the most?</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {interestOptions.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={preferences.interests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                      />
                      <Label htmlFor={interest} className="text-sm font-normal">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="2">
              <div className="space-y-4">
                <Label htmlFor="experience">What's your current level of expertise?</Label>
                <Select
                  value={preferences.experience}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, experience: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="3">
              <div className="space-y-4">
                <Label htmlFor="goals">What do you want to achieve?</Label>
                <Textarea
                  id="goals"
                  placeholder="Tell us about what you want to achieve..."
                  value={preferences.goals}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, goals: e.target.value }))}
                  rows={4}
                />
              </div>
            </TabsContent>

            <TabsContent value="4">
              <div className="space-y-4">
                <Label>Would you like to stay updated?</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifications"
                    checked={preferences.notifications}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({ ...prev, notifications: checked as boolean }))
                    }
                  />
                  <Label htmlFor="notifications" className="text-sm font-normal">
                    I'd like to receive notifications about new features, updates, and personalized recommendations
                  </Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}>
              Previous
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button type="submit" onClick={handleSubmit}>
                Complete Setup
              </Button>
            ) : (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
