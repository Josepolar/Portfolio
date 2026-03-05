# Deployment Guide for Jose Bernard R. Fernandez Portfolio

This guide covers deployment options for your portfolio to production.

## Quick Start

1. **Copy `.env.example` to `.env`** and fill in your credentials
2. **Build the project**: `npm run build`
3. **Deploy the `dist/` folder** using one of the methods below

## Recommended: Vercel Deployment

Vercel is the official deployment platform for Vite projects and provides the best experience.

### Step 1: Push to GitHub

```bash
git push origin main
```

### Step 2: Connect to Vercel

Option A: **Via Vercel CLI**
```bash
npm install -g vercel
vercel
```

Option B: **Via Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Vite settings

### Step 3: Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

```
VITE_GITHUB_USERNAME = Josepolar
VITE_GITHUB_TOKEN = your_token
VITE_EMAILJS_SERVICE_ID = your_id
VITE_EMAILJS_TEMPLATE_ID = your_template
VITE_EMAILJS_PUBLIC_KEY = your_key
VITE_CONTACT_EMAIL = josebernardfernandez@gmail.com
```

### Step 4: Deploy

```bash
vercel --prod
```

Your portfolio will be available at: `https://your-project.vercel.app`

---

## Alternative: Netlify Deployment

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Set Environment Variables Locally

Create `.env` file with your variables

### Step 3: Build and Deploy

```bash
npm run build
netlify deploy --prod --dir=dist
```

Or connect your GitHub repository to Netlify directly.

---

## Alternative: GitHub Pages

### Step 1: Update vite.config.js

```javascript
export default {
  base: '/Portfolio/',  // if deploying to a subdirectory
  // ... rest of config
}
```

### Step 2: Build and Deploy

```bash
npm run build
git add dist
git commit -m "Deploy"
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to Repository Settings → Pages
2. Select "Deploy from a branch"
3. Choose `main` branch and `dist` folder

---

## Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and Run

```bash
docker build -t portfolio .
docker run -p 80:80 portfolio
```

---

## Production Checklist

- [ ] GitHub token with only `public_repo` scope
- [ ] EmailJS service properly configured
- [ ] All environment variables set
- [ ] Built successfully: `npm run build`
- [ ] No console errors in production build
- [ ] Test on multiple browsers
- [ ] Test contact form submission
- [ ] Verify GitHub repos are loading
- [ ] Check Lighthouse scores (target 90+)

### Lighthouse Testing

```bash
# Install lighthouse cli
npm install -g @lhci/cli@latest

# Run audit
lhci autorun
```

---

## Post-Deployment

### Monitor Performance

- Check Vercel Analytics (if using Vercel)
- Monitor GitHub API usage
- Track form submissions in EmailJS dashboard

### Update Portfolio

To update after deployment:

```bash
# Make changes
git commit -am "Update portfolio"
git push origin main

# Vercel/Netlify auto-deploy
# (Or manually deploy with: vercel --prod)
```

### Custom Domain

1. Buy domain from registrar (GoDaddy, Namecheap, etc.)
2. Add domain in deployment platform settings
3. Update DNS records as instructed
4. Wait for DNS propagation (24-48 hours)

---

## Troubleshooting

### 404 Errors After Deployment

For GitHub Pages, make sure `base` in `vite.config.js` matches your repository name.

### Environment Variables Not Loading

- Check spelling: `VITE_` prefix is required
- Redeploy after changing env vars
- Clear cache in browser

### API Rate Limiting

Add GitHub token to environment variables to increase limit from 60 to 5000 requests/hour.

### EmailJS Not Sending

- Verify Service ID and Template ID
- Check template has correct variables
- Test from [EmailJS dashboard](https://dashboard.emailjs.com/)

---

## Security Best Practices

1. **Never commit `.env` file**
2. **Use environment variables for secrets**
3. **Keep GitHub token scoped to minimum permissions**
4. **Regularly rotate tokens**
5. **Use HTTPS (all platforms provide this)**
6. **Monitor deployed app for errors**

---

## Support

For deployment issues:
- Check framework documentation: [Vite Docs](https://vitejs.dev/guide/ssr.html)
- Platform docs: [Vercel](https://vercel.com/docs), [Netlify](https://docs.netlify.com/), [GitHub Pages](https://docs.github.com/en/pages)
- Contact: josebernardfernandez@gmail.com

---

**Happy Deploying!** 🚀
