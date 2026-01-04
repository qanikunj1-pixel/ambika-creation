# Quick Setup Script for Ambika Creations

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Ambika Creations - GitHub Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "This script will help you set up your GitHub repository." -ForegroundColor Yellow
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"

# Get repository name
$repoName = Read-Host "Enter repository name (default: ambika-creations)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "ambika-creations"
}

Write-Host ""
Write-Host "Setting up Git repository..." -ForegroundColor Cyan

# Initialize git if not already initialized
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✓ Git repository already exists" -ForegroundColor Green
}

# Add all files
git add .
Write-Host "✓ Files added to staging" -ForegroundColor Green

# Commit
git commit -m "Initial commit - Ambika Creations website"
Write-Host "✓ Initial commit created" -ForegroundColor Green

# Rename branch to main
git branch -M main
Write-Host "✓ Branch renamed to main" -ForegroundColor Green

# Add remote
$remoteUrl = "https://github.com/$username/$repoName.git"
try {
    git remote add origin $remoteUrl
    Write-Host "✓ Remote repository added: $remoteUrl" -ForegroundColor Green
} catch {
    Write-Host "! Remote 'origin' already exists, updating..." -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
    Write-Host "✓ Remote URL updated" -ForegroundColor Green
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create a repository on GitHub:" -ForegroundColor Yellow
Write-Host "   - Go to https://github.com/new" -ForegroundColor White
Write-Host "   - Repository name: $repoName" -ForegroundColor White
Write-Host "   - Make it PUBLIC (required for free GitHub Pages)" -ForegroundColor White
Write-Host "   - Click 'Create repository'" -ForegroundColor White
Write-Host ""
Write-Host "2. After creating the repository, run this command:" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Green
Write-Host ""
Write-Host "3. Enable GitHub Pages:" -ForegroundColor Yellow
Write-Host "   - Repository → Settings → Pages" -ForegroundColor White
Write-Host "   - Source: main branch" -ForegroundColor White
Write-Host "   - Click Save" -ForegroundColor White
Write-Host ""
Write-Host "4. Create GitHub Personal Access Token:" -ForegroundColor Yellow
Write-Host "   - https://github.com/settings/tokens" -ForegroundColor White
Write-Host "   - Generate new token (classic)" -ForegroundColor White
Write-Host "   - Select 'repo' scope" -ForegroundColor White
Write-Host "   - Copy the token" -ForegroundColor White
Write-Host ""
Write-Host "5. Configure website:" -ForegroundColor Yellow
Write-Host "   - Open: https://$username.github.io/$repoName/" -ForegroundColor White
Write-Host "   - Press Ctrl+Shift+A (password: ambika123)" -ForegroundColor White
Write-Host "   - Press Ctrl+Shift+G to configure GitHub" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, see SETUP_INSTRUCTIONS.md" -ForegroundColor Cyan
Write-Host ""

pause
