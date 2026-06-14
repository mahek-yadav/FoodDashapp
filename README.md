# FoodDashapp

FoodDash is a modern, Indian-centric food delivery web application built using React.js. The platform provides a seamless food ordering experience with restaurant discovery, dish customization, shopping cart management, guided checkout, and real-time delivery tracking simulation.

The project was developed as part of a React.js frontend development project and focuses on delivering a premium UI/UX inspired by modern food delivery platforms.

##  Live Demo

🔗 Live Website: https://food-dashapp.vercel.app/

---

#  Project Description

FoodDash is a fast and intuitive food delivery platform designed specifically for Indian users. The application allows users to browse restaurants, explore food categories, customize dishes, add items to a persistent shopping cart, calculate delivery costs, and track orders through a simulated real-time delivery experience.

The project emphasizes:

* Modern responsive design
* Smooth animations and interactions
* Indian restaurants and cuisines
* User-friendly ordering workflow
* Mobile-first experience
* High-performance React architecture

---

#  Features

## Mandatory Features

### 1. Sticky Menu Bar

* Sticky navigation menu
* Highlights active food category while scrolling
* Smooth section navigation

### 2. Custom Dish Builder

* Dish customization modal
* Toppings selection
* Spice level selection
* Add-ons
* Portion customization
* Real-time price updates
* Allergen filtering

### 3. Guided Checkout Process

Multi-step checkout flow:

* Delivery Address
* Delivery Slot Selection
* Payment Method
* Order Review
* Order Confirmation

### 4. Smooth Restaurant Listing

* Responsive restaurant cards
* Optimized rendering
* Smooth scrolling experience
* Fast loading UI

### 5. Instant Delivery Cost Calculator

* Calculates delivery charges
* Dynamic fee estimation
* Estimated delivery time display

### 6. Permanent Shopping Cart

* Cart persists across pages
* Maintains selected items
* Real-time cart updates

### 7. Special Instructions Box

Users can add custom instructions such as:

* Extra spicy
* Less oil
* No onion
* Separate packaging

### 8. Mock Driver Tracking

* Simulated delivery tracking
* Order status updates
* ETA display
* Interactive tracking experience

---

## Additional Features

* Modern Hero Section
* Featured Dishes
* Popular Restaurants
* Customer Reviews
* Wishlist/Favorites
* Search Functionality
* Restaurant Filtering
* Responsive Mobile UI
* Dark Theme Design
* Framer Motion Animations
* Interactive Components
* Smooth Page Transitions
* Context API State Management

---

#  Tech Stack

## Frontend

* React.js
* Vite
* React Router DOM
* Context API

## Styling

* Tailwind CSS
* Custom CSS

## Animations

* Framer Motion

## Icons

* Lucide React

## Deployment

* Vercel

---

#  Project Structure

```bash
FoodDash/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── food/
│   │   └── checkout/
│   │
│   ├── context/
│   │   ├── CartContext.jsx
│   │   ├── UserContext.jsx
│   │   ├── OrdersContext.jsx
│   │   ├── WishlistContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── NotificationsContext.jsx
│   │
│   ├── hooks/
│   ├── routes/
│   ├── pages/
│   ├── data/
│   └── App.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

#  Sample Restaurants

* Royal Biryani House – Hyderabad
* Spice Curry Cafe – Bengaluru
* Mumbai Masala Street – Mumbai
* Delhi Tandoor Express – New Delhi
* Punjabi Zaika – Chandigarh
* Chennai Dosa Corner – Chennai
* Kolkata Kathi Rolls – Kolkata

---

# 🍽️ Sample Food Categories

* North Indian
* South Indian
* Street Food
* Biryani
* Chinese
* Pizza
* Burgers
* Desserts
* Beverages

---

#  Screenshots

## Home Page
<img width="2938" height="1658" alt="image" src="https://github.com/user-attachments/assets/9d32d6a1-68fa-4c51-9588-800f9b3a1193" />
<img width="2924" height="1660" alt="image" src="https://github.com/user-attachments/assets/a24acfab-6fee-4749-83be-244b1684760a" />
<img width="2922" height="1242" alt="image" src="https://github.com/user-attachments/assets/269d5aa2-bcbd-4e56-b789-a438a44317ed" />
<img width="2202" height="1654" alt="image" src="https://github.com/user-attachments/assets/0148de83-52ae-4062-beea-70bb86d2f759" />
<img width="2140" height="1614" alt="image" src="https://github.com/user-attachments/assets/c798ae7b-9388-4e03-8e48-dcebc01889e6" />
<img width="2210" height="1664" alt="image" src="https://github.com/user-attachments/assets/e810695c-1e1a-41f8-a6ee-26807c9999cb" />
<img width="2248" height="606" alt="image" src="https://github.com/user-attachments/assets/0ba3befc-9aa6-4b91-bd7e-1c6558eb8fe7" />

## Restaurant Listing
<img width="2266" height="1540" alt="image" src="https://github.com/user-attachments/assets/fd3af711-5f9a-4a9e-9285-6add45c05ca2" />
<img width="2168" height="1520" alt="image" src="https://github.com/user-attachments/assets/80342dbd-9171-4d79-825b-08d75ec32f4e" />
<img width="2124" height="1438" alt="image" src="https://github.com/user-attachments/assets/be341bb4-2759-4d3e-a34c-65443b3017af" />

## Dish Customization
<img width="2064" height="954" alt="image" src="https://github.com/user-attachments/assets/a138aa05-cd8e-4a0e-b939-17df14a0fc4e" />
<img width="2152" height="1240" alt="image" src="https://github.com/user-attachments/assets/336d2bae-5e84-42d2-9837-822aaab77c3b" />

## Shopping cart
<img width="806" height="1656" alt="image" src="https://github.com/user-attachments/assets/5bf3dbe8-1a07-4fb4-8be4-7a2f78fc7544" />

## Checkout Flow
<img width="2130" height="1322" alt="image" src="https://github.com/user-attachments/assets/13e0f21d-bc28-40e7-807a-3201d762209d" />

## Order Tracking
<img width="2194" height="1600" alt="image" src="https://github.com/user-attachments/assets/8c452507-c011-45c4-ae88-8dc9524d7c1c" />


---

#  Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/mahek-yadav/FoodDashapp.git
```

## 2. Navigate to Project Folder

```bash
cd FoodDashapp
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Start Development Server

```bash
npm run dev
```

## 5. Open Browser

```bash
http://localhost:5173
```

---

#  Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

#  Responsive Design

FoodDash is fully responsive and optimized for:

* Desktop
* Laptop
* Tablet
* Mobile Devices

---

#  Learning Outcomes

This project demonstrates:

* React Component Architecture
* State Management using Context API
* React Router Navigation
* Responsive UI Development
* Framer Motion Animations
* Modern Frontend Development Practices
* Food Delivery Workflow Design
* User Experience Design

---

#  Author

Developed by Mahek Yadav

---

#  License

This project is created for educational and learning purposes.
