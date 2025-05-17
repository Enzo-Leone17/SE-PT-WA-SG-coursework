/*4. Payment
Properties: order, amount, method, isSuccessful
Method:
process() – simulates payment success and updates order status*/

import { Order } from "../Services/Order.ts";
export class Payment {
  order: Order;
  amount: number;
  method: string;
  isSuccessful: boolean = false;
  constructor(order: Order, amount: number, method: string) {
    this.order = order;
    this.amount = amount;
    this.method = method;
  }
  process() {
    if (
      this.amount >= this.order.totalPrice &&
      this.order.status == "Pending Payment"
    ) {
      this.isSuccessful = true;
      this.order.setOrderStatus = "Paid";
      return this.amount > this.order.totalPrice
        ? `Payment for order "id: ${this.order.id}" successful. \nChange: ${
            this.amount - this.order.totalPrice
          }`
        : "Successfully paid!";
    } else {
      this.isSuccessful = false;
      return this.order.status == "Error"
        ? `Please check your order "id: ${this.order.id}" again`
        : "Insufficient funds";
    }
  }
}
