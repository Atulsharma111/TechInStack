import Link from "next/link"
import { blogData } from "@/data/blog-data"

export function TagList() {
  // Get all unique tags and count their occurrences
  const tagCounts = blogData
    .flatMap((post) => post.tags)
    .reduce(
      (acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

  // Convert to array and sort by count (descending)
  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10) // Take top 10 tags

  return (
    <div className="flex flex-wrap gap-2">
      {sortedTags.map(([tag, count], index) => (
        <Link
          key={tag}
          href={`/tag/${tag}`}
          className={`text-sm bg-navy-700 hover:bg-navy-600 px-3 py-1 rounded-full transition-all duration-300 transform hover:scale-105 animate-fade-in stagger-${(index % 5) + 1} hover:animate-pulse-slow`}
        >
          {tag} <span className="text-gray-400">({count})</span>
        </Link>
      ))}
    </div>
  )
}
