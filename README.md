# 📦 Campus Lost & Found App

A modern web application that helps students and staff report, search, and recover lost items within a campus. Designed with a clean UI and smooth user experience, this platform makes the lost-and-found process simple and efficient.

---

#🔗 Live Demo: https://campus-lost-and-found-zeta.vercel.app/login
---

## 🚀 Features

- 🔐 User Authentication (Firebase Auth)
- 📢 Report Lost & Found Items with details and images
- 🔍 Search and filter items بسهولة
- 📂 Clean and structured item listings
- 🎨 Responsive and modern UI (Tailwind CSS + UI libraries)
- ⚡ Fast performance using Vite

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- TypeScript
- Tailwind CSS
- Radix UI / Material UI
- Framer Motion

**Backend / Services:**
- Firebase (Authentication + Firestore)

**Libraries:**
- React Router
- React Hook Form
- Lucide Icons
- Recharts

---

## 📁 Project Structure
src/
├── components/
├── pages/
├── hooks/
├── lib/
public/


---

## ⚙️ Installation & Setup

### 1. Clone the repository

git clone https://github.com/your-username/lost-found-app.git
cd lost-found-app

## 2. Install dependencies
npm install

## 3. Setup environment variables

Create a .env.local file:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

## 4. Run the app
npm run dev
