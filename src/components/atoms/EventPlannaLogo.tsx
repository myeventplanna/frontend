import Image from "next/image"
import Link from "next/link"

interface EventPlannaLogoProps {
	href?: string
	width?: number
	height?: number
	className?: string
}

export default function EventPlannaLogo({
	href = "/",
	width = 150,
	height = 40,
	className = ""
}: EventPlannaLogoProps) {
	const logo = (
		<Image
			src="/images/eventplanna-logo.png"
			alt="EventPlanna"
			width={width}
			height={height}
			className={className}
			priority
		/>
	)

	if (href) {
		return (
			<Link href={href} className="inline-block">
				{logo}
			</Link>
		)
	}

	return logo
}
