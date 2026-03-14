"use client"

import { useState } from "react"
import { BellIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const initialNotifications = [
  {
    id: 1,
    user: "Chris Tompson",
    action: "requested review on",
    target: "PR #42: Feature implementation",
    timestamp: "15 minutes ago",
    unread: true,
  },
  
]

function Dot({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  )
}

export default function NotificationMenu() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    )
  }

  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground relative size-8 rounded-full shadow-none"
          aria-label="Open notifications"
        >
          <BellIcon size={16} aria-hidden="true" />
          {unreadCount > 0 && (
            <div
              aria-hidden="true"
              className="bg-primary absolute top-0.5 right-0.5 size-1 rounded-full"
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2 shadow-2xl border-none" align="end" style={{ backgroundColor: "#FFF8F0" }}>
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-bold" style={{ color: "#8B4513" }}>Notifications</div>
          {unreadCount > 0 && (
            <button
              className="text-xs font-semibold hover:underline transition-all"
              style={{ color: "#5C4033" }}
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
          )}
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="bg-[#D2B48C]/30 -mx-2 my-1 h-px"
        ></div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="hover:bg-[#D2B48C]/20 rounded-md px-3 py-3 text-sm transition-colors cursor-pointer group mb-1"
            >
              <div className="relative flex items-start pe-4">
                <div className="flex-1 space-y-1">
                  <button
                    className="text-left after:absolute after:inset-0 block"
                    style={{ color: "#2D1B10" }}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <span className="font-bold border-b border-transparent group-hover:border-[#8B4513]">
                      {notification.user}
                    </span>{" "}
                    <span className="opacity-80">{notification.action}</span>{" "}
                    <span className="font-semibold italic">
                      {notification.target}
                    </span>
                  </button>
                  <div className="text-xs flex items-center gap-1 opacity-60" style={{ color: "#5C4033" }}>
                    <span>{notification.timestamp}</span>
                  </div>
                </div>
                {notification.unread && (
                  <div className="absolute end-0 self-center">
                    <span className="sr-only">Unread</span>
                    <Dot className="text-[#8B4513]" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
