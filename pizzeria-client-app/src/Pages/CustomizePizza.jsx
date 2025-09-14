import ToppingsTable from "../Components/ToppingsTable";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function CustomizePizza() {
  const [tops, setTops] = useState([]);
  const location = useLocation();
  const pizzaData = location.state?.pizza;

  useEffect(() => {
    axios
      .get("http://localhost:8383/ingredientshub")
      .then((res) => setTops(res.data))
      .catch((err) => console.log("Error in fetching data!! ", err));
  }, []);

  return (
    <>
      <div className="container">
        <div>
          <p className="text-center">
            Pizzeria now gives you the option for adding toppings of your
            choice. Choose from the options mentioned below..
          </p>
        </div>
        <div className="container">
          <ToppingsTable toppings={tops} pizza={pizzaData} />
        </div>
      </div>
    </>
  );
}
