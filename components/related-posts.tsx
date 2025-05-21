import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

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

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <article
          key={post.id}
          className={`group bg-white dark:bg-navy-900 rounded-xl overflow-hidden shadow-md dark:shadow-navy-800/30 card-hover card-3d animate-fade-in stagger-${(index % 3) + 1}`}
        >
          <Link href={`/article/${post.slug}`} className="block relative overflow-hidden aspect-[4/3] mb-0 img-zoom">
            <div className="absolute inset-0 bg-blue-500 mix-blend-multiply opacity-10 animate-pulse-slow"></div>
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <div className="p-4">
            <Link
              href={`/author/${post.author.username}`}
              className="text-sm font-medium mb-2 inline-block hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              {post.author.name}
            </Link>

            <Link
              href={`/article/${post.slug}`}
              className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
            >
              <h3 className="font-bold mb-1 line-clamp-2 font-heading">{post.title}</h3>
            </Link>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(post.date)} · {post.readTime} min read
            </div>
          </div>
        </article>
      ))}

      {posts.length === 0 && (
        <div className="col-span-3 text-center py-8 bg-white dark:bg-navy-900 rounded-xl shadow-md animate-fade-in">
          <p className="text-gray-600 dark:text-gray-400">No related posts found.</p>
        </div>
      )}
    </div>
  )
}
