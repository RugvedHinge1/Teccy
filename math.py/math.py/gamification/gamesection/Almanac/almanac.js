// Crop data for the almanac
const crops = [
    {
        id: 1,
        name: "Blue Jazz",
        sellValue: 50,
        image: "https://via.placeholder.com/200x200/6a8cff/ffffff?text=Blue+Jazz",
        description: "A fragrant blue flower that blooms in spring. Popular for its vibrant color and sweet scent.",
        discovered: true
    },
    {
        id: 2,
        name: "Cauliflower",
        sellValue: 175,
        image: "https://via.placeholder.com/200x200/f5f5dc/ffffff?text=Cauliflower",
        description: "A nutritious white vegetable with tightly packed florets. Takes time to grow but worth the wait.",
        discovered: false
    },
    {
        id: 3,
        name: "Garlic",
        sellValue: 60,
        image: "https://via.placeholder.com/200x200/e8d4b8/ffffff?text=Garlic",
        description: "Pungent bulbs that add flavor to any dish. Known for its health benefits and strong aroma.",
        discovered: false
    },
    {
        id: 4,
        name: "Green Bean",
        sellValue: 40,
        image: "https://via.placeholder.com/200x200/7bc67b/ffffff?text=Green+Bean",
        description: "Crisp green pods that grow on climbing vines. Continues to produce throughout the season.",
        discovered: true
    },
    {
        id: 5,
        name: "Kale",
        sellValue: 110,
        image: "https://via.placeholder.com/200x200/4a7c4e/ffffff?text=Kale",
        description: "A hardy leafy green packed with nutrients. Thrives in cooler weather and frost.",
        discovered: false
    },
    {
        id: 6,
        name: "Parsnip",
        sellValue: 35,
        image: "https://via.placeholder.com/200x200/f5deb3/ffffff?text=Parsnip",
        description: "A sweet root vegetable that looks like a white carrot. Flavor improves after frost.",
        discovered: false
    },
    {
        id: 7,
        name: "Potato",
        sellValue: 80,
        image: "https://via.placeholder.com/200x200/c9b88d/ffffff?text=Potato",
        description: "A versatile starchy tuber that can be prepared in countless ways. A staple crop that stores well.",
        discovered: false
    },
    {
        id: 8,
        name: "Rhubarb",
        sellValue: 220,
        image: "https://via.placeholder.com/200x200/e05263/ffffff?text=Rhubarb",
        description: "Tart red stalks perfect for pies and jams. A perennial that comes back year after year.",
        discovered: false
    },
    {
        id: 9,
        name: "Strawberry",
        sellValue: 120,
        image: "https://via.placeholder.com/200x200/fc5185/ffffff?text=Strawberry",
        description: "Sweet red berries that continue producing throughout spring. Delicious fresh or in desserts.",
        discovered: false
    },
    {
        id: 10,
        name: "Tulip",
        sellValue: 30,
        image: "https://via.placeholder.com/200x200/ff69b4/ffffff?text=Tulip",
        description: "Colorful spring flowers that brighten any garden. Come in a rainbow of beautiful colors.",
        discovered: true
    },
    {
        id: 11,
        name: "Blueberry",
        sellValue: 50,
        image: "https://via.placeholder.com/200x200/6a8caf/ffffff?text=Blueberry",
        description: "Tiny blue gems packed with antioxidants. Grows on bushes and continues producing all summer.",
        discovered: true
    },
    {
        id: 12,
        name: "Corn",
        sellValue: 50,
        image: "https://via.placeholder.com/200x200/ffd93d/ffffff?text=Corn",
        description: "Sweet golden kernels packed with flavor. Tall stalks that reach for the sky in summer.",
        discovered: false
    },
    {
        id: 13,
        name: "Hops",
        sellValue: 25,
        image: "https://via.placeholder.com/200x200/8fbc8f/ffffff?text=Hops",
        description: "Green cone-shaped flowers used in brewing. Grows on climbing vines that need support.",
        discovered: false
    },
    {
        id: 14,
        name: "Pepper",
        sellValue: 40,
        image: "https://via.placeholder.com/200x200/ef233c/ffffff?text=Pepper",
        description: "Colorful and flavorful vegetables. Can range from sweet bell peppers to spicy varieties.",
        discovered: false
    },
    {
        id: 15,
        name: "Poppy",
        sellValue: 140,
        image: "https://via.placeholder.com/200x200/ff6b6b/ffffff?text=Poppy",
        description: "Delicate red flowers with dark centers. Seeds are used in baking and cooking.",
        discovered: false
    },
    {
        id: 16,
        name: "Radish",
        sellValue: 90,
        image: "https://via.placeholder.com/200x200/ff4d6d/ffffff?text=Radish",
        description: "Fast-growing crispy root vegetable. Adds a peppery crunch to salads and dishes.",
        discovered: false
    },
    {
        id: 17,
        name: "Red Cabbage",
        sellValue: 260,
        image: "https://via.placeholder.com/200x200/8b3a62/ffffff?text=Red+Cabbage",
        description: "Deep purple-red leaves form tight heads. Rich in nutrients and perfect for pickling.",
        discovered: false
    },
    {
        id: 18,
        name: "Sunflower",
        sellValue: 80,
        image: "https://via.placeholder.com/200x200/ffbe0b/ffffff?text=Sunflower",
        description: "Tall plants with bright yellow flowers that follow the sun. Seeds are nutritious and delicious.",
        discovered: false
    },
    {
        id: 19,
        name: "Tomato",
        sellValue: 60,
        image: "https://via.placeholder.com/200x200/ff6b6b/ffffff?text=Tomato",
        description: "Juicy red fruit perfect for salads and sauces. Continues producing throughout the summer.",
        discovered: false
    },
    {
        id: 20,
        name: "Wheat",
        sellValue: 25,
        image: "https://via.placeholder.com/200x200/d4a574/ffffff?text=Wheat",
        description: "Golden stalks that wave in the breeze. The foundation of bread and many baked goods.",
        discovered: false
    },
    {
        id: 21,
        name: "Amaranth",
        sellValue: 150,
        image: "https://via.placeholder.com/200x200/dc143c/ffffff?text=Amaranth",
        description: "Ancient grain with vibrant red-purple flowers. Both seeds and leaves are edible and nutritious.",
        discovered: true
    },
    {
        id: 22,
        name: "Artichoke",
        sellValue: 160,
        image: "https://via.placeholder.com/200x200/8fbc8f/ffffff?text=Artichoke",
        description: "Unique thistle-like vegetable with tender heart. Takes patience to grow but delicious when cooked.",
        discovered: false
    },
    {
        id: 23,
        name: "Beet",
        sellValue: 100,
        image: "https://via.placeholder.com/200x200/8b0000/ffffff?text=Beet",
        description: "Deep red root vegetable that's sweet and earthy. Both roots and greens are edible.",
        discovered: false
    },
    {
        id: 24,
        name: "Bok Choy",
        sellValue: 80,
        image: "https://via.placeholder.com/200x200/90ee90/ffffff?text=Bok+Choy",
        description: "Crisp Asian green with white stems and dark leaves. Perfect for stir-fries and soups.",
        discovered: false
    },
    {
        id: 25,
        name: "Cranberries",
        sellValue: 75,
        image: "https://via.placeholder.com/200x200/dc143c/ffffff?text=Cranberries",
        description: "Tart red berries that grow on low vines. Essential for fall celebrations and sauces.",
        discovered: false
    },
    {
        id: 26,
        name: "Eggplant",
        sellValue: 60,
        image: "https://via.placeholder.com/200x200/4b0082/ffffff?text=Eggplant",
        description: "Glossy purple vegetable with creamy flesh. Absorbs flavors beautifully when cooked.",
        discovered: false
    },
    {
        id: 27,
        name: "Grape",
        sellValue: 80,
        image: "https://via.placeholder.com/200x200/9370db/ffffff?text=Grape",
        description: "Sweet clusters that grow on climbing vines. Perfect for eating fresh, drying, or making juice.",
        discovered: false
    },
    {
        id: 28,
        name: "Pumpkin",
        sellValue: 320,
        image: "https://via.placeholder.com/200x200/ff7518/ffffff?text=Pumpkin",
        description: "Large orange squash perfect for pies and decorations. Can grow to enormous sizes in fall.",
        discovered: false
    },
    {
        id: 29,
        name: "Yam",
        sellValue: 160,
        image: "https://via.placeholder.com/200x200/cd853f/ffffff?text=Yam",
        description: "Sweet orange root vegetable. Rich and creamy when baked, perfect for fall dishes.",
        discovered: false
    }
];

let currentCrop = crops[0];

// Initialize the almanac
function initAlmanac() {
    renderCropGrid();
    displayCrop(currentCrop);
    updateStats();
}

// Render the crop grid
function renderCropGrid() {
    const grid = document.getElementById('crop-grid');
    grid.innerHTML = '';

    crops.forEach((crop, index) => {
        const slot = document.createElement('div');
        slot.className = `crop-slot ${!crop.discovered ? 'locked' : ''} ${crop.id === currentCrop.id ? 'selected' : ''}`;
        
        if (crop.discovered) {
            const img = document.createElement('img');
            img.src = crop.image;
            img.alt = crop.name;
            slot.appendChild(img);
            
            slot.addEventListener('click', () => {
                selectCrop(crop);
            });
        } else {
            const questionMark = document.createElement('div');
            questionMark.className = 'question-mark';
            questionMark.textContent = '?';
            slot.appendChild(questionMark);
        }

        grid.appendChild(slot);
    });
}

// Select a crop to display
function selectCrop(crop) {
    if (!crop.discovered) return;
    
    currentCrop = crop;
    displayCrop(crop);
    renderCropGrid(); // Re-render to update selection
}

// Display crop details
function displayCrop(crop) {
    document.getElementById('crop-name').textContent = crop.name;
    document.getElementById('crop-number').textContent = String(crop.id).padStart(3, '0');
    document.getElementById('sell-value').textContent = crop.sellValue;
    document.getElementById('crop-image').src = crop.image;
    document.getElementById('description-text').textContent = crop.description;
    document.getElementById('crop-name-bottom').textContent = crop.name;
}

// Update statistics
function updateStats() {
    const discovered = crops.filter(c => c.discovered).length;
    const total = crops.length;
    
    document.getElementById('discovered-count').textContent = discovered;
    document.getElementById('total-count').textContent = total;
}

// Scroll functionality
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('crop-grid');
    const scrollUpBtn = document.querySelector('.scroll-up');
    const scrollDownBtn = document.querySelector('.scroll-down');

    if (scrollUpBtn && scrollDownBtn) {
        scrollUpBtn.addEventListener('click', () => {
            grid.scrollBy({ top: -150, behavior: 'smooth' });
        });

        scrollDownBtn.addEventListener('click', () => {
            grid.scrollBy({ top: 150, behavior: 'smooth' });
        });
    }
});

// Example: Function to unlock/discover a crop
function discoverCrop(cropId) {
    const crop = crops.find(c => c.id === cropId);
    if (crop) {
        crop.discovered = true;
        renderCropGrid();
        updateStats();
        
        // If this is the first discovered crop, display it
        if (crops.filter(c => c.discovered).length === 1) {
            selectCrop(crop);
        }
    }
}

// Function to discover crop by name (useful for game integration)
function discoverCropByName(cropName) {
    const crop = crops.find(c => c.name.toLowerCase() === cropName.toLowerCase());
    if (crop) {
        discoverCrop(crop.id);
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initAlmanac);

// Export functions for external use
window.almanac = {
    discoverCrop,
    discoverCropByName,
    selectCrop,
    crops
};