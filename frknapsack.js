let items = [];

document.getElementById('addItem').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const weight = Number(document.getElementById('weight').value);
    const value = Number(document.getElementById('value').value);

    if (name && weight > 0 && value > 0) {
        items.push({ name, weight, value, ratio: value / weight });
        displayItems();
        clearInputs();
    } else {
        alert('Please enter valid item details.');
    }
});

document.getElementById('calculate').addEventListener('click', function () {
    const capacity = Number(document.getElementById('capacity').value);
    if (capacity > 0) {
        const result = fractionalKnapsack(items, capacity);
        document.getElementById('output').innerText = `Maximum Value: ${result.maxValue.toFixed(2)}`;
        document.getElementById('selectedItems').innerText = `Selected Items: ${result.selectedItems.join(', ')}`;
    } else {
        alert('Please enter a valid capacity.');
    }
});

function displayItems() {
    const itemListDiv = document.getElementById('itemList');
    itemListDiv.innerHTML = ''; // Clear previous items

    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('item-row');
        div.innerHTML = `${item.name} - Weight: ${item.weight}, Value: ${item.value}
            <button class="delete-btn" data-index="${index}">Delete</button>`;
        itemListDiv.appendChild(div);
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            items.splice(index, 1); // Remove item from the array
            displayItems(); // Update the displayed items
        });
    });
}

function clearInputs() {
    document.getElementById('name').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('value').value = '';
}

function fractionalKnapsack(items, capacity) {
    // Sort items by value-to-weight ratio in descending order
    items.sort((a, b) => b.ratio - a.ratio);

    let totalValue = 0;
    let remainingCapacity = capacity;
    const selectedItems = [];

    for (const item of items) {
        if (remainingCapacity >= item.weight) {
            totalValue += item.value;
            remainingCapacity -= item.weight;
            selectedItems.push(item.name);
        } else {
            const fraction = remainingCapacity / item.weight;
            totalValue += item.value * fraction;
            selectedItems.push(`${item.name} (fraction: ${fraction.toFixed(2)})`);
            break; // Knapsack is full
        }
    }

    return { maxValue: totalValue, selectedItems };
}
