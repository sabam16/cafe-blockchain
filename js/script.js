document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Wallet Connection
    const connectWalletBtn = document.getElementById('connect-wallet');
    const walletBalance = document.getElementById('wallet-balance');

    connectWalletBtn.addEventListener('click', function() {
        // Simulate wallet connection
        const balance = (Math.random() * 1000).toFixed(2);
        walletBalance.textContent = balance + ' SABAM';
        this.textContent = 'Connected';
        this.style.backgroundColor = '#4CAF50';
        
        // Show notification
        alert('Wallet connected successfully! Your balance: ' + balance + ' SABAM');
    });

    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                dropdownContent.style.display = 
                    dropdownContent.style.display === 'block' ? 'none' : 'block';
            }
        });
        
        // Handle custom amount input
        const customInput = dropdown.querySelector('.custom-amount input');
        if (customInput) {
            const addBtn = dropdown.querySelector('.custom-amount button');
            
            addBtn.addEventListener('click', function() {
                const amount = customInput.value;
                if (amount && !isNaN(amount)) {
                    alert('Added ' + amount + ' SABAM to your wallet');
                    customInput.value = '';
                }
            });
        }
    });

    // Menu Data
    const menuData = {
        categories: ['All', 'Drinks', 'Food', 'Specials'],
        items: [
            { 
                id: 1, 
                name: 'Espresso', 
                category: 'Drinks', 
                price: 3.50, 
                description: 'Strong black coffee made by forcing steam through ground coffee beans.',
                image: 'espresso.jpg'
            },
            { 
                id: 2, 
                name: 'Latte', 
                category: 'Drinks', 
                price: 4.50, 
                description: 'Espresso with steamed milk and a small amount of foam.',
                image: 'latte.jpg'
            },
            { 
                id: 3, 
                name: 'Croissant', 
                category: 'Food', 
                price: 3.25, 
                description: 'Buttery, flaky, crescent-shaped pastry.',
                image: 'croissant.jpg'
            },
            { 
                id: 4, 
                name: 'Avocado Sandwich', 
                category: 'Food', 
                price: 7.50, 
                description: 'Fresh avocado on artisan bread with seasonings.',
                image: 'sandwich.jpg'
            },
            { 
                id: 5, 
                name: 'Seasonal Special', 
                category: 'Specials', 
                price: 8.00, 
                description: 'Chef\'s selection of seasonal ingredients.',
                image: 'meal.jpg'
            },
            { 
                id: 6, 
                name: 'Token Holder Special', 
                category: 'Specials', 
                price: 9.50, 
                description: 'Exclusive dish available only to SABAM holders.',
                image: 'pastry.jpg'
            }
        ]
    };

    // Load Menu Categories
    const menuCategories = document.getElementById('menu-categories');
    const menuItemsContainer = document.getElementById('menu-items');

    function loadCategories() {
        menuData.categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'category-btn';
            if (category === 'All') button.classList.add('active');
            button.textContent = category;
            button.dataset.category = category;
            button.addEventListener('click', filterMenuItems);
            menuCategories.appendChild(button);
        });
    }

    function loadMenuItems(category = 'All') {
        menuItemsContainer.innerHTML = '';
        
        const filteredItems = category === 'All' 
            ? menuData.items 
            : menuData.items.filter(item => item.category === category);
        
        if (filteredItems.length === 0) {
            menuItemsContainer.innerHTML = '<p class="empty-menu">No items found in this category</p>';
            return;
        }
        
        filteredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.innerHTML = `
                <div class="menu-item-img">
                    <img src="assets/${item.image}" alt="${item.name}">
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-title">
                        <h3>${item.name}</h3>
                        <span class="menu-item-price">${item.price} SABAM</span>
                    </div>
                    <p class="menu-item-desc">${item.description}</p>
                    <div class="menu-item-footer">
                        <span>${item.category}</span>
                        <button class="btn btn-small add-to-order" data-id="${item.id}">Add to Order</button>
                    </div>
                </div>
            `;
            menuItemsContainer.appendChild(itemElement);
        });
        
        // Add event listeners to add-to-order buttons
        document.querySelectorAll('.add-to-order').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.dataset.id);
                const item = menuData.items.find(i => i.id === itemId);
                if (item) {
                    alert(`Added ${item.name} to your order for ${item.price} SABAM`);
                }
            });
        });
    }

    function filterMenuItems(e) {
        const category = e.target.dataset.category;
        
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Load items for selected category
        loadMenuItems(category);
    }

    // Initialize
    loadCategories();
    loadMenuItems();
});