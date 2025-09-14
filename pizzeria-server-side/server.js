//All the required libraries/modules/packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Declaration and Initialization of Express App and Mongoose URI
const app = express();
const uri = "mongodb://127.0.0.1/PIZZERIA";

//Using the middlewares required for the project
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Mongoose Connection, Schema and Model declaration
mongoose
  .connect(uri)
  .then(() => console.log("Connection with MongoDB Successfull!!"))
  .catch((err) => console.log("Error in Database Connection: ", err));

const Schema = mongoose.Schema;
const pizzaSchema = new Schema({
  id: String,
  type: String,
  price: Number,
  name: String,
  image: String,
  description: String,
  ingredients: [String],
  topping: [String],
});
const ingredientSchema = new Schema({
  id: Number,
  tname: String,
  price: Number,
  image: String,
});
const finalOrderSchema = new Schema({
  orderid: Number,
  orders: [
    {
      pname: String,
      price: Number,
      quantity: Number,
      cost: Number,
    },
  ],
  totalCost: Number,
});

const PizzaModel = mongoose.model("pizza", pizzaSchema, "pizza");
const IngredientModel = mongoose.model(
  "ingredient",
  ingredientSchema,
  "ingredient"
);
const OrdersModel = mongoose.model("order", finalOrderSchema);

//Express Routes - (GET, POST, DELETE, UPDATE)
//1. Get all the pizzas for display
app.get("/pizzahub", async (req, res) => {
  try {
    const pizzaData = await PizzaModel.find();
    res.json(pizzaData);
  } catch (err) {
    console.log("Error", err);
  }
});

//Get all the ingredients for display
app.get("/ingredientshub", async (req, res) => {
  try {
    const ingredientData = await IngredientModel.find();
    res.json(ingredientData);
  } catch (err) {
    console.log("Error: ", err);
  }
});

//Post the Order to Collection
app.post("/ordershub", async (req, res) => {
  try {
    // console.log(req.body)
    const { cartItems } = req.body;
    const orders = cartItems.map((item) => ({
      pname: item.name,
      price: item.price,
      quantity: item.quantity,
      cost: item.price * item.quantity,
    }));

    const totalCost = orders.reduce((sum, o) => sum + o.cost, 0);

    // Generate orderid (you can replace with something better, like Date.now())
    const orderid = Math.floor(Math.random() * 1000000);

    const newOrder = new OrdersModel({
      orderid,
      orders,
      totalCost,
    });

    await newOrder.save();

    res.json({ message: "Order placed successfully ✅", orderid });
  } catch (err) {
    console.log("Error: ", err);
  }
});

//Listening on PORT 8383
app.listen(8383, (err) => {
  if (err) {
    console.log("Error in PORT connection!!", err);
  } else {
    console.log("SERVER LISTENING TO PORT 8383");
  }
});
