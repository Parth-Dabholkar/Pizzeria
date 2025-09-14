import './App.css'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import BuildPizza from './Pages/BuildPizza'
import CartBill from './Pages/CartBill'
import CustomizePizza from './Pages/CustomizePizza'
import Home from './Pages/Home'
import OrderPizza from './Pages/OrderPizza'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/orderpizza' element={<OrderPizza />} />
        <Route path='/yourcart' element={<CartBill />} />
        <Route path='/addtoppings' element={<CustomizePizza />} />
        <Route path='/buildpizza' element={<BuildPizza />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
