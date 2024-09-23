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

// Task 4: Create a function to calculate total fo ran order
function calculateOrderTotal(order) {
    return order.items.reduce((total, orderItem) => {
        const product = inventory.find(item => item.name === orderItem.name);
        if (product) {
            return total + (product.price * orderItem.quantity);
        }
        return total;
    }, 0);
}