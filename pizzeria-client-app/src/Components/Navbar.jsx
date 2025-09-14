import pizzaImg from "../assets/PizzaLogoUpscaled.jpg";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-black mb-4">
        <div className="container-fluid">
          <Link to={'/'} className="navbar-brand text-white fs-3">
            Pizzeria
            <img
              src={pizzaImg}
              alt="PizzaLogo"
              width="65"
              height="50"
              className="ms-3"
            />
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to={'/orderpizza'}>
                  Order Pizza
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/buildpizza'} className="nav-link text-white fs-5" href="#">
                  Build Your Pizza
                </Link>
              </li>
            </ul>
          </div>
          <Link to={'/yourcart'} className="btn btn-warning text-white fs-5">
            &#128722; Shopping Cart
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </>
  );
}
