"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, Search, Bell, BookmarkIcon, Home, Hash, User, LogIn } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  // Check if user is logged in (mock)
  const isLoggedIn = true

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-navy-950/90 backdrop-blur-md shadow-md" : "bg-white dark:bg-navy-950"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-navy-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text font-heading">
              TechInsight
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className={`text-sm font-medium transition-all duration-300 ${
                  pathname === "/"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                Home
              </Link>
              <Link
                href="/tag/technology"
                className={`text-sm font-medium transition-all duration-300 ${
                  pathname.startsWith("/tag")
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                Tags
              </Link>
              <Link
                href="/search"
                className={`text-sm font-medium transition-all duration-300 ${
                  pathname === "/search"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                Search
              </Link>
            </nav>
          )}

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {!isMobile && (
              <Link href="/search">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-blue-100 dark:hover:bg-navy-800 transition-colors duration-300"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <ModeToggle />

            {isLoggedIn ? (
              <>
                {!isMobile && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-blue-100 dark:hover:bg-navy-800 transition-colors duration-300 relative"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-blue-100 dark:hover:bg-navy-800 transition-colors duration-300"
                    >
                      <BookmarkIcon className="h-5 w-5" />
                    </Button>
                  </>
                )}

                <Link href="/author/atulsharma" className="relative group">
                  <Avatar className="border-2 border-transparent group-hover:border-blue-500 transition-all duration-300 animate-pulse-slow">
                    <AvatarImage src="/images/atul-sharma.png" alt="Atul Sharma" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-navy-950 animate-pulse"></span>
                </Link>
              </>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-md hover:shadow-lg">
                Sign In
              </Button>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="transition-transform duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-navy-950 border-t border-gray-200 dark:border-navy-800 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="mb-4">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full border-blue-200 dark:border-navy-700 focus:ring-blue-500"
                prefix={<Search className="h-4 w-4 text-gray-400" />}
              />
            </div>

            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="flex items-center text-base font-medium py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Home className="h-5 w-5 mr-3 text-blue-500" />
                Home
              </Link>
              <Link
                href="/tag/technology"
                className="flex items-center text-base font-medium py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Hash className="h-5 w-5 mr-3 text-blue-500" />
                Tags
              </Link>
              <Link
                href="/search"
                className="flex items-center text-base font-medium py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Search className="h-5 w-5 mr-3 text-blue-500" />
                Search
              </Link>

              {isLoggedIn ? (
                <Link
                  href="/author/atulsharma"
                  className="flex items-center text-base font-medium py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  <User className="h-5 w-5 mr-3 text-blue-500" />
                  Profile
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center text-base font-medium py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  <LogIn className="h-5 w-5 mr-3 text-blue-500" />
                  Sign In
                </Link>
              )}

              <Link
                href="/bookmarks"
                className="flex items-center text-base font-medium py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <BookmarkIcon className="h-5 w-5 mr-3 text-blue-500" />
                Bookmarks
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
