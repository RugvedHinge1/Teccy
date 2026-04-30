        const crops = {
            spring: [
                { name: 'Blue Jazz', icon: '💙', price: 30 },
                { name: 'Cauliflower', icon: '🥬', price: 80 },
                { name: 'Garlic', icon: '🧄', price: 40 },
                { name: 'Green Bean', icon: '🫘', price: 60 },
                { name: 'Kale', icon: '🥬', price: 70 },
                { name: 'Parsnip', icon: '🥕', price: 20 },
                { name: 'Potato', icon: '🥔', price: 50 },
                { name: 'Rhubarb', icon: '🌿', price: 100 },
                { name: 'Strawberry', icon: '🍓', price: 100 },
                { name: 'Tulip', icon: '🌷', price: 20 }
            ],
            summer: [
                { name: 'Blueberry', icon: '🫐', price: 80 },
                { name: 'Corn', icon: '🌽', price: 150 },
                { name: 'Hops', icon: '🌾', price: 60 },
                { name: 'Pepper', icon: '🌶️', price: 40 },
                { name: 'Poppy', icon: '🌺', price: 100 },
                { name: 'Radish', icon: '🥗', price: 40 },
                { name: 'Red Cabbage', icon: '🥬', price: 100 },
                { name: 'Sunflower', icon: '🌻', price: 200 },
                { name: 'Tomato', icon: '🍅', price: 50 },
                { name: 'Wheat', icon: '🌾', price: 10 }
            ],
            fall: [
                { name: 'Amaranth', icon: '🌾', price: 70 },
                { name: 'Artichoke', icon: '🥬', price: 30 },
                { name: 'Beet', icon: '🍠', price: 20 },
                { name: 'Bok Choy', icon: '🥬', price: 50 },
                { name: 'Cranberries', icon: '🍒', price: 240 },
                { name: 'Eggplant', icon: '🍆', price: 20 },
                { name: 'Grape', icon: '🍇', price: 60 },
                { name: 'Pumpkin', icon: '🎃', price: 100 },
                { name: 'Yam', icon: '🍠', price: 60 }
            ]
        };

        let currency = 500;
        let storage = [];
        let currentSeason = 'spring';

        // Initialize storage slots (27 slots - 9x3 grid)
        for (let i = 0; i < 27; i++) {
            storage.push(null);
        }

        function renderCrops() {
            const grid = document.getElementById('cropsGrid');
            grid.innerHTML = '';
            
            crops[currentSeason].forEach(crop => {
                const cropDiv = document.createElement('div');
                cropDiv.className = 'crop-item';
                cropDiv.innerHTML = `
                    <div class="crop-icon">${crop.icon}</div>
                    <div class="crop-name">${crop.name}</div>
                    <div class="crop-price">🪙 ${crop.price}</div>
                `;
                cropDiv.onclick = () => buyCrop(crop);
                grid.appendChild(cropDiv);
            });
        }

        function buyCrop(crop) {
            if (currency >= crop.price) {
                // Try to add to storage
                let added = addToStorage(crop);
                
                if (added) {
                    currency -= crop.price;
                    document.getElementById('currency').textContent = currency;
                    showNotification(`Bought ${crop.name}! 🌱`, false);
                    renderStorage();
                } else {
                    showNotification('Storage full! 📦', true);
                }
            } else {
                showNotification('Not enough coins! 💰', true);
            }
        }

        function addToStorage(crop) {
            // Check if crop already exists in storage
            for (let i = 0; i < storage.length; i++) {
                if (storage[i] && storage[i].name === crop.name) {
                    storage[i].count++;
                    return true;
                }
            }
            
            // Find empty slot in storage
            for (let i = 0; i < storage.length; i++) {
                if (!storage[i]) {
                    storage[i] = { ...crop, count: 1 };
                    return true;
                }
            }
            
            return false;
        }

        function renderStorage() {
            const storeGrid = document.getElementById('storageGrid');
            storeGrid.innerHTML = '';
            
            // Render storage
            storage.forEach((item, index) => {
                const slot = document.createElement('div');
                slot.className = item ? 'storage-slot filled' : 'storage-slot';
                
                if (item) {
                    slot.innerHTML = `
                        <div class="storage-icon">${item.icon}</div>
                        <div class="slot-count">${item.count}</div>
                    `;
                }
                
                storeGrid.appendChild(slot);
            });
        }

        function filterSeason(season) {
            currentSeason = season;
            
            // Update active tab
            document.querySelectorAll('.season-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');
            
            renderCrops();
        }

        function showNotification(message, isError) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = isError ? 'notification error show' : 'notification show';
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Initialize
        renderCrops();
        renderStorage();