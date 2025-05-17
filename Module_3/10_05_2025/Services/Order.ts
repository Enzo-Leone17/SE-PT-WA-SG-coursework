/*3. Order
Properties: id, customer, items (array of { product, quantity }), status
Methods:
calculateTotal() – total price for the order
markAsPaid()*/

import { Product } from "../Models/Product.ts";
import { Customer } from "../Models/Customer.ts";
export class Order {
  id: string;
  customer: Customer;
  items: Map<Product, number>;
  status: string = "initialize";
  totalPrice: number = 0;
  constructor(id: string, customer: Customer, items: Map<Product, number>) {
    this.id = id;
    this.customer = customer;
    this.items = items;
  }

  /**
   * Calculates the total price for the order
   * If the order is not able to be fulfilled, it sets the status to "Error" and returns a string of the unavailable items
   * Otherwise, it sets the status to "Pending Payment" and returns the total price
   * @returns {number|string} either the total price of the order, or an error log of unavailable items
   */
  calculateTotal(): number | string {
    let errorLog = "";
    this.items.forEach((quantity, product) => {
      if (product.reduceStock(quantity) == "success") { //enough stock = success
        this.totalPrice += product.price * quantity;
      }
      else{ 
        errorLog += product.reduceStock(quantity) + "\n";
        this.status = "Error";
      }
      this.status != "Error" ? this.status = "Pending Payment" : null;
    });
    return this.status != "Error" ? this.totalPrice : errorLog;
  }

  set setOrderStatus(status: string) {
    this.status = status;
  }

  set setItemsList(items: Map<Product, number>) {
    this.items = items;
  }
}
