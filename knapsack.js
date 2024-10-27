const items = [];
const itemList = document.getElementById('itemList');
const outputSection = document.getElementById('output');
const selectedItemsSection = document.getElementById('selectedItems');

document.getElementById('addItem').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const weight = parseInt(document.getElementById('weight').value);
    const value = parseInt(document.getElementById('value').value);
    
    if (name && weight > 0 && value > 0) {
        items.push({ name, weight, value });
        displayItems();
        
        // Clear input fields
        document.getElementById('name').value = '';
        document.getElementById('weight').value = '';
        document.getElementById('value').value = '';
    }
});

document.getElementById('calculate').addEventListener('click', function () {
    const capacity = parseInt(document.getElementById('capacity').value);
    const selectedItems = knapsack(items, capacity);
    displayResults(selectedItems);
});

function displayItems() {
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.textContent = `${item.name} (Weight: ${item.weight}, Value: ${item.value})`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', () => {
            deleteItem(index);
        });
        
        div.appendChild(deleteButton);
        itemList.appendChild(div);
    });
}

function deleteItem(index) {
    items.splice(index, 1);
    displayItems();
}

function knapsack(items, capacity) {
    const n = items.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (items[i - 1].weight <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - items[i - 1].weight] + items[i - 1].value);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    let w = capacity;
    const selectedItems = [];
    
    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push(items[i - 1]);
            w -= items[i - 1].weight;
        }
    }

    return selectedItems;
}

function displayResults(selectedItems) {
    selectedItemsSection.innerHTML = '';
    outputSection.innerHTML = '';

    if (selectedItems.length === 0) {
        outputSection.textContent = 'No items selected.';
        return;
    }

    let totalValue = 0;

    selectedItems.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.name} (Weight: ${item.weight}, Value: ${item.value})`;
        selectedItemsSection.appendChild(div);
        totalValue += item.value;
    });

    outputSection.textContent = `Total Value: ${totalValue}`;
}

function displayItems() {
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item-row'; // Ensure this class is added
        
        div.textContent = `${item.name} (Weight: ${item.weight}, Value: ${item.value})`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', () => {
            deleteItem(index);
        });
        
        div.appendChild(deleteButton); // Append delete button to the item row
        itemList.appendChild(div);
    });
}
