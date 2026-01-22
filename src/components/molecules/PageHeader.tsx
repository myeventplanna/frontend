import React from "react"

function PageHeader() {
	// Format current date
	const currentDate = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		day: "2-digit",
		month: "short",
		year: "numeric"
	})
	return (
		<div className="w-full flex flex-col items-start justify-center bg-white shadow-md rounded-md px-6 py-4 border-gray-200 h-24 space-y-1">
			<h1 className="text-xl font-extrabold">Good Morning</h1>
			<p className="text-xs text-muted-foreground">{currentDate}</p>
		</div>
	)
}

export default PageHeader
