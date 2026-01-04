# Ambika Creations - Jewelry Website

A modern, responsive jewelry e-commerce website with GitHub Actions integration for automatic product management.

## Features

- ✨ Modern, elegant design
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔍 Product filtering by category
- 🛍️ Quick view product details
- 💬 WhatsApp integration for orders
- 🔐 Admin panel with password protection
- 🚀 Automatic product updates via GitHub Actions
- 💾 Products stored in JSON file (visible to all users)

## Quick Start

### For Local Testing

1. Open `index.html` in your browser
2. Products load automatically from `products.json`

### Admin Access

- Press **Ctrl+Shift+A** → Enter password: `ambika123`
- Press **Ctrl+Shift+G** → Configure GitHub integration

## GitHub Actions Setup

Follow the detailed instructions in `SETUP_INSTRUCTIONS.md` to:
1. Create a GitHub repository
2. Enable GitHub Pages
3. Configure automatic product updates

## How It Works

### Product Management
- All products stored in `products.json`
- Loaded dynamically on page load
- Admin can add products via admin panel
- New products automatically saved to GitHub
- GitHub Actions ensures all users see updates

### Customer Workflow
1. Browse products
2. Click "Quick View" for details
3. Click "Buy" button
4. Enter name and contact number
5. WhatsApp opens with pre-filled order details
6. Message sent to: **+91 97222 25135**

### Admin Workflow
1. Activate admin mode (Ctrl+Shift+A)
2. Configure GitHub (Ctrl+Shift+G) - one time only
3. Click "+ Add New Product"
4. Fill in product details
5. Product automatically saves to GitHub
6. All visitors see the new product

## Files Structure

```
ambika/
├── index.html              # Main HTML file
├── styles.css             # Styling
├── script.js              # JavaScript functionality
├── products.json          # Product database
├── .github/
│   └── workflows/
│       └── update-products.yml  # GitHub Actions workflow
├── SETUP_INSTRUCTIONS.md  # Detailed setup guide
└── README.md             # This file
```

## Configuration

### Change Admin Password
Edit `script.js`, line ~199:
```javascript
if (password === 'ambika123') {
```

### Change WhatsApp Number
Edit `script.js`, line ~99:
```javascript
const businessWhatsApp = '919722225135';
```

### Add/Remove Product Categories
Edit filter buttons in `index.html` and update the category dropdown in the add product form.

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- GitHub API
- GitHub Actions
- GitHub Pages

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Security Notes

- GitHub token stored in browser localStorage
- Only accessible in admin mode
- Token never exposed to regular users
- Use personal access tokens with minimal permissions

## Support

For issues or questions:
1. Check `SETUP_INSTRUCTIONS.md`
2. Verify GitHub Actions status in repository
3. Check browser console for errors (F12)

## License

Personal use for Ambika Creations.

---

**Ambika Creations** - Handcrafted Jewelry Since 2001
