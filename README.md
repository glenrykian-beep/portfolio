# GIG - Personal Portfolio

A modern, responsive personal portfolio built with React, Vite, and Tailwind CSS. Designed with a premium dark aesthetic for showcasing web development, data analytics, AI automation projects, and workspace equipment.

## ✨ Features

- **Dark & Light Mode**: Seamless theme toggling with system preference detection and `localStorage` persistence.
- **Split Layout Architecture**:
  - **Services & Skills**: Combined two-column interface pairing solutions with technical capabilities.
  - **Education & Certifications**: Academic background paired with credential verification and image lightbox viewer.
- **Projects Showcase**: Interactive project cards with screenshot viewing and details modal.
- **Tech Equipment Gallery**: Visual hardware and setup gallery.
- **Secret Admin Panel**:
  - Discreet 5-click logo access trigger.
  - In-place editing for Hero, Services, Equipment, and Contact channels.
  - Direct screenshot and image upload tool in admin mode.
  - Changes persist locally via browser storage.
- **Responsive & Accessible**: Mobile hamburger menu, smooth scrolling, and accessible focus states.

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## 🔒 Environment Setup

Copy `.env.example` to `.env` to configure optional contact form submissions:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```
