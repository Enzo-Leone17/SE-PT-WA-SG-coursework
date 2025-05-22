//main/base class for storing account details
import fs from "node:fs";

export class Account{
    constructor(username, password, email = "No email"){
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

export class Guest extends Account{
    constructor(){
        super("guest", "guest");
    }
}

export class RegisteredUser extends Account{
    #pinMax = 5; //private property to limit max amt of pinned items
    pinItems = [];
    inventory = [];
    constructor(username, password, email){
        super(username, password, email);
    }

    pushToInventory(item,quantity){
        let existingItem = this.inventory.find(i => i.item.name === item?.name);
        existingItem != undefined ? existingItem.quantity += quantity : this.inventory.push(new InventoryItem(item, quantity));
    }

    pinItem(item){
        if(this.pinItems.length < this.#pinMax){
            this.pinItems.push(item);
            return `${item?.name} has been pinned`;
        }
        else{
            return "Max amount of items pinned, please remove some first";
        }
    }

    removePinItem(item){
        this.pinItems.splice(this.pinItems.indexOf(item), 1);
        return `${item?.name} has been unpinned`;
    }
}

class InventoryItem {
    item;
    quantity;
    constructor(item, quantity){
        this.item = item;
        this.quantity = quantity;
    }
}