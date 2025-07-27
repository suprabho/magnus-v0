import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"

interface UserPreferences {
  name: string
  interests?: string[]
  experience?: string
  goals?: string
}

interface ProfileCardProps {
  userPreferences: UserPreferences | null
  className?: string
}

export function ProfileCard({ userPreferences, className = "" }: ProfileCardProps) {
  if (!userPreferences) return null

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Your Profile</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
      </CardContent>
    </Card>
  )
} 