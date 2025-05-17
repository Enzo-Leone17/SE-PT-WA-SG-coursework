/*You are building the backend logic for an online store that sells physical products. 
The goal is to create a basic object-oriented system that can manage customers, products, orders, and payments. 
The system should reflect real-world behaviors, such as stock reduction, order tracking, and payment processing.

Core Features & Entities:

- Customer
Represents a person who makes purchases from the store.

Can place one or more orders.

Has an order history for reference and future features like loyalty programs.

- Product
Represents an item available for sale.

Has details like name, price, and available stock.

Must reduce stock when purchased to prevent overselling.

- Order
Represents a transaction initiated by a customer.

Contains a list of product items and their quantities.

Tracks status (e.g., pending, paid, shipped).

Can calculate the total value of all products in the order.

- Payment
Represents the payment process for an order.

Should verify if product stock is sufficient before completing.

Updates the order status upon success.

Logs a payment as successful or failed.

- Typical Flow in the System:
A Customer browses the store and selects several Products.
An Order is created that links the selected products and quantities to that customer.
A Payment is processed:
Validates stock availability for each product.

Deducts the ordered quantity from each product's stock.

Marks the order as "paid" if successful.

Stores the order in the customer's order history.

The system can now prepare the order for fulfillment (e.g., future feature: shipOrder()).

- Business Goals Simulated:
Prevent selling products that are out of stock.

Track customer purchasing behavior.

Allow auditing of order and payment activity.

Prepare foundation for extending features: returns, refunds, order history, discounts, etc.*/

//import classes
import { Customer } from "./Models/Customer.ts";
import { Order } from "./Services/Order.ts";
import { Payment } from "./Services/Payment.ts";
import { Product } from "./Models/Product.ts";

//flow

//step 1: initiate products in store
let chocoBar =new Product("1234", "Chocolate bar", 5, 100);  //id, name, price, stock
let biscuits = new Product("1235", "Biscuit", 2, 5);
let lemonade = new Product("1236", "Lemonade", 3, 30);
const storeProductLists = [chocoBar, biscuits, lemonade]; //array of products 
console.log("Items in store: ", storeProductLists);

//step 2: initiate customer
const customerA = new Customer("123789", "John", "John@mail.com");

//step 3: customer picks items and create an order <id, customer, items>
let orderA = new Order("555", customerA, new Map([[chocoBar, 2], [biscuits, 1], [lemonade, 3]]));
let orderB = new Order("556", customerA, new Map([[chocoBar, 2], [biscuits, 5], [lemonade, 3]]));
customerA.placeOrder(orderA); 
customerA.placeOrder(orderB);


//step 4: show/display order status >> total price will be shown if there is no issues
console.log("Your order results: ",customerA.checkOrder());

//step 5: sucessful order made, customer proceed to pay
let paymentA = new Payment(orderA, 22, "cash");
let paymentB = new Payment(orderB, 22, "cash");
console.log(paymentA.process());
console.log(paymentB.process());
