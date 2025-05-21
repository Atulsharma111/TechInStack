import { BlogCard } from "@/components/blog-card"
import { FeaturedPost } from "@/components/featured-post"
import { TagList } from "@/components/tag-list"
import { PopularAuthors } from "@/components/popular-authors"
import { blogData } from "@/data/blog-data"
import type { Metadata } from "next"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "TechInsight Blog | Home",
  description: "Discover the latest in technology, programming, and design with expert insights and tutorials.",
}

export default function Home() {
  const featuredPost = blogData[0]
  const latestPosts = blogData.slice(1, 7)

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 font-heading text-navy-800 dark:text-blue-300 typing">
              Featured Story
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Our top pick for you today</p>
          </div>
        </div>
        <FeaturedPost post={featuredPost} />
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        <section className="lg:w-2/3">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold font-heading text-navy-800 dark:text-blue-300 gradient-text">
              Latest Stories
            </h2>
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium btn-hover group flex items-center">
              See all
              <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestPosts.map((post, index) => (
              <div key={post.id} className={`animate-fade-in stagger-${index + 1}`}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center animate-fade-in stagger-5">
            <button className="px-6 py-3 bg-navy-700 hover:bg-navy-800 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl btn-hover ripple">
              Load more stories
            </button>
          </div>
        </section>

        <aside className="lg:w-1/3 space-y-8 animate-slide-in-right">
          <div className="bg-gradient-to-br from-navy-800 to-navy-900 dark:from-navy-900 dark:to-black p-6 rounded-xl shadow-lg text-white card-3d">
            <h3 className="text-xl font-bold mb-4 font-heading gradient-text">Discover by topic</h3>
            <TagList />
          </div>

          <div className="bg-white dark:bg-navy-900 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-navy-700 card-3d">
            <h3 className="text-xl font-bold mb-4 font-heading text-navy-800 dark:text-blue-300 gradient-text">
              Popular Authors
            </h3>
            <PopularAuthors />
          </div>

          <NewsletterSignup />
        </aside>
      </div>
    </div>
  )
}
