"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@/lib/utils"

interface Comment {
  id: number
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  date: string
  likes: number
}

interface CommentSectionProps {
  comments: Comment[]
}

export function CommentSection({ comments }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the comment to an API
    console.log("Submitting comment:", commentText)
    setCommentText("")
  }

  return (
    <section className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 animate-fade-in">
      <h2 className="text-2xl font-bold mb-8 font-heading text-navy-900 dark:text-white">
        Comments ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mb-12">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border-2 border-blue-500 animate-bounce-slow">
            <AvatarImage src="/images/atul-sharma.png" alt="Atul Sharma" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add to the discussion"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mb-3 resize-none border-blue-200 dark:border-navy-700 focus:ring-blue-500"
              rows={3}
            />
            <Button
              type="submit"
              disabled={!commentText.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-md hover:shadow-lg btn-hover"
            >
              Comment
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-8">
        {comments.map((comment, index) => (
          <div key={comment.id} className={`flex gap-4 animate-fade-in stagger-${(index % 5) + 1}`}>
            <Avatar className="h-10 w-10 border-2 border-blue-500">
              <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h4 className="font-medium mr-2">{comment.author.name}</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(comment.date)}</span>
              </div>
              <p className="text-gray-800 dark:text-gray-200 mb-3">{comment.content}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <button className="hover:text-blue-600 dark:hover:text-blue-400 mr-4 transition-colors duration-300">
                  Like ({comment.likes})
                </button>
                <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-8 bg-white dark:bg-navy-900 rounded-xl shadow-md animate-fade-in">
            <p className="text-gray-600 dark:text-gray-400">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </section>
  )
}
