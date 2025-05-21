import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { blogData } from "@/data/blog-data"
import { formatDate } from "@/lib/utils"
import { BookmarkIcon, HandIcon as HandClap, MessageCircle, Share2 } from "lucide-react"
import { CommentSection } from "@/components/comment-section"
import { RelatedPosts } from "@/components/related-posts"
import type { Metadata } from "next"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Find the post by slug
  const post = blogData.find((post) => post.slug === params.slug) || blogData[0]

  return {
    title: `${post.title} | TechInsight Blog`,
    description: post.subtitle,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      type: "article",
      authors: [post.author.name],
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.subtitle,
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // Find the post by slug
  const post = blogData.find((post) => post.slug === params.slug) || blogData[0]

  // Get related posts by tag
  const relatedPosts = blogData
    .filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading text-navy-900 dark:text-white gradient-text">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{post.subtitle}</p>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4 border-2 border-blue-500 animate-pulse-slow">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={`/author/${post.author.username}`}
                  className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  {post.author.name}
                </Link>
                <div className="flex text-sm text-gray-500 dark:text-gray-400">
                  <span>{formatDate(post.date)}</span>
                  <span className="mx-2">·</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-100 dark:hover:bg-navy-800 transition-colors duration-300 animate-scale"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-100 dark:hover:bg-navy-800 transition-colors duration-300 animate-scale"
              >
                <BookmarkIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-lg overflow-hidden shadow-xl animate-fade-in stagger-2 img-zoom">
          <div className="absolute inset-0 bg-blue-500 mix-blend-multiply opacity-10 animate-pulse-slow"></div>
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none animate-fade-in stagger-3">
          <p>{post.content}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
          <h2>The Evolution of Modern Blogging</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <blockquote>
            "The best blogs don't just deliver information; they create a conversation with their readers."
          </blockquote>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <h3>Key Takeaways</h3>
          <ul>
            <li>Focus on quality content that provides value to readers</li>
            <li>Consistency is key to building a loyal audience</li>
            <li>Engage with your community through comments and social media</li>
            <li>Use analytics to understand what resonates with your audience</li>
          </ul>
        </div>

        <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 animate-fade-in stagger-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="rounded-full border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-navy-800 transition-all duration-300 btn-hover ripple animate-scale"
            >
              <HandClap className="h-5 w-5 mr-2" />
              <span>{post.likes}</span>
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-navy-800 transition-all duration-300 btn-hover ripple animate-scale"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              <span>{post.comments.length}</span>
            </Button>
          </div>

          <div className="flex items-center">
            <Button
              variant="outline"
              className="rounded-full border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-navy-800 transition-all duration-300 btn-hover ripple animate-scale"
            >
              <BookmarkIcon className="h-5 w-5 mr-2" />
              <span>Save</span>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 animate-fade-in stagger-5">
          <div className="flex items-center mb-6">
            <Avatar className="h-14 w-14 mr-4 border-2 border-blue-500 animate-pulse-slow">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg font-heading gradient-text">Written by {post.author.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{post.author.bio}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-navy-800 transition-all duration-300 btn-hover ripple"
              >
                Follow
              </Button>
            </div>
          </div>
        </div>
      </article>

      <CommentSection comments={post.comments} />

      <div className="max-w-4xl mx-auto mt-16 animate-fade-in">
        <h2 className="text-2xl font-bold mb-8 font-heading text-navy-900 dark:text-white gradient-text">
          More from TechInsight
        </h2>
        <RelatedPosts posts={relatedPosts} />
      </div>
    </div>
  )
}
