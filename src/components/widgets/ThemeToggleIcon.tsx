"use client"

import { useTheme } from "next-themes"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/ui"

export function ThemeToggleIcon() {
	const { theme, setTheme } = useTheme()

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark")
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
		>
			{theme === "dark" ? (
				<Sun className="h-5 w-5" />
			) : (
				<Moon className="h-5 w-5" />
			)}
		</Button>
	)
}
