<div align="center">
  <br />
  <h1>✨ Udit R. Kashyap — Portfolio v2.0</h1>
  <p>
    <strong>A highly interactive, premium editorial portfolio.</strong>
  </p>
  <p>
    <a href="https://portfolio-jade-rho-23.vercel.app/"><img src="https://img.shields.io/badge/Live%20Preview-Visit%20Site-FF4757?style=for-the-badge&logo=vercel" alt="Live Preview" /></a>
  </p>
  <br />
</div>

## 🪐 About The Project

This is a state-of-the-art interactive developer portfolio inspired by premium editorial layouts (like Valentin Gassend and NorthGarden). It abandons the standard "grid of cards" in favor of fluid, physics-based interactions, smooth scrolling, and dynamic geometric typography.

The site is engineered for performance, achieving buttery-smooth 60fps animations by leveraging hardware-accelerated transforms and smart GSAP `ScrollTrigger` batching.

## ⚡ Key Features

- **Fluid Smooth Scrolling:** Powered by `Lenis` for a frictionless, momentum-based scrolling experience.
- **Physics-Based Interactions:** Magnetic buttons and a 3D trackball star that responds to both mouse movement and touch swipes.
- **Dynamic Preloader & Transitions:** Line-drawing preloader that seamlessly reveals the site's layout, ensuring fonts and assets are ready before interaction.
- **Intelligent Custom Cursor:** A highly responsive `mix-blend-mode` cursor that morphs over interactive elements, and gracefully degrades on mobile touch devices.
- **Editorial Typography:** Massive, responsive typography utilizing `clamp()` for perfect scaling across all viewports.
- **Geometric Depth:** Animated SVG grid backgrounds that add subtle, technical depth to the canvas.

## 🛠 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation Engine:** [GSAP](https://gsap.com/) (GreenSock Animation Platform)
- **Scroll Physics:** [Lenis](https://lenis.darkroom.engineering/)
- **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

Make sure you have Node.js installed (v18.x or later).

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/uditrajkashyap442-beep/profile.git
   ```
2. Navigate into the directory
   ```sh
   cd profile
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the development server
   ```sh
   npm run dev
   ```
5. Open `http://localhost:3000` in your browser.

## 📱 Mobile Optimization

The site has undergone rigorous mobile optimization:
- Custom cursors are disabled on `pointer: coarse` devices to prevent stuck UI.
- All hover events fallback gracefully.
- The 3D trackball star accepts `touchmove` swipe gestures.
- Navigation overlays utilize dynamic viewport units (`dvh`) to prevent vertical clipping.

<br />
<div align="center">
  <p>Designed and built with ❤️ by Udit R. Kashyap.</p>
</div>
