import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { authors } from "@/data/authors"

export function PopularAuthors() {
  // Sort authors by followers (descending) and take top 5
  const popularAuthors = [...authors].sort((a, b) => b.followers - a.followers).slice(0, 5)

  return (
    <div className="space-y-4">
      {popularAuthors.map((author, index) => (
        <div key={author.username} className={`flex items-center justify-between animate-fade-in stagger-${index + 1}`}>
          <Link href={`/author/${author.username}`} className="flex items-center group">
            <Avatar className="h-10 w-10 mr-3 border-2 border-transparent group-hover:border-blue-500 transition-all duration-300 animate-pulse-slow">
              <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {author.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{author.bio}</p>
            </div>
          </Link>

          <Button
            variant="outline"
            size="sm"
            className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-navy-800 transition-all duration-300 ripple"
          >
            Follow
          </Button>
        </div>
      ))}

      <Link
        href="/authors"
        className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline block text-center mt-4 transition-colors duration-300 animate-bounce-slow"
      >
        See all authors
      </Link>
    </div>
  )
}
