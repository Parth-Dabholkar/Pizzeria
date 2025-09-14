import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function ToppingsTable({ toppings, pizza }) {
  const [cost, setCost] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function checkBoxHandler(e, tops) {
    if (e.target.checked) {
      setSelectedItems((prev) => [...prev, tops]);
      setCost((prev) => prev + tops.price);
    } else {
      setSelectedItems((prev) => prev.filter((i) => i.id !== tops.id));
      setCost((prev) => prev - tops.price);
    }
  }

  function handleAddToCart() {
    const updatedPizzaData = {
      ...pizza,
      topping: [...(pizza.topping || []), ...selectedItems], // add new toppings
      price: pizza.price + cost, // update price
      quantity: 1,
    };
    dispatch(addToCart(updatedPizzaData));
    alert("Customized Pizza Added To Your Cart!!");
    navigate("/yourcart");
  }

  return (
    <>
      <div className="container w-75">
        <table className="table table-striped table-bordered">
          <tbody>
            {toppings.map((tops) => (
              <tr key={tops._id} className="text-center">
                <td>
                  <img
                    src={tops.image}
                    alt={tops.tname}
                    width="70px"
                    height="50px"
                  />
                </td>
                <td>
                  <span className="fw-bold">{tops.tname}</span> ----{" "}
                  <span className="fw-bold">₹{tops.price}</span>
                </td>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={JSON.stringify(tops)}
                      id={`checkDefault${tops.id}`}
                      onChange={(e) => checkBoxHandler(e, tops)}
                      checked={selectedItems.some((i) => i.id === tops.id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`checkDefault${tops.id}`}
                    >
                      Add
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="container border rounded m-2 p-2 text-center">
          <h2>
            Total Extra Cost: ₹<span>{cost}</span>
          </h2>
          <button
            onClick={handleAddToCart}
            className="btn btn-warning text-white"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
