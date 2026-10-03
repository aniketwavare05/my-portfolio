# 🚀 NexusFlow - Responsive Startup Landing Page

A modern, high-converting, and fully responsive landing page for **NexusFlow** — a fictional next-generation autonomous cloud orchestration and workflow automation platform.

Built from the ground up using semantic **HTML5**, modern **CSS3** (utilizing both **CSS Grid** and **Flexbox**), and vanilla **JavaScript**.

---

## 📋 Task 2 Requirements & Implementation Checklist

| Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **Fully Responsive** | Fluid layout tested on mobile (<480px), tablet (768px–1024px), and desktop (>1024px) with custom mobile navigation drawer and hamburger animation | ✅ Complete |
| **Flexbox Usage** | Applied for navigation bars, action buttons, hero CTA groups, author tags, pricing toggle switch, micro-metrics, and footer bottom bar | ✅ Complete |
| **CSS Grid Usage** | Applied for Bento Grid feature cards, multi-column metric ribbon, testimonials grid, 3-tier pricing table, and multi-column footer layout | ✅ Complete |
| **Header Section** | Brand logo with custom SVG, navigation links with smooth scrollspy, dark/light mode toggle, and responsive mobile menu | ✅ Complete |
| **Feature Highlights** | Bento Grid with code syntax preview, zero-trust security cards, real-time observability, and interactive tabbed deep dive | ✅ Complete |
| **Testimonials Section**| Real-world style quote cards with star ratings, verified tags, author portraits, roles, plus a featured spotlight quote | ✅ Complete |
| **Footer Section** | Multi-column grid containing product links, developer resources, company info, live status pill, newsletter form, and social channels | ✅ Complete |
| **Tools Used** | Semantic HTML5, Modern CSS3 (Custom Properties / Variables), and Vanilla ES6+ JavaScript | ✅ Complete |

---

## 🎨 Layout Architecture: CSS Grid & Flexbox

This project carefully demonstrates the distinct strengths of both **CSS Grid** (for 2D macro layouts) and **Flexbox** (for 1D directional alignment and micro components):

### 1. Where CSS Grid is Used
- **Hero Split**: Desktop 2-column grid (`display: grid; grid-template-columns: 1.05fr 0.95fr;`) pairing the value proposition with the interactive SVG dashboard mockup.
- **Metrics Ribbon**: 4-column responsive grid (`display: grid; grid-template-columns: repeat(4, 1fr);`) adapting down to 2 columns on tablet and 1 on mobile.
- **Features Bento Grid**: Modular 3-column grid (`grid-template-columns: repeat(3, 1fr)`) with featured items spanning 2 columns (`grid-column: span 2;`).
- **Interactive Feature Tabs**: 2-column layout (`grid-template-columns: 1.2fr 0.8fr;`) pairing textual deep dive with interactive diagrams.
- **How It Works Timeline**: 3-column chronological sequence cards.
- **Testimonials Grid**: 3-column card grid (`grid-template-columns: repeat(3, 1fr);`) stacking into single column on mobile.
- **Pricing Cards Grid**: 3-column comparison grid with elevated popular tier.
- **Footer**: Multi-column grid (`grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;`) organizing brand information, product links, resources, legal, and newsletter.

### 2. Where Flexbox is Used
- **Header & Navbar**: `display: flex; justify-content: space-between; align-items: center;` keeping logo, nav links, and action buttons aligned.
- **Top Announcement Bar**: Centering announcement pill, release message, and link with wrapping.
- **Hero Action Buttons**: `display: flex; gap: var(--space-md);` arranging primary and secondary CTA buttons.
- **Trust Badges & Micro-proof**: Aligns green check icons with compliance text.
- **Partner Logos**: `display: flex; justify-content: space-around;` for clean logo alignment.
- **Testimonial Meta**: Aligns reviewer avatars with names, titles, and verified badges.
- **Pricing Switch**: Aligns monthly/yearly labels with the toggle switch.
- **Footer Bottom Bar**: Aligns copyright notice and social media icon buttons across left and right edges.

---

## 📁 Project Structure

```text
landing-page/
├── index.html                  # Semantic HTML5 document structure
├── style.css                   # Design tokens, CSS Grid, Flexbox, dark/light theme, media queries
├── script.js                   # Theme toggle, mobile drawer, pricing switch, tabs, toast notifications
├── README.md                   # Project documentation and guide
└── assets/
    ├── logo.svg                # NexusFlow brand logo with gradient icon
    ├── dashboard-preview.svg   # High-fidelity SVG dashboard preview mockup
    ├── avatar-1.svg            # Sarah Jenkins portrait illustration
    ├── avatar-2.svg            # David Chen portrait illustration
    ├── avatar-3.svg            # Elena Rostova portrait illustration
    └── avatar-4.svg            # Marcus Brody portrait illustration
```

---

## 🌓 Dark & Light Theme Support

The landing page features built-in **Dark** and **Light** mode:
- Defaults to the user's OS preference (`prefers-color-scheme`).
- Toggle button in the header allows manual switching between themes.
- User preference is saved in `localStorage` (`nexusflow_theme`) and persists across page reloads.

---

## 🚀 How to Run Locally

### Option 1: Direct File Opening (Fastest)
1. Open the file explorer to `D:\Projects\landing-page\`.
2. Double-click `index.html` to open it in Chrome, Edge, Firefox, or Safari.

### Option 2: VS Code Live Server
1. Open the `landing-page` folder in Visual Studio Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and select **"Open with Live Server"**.

### Option 3: Python Built-in HTTP Server
Run the following in PowerShell or Terminal inside `D:\Projects\landing-page`:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🌐 Free Deployment Options

### Method 1: GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` and save.
4. Your site will be published at `https://<username>.github.io/<repo-name>/landing-page/`.

### Method 2: Netlify (Drag & Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `landing-page` folder into the drop zone.
3. Your landing page is instantly live with a free custom URL and SSL certificate!

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
