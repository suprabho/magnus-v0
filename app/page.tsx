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

export default function PreferencesPage() {
  const router = useRouter()
  const [preferences, setPreferences] = useState({
    name: "",
    email: "",
    interests: [] as string[],
    experience: "",
    goals: "",
    notifications: false,
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store preferences in localStorage for the prototype
    localStorage.setItem("userPreferences", JSON.stringify(preferences))
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">Welcome!</CardTitle>
          <CardDescription className="text-lg">
            Let's personalize your experience by learning about your preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="space-y-2">
              <Label>Interests (select all that apply)</Label>
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

            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select onValueChange={(value) => setPreferences((prev) => ({ ...prev, experience: value }))}>
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

            <div className="space-y-2">
              <Label htmlFor="goals">What are your main goals?</Label>
              <Textarea
                id="goals"
                placeholder="Tell us about what you want to achieve..."
                value={preferences.goals}
                onChange={(e) => setPreferences((prev) => ({ ...prev, goals: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="notifications"
                checked={preferences.notifications}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, notifications: checked as boolean }))
                }
              />
              <Label htmlFor="notifications" className="text-sm font-normal">
                I'd like to receive notifications and updates
              </Label>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Continue to Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
