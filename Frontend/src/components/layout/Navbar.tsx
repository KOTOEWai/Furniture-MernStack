import { useId } from "react"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import Logo from "@/assets/furniture.svg"
import NotificationMenu from "./notification-menu"
import UserMenu from "./user-menu"
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
import { useAppSelector } from "@/hooks/redux"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Component() {
  const id = useId()
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 border-b backdrop-blur-md" style={{ backgroundColor: "#FFF8F0/80", borderColor: "#D2B48C" }}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Left side: Brand */}
          <div className="flex items-center flex-shrink-0 gap-4">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-10 md:hidden p-0 bg-transparent hover:bg-[#D2B48C]/20"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8B4513"
                    strokeWidth="2.5"
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
              <PopoverContent align="start" className="w-64 p-2 border-none shadow-2xl md:hidden" style={{ backgroundColor: "#FFF8F0" }}>
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavLink
                          to={link.href}
                          className={({ isActive }) =>
                            cn(
                              "block w-full px-4 py-3 rounded-md text-sm font-bold transition-all",
                              isActive
                                ? "bg-[#8B4513] text-white shadow-lg"
                                : "text-[#5C4033] hover:bg-[#D2B48C]/20"
                            )
                          }
                        >
                          {link.label}
                        </NavLink>
                      </NavigationMenuItem>
                    ))}
                    {!isAuthenticated && (
                      <>
                        <NavigationMenuItem className="w-full">
                          <NavLink to="/Login" className="block w-full px-4 py-3 rounded-md text-sm font-bold text-[#5C4033] hover:bg-[#D2B48C]/20">Login</NavLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="w-full">
                          <NavLink to="/Register" className="block w-full px-4 py-3 rounded-md text-sm font-bold text-[#5C4033] hover:bg-[#D2B48C]/20">Register</NavLink>
                        </NavigationMenuItem>
                      </>
                    )}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>

            <a href="/" className="flex items-center gap-2 group translate-y-[-2px]">
              <img src={Logo} alt="Logo" className="w-auto transition-transform h-14 drop-shadow-sm group-hover:scale-105" />
              <span className="hidden text-2xl font-black tracking-tighter sm:block" style={{ color: "#8B4513" }}>FUNITURE</span>
            </a>
          </div>

          {/* Middle: Search */}
          <div className="flex-1 hidden max-w-lg md:block">
            <div className="relative group">
              <Input
                id={id}
                className="w-full pl-12 pr-12 transition-all border-2 rounded-full shadow-sm h-11 focus:shadow-md"
                style={{ backgroundColor: "#FFF", borderColor: "#D2B48C", color: "#2D1B10" }}
                placeholder="Search premium furniture..."
                type="search"
              />
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#8B4513]" style={{ color: "#D2B48C" }}>
                <SearchIcon size={20} />
              </div>
              <div className="absolute inset-y-0 flex items-center right-4">
                <kbd className="hidden lg:inline-flex h-6 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-50" style={{ backgroundColor: "#FFF8F0", borderColor: "#D2B48C", color: "#5C4033" }}>
                  <span>⌘</span>K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end flex-shrink-0 gap-3">
            {!isAuthenticated && (
              <div className="hidden lg:flex items-center bg-[#D2B48C]/10 rounded-full p-1 border" style={{ borderColor: "#D2B48C/30" }}>
                <Link to='/Login' className="px-5 py-1.5 text-sm font-bold transition-all rounded-full hover:bg-[#D2B48C]/20" style={{ color: "#8B4513" }}>Login</Link>
                <Link to='/Register' className="px-5 py-1.5 text-sm font-bold transition-all rounded-full text-white shadow-sm hover:opacity-90 active:scale-95" style={{ backgroundColor: "#8B4513" }}>Join</Link>
              </div>
            )}

            <div className="flex items-center gap-1">
              <NotificationMenu />
              {isAuthenticated && <UserMenu />}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom area: Menu */}
      <div className="hidden border-t md:block" style={{ borderColor: "rgba(210, 180, 140, 0.3)", backgroundColor: "rgba(255, 248, 240, 0.5)" }}>
        <div className="px-4 py-1 mx-auto max-w-7xl">
          <NavigationMenuDemo />
        </div>
      </div>
    </header>
  )
}
