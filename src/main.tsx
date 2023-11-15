import React from 'react'
import ReactDOM from 'react-dom/client'
import ProductImageWrapper from './components/ProductImageWrapper.tsx'
import NavMenu from './components/NavMenu.tsx'
import ShoppingCart from './components/ShoppingCart.tsx'
import QuantitySelect from './components/QuantitySelect.tsx'

const images = [
	{ main: 'image-product-1.jpg', thumb: 'image-product-1-thumbnail.jpg' },
	{ main: 'image-product-2.jpg', thumb: 'image-product-2-thumbnail.jpg' },
	{ main: 'image-product-3.jpg', thumb: 'image-product-3-thumbnail.jpg' },
	{ main: 'image-product-4.jpg', thumb: 'image-product-4-thumbnail.jpg' }
]

ReactDOM.createRoot(document.getElementById('nav-menu')!).render(
	<React.StrictMode>
		<NavMenu />
	</React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('shopping-cart')!).render(
	<React.StrictMode>
		<ShoppingCart />
	</React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('product-image')!).render(
	<React.StrictMode>
		<ProductImageWrapper images={images} />
	</React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('quantity-select')!).render(
	<React.StrictMode>
		<QuantitySelect />
	</React.StrictMode>
)

document.getElementsByTagName('body')[0]?.classList.remove('invisible')
