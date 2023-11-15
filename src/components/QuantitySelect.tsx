import { useState } from 'react'

export default function QuantitySelect() {
	const [amtToAdd, setAmtToAdd] = useState(0)

	const addToCart = () => {
		let cartContents: CartItem[] = []
		const myCart = window.localStorage.getItem('myCart')
		if (myCart) cartContents = JSON.parse(myCart)

		let item = cartContents.find(o => o.id === 1)
		if (item) item.quantity += amtToAdd
		else
			item = {
				id: 1,
				name: 'Fall Limited Edition Sneakers',
				image: 'image-product-1-thumbnail.jpg',
				price: 125,
				quantity: amtToAdd
			}

		window.localStorage.setItem('myCart', JSON.stringify([item]))
		location.reload()
	}

	return (
		<div className="space-y-6 md:space-y-0 select-none md:grid grid-flow-col grid-cols-[1fr_2fr] gap-6">
			<div className="flex bg-lightgrayishblue rounded-lg px-4 py-3 justify-between items-center">
				<button
					className="w-4 h-4 hover:opacity-50 disabled:opacity-50"
					onClick={() => setAmtToAdd(prev => Math.max(0, prev - 1))}
					disabled={amtToAdd === 0}>
					<img src="icon-minus.svg" alt="minus" />
				</button>
				<div className="text-verydarkblue font-bold">{amtToAdd}</div>
				<button className="w-4 h-4 hover:opacity-50" onClick={() => setAmtToAdd(prev => prev + 1)}>
					<img src="icon-plus.svg" alt="plus" />
				</button>
			</div>
			<button
				className="flex text-white items-center justify-center gap-4 p-3 bg-orange hover:opacity-50 disabled:opacity-50 rounded-lg w-full"
				onClick={addToCart}
				disabled={amtToAdd === 0}>
				<div className="w-6 h-6 [mask:url('../icon-cart.svg')_no-repeat_center] bg-white"></div>
				<p className="font-bold">Add to cart</p>
			</button>
		</div>
	)
}
