import { useMemo, useRef, useState } from 'react'
import useMediaQuery from '@/hooks/useMediaQuery'
import Thumb from './Thumb'

type Params =
	| { loading: boolean; variant: 'LIGHTBOX'; images: { main: string; thumb: string }[]; toggle: () => void }
	| { loading: boolean; variant: 'LG'; images: { main: string; thumb: string }[]; toggle: () => void }
	| { loading: boolean; variant: 'SM'; images: { main: string }[]; toggle: undefined }

export default function ProductScroller({ loading, variant, images, toggle }: Params) {
	const [scrollIdx, setScrollIdx] = useState(0)
	const scrollRef = useRef<HTMLDivElement>(null)
	const md = useMediaQuery('(min-width: 768px)')

	function next() {
		setScrollIdx(prev => (prev + 1) % images.length)
	}

	function prev() {
		setScrollIdx(prev => (prev + images.length - 1) % images.length)
	}

	useMemo(() => {
		scrollRef.current?.scrollTo({ left: scrollIdx * scrollRef.current.clientWidth, top: 0 })
		if (variant === 'LIGHTBOX' && !md) console.log(md)
	}, [md, scrollIdx, loading])

	return variant === 'SM' ? (
		<div className="grid">
			<div
				className={`col-start-1 row-start-1 flex overflow-x-auto snap-mandatory snap-x no-scrollbar max-w-fit ${
					loading ? 'invisible' : 'scroll-smooth'
				}`}
				ref={scrollRef}>
				{images.map((image, i) => (
					<img key={`product-image-${i}`} className="snap-start" src={image.main} alt={`product image ${i}`} />
				))}
			</div>
			<div className="col-start-1 row-start-1 p-4 flex justify-between items-center">
				<button
					className="flex bg-white disabled:opacity-30 transition-opacity w-8 h-8 rounded-full justify-center items-center"
					onClick={prev}>
					<img className="w-1/4" src="icon-previous.svg" alt="next" />
				</button>
				<button
					className="flex bg-white disabled:opacity-30 transition-opacity w-8 h-8 rounded-full justify-center items-center"
					onClick={next}>
					<img className="w-1/4" src="icon-next.svg" alt="next" />
				</button>
			</div>
		</div>
	) : variant === 'LG' ? (
		<div className="grid grid-flow-row grid-rows-[1fr_0.25fr] gap-y-6">
			<button
				className={`col-start-1 row-start-1 rounded-xl overflow-hidden ${loading ? 'invisible' : null}`}
				onClick={toggle}>
				<img key={`product-image-${scrollIdx}`} src={images[scrollIdx].main} alt={`product image ${scrollIdx}`} />
			</button>
			<div className="flex gap-6 max-w-full">
				{images.map((image, i) => (
					<Thumb key={`thumb-${i}`} selected={scrollIdx === i} onClick={() => setScrollIdx(i)}>
						<img key={`product-thumb-image-${i}`} src={image.thumb} alt={`product thumb image ${i}`} />
					</Thumb>
				))}
			</div>
		</div>
	) : variant === 'LIGHTBOX' ? (
		<div
			className="fixed grid place-items-center top-0 left-0 w-full h-screen z-20 bg-verydarkblue bg-opacity-70 animate-[0.1s_linear_fadeIn]"
			onClick={toggle}>
			<div
				className="grid grid-flow-row grid-rows-[0.0625fr_1fr_0.25fr] gap-y-10 mx-auto w-1/2 max-w-screen-sm p-4"
				onClick={e => e.stopPropagation()}>
				<button className="place-self-end group" onClick={toggle}>
					<div className="w-10 h-10 [mask:url('../../icon-close.svg')_no-repeat_center] bg-white group-hover:bg-orange"></div>
				</button>
				<div
					className={`relative col-start-1 row-start-2 min-w-fit min-h-fit rounded-xl overflow-hidden ${
						loading ? 'invisible' : null
					}`}>
					<img
						key={`product-image-${scrollIdx}`}
						src={images[scrollIdx].main}
						alt={`product image ${scrollIdx}`}
					/>
				</div>
				<div className="z-10 col-start-1 row-start-2 -m-6 flex justify-between items-center">
					<button
						className="flex bg-white disabled:opacity-30 transition-opacity w-12 h-12 rounded-full justify-center items-center group"
						onClick={prev}>
						<div className="w-1/2 aspect-square [mask:url('../../icon-previous.svg')_no-repeat_center] bg-verydarkblue group-hover:bg-orange"></div>
					</button>
					<button
						className="flex bg-white disabled:opacity-30 transition-opacity w-12 h-12 rounded-full justify-center items-center group"
						onClick={next}>
						<div className="w-1/2 aspect-square [mask:url('../../icon-next.svg')_no-repeat_center] bg-verydarkblue group-hover:bg-orange"></div>
					</button>
				</div>
				<div className="mx-auto flex items-start gap-10 max-w-[80%]">
					{images.map((image, i) => (
						<Thumb key={`thumb-${i}`} selected={scrollIdx === i} onClick={() => setScrollIdx(i)}>
							<img key={`product-thumb-image-${i}`} src={image.thumb} alt={`product thumb image ${i}`} />
						</Thumb>
					))}
				</div>
			</div>
		</div>
	) : (
		<></>
	)
}
