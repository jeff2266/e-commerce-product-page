import { useEffect, useRef, useState } from 'react'

export default function ShoppingCart() {
	const [cartContents, setCartContents] = useState<CartItem[]>([])
	const [cartOpen, setCartOpen] = useState(false)
	const cartModal = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const clickHandler = (ev: MouseEvent) => {
			if (cartOpen && ev.target instanceof Node && !cartModal.current?.contains(ev.target)) {
				setCartOpen(false)
			}
		}
		document.addEventListener('click', clickHandler)

		return () => document.removeEventListener('click', clickHandler)
	}, [cartOpen])

	useEffect(() => {
		const myCart = window.localStorage.getItem('myCart')
		if (myCart) setCartContents(JSON.parse(myCart))
	}, [])

	const deleteItem = (id: number) => {
		let cartContents: CartItem[] = []
		const myCart = window.localStorage.getItem('myCart')
		if (myCart) cartContents = JSON.parse(myCart)

		cartContents = cartContents.filter(item => item.id !== id)
		window.localStorage.setItem('myCart', JSON.stringify(cartContents))
		location.reload()
	}

	return (
		<div className="md:relative w-full h-full">
			<button
				className="relative w-full h-full group"
				onClick={ev => {
					if (!cartOpen) {
						setCartOpen(true)
						ev.stopPropagation()
					}
				}}>
				<div className="w-full h-full [mask:url('../../icon-cart.svg')_no-repeat_center] bg-darkgrayishblue group-hover:bg-verydarkblue"></div>
				{cartContents.length > 0 ? (
					<div className="absolute top-0 right-0 w-6 bg-orange rounded-full text-[0.6rem] text-white text-center font-semibold select-none">
						{cartContents.reduce((accum, { quantity }) => accum + quantity, 0)}
					</div>
				) : null}
			</button>
			{cartOpen ? (
				<div
					className="animate-[0.1s_linear_fadeIn] flex absolute top-24 md:top-14 right-0 md:-right-16 w-full md:w-[350px] justify-center"
					ref={cartModal}>
					<div className="w-11/12 md:w-full bg-white rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)]">
						<h2 className="text-verydarkblue font-bold p-5 border-b border-b-lightgrayishblue">Cart</h2>
						<div className="space-y-5 p-5">
							{cartContents.length === 0 ? (
								<p className="font-semibold text-center">Your cart is empty.</p>
							) : (
								<>
									{cartContents.map(item => (
										<div key={item.id} className="flex gap-4 w-full">
											<img className="h-12 rounded-md" src={item.image} alt="item thumb" />
											<div className="grow">
												<p>{item.name}</p>
												<p>
													{`\$${item.price}.00 x ${item.quantity} `}
													<span className="text-verydarkblue font-semibold">{`\$${
														item.price * item.quantity
													}.00`}</span>
												</p>
											</div>
											<button
												className="w-8 [mask:url('../../icon-delete.svg')_no-repeat_center] bg-grayishblue hover:bg-verydarkblue"
												onClick={() => deleteItem(item.id)}></button>
										</div>
									))}
									<button className="text-white font-bold p-3 bg-orange hover:opacity-50 rounded-lg w-full">
										Checkout
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}
