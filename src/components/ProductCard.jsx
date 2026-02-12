import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
	const { addToCart, cartItems } = useCart();
	const navigate = useNavigate();
	
	const productInCart = cartItems.find((item) => item.id === product.id);

	const productQuantityLabel = productInCart ? `(${productInCart.quantity})` : "";

	const handleAddToCart = async (product) => {
		await addToCart(product.id);
		navigate("/checkout");
	};

	return (
		<>
			<div className="product-card">
				<img src={product.thumbnail} alt={product.title} className="product-card-image" />
				<div className="product-card-content">
					<h3 className="product-card-name">{product.title}</h3>
					<p className="product-card-price">${product.price}</p>
					<div className="product-card-actions">
						<Link to={`/products/${product.id}`} className="btn btn-secondary">View Details</Link>
						<button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add to Cart {productQuantityLabel}</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductCard
