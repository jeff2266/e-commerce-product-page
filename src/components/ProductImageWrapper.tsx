import { useEffect, useState } from 'react'
import useMediaQuery from '@/hooks/useMediaQuery'
import ProductScroller from './ProductScroller'

type Params = { main: string; thumb: string }[]

export default function ProductImageWrapper({ images }: { images: Params }) {
	const [lightbox, setLightbox] = useState(false)
	const [loading, setLoading] = useState(images.length * 2)
	const md = useMediaQuery('(min-width: 768px)')

	useEffect(() => {
		images.forEach(image => {
			const mainImgLoad = new Image()
			mainImgLoad.src = image.main
			mainImgLoad.onload = () => setLoading(prev => Math.max(0, prev - 1))
			const thumbImgLoad = new Image()
			thumbImgLoad.src = image.thumb
			thumbImgLoad.onload = () => setLoading(prev => Math.max(0, prev - 1))
		})
	}, [])

	useEffect(() => {
		if (!md) setLightbox(false)
	}, [md])

	const toggle = () => {
		setLightbox(prev => !prev)
	}

	return (
		<>
			{md && lightbox ? (
				<ProductScroller variant="LIGHTBOX" loading={loading > 0} images={images} toggle={toggle} />
			) : null}
			<div className={md ? '' : 'hidden'}>
				<ProductScroller variant="LG" loading={loading > 0} images={images} toggle={toggle} />
			</div>
			<div className={md ? 'hidden' : ''}>
				<ProductScroller variant="SM" loading={loading > 0} images={images} toggle={undefined} />
			</div>
		</>
	) 
}
