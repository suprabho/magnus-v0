"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Grid3X3, MessageCircle, Send, User } from "lucide-react"
import { C1Chat } from "@thesysai/genui-sdk"
import "@crayonai/react-ui/styles/index.css"

export default function DashboardPage() {
  const router = useRouter()
  const [userPreferences, setUserPreferences] = useState<any>(null)
  
  useEffect(() => {
    const preferences = localStorage.getItem("userPreferences")
    if (preferences) {
      setUserPreferences(JSON.parse(preferences))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            {userPreferences && <Badge variant="secondary">Welcome, {userPreferences.name}!</Badge>}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => router.push("/catalog")} className="flex items-center space-x-2">
              <Grid3X3 className="h-4 w-4" />
              <span>Catalog</span>
            </Button>
            <Button variant="outline" onClick={() => router.push("/schedule")} className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar with user info */}
        <div className="w-80 bg-white border-r border-gray-200 p-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Your Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userPreferences && (
                <>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Interests</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {userPreferences.interests?.map((interest: string) => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Experience</p>
                    <p className="text-sm text-gray-600 capitalize">{userPreferences.experience}</p>
                  </div>
                  {userPreferences.goals && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Goals</p>
                      <p className="text-sm text-gray-600">{userPreferences.goals}</p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 p-4">
          <C1Chat apiUrl="/api/chat"
          formFactor="full-page"
           />
        </div>
        
      </div>
    </div>
  )
}
