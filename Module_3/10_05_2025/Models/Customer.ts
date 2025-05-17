/*2. Customer
Properties: id, name, email, orders (array)
Methods:
placeOrder(order) – adds the order to their list*/
import { Order } from "../Services/Order.ts";
export class Customer {
    id: string;
    name: string;
    email: string;
    orders: Order[] = [];
    constructor(id: string, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    placeOrder(order: Order) {
        this.orders.push(order);
    }

    checkOrder(){
        let results = new Array();
        this.orders.forEach(order => {
            results.push(order.calculateTotal());
        });
        return results;
    }
}