import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../features/cart/cartSlice";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function CartBill() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function handlePay() {
    try {
      await axios.post('http://localhost:8383/ordershub', { cartItems })
      alert("Order Placed Successfully!!")
      dispatch(clearCart())
      navigate('/')
    }
    catch (err) {
      console.log("Error: ", err)
    }
  }

  return (
    <div className="container mt-4">
      <div className="header text-center border-bottom mb-4">
        <h1 style={{ fontSize: "4rem" }}>🛒 Your Cart</h1>
      </div>
      {cartItems.length === 0 ? (
        <div className="row border m-2 rounded align-items-center">
          <p className="fs-3 text-center">❌ No items in cart ❌</p>
        </div>
      ) : (
        <>
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center p-3 shadow-sm mb-2 rounded"
              >
                {/* Left side: Pizza info */}
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                    className="rounded me-3"
                  />
                  <div>
                    <h6 className="mb-1 fw-bold">{item.name}</h6>
                    <small className="text-muted">₹{item.price} each</small>
                  </div>
                </div>

                {/* Right side: Quantity and Total */}
                    <div className="d-flex align-items-center">
                        <button className="btn btn-danger me-2" onClick={() => dispatch(removeFromCart(index))}>
                            🗑️ Remove
                        </button>
                  {/* Quantity stepper */}
                  <div
                    className="input-group input-group-sm me-3"
                    style={{ width: "120px" }}
                  >
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            index,
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control text-center"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateQuantity({
                            index,
                            quantity: Number(e.target.value),
                          })
                        )
                      }
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            index,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Total Price */}
                  <span className="fw-bold text-success">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="mt-3">Total: ₹{total}</h3>
          <button
            className="btn btn-secondary mt-2 mb-2"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
          <button onClick={handlePay} className="btn btn-success ms-2">Pay and Checkout</button>
        </>
      )}
    </div>
  );
}
