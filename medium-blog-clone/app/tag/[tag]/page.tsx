import { BlogCard } from "@/components/blog-card"
import { blogData } from "@/data/blog-data"
import type { Metadata } from "next"

type Props = {
  params: { tag: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)

  return {
    title: `${tag} | TechInsight Blog`,
    description: `Explore articles about ${tag} on TechInsight Blog`,
    openGraph: {
      title: `${tag} | TechInsight Blog`,
      description: `Explore articles about ${tag} on TechInsight Blog`,
    },
    twitter: {
      card: "summary",
      title: `${tag} | TechInsight Blog`,
      description: `Explore articles about ${tag} on TechInsight Blog`,
    },
  }
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)

  // Get all posts with this tag
  const tagPosts = blogData.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-navy-900 dark:text-white">#{tag}</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore {tagPosts.length} stories about {tag}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {tagPosts.map((post, index) => (
            <div key={post.id} className={`animate-fade-in stagger-${(index % 5) + 1}`}>
              <BlogCard post={post} layout="horizontal" />
            </div>
          ))}

          {tagPosts.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-navy-900 rounded-xl shadow-md animate-fade-in">
              <p className="text-gray-600 dark:text-gray-400">No stories found with this tag.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
