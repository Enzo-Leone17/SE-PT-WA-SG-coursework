/*1. Product
Properties: id, name, price, stock
Methods:
reduceStock(quantity) – reduces stock after an order*/

export class Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  constructor(id: string, name: string, price: number, stock: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
  reduceStock(quantity: number) {
    if (quantity <= this.stock) { //check if stock is available
      this.stock -= quantity;
      return "success";
    } else {
      return this.stock == 0 ? `out of stock (${this.name})`: `not enough stock (${this.name}), only "${this.stock}" available`;
    }
  }

  replenishStock(quantity: number) {
    this.stock += quantity;
  }
}
