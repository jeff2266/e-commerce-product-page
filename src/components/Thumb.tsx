export default function Thumb({
	children,
	selected,
	onClick
}: {
	children: React.ReactNode
	selected: boolean
	onClick: React.MouseEventHandler<HTMLButtonElement>
}) {
	return (
		<button className={`relative shrink`} onClick={onClick}>
			<div
				className={`relative z-10 rounded-lg overflow-hidden outline-2 outline-orange after:absolute after:top-0 after:left-0 hover:after:w-full hover:after:h-full after:bg-white after:bg-opacity-50 ${
					selected ? 'outline after:w-full after:h-full' : null
				}`}>
				{children}
			</div>
		</button>
	)
}
