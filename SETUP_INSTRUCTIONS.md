# GitHub Actions Setup for Ambika Creations

This guide will help you set up automatic product updates using GitHub Actions.

## Prerequisites
- GitHub account
- Git installed on your computer

## Step 1: Create GitHub Repository

1. Go to https://github.com and log in
2. Click the "+" icon → "New repository"
3. Name it `ambika-creations` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. Click "Create repository"

## Step 2: Upload Your Website to GitHub

Open PowerShell in the `c:\ambika` folder and run:

```powershell
git init
git add .
git commit -m "Initial commit - Ambika Creations website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ambika-creations.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" → "Pages" (in left sidebar)
3. Under "Source", select "main" branch
4. Click "Save"
5. Your website will be live at: `https://YOUR-USERNAME.github.io/ambika-creations/`

## Step 4: Create GitHub Personal Access Token

1. Go to GitHub → Click your profile → "Settings"
2. Scroll down → Click "Developer settings" (bottom left)
3. Click "Personal access tokens" → "Tokens (classic)"
4. Click "Generate new token" → "Generate new token (classic)"
5. Give it a name: "Ambika Product Updates"
6. Set expiration: "No expiration" (or custom)
7. Select scopes:
   - ✅ **repo** (all checkboxes under it)
8. Click "Generate token"
9. **COPY THE TOKEN** - You won't see it again!

## Step 5: Configure the Website

1. Open your website in a browser (GitHub Pages URL)
2. Press **Ctrl+Shift+A** to activate admin mode
3. Enter password: `ambika123`
4. Press **Ctrl+Shift+G** to open GitHub configuration
5. Enter:
   - **GitHub Username**: Your GitHub username
   - **Repository Name**: `ambika-creations` (or what you named it)
   - **GitHub Token**: Paste the token you copied
6. Click "Save Configuration"

## Step 6: Test It!

1. Stay in admin mode
2. Click "+ Add New Product"
3. Fill in product details
4. Click "Add Product"
5. Wait 10-30 seconds
6. The product will be saved to GitHub
7. GitHub Actions will run automatically
8. Refresh the page - product appears for all users!

## How It Works

When you add a product:
1. JavaScript sends the update to GitHub API
2. Updates `products.json` file in your repository
3. GitHub Actions workflow detects the change
4. All visitors see the updated products

## Troubleshooting

**Products not appearing:**
- Check if GitHub token is correct
- Go to your repository → "Actions" tab to see workflow status
- Make sure repository is public
- Verify GitHub Pages is enabled

**Admin panel not showing:**
- Press **Ctrl+Shift+A** and enter password `ambika123`

**GitHub configuration not saving:**
- Press **Ctrl+Shift+G** to open config
- Make sure all fields are filled correctly
- Token should start with `ghp_`

## Security Notes

- Never share your GitHub token
- Token is stored in browser localStorage only
- Only works when you're in admin mode
- Users cannot see or access the token

## Advanced: Change Admin Password

Edit `script.js`, find line:
```javascript
if (password === 'ambika123') {
```

Change `ambika123` to your desired password.

## Support

If you encounter issues:
1. Check GitHub repository → Actions tab for errors
2. Open browser console (F12) to see error messages
3. Verify GitHub Pages is active and website is accessible
