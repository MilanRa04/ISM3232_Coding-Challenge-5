// Task 1: Create an array with the 4 product objects, and include name, price, and quantity.
const inventory = [
    {name: 'Espresso', price: 3, quantity: 10 },
    {name: 'Latte', price: 4, quantity: 5 },
    {name: 'Cappuccino', prince: 4, quantity: 6 },
    {name: 'Mocha', price: 5, quantity: 4 }
];


// Task 2: Create an empty order array of order objects.
const orders = [];


// Task 3: Create a Function to place an order
function placeOrder(customerName, orderedItems) {
    // Check if the items are in stock
    const stockCheck = orderedItems.every(orderItem => {
        const product = inventory.find(item => item.name === orderItem.name);
        if (!product) {
            console.log(`Product ${orderItem.name} not found in inventory.`);
            return false;
        }
        if (product.quantity < orderItem.quantity) {
            console.log(`Insufficient stock for ${orderItem.name}.`);
            return false;
        }
        return true;
    });

    // If stock is sufficient, process the order
    if (stockCheck) {
        orderedItems.forEach(orderItem => {
            const product = inventory.find(item => item.name === orderItem.name);
            product.quantity -= orderItem.quantity; // Update inventory
        });

        // Add order to the orders array
        orders.push({
            customerName: customerName,
            items: orderedItems,
            status: "Pending"
        });

        console.log(`Order placed successfully for ${customerName}.`);
    } else {
        console.error(`Order failed for ${customerName} due to insufficient stock.`);
    }
}

placeOrder('Alice', [{ name: 'Espresso', quantity: 1 }, { name: 'Latte', quantity: 2 }])
placeOrder('John', [{ name: 'Espresso', quantity: 1 }, { name: 'Latte', quantity: 2 }])

// Task 4: Create a function to calculate total for an order
function calculateOrderTotal(order) {
    return order.items.reduce((total, orderItem) => {
        const product = inventory.find(item => item.name === orderItem.name);
        if (product) {
            return total + (product.price * orderItem.quantity);
        }
        return total;
    }, 0);
}

console.log("Order total for Alice: $", calculateOrderTotal(orders[0]));


// Task 5: Create a Function to Mark an Order as Completed
function completeOrder(customerName) {
    const order = order.find(order => order.customerName === customerName);

    if (order) {
        if (order.status === "Pending") {
            order.status = "Completed";
            console.log(`Order for ${customerName} marked as completed.`);
        } else {
            console.log(`Order for ${customerName} is already completed.`);
        }
    } else {
        console.log(`Order not found for customer: ${customerName}.`)
    }
}


// Task 6: Create a function to check pending orders
function checkPendingOrders() {
    const pendingOrders = orders.filter(order => order.status === "Pending");

    if (pendingOrders.length > 0) {
        pendingOrders.forEach(order => {
            console.log(`Customer: ${order.customerName}, Items: ${JSON.stringify(order.items)}, Status: ${order.status}`);
        });
    } else {
        console.log("No pending orders.");
    }
}

checkPendingOrders();