"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Mail } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    console.log("Subscribing email:", email)
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-navy-800 p-6 rounded-xl shadow-lg text-white animate-float card-3d relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 animate-pulse-slow"></div>
      <div
        className="absolute -left-10 -bottom-10 w-40 h-40 bg-navy-400 rounded-full opacity-20 animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10">
        <div className="flex items-center mb-2">
          <Mail className="h-5 w-5 mr-2 animate-bounce-slow" />
          <h3 className="text-xl font-bold font-heading gradient-text">Stay updated</h3>
        </div>
        <p className="text-blue-100 mb-4 text-sm">Get the latest articles and insights delivered to your inbox.</p>

        {isSubmitted ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center animate-fade-in">
            <p className="text-white font-medium">Thanks for subscribing!</p>
            <p className="text-blue-100 text-sm mt-1">We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 placeholder:text-blue-100 text-white focus:border-white animate-shimmer"
            />
            <Button
              type="submit"
              className="w-full bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 btn-hover ripple animate-glow"
            >
              Subscribe <Send className="ml-2 h-4 w-4 animate-slide-in-right" />
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
