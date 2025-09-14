import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../features/cart/cartSlice";

export default function BuildPizza() {
  const [ingredients, setIngredients] = useState([]);
  const [cost, setCost] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCrust, setSelectedCrust] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8383/ingredientshub")
      .then((res) => setIngredients(res.data))
      .catch((err) => console.log("Error: ", err));
  }, []);

  function checkBoxHandler(e, tops) {
    if (e.target.checked) {
      setSelectedItems((prev) => [...prev, tops]);
      setCost((prev) => prev + tops.price);
    } else {
      setSelectedItems((prev) => prev.filter((i) => i.id !== tops.id));
      setCost((prev) => prev - tops.price);
    }
  }

  function handleCrustChange(e, crust) {
    setSelectedCrust(crust);
  }

  function handleAddToCart() {
    if (!selectedCrust) {
      alert("Please select a crust first!");
      return;
    }

    const customPizza = {
      id: Date.now(),
      name: `Custom Pizza (${selectedCrust.tname})`,
      price: totalCost,
      crust: selectedCrust,
      toppings: selectedItems,
      quantity: 1,
      image: selectedCrust.image,
    };

    dispatch(addToCart(customPizza));
    alert("✅ Custom pizza added to cart!");
  }

  const thickCrust = {
    id: 201,
    tname: "Thick Crust",
    price: 150,
    image:
      "https://www.ourhappymess.com/wp-content/uploads/2023/05/Thick-Crust-Pizza-square-featured.jpg",
  };

  const thinCrust = {
    id: 202,
    tname: "Thin Crust",
    price: 200,
    image:
      "https://thumbs.dreamstime.com/b/thin-crust-pizza-ham-cheese-olive-thin-crust-pizza-ham-cheese-olive-freshly-baked-pizza-wood-fired-oven-120285761.jpg",
  };

  const totalCost = cost + (selectedCrust ? selectedCrust.price : 0);

  return (
    <>
      <div className="container">
        <div>
          <p className="text-center">
            Pizzeria now gives you the option for building pizza of your choice.
            Choose from the options mentioned below..
          </p>
        </div>

        {/* Crust Selection */}
        <div className="container row">
          <div>
            <p className="text-center">Choose Crust from Below Options</p>
          </div>
          <div className="container">
            <table className="table table-striped table-bordered">
              <tbody className="text-center">
                <tr>
                  <td>
                    <img
                      src="https://www.ourhappymess.com/wp-content/uploads/2023/05/Thick-Crust-Pizza-square-featured.jpg"
                      alt="thick-crust"
                      width="60px"
                    />
                  </td>
                  <td>
                    <span className="fw-bold">
                      Thick Crust ---- ₹{thickCrust.price}
                    </span>
                  </td>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="crust"
                        id="thick"
                        onChange={(e) => handleCrustChange(e, thickCrust)}
                        checked={selectedCrust?.id === thickCrust.id}
                      />
                      <label className="form-check-label" htmlFor="thick">
                        Select
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="https://thumbs.dreamstime.com/b/thin-crust-pizza-ham-cheese-olive-thin-crust-pizza-ham-cheese-olive-freshly-baked-pizza-wood-fired-oven-120285761.jpg"
                      alt="thin-crust"
                      width="70px"
                    />
                  </td>
                  <td>
                    <span className="fw-bold">
                      Thin Crust ---- ₹{thinCrust.price}
                    </span>
                  </td>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="crust"
                        id="thin"
                        onChange={(e) => handleCrustChange(e, thinCrust)}
                        checked={selectedCrust?.id === thinCrust.id}
                      />
                      <label className="form-check-label" htmlFor="thin">
                        Select
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Toppings Selection */}
        <div className="container row">
          <div>
            <p className="text-center">Choose Toppings from Below Options</p>
          </div>
          <div className="container">
            <table className="table table-striped table-bordered">
              <tbody>
                {ingredients.map((tops) => (
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
          </div>

          {/* Total Section */}
          <div className="container border rounded m-2 p-2 text-center">
            <h2>
              Total Cost: ₹<span>{totalCost}</span>
            </h2>
            <button
              className="btn btn-warning text-white"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
