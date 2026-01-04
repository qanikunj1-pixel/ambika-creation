// Pagination variables
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 12;

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter products
        if (filterValue === 'all') {
            filteredProducts = [...allProducts];
        } else {
            filteredProducts = allProducts.filter(product => product.category === filterValue);
        }
        
        // Reset to page 1 and render
        currentPage = 1;
        renderProducts();
        renderPagination();
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Quick view button functionality (placeholder)
const quickViewButtons = document.querySelectorAll('.quick-view');

quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        openQuickView(productCard);
    });
});

// Quick View Modal Functionality
const quickViewModal = document.getElementById('quickViewModal');
const closeQuickView = document.querySelector('.close-quick-view');

function openQuickView(productCard) {
    const productName = productCard.querySelector('h3').textContent;
    const productCategory = productCard.querySelector('.product-category').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    const productImage = productCard.querySelector('.product-image img').src;
    
    // Set quick view data
    document.getElementById('quickViewName').textContent = productName;
    document.getElementById('quickViewCategory').textContent = productCategory;
    document.getElementById('quickViewPrice').textContent = productPrice;
    document.getElementById('quickViewImage').src = productImage;
    
    // Store data for Buy Now button
    const quickViewBuyBtn = document.getElementById('quickViewBuyBtn');
    quickViewBuyBtn.setAttribute('data-product', productName);
    quickViewBuyBtn.setAttribute('data-price', productPrice);
    
    // Show modal
    quickViewModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close quick view modal
function closeQuickViewModal() {
    quickViewModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

closeQuickView.addEventListener('click', closeQuickViewModal);

// Close when clicking outside
quickViewModal.addEventListener('click', (e) => {
    if (e.target === quickViewModal) {
        closeQuickViewModal();
    }
});

// Buy Now button in Quick View
document.getElementById('quickViewBuyBtn').addEventListener('click', () => {
    const productName = document.getElementById('quickViewBuyBtn').getAttribute('data-product');
    const productPrice = document.getElementById('quickViewBuyBtn').getAttribute('data-price');
    
    // Close quick view and open buy modal
    closeQuickViewModal();
    
    // Set buy modal data
    document.getElementById('modal-product-name').textContent = productName;
    document.getElementById('modal-product-price').textContent = productPrice;
    
    // Show buy modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('header');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards and feature sections
document.querySelectorAll('.product-card, .feature, .contact-item').forEach(el => {
    observer.observe(el);
});

// Buy Now Modal Functionality
const modal = document.getElementById('buyModal');
const buyButtons = document.querySelectorAll('.buy-btn');
const closeModal = document.querySelector('.close-modal');
const cancelBtn = document.querySelector('.cancel-btn');
const buyForm = document.getElementById('buyForm');

// Open modal when Buy button is clicked
buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');
        
        // Set product info in modal
        document.getElementById('modal-product-name').textContent = productName;
        document.getElementById('modal-product-price').textContent = productPrice;
        
        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close modal function
function closeModalFunc() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    buyForm.reset();
}

// Close modal when X is clicked
closeModal.addEventListener('click', closeModalFunc);

// Close modal when Cancel button is clicked
cancelBtn.addEventListener('click', closeModalFunc);

// Close modal when clicking outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Handle form submission
buyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const customerName = document.getElementById('customerName').value;
    const customerContact = document.getElementById('customerContact').value;
    const productName = document.getElementById('modal-product-name').textContent;
    const productPrice = document.getElementById('modal-product-price').textContent;
    
    // Ambika Creations WhatsApp Business Number (include country code without + or spaces)
    // Example: For India +91 1234567890, use: 911234567890
    const businessWhatsApp = '919722225135'; // Replace with actual Ambika Creations WhatsApp number
    
    // Create WhatsApp message to be sent to business
    const message = `*New Order Inquiry*%0A%0A*Product:* ${encodeURIComponent(productName)}%0A*Price:* ${encodeURIComponent(productPrice)}%0A%0A*Customer Details:*%0AName: ${encodeURIComponent(customerName)}%0AContact: ${customerContact}`;
    
    // Open WhatsApp to send message to Ambika Creations
    const whatsappURL = `https://wa.me/${businessWhatsApp}?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    closeModalFunc();
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModalFunc();
    }
});

// Add Product Modal Functionality
const addProductModal = document.getElementById('addProductModal');
const addProductBtn = document.getElementById('addProductBtn');
const closeAddModal = document.querySelector('.close-add-modal');
const cancelAddBtn = document.querySelector('.cancel-add-btn');
const addProductForm = document.getElementById('addProductForm');
const productGrid = document.querySelector('.product-grid');

// Open add product modal
addProductBtn.addEventListener('click', () => {
    addProductModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// Close add product modal function
function closeAddProductModal() {
    addProductModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    addProductForm.reset();
}

// Close add product modal when X is clicked
closeAddModal.addEventListener('click', closeAddProductModal);

// Close add product modal when Cancel button is clicked
cancelAddBtn.addEventListener('click', closeAddProductModal);

// Close add product modal when clicking outside
addProductModal.addEventListener('click', (e) => {
    if (e.target === addProductModal) {
        closeAddProductModal();
    }
});

// Handle add product form submission
addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const productCategory = document.getElementById('productCategory').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').value;
    
    // Create product data object
    const productData = {
        name: productName,
        category: productCategory,
        price: productPrice,
        image: productImage
    };
    
    // Save to GitHub
    const saved = await saveProductToGitHub(productData);
    
    if (saved) {
        // Close modal first
        closeAddProductModal();
        
        // Reload products from JSON to sync with GitHub
        await loadProductsFromJSON();
        
        // Show success message
        alert(`Product "${productName}" has been added successfully and saved to GitHub!`);
    } else {
        alert('Failed to save product to GitHub. Please check your GitHub configuration.');
    }
});

// Function to save product to GitHub
async function saveProductToGitHub(productData) {
    const githubConfig = getGitHubConfig();
    
    if (!githubConfig.username || !githubConfig.repo || !githubConfig.token) {
        const configure = confirm('GitHub is not configured. Would you like to configure it now?');
        if (configure) {
            openGitHubConfigModal();
        }
        return false;
    }
    
    try {
        // Get current products.json from GitHub
        const getUrl = `https://api.github.com/repos/${githubConfig.username}/${githubConfig.repo}/contents/products.json`;
        const getResponse = await fetch(getUrl, {
            headers: {
                'Authorization': `token ${githubConfig.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!getResponse.ok) {
            const errorData = await getResponse.json().catch(() => ({}));
            console.error('GitHub fetch error:', errorData);
            alert(`GitHub Error: ${errorData.message || 'Failed to fetch products.json'}. Check your repository settings.`);
            return false;
        }
        
        const fileData = await getResponse.json();
        const currentContent = JSON.parse(atob(fileData.content));
        
        // Add new product
        currentContent.push(productData);
        
        // Update products.json on GitHub
        const updateUrl = `https://api.github.com/repos/${githubConfig.username}/${githubConfig.repo}/contents/products.json`;
        const updateResponse = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${githubConfig.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Add product: ${productData.name}`,
                content: btoa(JSON.stringify(currentContent, null, 2)),
                sha: fileData.sha
            })
        });
        
        if (!updateResponse.ok) {
            const errorData = await updateResponse.json().catch(() => ({}));
            console.error('GitHub update error:', errorData);
            alert(`GitHub Error: ${errorData.message || 'Failed to update products.json'}. Check your token permissions.`);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('GitHub save error:', error);
        alert(`Error: ${error.message}. Please check your GitHub configuration and internet connection.`);
        return false;
    }
}

// Get GitHub configuration from localStorage
function getGitHubConfig() {
    return {
        username: localStorage.getItem('github_username') || '',
        repo: localStorage.getItem('github_repo') || '',
        token: localStorage.getItem('github_token') || ''
    };
}

// Close add product modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (addProductModal.classList.contains('show')) {
            closeAddProductModal();
        }
        if (quickViewModal.classList.contains('show')) {
            closeQuickViewModal();
        }
    }
});

// Admin Access - Simple Password Protection for Add Product Button
// Press Ctrl+Shift+A to activate admin mode
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        
        // Check if already in admin mode
        if (addProductBtn.classList.contains('visible')) {
            const confirmLogout = confirm('Admin mode is active. Do you want to disable it?');
            if (confirmLogout) {
                addProductBtn.classList.remove('visible');
                sessionStorage.removeItem('adminAccess');
                alert('Admin mode disabled.');
            }
        } else {
            // Prompt for password
            const password = prompt('Enter admin password:');
            
            // Simple password check (change 'admin123' to your desired password)
            if (password === 'ambika123') {
                addProductBtn.classList.add('visible');
                sessionStorage.setItem('adminAccess', 'true');
                alert('Admin mode activated! You can now add products.\n\nPress Ctrl+Shift+G to configure GitHub integration.');
            } else if (password !== null) {
                alert('Incorrect password!');
            }
        }
    }
    
    // Press Ctrl+Shift+G to configure GitHub (only in admin mode)
    if (e.ctrlKey && e.shiftKey && e.key === 'G') {
        e.preventDefault();
        if (sessionStorage.getItem('adminAccess') === 'true') {
            openGitHubConfigModal();
        } else {
            alert('Please activate admin mode first (Ctrl+Shift+A)');
        }
    }
});

// GitHub Configuration Modal
const githubConfigModal = document.getElementById('githubConfigModal');
const closeGitHubConfig = document.querySelector('.close-github-config');
const cancelGitHubConfig = document.querySelector('.cancel-github-config');
const githubConfigForm = document.getElementById('githubConfigForm');

function openGitHubConfigModal() {
    // Load existing config
    const config = getGitHubConfig();
    document.getElementById('githubUsername').value = config.username;
    document.getElementById('githubRepo').value = config.repo;
    document.getElementById('githubToken').value = config.token;
    
    githubConfigModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeGitHubConfigModal() {
    githubConfigModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    githubConfigForm.reset();
}

closeGitHubConfig.addEventListener('click', closeGitHubConfigModal);
cancelGitHubConfig.addEventListener('click', closeGitHubConfigModal);

githubConfigModal.addEventListener('click', (e) => {
    if (e.target === githubConfigModal) {
        closeGitHubConfigModal();
    }
});

githubConfigForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('githubUsername').value;
    const repo = document.getElementById('githubRepo').value;
    const token = document.getElementById('githubToken').value;
    
    // Save to localStorage
    localStorage.setItem('github_username', username);
    localStorage.setItem('github_repo', repo);
    localStorage.setItem('github_token', token);
    
    closeGitHubConfigModal();
    alert('GitHub configuration saved successfully!');
});

// Check if admin access was previously granted in this session
if (sessionStorage.getItem('adminAccess') === 'true') {
    addProductBtn.classList.add('visible');
}

// Load saved products from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProductsFromJSON();
});

// Function to load products from products.json
async function loadProductsFromJSON() {
    try {
        // Add cache-busting parameter to ensure fresh data
        const timestamp = new Date().getTime();
        const response = await fetch(`products.json?v=${timestamp}`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        const products = await response.json();
        
        // Store all products
        allProducts = products;
        filteredProducts = [...products];
        
        // Render first page
        renderProducts();
        renderPagination();
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Failed to load products. Please refresh the page.');
    }
}

// Function to render products for current page
function renderProducts() {
    // Clear product grid
    productGrid.innerHTML = '';
    
    // Calculate start and end index
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    // Render products
    productsToShow.forEach(product => {
        createProductCard(product);
    });
    
    // Scroll to products section smoothly
    if (currentPage > 1) {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Function to render pagination controls
function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    // Get or create pagination container
    let paginationContainer = document.querySelector('.pagination-container');
    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container';
        productGrid.parentElement.appendChild(paginationContainer);
    }
    
    // Clear pagination
    paginationContainer.innerHTML = '';
    
    // Don't show pagination if only one page or no products
    if (totalPages <= 1) {
        return;
    }
    
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = '&laquo; Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
            renderPagination();
        }
    });
    pagination.appendChild(prevBtn);
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // First page button if not visible
    if (startPage > 1) {
        const firstBtn = createPageButton(1);
        pagination.appendChild(firstBtn);
        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.className = 'page-dots';
            dots.textContent = '...';
            pagination.appendChild(dots);
        }
    }
    
    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = createPageButton(i);
        pagination.appendChild(pageBtn);
    }
    
    // Last page button if not visible
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.className = 'page-dots';
            dots.textContent = '...';
            pagination.appendChild(dots);
        }
        const lastBtn = createPageButton(totalPages);
        pagination.appendChild(lastBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = 'Next &raquo;';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
            renderPagination();
        }
    });
    pagination.appendChild(nextBtn);
    
    paginationContainer.appendChild(pagination);
}

// Helper function to create page number button
function createPageButton(pageNum) {
    const btn = document.createElement('button');
    btn.className = 'page-btn';
    if (pageNum === currentPage) {
        btn.classList.add('active');
    }
    btn.textContent = pageNum;
    btn.addEventListener('click', () => {
        currentPage = pageNum;
        renderProducts();
        renderPagination();
    });
    return btn;
}

// Function to create product card
function createProductCard(productData) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-category', productData.category);
    
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${productData.image}" alt="${productData.name}">
            <div class="product-overlay">
                <button class="quick-view">Quick View</button>
            </div>
        </div>
        <div class="product-info">
            <h3>${productData.name}</h3>
            <p class="product-category">${productData.category.charAt(0).toUpperCase() + productData.category.slice(1)}</p>
            <div class="price-buy-container">
                <p class="product-price">₹${productData.price}</p>
                <button class="buy-btn" data-product="${productData.name}" data-price="₹${productData.price}">Buy</button>
            </div>
        </div>
    `;
    
    // Add to product grid
    productGrid.appendChild(productCard);
    
    // Add event listener to the new Buy button
    const newBuyBtn = productCard.querySelector('.buy-btn');
    newBuyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = newBuyBtn.getAttribute('data-product');
        const productPrice = newBuyBtn.getAttribute('data-price');
        
        document.getElementById('modal-product-name').textContent = productName;
        document.getElementById('modal-product-price').textContent = productPrice;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Add event listener to the Quick View button
    const newQuickViewBtn = productCard.querySelector('.quick-view');
    newQuickViewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openQuickView(productCard);
    });
}
