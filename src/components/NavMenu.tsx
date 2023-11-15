import useMediaQuery from '@/hooks/useMediaQuery'
import { useState } from 'react'

export default function NavMenu() {
	const [expanded, setExpanded] = useState(false)
	const md = useMediaQuery('(min-width: 768px)')

	return (
		<>
			{md ? (
				<div className="flex h-full gap-8 mx-12">
					<a
						className="flex items-center hover:text-verydarkblue hover:border-y-4 border-t-[transparent] border-b-orange h-full"
						href="">
						Collections
					</a>
					<a
						className="flex items-center hover:text-verydarkblue hover:border-y-4 border-t-[transparent] border-b-orange h-full"
						href="">
						Men
					</a>
					<a
						className="flex items-center hover:text-verydarkblue hover:border-y-4 border-t-[transparent] border-b-orange h-full"
						href="">
						Women
					</a>
					<a
						className="flex items-center hover:text-verydarkblue hover:border-y-4 border-t-[transparent] border-b-orange h-full"
						href="">
						About
					</a>
					<a
						className="flex items-center hover:text-verydarkblue hover:border-y-4 border-t-[transparent] border-b-orange h-full"
						href="">
						Contact
					</a>
				</div>
			) : (
				<div className="w-full h-full">
					<button
						className={`relative z-30 w-full h-full bg-darkgrayishblue hover:bg-verydarkblue ${
							expanded
								? "[mask:url('../icon-close.svg')_no-repeat_center]"
								: "[mask:url('../icon-menu.svg')_no-repeat_center]"
						}`}
						onClick={() => setExpanded(prev => !prev)}></button>
					{expanded ? (
						<>
							<div
								className="fixed top-0 left-0 w-full h-screen z-10 bg-verydarkblue opacity-70 animate-[0.1s_linear_fadeIn]"
								onClick={() => setExpanded(false)}></div>
							<div className="absolute top-0 left-0 w-full max-w-[16rem] min-h-full z-20 flex flex-col p-5 pt-24 space-y-6 bg-white">
								<a className="hover:text-verydarkblue font-semibold" href="">
									Collections
								</a>
								<a className="hover:text-verydarkblue font-semibold" href="">
									Men
								</a>
								<a className="hover:text-verydarkblue font-semibold" href="">
									Women
								</a>
								<a className="hover:text-verydarkblue font-semibold" href="">
									About
								</a>
								<a className="hover:text-verydarkblue font-semibold" href="">
									Contact
								</a>
							</div>
						</>
					) : null}
				</div>
			)}
		</>
	)
}
