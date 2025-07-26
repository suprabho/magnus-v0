"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Clock, MapPin, Users, Plus } from "lucide-react"

const scheduleData = {
  "2024-01-15": [
    {
      id: 1,
      title: "React Workshop",
      time: "10:00 AM - 12:00 PM",
      location: "Room A",
      attendees: 15,
      type: "workshop",
    },
    {
      id: 2,
      title: "Design Review",
      time: "2:00 PM - 3:30 PM",
      location: "Conference Room",
      attendees: 8,
      type: "meeting",
    },
  ],
  "2024-01-16": [
    {
      id: 3,
      title: "Team Standup",
      time: "9:00 AM - 9:30 AM",
      location: "Virtual",
      attendees: 12,
      type: "meeting",
    },
    {
      id: 4,
      title: "Product Demo",
      time: "3:00 PM - 4:00 PM",
      location: "Main Hall",
      attendees: 25,
      type: "presentation",
    },
  ],
  "2024-01-18": [
    {
      id: 5,
      title: "Code Review Session",
      time: "11:00 AM - 12:30 PM",
      location: "Dev Room",
      attendees: 6,
      type: "workshop",
    },
  ],
}

export default function SchedulePage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2024, 0, 15))

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const selectedDateString = selectedDate ? formatDate(selectedDate) : ""
  const eventsForSelectedDate = scheduleData[selectedDateString as keyof typeof scheduleData] || []

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "workshop":
        return "bg-blue-100 text-blue-800"
      case "meeting":
        return "bg-green-100 text-green-800"
      case "presentation":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const hasEvents = (date: Date) => {
    const dateString = formatDate(date)
    return scheduleData[dateString as keyof typeof scheduleData]?.length > 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push("/dashboard")} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Event</span>
          </Button>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  hasEvents: (date) => hasEvents(date),
                }}
                modifiersStyles={{
                  hasEvents: {
                    backgroundColor: "#dbeafe",
                    color: "#1e40af",
                    fontWeight: "bold",
                  },
                }}
              />
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-100 rounded"></div>
                  <span>Days with events</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events for Selected Date */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                Events for{" "}
                {selectedDate?.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardTitle>
              <CardDescription>
                {eventsForSelectedDate.length} event{eventsForSelectedDate.length !== 1 ? "s" : ""} scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {eventsForSelectedDate.length > 0 ? (
                  <div className="space-y-4">
                    {eventsForSelectedDate.map((event) => (
                      <Card key={event.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-lg">{event.title}</h3>
                                <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                              </div>
                              <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Users className="h-4 w-4" />
                                  <span>{event.attendees} attendees</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Calendar className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No events scheduled</h3>
                    <p className="text-gray-600 mb-4">There are no events scheduled for this date.</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events Overview */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Quick overview of your next scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(scheduleData)
                .slice(0, 3)
                .map(([date, events]) => (
                  <Card key={date} className="border-2 border-dashed border-gray-200">
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        {new Date(date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="space-y-1">
                        {events.slice(0, 2).map((event) => (
                          <div key={event.id} className="text-xs text-gray-600">
                            {event.title} - {event.time.split(" - ")[0]}
                          </div>
                        ))}
                        {events.length > 2 && <div className="text-xs text-gray-500">+{events.length - 2} more</div>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
