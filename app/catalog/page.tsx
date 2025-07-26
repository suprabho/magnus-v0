"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Star, Clock, Users } from "lucide-react"

const catalogData = {
  Featured: [
    {
      id: 1,
      title: "Advanced React Patterns",
      description: "Master advanced React patterns and best practices for scalable applications.",
      category: "Technology",
      rating: 4.8,
      duration: "6 hours",
      students: 1234,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      description: "Learn the core principles of user interface and user experience design.",
      category: "Design",
      rating: 4.9,
      duration: "8 hours",
      students: 2156,
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  Technology: [
    {
      id: 3,
      title: "Full Stack Development",
      description: "Complete guide to building modern web applications from frontend to backend.",
      category: "Technology",
      rating: 4.7,
      duration: "12 hours",
      students: 3421,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      description: "Introduction to machine learning concepts and practical implementations.",
      category: "Technology",
      rating: 4.6,
      duration: "10 hours",
      students: 1876,
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  Business: [
    {
      id: 5,
      title: "Digital Marketing Strategy",
      description: "Comprehensive guide to creating effective digital marketing campaigns.",
      category: "Business",
      rating: 4.5,
      duration: "5 hours",
      students: 987,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Project Management",
      description: "Learn agile project management methodologies and tools.",
      category: "Business",
      rating: 4.4,
      duration: "7 hours",
      students: 1543,
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
}

export default function CatalogPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const allItems = Object.values(catalogData).flat()
  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
            <h1 className="text-2xl font-bold text-gray-900">Catalog</h1>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Catalog Sections */}
        {searchTerm || selectedCategory !== "all" ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Results ({filteredItems.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <CatalogCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          Object.entries(catalogData).map(([section, items]) => (
            <div key={section} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{section}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <CatalogCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function CatalogCard({ item }: { item: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-200">
        <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <Badge variant="secondary">{item.category}</Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
        </div>
        <CardTitle className="text-lg">{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{item.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{item.students.toLocaleString()} students</span>
          </div>
        </div>
        <Button className="w-full">Enroll Now</Button>
      </CardContent>
    </Card>
  )
}
