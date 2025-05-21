import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-900 dark:bg-black text-white mt-16 border-t border-navy-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="font-bold text-xl mb-4 inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text font-heading"
            >
              TechInsight
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              A fully responsive and modern Blog UI focusing on technology, programming, and design with expert insights
              and tutorials.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-400 hover:text-blue-300 hover:bg-navy-800 transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-400 hover:text-blue-300 hover:bg-navy-800 transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-400 hover:text-blue-300 hover:bg-navy-800 transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-400 hover:text-blue-300 hover:bg-navy-800 transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-400 hover:text-blue-300 hover:bg-navy-800 transition-all duration-300"
              >
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-blue-400 font-heading">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/tag/technology"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Tags
                </Link>
              </li>
              <li>
                <Link
                  href="/author/atulsharma"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Authors
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-blue-400 font-heading">Popular Tags</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tag/technology"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/tag/design" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  Design
                </Link>
              </li>
              <li>
                <Link
                  href="/tag/programming"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Programming
                </Link>
              </li>
              <li>
                <Link
                  href="/tag/productivity"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Productivity
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {currentYear} TechInsight Blog. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
