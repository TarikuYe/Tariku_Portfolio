# Portfolio Website

A modern, responsive, and interactive portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Clean design with glassmorphism, gradients, and smooth animations.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Dark/Light Mode**: System-aware theme toggle.
- **Interactive**: Smooth scrolling, scroll reveal animations, and interactive cards.
- **EmailJS Integration**: Contact form ready to connect with EmailJS.
- **Project Filtering**: Filter projects by category or tech stack.

## 🛠️ Tech Stack

- **React**: UI Library
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Lucide React**: Icons
- **EmailJS**: Form handling

## 🏃‍♂️ Getting Started

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Start the development server**
    ```bash
    npm run dev
    ```

3.  **Build for production**
    ```bash
    npm run build
    ```

## 📧 EmailJS Setup

To make the contact form functional:

1.  Sign up at [EmailJS](https://www.emailjs.com/).
2.  Create a Service and a Template.
3.  Open `src/components/Contact.jsx`.
4.  Uncomment the `emailjs.sendForm` block.
5.  Replace `'YOUR_SERVICE_ID'`, `'YOUR_TEMPLATE_ID'`, and `'YOUR_PUBLIC_KEY'` with your actual credentials.

## 📝 Customization

- **Project Data**: Update `src/data/portfolio.js` with your own projects, skills, and experience.
- **Images**: Place your images in `src/assets` and refer to them in the data file.
