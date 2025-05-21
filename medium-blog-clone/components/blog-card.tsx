import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"
import { BookmarkIcon } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  subtitle: string
  slug: string
  content: string
  coverImage: string
  date: string
  readTime: number
  likes: number
  tags: string[]
  author: {
    name: string
    username: string
    avatar: string
    bio: string
  }
  comments: any[]
}

interface BlogCardProps {
  post: BlogPost
  layout?: "vertical" | "horizontal"
}

export function BlogCard({ post, layout = "vertical" }: BlogCardProps) {
  return (
    <article
      className={`group card-hover card-3d bg-white dark:bg-navy-900 rounded-xl overflow-hidden shadow-md dark:shadow-navy-800/30 ${layout === "horizontal" ? "flex flex-col md:flex-row gap-6" : "flex flex-col"}`}
    >
      <Link
        href={`/article/${post.slug}`}
        className={`block relative overflow-hidden img-zoom ${
          layout === "horizontal" ? "md:w-1/3 aspect-[4/3]" : "aspect-[16/9]"
        }`}
      >
        <div className="absolute inset-0 bg-blue-500 mix-blend-multiply opacity-10 animate-pulse-slow"></div>
        <Image
          src={post.coverImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>

      <div className={`p-5 ${layout === "horizontal" ? "md:w-2/3" : ""}`}>
        <div className="flex items-center mb-3">
          <Link href={`/author/${post.author.username}`} className="flex items-center mr-4 group">
            <Avatar className="h-6 w-6 mr-2 border border-transparent group-hover:border-blue-500 transition-all duration-300 animate-pulse-slow">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {post.author.name}
            </span>
          </Link>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(post.date)} · {post.readTime} min read
          </div>
        </div>

        <Link
          href={`/article/${post.slug}`}
          className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
        >
          <h2 className="text-xl font-bold mb-2 font-heading">{post.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{post.subtitle}</p>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag, index) => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className="text-xs bg-blue-100 dark:bg-navy-800 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-navy-700 transition-colors duration-300 animate-fade-in stagger-1"
              >
                {tag}
              </Link>
            ))}
          </div>

          <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 animate-scale">
            <BookmarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  )
}
