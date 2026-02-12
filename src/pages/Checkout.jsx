import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const overAllTotal = getCartTotal();

  const placeOrder = () => {
    clearCart();
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div className="checkout-item" key={item.id} >
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="checkout-item-image"
                    />
                    <div className="checkout-item-details">
                      <h3 className="checkout-item-name">{item.product.title}</h3>
                      <p className="checkout-item-price">
                        ${item.product.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="checkout-item-controls">
                      <div className="quantity-controls">
                        <div className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</div>
                        <div className="quantity-value">{item.quantity}</div>
                        <div className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</div>
                      </div>

                      <p className="checkout-item-total">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button className="btn btn-secondary btn-small" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  </div>
                ))}

                <h2>Total: ${total.toFixed(2)}</h2>
              </>
            )}
          </div>

          <div className="checkout-summary">
            <div className="checkout-section-title">Total</div>
            <div className="checkout-totle">
              <p className="checkout-total-label">Subtotal:</p>
              <p className="checkout-total-value">${overAllTotal.toFixed(2)}</p>
            </div>
            <div className="checkout-totle">
              <p className="checkout-total-label">Total:</p>
              <p className="checkout-total-value checkout-total-final">${overAllTotal.toFixed(2)}</p>
            </div>
            <button className="btn btn-primary btn-large btn-block" onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
