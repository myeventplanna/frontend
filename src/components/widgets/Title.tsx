"use client"

import { Balancer } from "react-wrap-balancer"

type TitleProps = {
	text?: string
}
export function Title({ text }: TitleProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-6">
			<Balancer
				as="h1"
				className="text-2xl lg:text-5xl font-bold text-center text-black dark:text-white"
			>
				{text}
			</Balancer>
		</div>
	)
}
