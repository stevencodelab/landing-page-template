// Initialize AOS
AOS.init({
    duration: 800,
    once: true
  });

  // Product data
  const products = [
    {
      id: 1,
      name: "Premium Wooden Hanger",
      description: "Ultra-slim velvet hangers perfect for suits",
      price: 29.99,
      image: "../assets/images/products/product-1.webp"
    },
    {
      id: 2,
      name: "Velvet Suit Hanger",
      description: "Ultra-slim velvet hangers perfect for suits",
      price: 34.99,
      image: "../assets/images/products/product-2.webp"
    },
    {
      id: 3,
      name: "Luxury Wood Hanger",
      description: "Premium wooden hangers for coats",
      price: 39.99,
      image: "../assets/images/products/product-1.webp"
    },
    {
      id: 4,
      name: "Classic Chrome Hanger",
      description: "Durable metal hangers for everyday use",
      price: 24.99,
      image: "../assets/images/products/product-2.webp"
    },
    {
      id: 5,
      name: "Kids Rainbow Hanger",
      description: "Colorful hangers perfect for children's clothes",
      price: 19.99,
      image: "../assets/images/products/product-1.webp"
    },
    {
      id: 6,
      name: "Space Saving Hanger",
      description: "Compact design for maximizing closet space",
      price: 27.99,
      image: "../assets/images/products/product-2.webp"
    }
  ];

  // Populate product grid
  function populateProductGrid() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map((product, index) => `
      <div class="product-card bg-white rounded-2xl shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="product-image-container relative cursor-pointer" onclick="openModal('${product.image}')">
          <img src="${product.image}" alt="${product.name}" class="product-image w-full h-64 object-cover">
          <div class="image-overlay">
            <i class="fas fa-search-plus text-white text-3xl overlay-icon"></i>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-2">${product.name}</h3>
          <p class="text-gray-600 mb-4">${product.description}</p>
          <div class="flex justify-between items-center">
            <span class="text-2xl font-bold text-teal-700">$${product.price}</span>
            <button class="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition-colors duration-300 flex items-center space-x-2 group">
              <span>Add to Cart</span>
              <i class="fas fa-shopping-cart group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Search functionality
  function toggleSearch() {
    const modal = document.getElementById('searchModal');
    const content = document.getElementById('searchContent');
    
    if (modal.classList.contains('hidden')) {
      // Open modal
      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('-translate-y-8', 'opacity-0');
        document.getElementById('searchInput').focus();
      }, 10);
    } else {
      // Close modal
      modal.classList.add('opacity-0');
      content.classList.add('-translate-y-8', 'opacity-0');
      setTimeout(() => {
        modal.classList.add('hidden');
        document.getElementById('searchResults').innerHTML = '';
        document.getElementById('searchInput').value = '';
      }, 300);
    }
  }

  function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    if (searchTerm.length === 0) {
      resultsContainer.innerHTML = `
        <div class="text-center py-8 text-gray-500">
          <i class="fas fa-search text-4xl mb-3"></i>
          <p>Start typing to search for products</p>
        </div>
      `;
      return;
    }

    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm)
    );

    if (filteredProducts.length === 0) {
      resultsContainer.innerHTML = `
        <div class="text-center py-8 text-gray-500">
          <i class="fas fa-ghost text-4xl mb-3"></i>
          <p>No products found matching "${searchTerm}"</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filteredProducts.map(product => `
      <div class="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
        <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg mr-4 group-hover:scale-105 transition-transform">
        <div class="flex-1">
          <h4 class="font-semibold text-gray-800">${product.name}</h4>
          <p class="text-sm text-gray-600">${product.description}</p>
          <span class="text-teal-700 font-bold">$${product.price}</span>
        </div>
        <button class="ml-4 p-2 hover:bg-teal-50 rounded-full transition-colors">
          <i class="fas fa-arrow-right text-teal-700"></i>
        </button>
      </div>
    `).join('');
  }

  // Mobile menu functionality
  function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const menuContent = menu.querySelector('div');
    
    if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden');
      setTimeout(() => {
        menuContent.classList.remove('-translate-x-full');
      }, 10);
    } else {
      menuContent.classList.add('-translate-x-full');
      setTimeout(() => {
        menu.classList.add('hidden');
      }, 300);
    }
  }

  // Image modal functionality
  function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    // Set image source
    modalImage.src = imageSrc;
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Add click event to close modal when clicking outside the image
    modal.onclick = function(e) {
      if (e.target === modal) {
        closeModal();
      }
    };
  }

  // Function to close modal
function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.add('hidden');
  document.body.style.overflow = ''; // Restore scrolling
}

  // Event Listeners
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize product grid
    populateProductGrid();

    // Close search modal when clicking outside
    document.getElementById('searchModal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('searchModal')) {
        toggleSearch();
      }
    });

    // Close mobile menu when clicking outside
    document.getElementById('mobileMenu').addEventListener('click', (e) => {
      if (e.target === document.getElementById('mobileMenu')) {
        toggleMobileMenu();
      }
    });

    // Close search modal on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !document.getElementById('imageModal').classList.contains('hidden')) {
        closeModal();
      }
    });
  });

  // Add custom styles for overlay effects
  const style = document.createElement('style');
  style.textContent = `
    .product-image-container .image-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .product-image-container:hover .image-overlay {
      opacity: 1;
    }

    .overlay-icon {
      transform: scale(0.8);
      transition: transform 0.3s;
    }

    .product-image-container:hover .overlay-icon {
      transform: scale(1);
    }

    .gradient-bg {
      background: linear-gradient(135deg, #0F766E 0%, #115E59 100%);
    }

    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .animate-spin-slow {
      animation: spin-slow 3s linear infinite;
    }

    .modal-image {
      max-height: 80vh;
      max-width: 90vw;
      object-fit: contain;
    }
  `;
  document.head.appendChild(style);
