"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Grid3X3, User } from "lucide-react"
import { C1Chat } from "@thesysai/genui-sdk"
import { ProfileCard } from "@/components/ui/profile-card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import "@crayonai/react-ui/styles/index.css"
import "./chat.css";

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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>About You</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <ProfileCard userPreferences={userPreferences} />
              </DialogContent>
            </Dialog>
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

      <div className="flex h-[calc(100dvh-200px)]">
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
