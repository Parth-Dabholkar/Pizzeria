import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function PizzaCard({ pizzaData }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="card mb-3 p-4 m-1 w-100 w-md-49">
        <div
          className="row gy-3 align-items-center"
          style={{ textAlign: "justify" }}
        >
          <div className="col-md-3">
            <div className="row">
              <h2>{pizzaData.name}</h2>
            </div>
            <div className="row">
              <p>{pizzaData.type === "nonveg" ? "🟥" : "🟩"}</p>
            </div>
            <div className="row">
              <p className="fw-bold fs-5">₹{pizzaData.price}.00</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <p>{pizzaData.description}</p>
            </div>
            <div className="row">
              <p>
                <span className="fw-bold">Ingredients: </span>
                {pizzaData.ingredients.map((item, index) =>
                  index === pizzaData.ingredients.length - 1
                    ? item
                    : item + ", "
                )}
              </p>
            </div>
            <div className="row">
              <p>
                <span className="fw-bold">Toppings: </span>
                {pizzaData.topping.map((item, index) =>
                  index === pizzaData.topping.length - 1 ? item : item + ", "
                )}
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="row mb-2">
              <img src={pizzaData.image} alt="" />
            </div>
            <div className="row mb-2 ms-1">
              <button
                className="btn btn-warning text-white"
                onClick={() => {
                  dispatch(addToCart({ ...pizzaData, quantity: 1 }));
                  alert("Pizza Added To Your Cart!!");
                }}
              >
                Add To Cart
              </button>
            </div>
            <div className="row ms-1">
              <Link
                to={"/addtoppings"}
                state={{ pizza: pizzaData }}
                className="btn btn-warning text-white"
              >
                Customize Pizza
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
