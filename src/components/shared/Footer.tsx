import Image from "next/image"
import Link from "next/link"

export default function Footer() {
	return (
		<footer>
			<div className="container">
				<div className="flex justify-center items-center gap-2 py-10">
					<span>Emmanuel Anebi</span>

					<Image
						src="/nice-avatar.png"
						alt="Ömer Gülçiçek Avatar"
						width={32}
						height={32}
					/>

					<Link
						href="https://omergulcicek.com?utm_source=nextjs-boilerplate"
						target="_blank"
						rel="noopener noreferrer"
						className="flex gap-2 items-center"
					>
						<span className="font-bold hover:underline">Manny Anebi</span>
					</Link>
				</div>
			</div>
		</footer>
	)
}
