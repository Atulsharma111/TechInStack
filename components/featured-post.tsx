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

interface FeaturedPostProps {
  post: BlogPost
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gradient-to-r from-navy-900 to-navy-800 dark:from-black dark:to-navy-900 rounded-xl overflow-hidden shadow-xl p-6 text-white card-hover card-3d">
      <Link href={`/article/${post.slug}`} className="block relative overflow-hidden rounded-lg aspect-[4/3] img-zoom">
        <div className="absolute inset-0 bg-blue-500 mix-blend-multiply opacity-20 animate-pulse-slow"></div>
        <Image
          src={post.coverImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-bounce-slow">
          Featured
        </div>
      </Link>

      <div className="animate-slide-in-right">
        <div className="flex items-center mb-4">
          <Link href={`/author/${post.author.username}`} className="flex items-center mr-4 group">
            <Avatar className="h-8 w-8 mr-2 border-2 border-transparent group-hover:border-blue-500 transition-all duration-300 animate-pulse-slow">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium group-hover:text-blue-400 transition-colors duration-300">
              {post.author.name}
            </span>
          </Link>

          <div className="text-sm text-gray-300">
            {formatDate(post.date)} · {post.readTime} min read
          </div>
        </div>

        <Link href={`/article/${post.slug}`} className="block group-hover:text-blue-400 transition-colors duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 font-heading gradient-text">{post.title}</h2>
          <p className="text-gray-300 text-lg mb-4">{post.subtitle}</p>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className={`text-sm bg-navy-700 hover:bg-navy-600 px-3 py-1 rounded-full transition-colors duration-300 animate-fade-in stagger-${(index % 5) + 1}`}
              >
                {tag}
              </Link>
            ))}
          </div>

          <button className="text-gray-300 hover:text-blue-400 transition-colors duration-300 animate-scale">
            <BookmarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  )
}
