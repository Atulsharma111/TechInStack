import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlogCard } from "@/components/blog-card"
import { blogData } from "@/data/blog-data"
import { authors } from "@/data/authors"
import { Twitter, Facebook, Linkedin, Globe } from "lucide-react"
import type { Metadata } from "next"

type Props = {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Find author by username
  const author = authors.find((author) => author.username === params.username) || authors[0]

  return {
    title: `${author.name} | TechInsight Blog`,
    description: author.bio,
    openGraph: {
      title: `${author.name} | TechInsight Blog`,
      description: author.bio,
      type: "profile",
    },
    twitter: {
      card: "summary",
      title: `${author.name} | TechInsight Blog`,
      description: author.bio,
    },
  }
}

export default function AuthorPage({ params }: { params: { username: string } }) {
  // Find author by username
  const author = authors.find((author) => author.username === params.username) || authors[0]

  // Get all posts by this author
  const authorPosts = blogData.filter((post) => post.author.username === author.username)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 animate-fade-in">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-blue-500 shadow-xl animate-pulse-slow">
            <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-heading text-navy-900 dark:text-white gradient-text">
              {author.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{author.bio}</p>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-navy-800 px-3 py-1 rounded-full animate-scale">
                <span className="font-medium">{authorPosts.length}</span> Stories
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-navy-800 px-3 py-1 rounded-full animate-scale">
                <span className="font-medium">{author.followers}</span> Followers
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-md hover:shadow-lg btn-hover ripple">
                Follow
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-navy-800 transition-all duration-300 animate-scale"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-navy-800 transition-all duration-300 animate-scale"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-navy-800 transition-all duration-300 animate-scale"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              {author.website && (
                <Button
                  variant="outline"
                  size="icon"
                  className="border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-navy-800 transition-all duration-300 animate-scale"
                >
                  <Globe className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="stories" className="w-full">
          <TabsList className="mb-8 bg-gray-100 dark:bg-navy-900 p-1 rounded-lg">
            <TabsTrigger value="stories" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Stories
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories">
            <div className="grid grid-cols-1 gap-8">
              {authorPosts.map((post, index) => (
                <div key={post.id} className={`animate-fade-in stagger-${(index % 5) + 1}`}>
                  <BlogCard post={post} layout="horizontal" />
                </div>
              ))}

              {authorPosts.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-navy-900 rounded-xl shadow-md p-8 animate-fade-in">
                  <p className="text-gray-600 dark:text-gray-400">No stories published yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-navy-900 rounded-xl shadow-md p-8 animate-fade-in card-3d">
              <h2 className="font-heading gradient-text">About {author.name}</h2>
              <p>{author.longBio || author.bio}</p>

              {author.expertise && (
                <>
                  <h3 className="font-heading gradient-text">Expertise</h3>
                  <ul>
                    {author.expertise.map((item, index) => (
                      <li key={index} className={`animate-fade-in stagger-${(index % 5) + 1}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {author.education && (
                <>
                  <h3 className="font-heading gradient-text">Education</h3>
                  <p>{author.education}</p>
                </>
              )}

              {author.location && (
                <>
                  <h3 className="font-heading gradient-text">Location</h3>
                  <p>{author.location}</p>
                </>
              )}

              {author.joinDate && (
                <>
                  <h3 className="font-heading gradient-text">Joined</h3>
                  <p>
                    {new Date(author.joinDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
