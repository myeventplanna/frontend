"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { Moon } from "lucide-react"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/ui"

export function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	// Only render after mount to avoid hydration mismatch
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<Select disabled>
				<SelectTrigger className="w-24" aria-label="Theme selector">
					<SelectValue placeholder="Theme" />
				</SelectTrigger>
			</Select>
		)
	}

	return (
		<div className="flex items-center gap-2">
			<Moon className="w-4 h-4 text-muted-foreground" />
			<Select value={theme} onValueChange={setTheme}>
				<SelectTrigger className="w-24" aria-label="Theme selector">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="light" aria-label="Light theme">
						Light
					</SelectItem>
					<SelectItem value="dark" aria-label="Dark theme">
						Dark
					</SelectItem>
					<SelectItem value="system" aria-label="System theme">
						System
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}
