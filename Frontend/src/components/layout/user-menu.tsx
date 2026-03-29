import {
  BoltIcon,
  BookOpenIcon,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { clearUser } from "@/store/slices/userSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useLogoutMutation } from "@/api/UserApi"

export default function UserMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { userInfo, isAuthenticated } = useAppSelector((state) => state.user);

  if (!isAuthenticated || !userInfo) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      localStorage.removeItem('wasLoggedIn');
      dispatch(clearUser());
      toast.info("Logged out successfully");
      navigate('/Login');
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const initials = (userInfo?.username || "U")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src="" alt={userInfo.username} />
            <AvatarFallback className="bg-[#D2B48C]/20" style={{ color: "#8B4513" }}>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2 shadow-xl border-none" align="end" style={{ backgroundColor: "#FFF8F0" }}>
        <DropdownMenuLabel className="flex flex-col px-3 py-2">
          <span className="text-sm font-bold truncate" style={{ color: "#8B4513" }}>
            {userInfo.username}
          </span>
          <span className="text-xs font-normal truncate" style={{ color: "#5C4033" }}>
            {userInfo.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#D2B48C]/30" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#D2B48C]/20 transition-colors cursor-pointer" style={{ color: "#2D1B10" }}>
            <UserPenIcon size={16} className="opacity-70" />
            <span className="text-sm font-medium">My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#D2B48C]/20 transition-colors cursor-pointer" style={{ color: "#2D1B10" }}>
            <Layers2Icon size={16} className="opacity-70" />
            <span className="text-sm font-medium">My Orders</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#D2B48C]/20 transition-colors cursor-pointer" style={{ color: "#2D1B10" }}>
            <PinIcon size={16} className="opacity-70" />
            <span className="text-sm font-medium">Wishlist</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#D2B48C]/30" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#D2B48C]/20 transition-colors cursor-pointer" style={{ color: "#2D1B10" }}>
            <BoltIcon size={16} className="opacity-70" />
            <span className="text-sm font-medium">Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#D2B48C]/20 transition-colors cursor-pointer" style={{ color: "#2D1B10" }}>
            <BookOpenIcon size={16} className="opacity-70" />
            <span className="text-sm font-medium">Help Center</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#D2B48C]/30" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
        >
          <LogOutIcon size={16} />
          <span className="text-sm font-bold">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
