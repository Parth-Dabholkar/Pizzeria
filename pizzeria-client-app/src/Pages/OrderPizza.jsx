import PizzaCard from "../Components/PizzaCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function OrderPizza() {
    const [pizza, setPizza] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8383/pizzahub')
            .then((res) => setPizza(res.data))
            .catch(err => console.log("Error while fetching data!!: ", err))
    }, [])

  return (
      <>
          <div className="header text-center border-bottom mb-4 container">
            <h1 style={{fontSize: "4rem"}}>Menu</h1>
          </div>
          <div className="container">
        <div className="row">
          {pizza.map((piz, index) => (
            <div className="col-12 col-md-6 d-flex" key={index}>
              <PizzaCard pizzaData={piz} />
            </div>
          ))}
        </div>
      </div>
      </>
  )
}
