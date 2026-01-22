import React from "react"
import { useSession } from "next-auth/react"

import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { Bell, LogOut, MoreVertical } from "lucide-react"

import { logout } from "@/lib/auth-actions/logout"

import LivwellLogo from "./atoms/LivwellLogo"
import { Button } from "./ui"
import { Avatar, AvatarFallback } from "./ui/avatar"
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { ThemeToggleIcon } from "./widgets/ThemeToggleIcon"

function NavHeader() {
	const { data: session } = useSession()
	const user = session?.user
	return (
		<header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background pl-6 pr-20">
			<div className="flex items-center">
				<LivwellLogo color="black" className="h-8" />
			</div>
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-3">
					<Avatar className="h-8 w-8">
						<AvatarFallback>{user?.fullName.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<span className="text-sm font-medium">{user?.fullName}</span>
						<span className="text-xs text-muted-foreground">{user?.email}</span>
					</div>
				</div>
				<Button variant="ghost" size="icon">
					<Bell className="h-5 w-5" />
				</Button>
				<ThemeToggleIcon />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<MoreVertical className="h-5 w-5" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuItem onClick={logout}>
							<LogOut className="mr-2 h-4 w-4" />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}

export default NavHeader
