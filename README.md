# Jose Bernard R. Fernandez - Developer Portfolio
Visit https://josepolardev.vercel.app/

A world-class, GitHub-connected software developer portfolio built with React, Vite, Tailwind CSS, and Framer Motion. This is a living developer identity showcasing full-stack expertise, featuring live GitHub integration, animated sections, and a professional contact system.

## ✨ Features

- **Dynamic GitHub Integration**: Real-time repository fetching with filtering and search
- **Animated Hero Section**: Cycling through developer roles with smooth transitions
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Professional UI**: Dark theme with teal and amber accents, glassmorphism effects
- **GitHub Stats**: Live follower and repository count from GitHub API
- **Featured Projects**: Showcase of 3 pinned projects with achievements
- **Skills Matrix**: Organized skill categories with visual badges
- **Experience Timeline**: Interactive career journey visualization
- **Contact Form**: EmailJS integration for direct messaging
- **Performance Optimized**: Lighthouse-ready with optimized bundle size

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS v3
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Forms**: EmailJS for contact form
- **Deployment**: Vercel-ready
- **Styling**: Tailwind CSS with custom configuration

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will be available at `http://localhost:5173`

## 📋 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# GitHub Configuration
VITE_GITHUB_USERNAME=Josepolar
VITE_GITHUB_TOKEN=your_github_token_here

# EmailJS Configuration (optional, but recommended)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Contact Email
VITE_CONTACT_EMAIL=josebernardfernandez@gmail.com
```

### GitHub Token (Optional but Recommended)

To fetch your repositories without rate limiting:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Create a new token with `public_repo` scope
3. Copy the token and add it to `.env` as `VITE_GITHUB_TOKEN`

This increases API rate limit from 60 to 5000 requests per hour.

### EmailJS Setup (For Contact Form)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template with variables: `from_name`, `from_email`, `message`, `to_email`
4. Copy your Service ID, Template ID, and Public Key
5. Add them to `.env`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── SkillsMatrix.jsx
│   ├── FeaturedProjects.jsx
│   ├── GitHubRepos.jsx
│   ├── Timeline.jsx
│   └── Contact.jsx
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles with Tailwind

public/                # Static assets
dist/                  # Build output
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to modify the color scheme:

```javascript
colors: {
  'dark-bg': '#0A0E1A',      // Main background
  'dark-secondary': '#1A1F3A', // Secondary background
  'accent-teal': '#00D4FF',   // Primary accent
  'accent-amber': '#F5A623',  // Secondary accent
}
```

### Content

Update component content directly:

- **Hero roles**: Edit `src/components/Hero.jsx` - `roles` array
- **Skills**: Edit `src/components/SkillsMatrix.jsx` - `skillGroups` array
- **Featured Projects**: Edit `src/components/FeaturedProjects.jsx` - `featuredProjects` array
- **Timeline**: Edit `src/components/Timeline.jsx` - `timeline` array
- **Contact info**: Edit `src/components/Contact.jsx` - `contactLinks` array

## 📊 Performance

Build output:
- CSS: ~6.5 KB (gzipped: ~1.9 KB)
- JS: ~395 KB (gzipped: ~128 KB)
- Total: Optimized for fast loading

Target Lighthouse Scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

```bash
# Build the project
npm run build

# Deploy dist folder to gh-pages branch
```

## 📝 Environment Setup for Deployment

When deploying, make sure to set environment variables:

**Vercel Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env`

**Netlify:**
1. Go to Site Settings → Build & Deploy → Environment
2. Add all variables from `.env`

## 🔒 Security Notes

- Never commit `.env` file with real tokens
- GitHub token should have minimal scopes
- Use environment variables for all sensitive data
- Contact form data is processed securely

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize for your own use.

## 📄 License

This project is personal work. Feel free to use as inspiration for your own portfolio.

## 🎯 Future Planned Features

- Dark/Light theme toggle
- Blog section with markdown support
- Contribution heatmap visualization
- More detailed project case studies
- Video/GIF demonstrations
- Client testimonials section

## 🐛 Troubleshooting

### GitHub API Rate Limiting
If you see too many requests errors:
- Add a GitHub token to `.env` (increases limit to 5000/hr)
- Data is cached in localStorage with 5-minute TTL

### EmailJS Not Working
- Verify Service ID, Template ID, and Public Key
- Check email template has correct variable names
- Test on EmailJS dashboard first

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📞 Support

For questions or issues:
- Email: josebernardfernandez@gmail.com
- GitHub: [@Josepolar](https://github.com/Josepolar)

---

**Built with precision and crafted with care** ✨
