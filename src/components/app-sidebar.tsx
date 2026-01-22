"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { BarChart3, Link2 as LinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import {
	Sidebar,
	SidebarContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	useSidebar
} from "@/components/ui/sidebar"

const navItems = [
	{
		title: "Leads",
		url: "/dashboard/leads",
		icon: BarChart3
	},
	{
		title: "App Link",
		url: "/dashboard/app-link",
		icon: LinkIcon
	}
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname()
	const { state } = useSidebar()
	const isCollapsed = state === "collapsed"

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarContent className="pt-24 px-3">
				<SidebarMenu className="space-y-4">
					{navItems.map((item) => {
						const isActive = pathname === item.url
						return (
							<SidebarMenuItem key={item.title}>
								{isCollapsed ? (
									// Collapsed state: vertical card with icon on top and text below
									<Link
										href={item.url}
										className={cn(
											"flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-2 h-24 transition-all hover:shadow-md",
											isActive
												? "border-[#38FFFD] bg-[#E7FDFB] shadow-sm"
												: "border-gray-200 bg-white hover:border-[#38FFFD]/50"
										)}
									>
										<item.icon
											className={cn(
												"size-6",
												isActive ? "text-[#0fbab7]" : "text-gray-600"
											)}
										/>
										<span
											className={cn(
												"text-sm font-semibold",
												isActive ? "text-[#0fbab7]" : "text-gray-700"
											)}
										>
											{item.title}
										</span>
									</Link>
								) : (
									// Expanded state: horizontal layout with gradient and better styling
									<SidebarMenuButton
										asChild
										tooltip={item.title}
										className={cn(
											"relative h-auto py-4 px-4 transition-all",
											isActive &&
												"bg-gradient-to-r from-[#E7FDFB] to-[#E7FDFB]/50 hover:bg-gradient-to-r hover:from-[#E7FDFB] hover:to-[#E7FDFB]/50 border-l-4 border-[#38FFFD] shadow-sm"
										)}
									>
										<Link
											href={item.url}
											className="flex items-center gap-4 w-full"
										>
											<div
												className={cn(
													"flex items-center justify-center rounded-lg p-2",
													isActive ? "bg-[#0fbab7]/10" : "bg-gray-100"
												)}
											>
												<item.icon
													className={cn(
														"size-6",
														isActive ? "text-[#0fbab7]" : "text-gray-600"
													)}
												/>
											</div>
											<span
												className={cn(
													"text-base font-semibold",
													isActive ? "text-[#0fbab7]" : "text-gray-700"
												)}
											>
												{item.title}
											</span>
										</Link>
									</SidebarMenuButton>
								)}
							</SidebarMenuItem>
						)
					})}
				</SidebarMenu>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
