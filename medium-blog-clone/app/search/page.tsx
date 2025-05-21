"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blog-card"
import { blogData } from "@/data/blog-data"
import { Search, X } from "lucide-react"
import Head from "next/head"

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState(blogData)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get all unique tags
  const allTags = Array.from(new Set(blogData.flatMap((post) => post.tags))).sort()

  // Filter posts based on search term and selected tags
  useEffect(() => {
    const results = blogData.filter((post) => {
      const matchesSearchTerm =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag))

      return matchesSearchTerm && matchesTags
    })

    setSearchResults(results)
  }, [searchTerm, selectedTags])

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    setSelectedTags([])
  }

  return (
    <>
      <Head>
        <title>Search | TechInsight Blog</title>
        <meta name="description" content="Search for articles on TechInsight Blog" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 font-heading text-navy-900 dark:text-white">Search</h1>

            <div className="relative">
              <Input
                type="text"
                placeholder="Search by title, content, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-6 text-lg border-blue-200 dark:border-navy-700 focus:ring-blue-500 shadow-md"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
              {(searchTerm || selectedTags.length > 0) && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-blue-100 dark:hover:bg-navy-800"
                  onClick={clearSearch}
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>

          <div className="mb-8 animate-fade-in stagger-2">
            <h2 className="text-lg font-medium mb-3 font-heading text-navy-900 dark:text-white">Filter by tags</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag, index) => (
                <Button
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full ${
                    selectedTags.includes(tag)
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-blue-500 text-blue-600 dark:border-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-navy-800"
                  } transition-all duration-300 transform hover:scale-105 animate-fade-in stagger-${(index % 5) + 1}`}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-8 animate-fade-in stagger-3">
            <h2 className="text-xl font-bold mb-4 font-heading text-navy-900 dark:text-white">
              {searchResults.length} {searchResults.length === 1 ? "result" : "results"} found
            </h2>

            <div className="grid grid-cols-1 gap-8">
              {searchResults.map((post, index) => (
                <div key={post.id} className={`animate-fade-in stagger-${(index % 5) + 1}`}>
                  <BlogCard post={post} layout="horizontal" />
                </div>
              ))}

              {searchResults.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-navy-900 rounded-xl shadow-md animate-fade-in">
                  <p className="text-gray-600 dark:text-gray-400">
                    No results found. Try a different search term or filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
