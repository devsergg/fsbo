# GitHub Repository Setup Guide

## Quick Setup Steps

### 1. Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** button in the top right → **"New repository"**
3. Repository settings:
   - **Repository name**: `fsbo-platform`
   - **Description**: `For Sale By Owner (FSBO) Platform - A comprehensive real estate platform for homeowners to sell properties independently`
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### 2. Connect Local Repository to GitHub
After creating the repository, run these commands in your terminal:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/fsbo-platform.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 3. Verify Upload
1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. Check that the README.md displays properly

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
# Create repository and push in one command
gh repo create fsbo-platform --public --push --source=.
```

## Next Steps After GitHub Setup

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select your `fsbo-platform` repository

2. **Set up automatic deployments**:
   - Every push to `main` will trigger a new deployment
   - Pull requests will create preview deployments

3. **Add collaborators** (if needed):
   - Go to repository Settings → Manage access
   - Invite team members

## Repository Features to Enable

- **Issues**: For bug tracking and feature requests
- **Discussions**: For community Q&A
- **Wiki**: For additional documentation
- **Actions**: For CI/CD workflows (optional)

## Recommended Branch Protection

1. Go to Settings → Branches
2. Add rule for `main` branch:
   - Require pull request reviews
   - Require status checks to pass
   - Restrict pushes to matching branches

## Environment Variables Security

⚠️ **Important**: Never commit `.env` files to GitHub!

- The `.gitignore` file already excludes all `.env*` files
- Use Vercel dashboard or GitHub Actions secrets for production environment variables
- For local development, create `.env` files locally (they won't be committed)

---

Once GitHub is set up, you can proceed with Vercel deployment using the repository URL! 