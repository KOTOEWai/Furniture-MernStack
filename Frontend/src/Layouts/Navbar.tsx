import { useId } from "react"
import { SearchIcon } from "lucide-react"

import Logo from "@/assets/furniture.svg"
import NotificationMenu from "@/components/notification-menu"
import UserMenu from "@/components/user-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NavigationMenuDemo } from "./NavMenu"
import {
  NavigationMenu,
  NavigationMenuItem,

  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link, NavLink } from "react-router-dom"


// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/Sofas", label: "Sofas" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/Login", label: "Login" },
  { href: "/Register", label: "Register" },
]

export default function Component() {
  const id = useId()

  return (
    <header className="sticky top-0 z-50 p-3 py-3 border-b backdrop-blur-lg border-neutral-700/80 " >
      <div className="flex items-center justify-between h-16 gap-4">
        {/* Left side */}
        <div className="flex items-center flex-1 gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-1 w-36 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full ">

                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          isActive ? "text-primary" : "text-muted-foreground "
                        }
                      >
                        {link.label}
                      </NavLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-primary hover:text-primary/90">
              <img src={Logo} alt="Logo" className="h-16 w-11" />
            </a>
          </div>
        </div>
        {/* Middle area */}
        <div className="grow">
          {/* Search form */}
          <div className="relative w-full max-w-xs mx-auto">
            <Input
              id={id}
              className="h-8 peer ps-8 pe-10"
              placeholder="Search..."
              type="search"
            />
            <div className="absolute inset-y-0 flex items-center justify-center pointer-events-none text-muted-foreground/80 start-0 ps-2 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
            <div className="absolute inset-y-0 flex items-center justify-center pointer-events-none text-muted-foreground end-0 pe-2">
              <kbd className="text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center justify-end flex-1 gap-2">
          {/* Notification */}
          <div className="flex items-center justify-center gap-3 max-md:hidden">
            <button><Link to={'/Login'} >Login</Link></button>/
            <button><Link to={'/Register'} >Register</Link></button>
          </div>

          <NotificationMenu />
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
      {/* Bottom navigation */}
      <div className="py-2 border-t max-md:hidden">
        {/* Navigation menu */}
        <NavigationMenuDemo />
      </div>
    </header>
  )
}
