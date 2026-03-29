# 🛒 ClassyShop – Full-Stack E-Commerce Platform

A complete, production-ready e-commerce platform with a **Customer Storefront**, **Admin Dashboard**, and **Backend API Server**. Built with the **MERN Stack** (MongoDB, Express, React, Node.js) + Material-UI, TailwindCSS, PayPal Payments, Google OAuth, and more.

---

## 🖥️ Live Demo

| App | URL |
|-----|-----|
| 🛍️ **Customer Storefront** | [`https://classyshop.onrender.com`](https://classyshop.onrender.com) |

---

## 🎬 Demo Previews

### Customer Storefront

![ClassyShop Homepage Demo](./my-project/screenshots/home-scroll.gif)

### Admin Dashboard

![ClassyShop Admin Dashboard Demo](./Admin/screenshots/admin-dashboard.gif)

---

## 📸 Screenshots

<details>
<summary><b>🛍️ Customer Storefront Screenshots</b></summary>

<details>
<summary>🏠 Home Page - Hero Slider & Categories</summary>

![Home Page](./my-project/screenshots/home-page.png)

</details>

<details>
<summary>🔥 Home Page - Popular Products</summary>

![Popular Products](./my-project/screenshots/home-popular-products.png)

</details>

<details>
<summary>⭐ Home Page - Featured Products</summary>

![Featured Products](./my-project/screenshots/home-featured.png)

</details>

<details>
<summary>🛍️ Product Listing</summary>

![Product Listing](./my-project/screenshots/product-listing.png)
![Product Listing GIF](./my-project/screenshots/product-listing-scroll.gif)

</details>

<details>
<summary>📦 Product Details</summary>

![Product Details](./my-project/screenshots/product-details.png)

</details>

<details>
<summary>🛒 Shopping Cart</summary>

![Cart Page](./my-project/screenshots/cart-page.png)

</details>

<details>
<summary>🔑 Login & Register</summary>

![Login Page](./my-project/screenshots/login-page.png)
![Register Page](./my-project/screenshots/register-page.png)

</details>

<details>
<summary>📱 Mobile Responsive</summary>

![Mobile Home](./my-project/screenshots/mobile-home.png)
![Mobile Product Details](./my-project/screenshots/mobile-product-details.png)

</details>

</details>

<details>
<summary><b>⚙️ Admin Dashboard Screenshots</b></summary>

<details>
<summary>📊 Dashboard – Analytics & Stats</summary>

![Dashboard](./Admin/screenshots/dashboard.png)
![Dashboard](./Admin/screenshots/dashboard2.png)

</details>

<details>
<summary>📦 Product Management</summary>

![Product List](./Admin/screenshots/product-list.png)
![Add Product](./Admin/screenshots/add-product.png)
![Add Product](./Admin/screenshots/add-product2.png)
![Edit Product](./Admin/screenshots/edit-product.png)
![Edit Product](./Admin/screenshots/edit-product2.png)
![Edit Product](./Admin/screenshots/edit-product3.png)

</details>

<details>
<summary>📦 Product Details</summary>

![Product Details](./Admin/screenshots/product-details.png)

</details>

<details>
<summary>📂 Category Management</summary>

![Category List](./Admin/screenshots/category-list.png)
![Add Category](./Admin/screenshots/add-category.png)
![Edit Category](./Admin/screenshots/edit-category.png)

</details>

<details>
<summary>📋 Order Management</summary>

![Orders](./Admin/screenshots/orders.png)
![Orders](./Admin/screenshots/orders2.png)

</details>

<details>
<summary>👥 User Management</summary>

![Users](./Admin/screenshots/users.png)

</details>

<details>
<summary>🖼️ Banner & Slider Management</summary>

![Home Slider](./Admin/screenshots/home-slider.png)
![Banner V1 Management](./Admin/screenshots/banner-v1-management.png)
![Add Banner V1](./Admin/screenshots/add-banner-v1.png)
![Edit Banner V1](./Admin/screenshots/edit-banner-v1.png)
![Banner V2 Management](./Admin/screenshots/banner-v2-management.png)
![Add Banner V2](./Admin/screenshots/add-banner-v2.png)
![Edit Banner V2](./Admin/screenshots/edit-banner-v2.png)

</details>

<details>
<summary>📝 Blog Management</summary>

![Blog Management](./Admin/screenshots/blog-management.png)
![Add Blog](./Admin/screenshots/add-blog.png)
![Edit Blog](./Admin/screenshots/edit-blog.png)

</details>

<details>
<summary>🔑 Login & Authentication</summary>

![Login Page](./Admin/screenshots/login-page.png)
![Sign Up Page](./Admin/screenshots/signup-page.png)

</details>

<details>
<summary>📱 Mobile Responsive</summary>

![Mobile Dashboard](./Admin/screenshots/mobile-dashboard.png)
![Mobile Dashboard](./Admin/screenshots/mobile-dashboard2.png)
![Mobile Dashboard](./Admin/screenshots/mobile-dashboard3.png)
![Mobile Dashboard](./Admin/screenshots/mobile-dashboard4.png)
![Mobile Sidebar](./Admin/screenshots/mobile-sidebar.png)

</details>

</details>

---

## ✨ Features Overview

### 🛍️ Customer Storefront (`my-project/`)

- **Authentication** – Email/password, Google OAuth, OTP verification, forgot password
- **Home Page** – Hero slider, category carousel, popular/featured products, banners, blog
- **Product Browsing** – Grid/List view, advanced filtering, sorting, pagination, full-text search
- **Product Details** – Image gallery with zoom, variants (RAM/Size/Weight), reviews, related products
- **Shopping Cart** – Slide-in cart drawer, quantity controls, real-time price updates
- **Checkout & Payments** – Address selection, PayPal integration, Cash on Delivery
- **My Account** – Profile management, address book, order history, wishlist
- **Responsive Design** – Mobile-first, hamburger navigation, touch-friendly UI
- **Performance** – Skeleton loading, lazy loading, debounced inputs

### ⚙️ Admin Dashboard (`Admin/`)

- **Dashboard** – Analytics overview, charts & graphs (Recharts), quick stats
- **Product Management** – CRUD operations, multi-image upload, variant management (RAM/Size/Weight)
- **Category Management** – Hierarchical categories (3 levels), image upload
- **Banner Management** – Banner V1 & V2 with image upload and alignment options
- **Home Slider Management** – Homepage banner slider management
- **Blog Management** – WYSIWYG editor, image upload
- **Order Management** – Order tracking, status updates with badges
- **User Management** – User listing, status management
- **Profile Management** – Admin profile with avatar upload
- **Responsive Design** – Collapsible sidebar, mobile-friendly

### 🖥️ Backend API Server (`server/`)

- **RESTful API** – Express.js v5 with 11 route modules
- **Authentication** – JWT (access + refresh tokens), Google OAuth, OTP email verification
- **Database** – MongoDB with Mongoose ODM (16 models)
- **File Uploads** – Multer + Cloudinary CDN
- **Payments** – PayPal SDK with INR-to-USD conversion
- **Email Service** – Nodemailer + SendGrid for OTP & verification
- **Security** – Helmet headers, bcrypt password hashing, CORS
- **Order Management** – Status workflow (pending → confirm → shipped → delivered)

---

## 🛠️ Tech Stack

### Frontend (Shared)

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library |
| **Vite 7** | Build tool + dev server with HMR |
| **React Router DOM 7** | Client-side routing |
| **Material-UI (MUI) 7** | Component library |
| **TailwindCSS 4** | Utility-first CSS |
| **Firebase 12** | Google OAuth authentication |
| **Axios** | HTTP client |
| **Swiper 12** | Touch slider / carousel |
| **React Hot Toast** | Toast notifications |
| **React Icons** | Icon library |

### Customer Storefront (Additional)

| Technology | Purpose |
|-----------|---------|
| **Styled Components** | CSS-in-JS styling |
| **React Inner Image Zoom** | Product image zoom |
| **React International Phone** | Phone number input |
| **React Range Slider** | Price range filter |
| **React Collapse** | Collapsible category panels |
| **PayPal JS SDK** | Payment processing |

### Admin Dashboard (Additional)

| Technology | Purpose |
|-----------|---------|
| **Emotion** | CSS-in-JS styling (MUI) |
| **Recharts** | Charts & data visualization |
| **React Simple WYSIWYG** | Rich text editor for blogs |
| **React Lazy Load Image** | Lazy image loading |

### Backend

| Technology | Purpose |
|-----------|---------|
| **Express.js v5** | Web framework |
| **MongoDB / Mongoose** | Database & ODM |
| **JWT** | Authentication (access + refresh tokens) |
| **Cloudinary** | Image storage & CDN |
| **PayPal SDK** | Payment processing |
| **Multer** | File upload handling |
| **Bcrypt** | Password hashing |
| **Nodemailer + SendGrid** | Email service |
| **Helmet** | Security headers |
| **Morgan** | HTTP request logging |

---

## 📁 Project Structure

```
shopifyshop/
├── my-project/                      # 🛍️ Customer Storefront (React + Vite)
│   ├── src/
│   │   ├── components/              # 25+ reusable components
│   │   ├── Pages/                   # 13 page components
│   │   ├── utils/api.js             # API utility functions
│   │   ├── App.jsx                  # Routes + Context Provider
│   │   └── firebase.jsx             # Firebase config
│   ├── screenshots/                 # Storefront screenshots
│   ├── .env                         # Environment variables
│   └── package.json
│
├── Admin/                           # ⚙️ Admin Dashboard (React + Vite)
│   ├── src/
│   │   ├── Components/              # 10+ reusable components
│   │   ├── Pages/                   # 14 page modules
│   │   ├── utils/api.js             # API utility functions
│   │   ├── App.jsx                  # Routes + Context Provider
│   │   └── firebase.jsx             # Firebase config
│   ├── screenshots/                 # Admin screenshots
│   ├── .env                         # Environment variables
│   └── package.json
│
├── server/                          # 🖥️ Backend API (Express + MongoDB)
│   ├── config/                      # DB connection, email config
│   ├── controllers/                 # 11 controllers
│   ├── middlewares/                  # Auth & file upload middleware
│   ├── models/                      # 16 Mongoose models
│   ├── router/                      # 11 route modules
│   ├── utils/                       # Token generators, email templates
│   ├── index.js                     # Express app entry point
│   ├── .env                         # Environment variables
│   └── package.json
│
└── README.md                        # 📖 This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or Atlas)
- **Firebase** project (for Google Auth)
- **Cloudinary** account (for image storage)
- **PayPal Developer** account (for payments)
- **SendGrid** account (for emails)

### 1. Clone the Repository

```bash
git clone https://github.com/SatyamKumar-code/shopifyshop.git
cd shopifyshop
```

### 2. Setup Backend Server

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/ClassyifyDB

EMAIL=your_email@gmail.com
SENDGRID_API_KEY=your_sendgrid_api_key

JSON_WEB_TOKEN_SECRET_KEY=your_jwt_secret
SECRET_KEY_ACCESS_TOKEN=your_access_token_secret
SECRET_KEY_REFRESH_TOKEN=your_refresh_token_secret

cloudinary_Config_Cloud_Name=your_cloud_name
cloudinary_Config_api_key=your_api_key
cloudinary_Config_api_secret=your_api_secret

EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key

PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID_SANDBOX=your_sandbox_client_id
PAYPAL_CLIENT_SECRET_SANDBOX=your_sandbox_client_secret
PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com
PAYPAL_CLIENT_ID_LIVE=
PAYPAL_CLIENT_SECRET_LIVE=
```

Start the server:

```bash
npm run dev
```

Server runs on `http://localhost:8000`.

### 3. Setup Customer Storefront

```bash
cd my-project
npm install
```

Create `my-project/.env`:

```env
VITE_API_URL=http://localhost:8000

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_API_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_API_PROJECT_ID=your_project_id
VITE_FIREBASE_API_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_API_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_API_APP_ID=your_app_id

VITE_API_PAPAL_CLIENT_ID=your_paypal_client_id
```

Start the dev server:

```bash
npm run dev
```

Storefront runs on `http://localhost:5173`.

### 4. Setup Admin Dashboard

```bash
cd Admin
npm install
```

Create `Admin/.env`:

```env
VITE_API_URL=http://localhost:8000

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_API_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_API_PROJECT_ID=your_project_id
VITE_FIREBASE_API_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_API_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_API_APP_ID=your_app_id
```

Start the dev server:

```bash
npm run dev
```

Admin runs on `http://localhost:5174`.

---

## 📄 Pages & Routes

### Customer Storefront

| Route | Page | Auth | Description |
|-------|------|:---:|-------------|
| `/` | Home | No | Landing page with sliders, products, banners |
| `/products` | Product Listing | No | Browse & filter products |
| `/products?catId=xxx` | Category Products | No | Products filtered by category |
| `/product/:id` | Product Details | No | Full product info, reviews, zoom |
| `/search` | Search Results | No | Search results with filters |
| `/cart` | Shopping Cart | No | View & manage cart items |
| `/checkout` | Checkout | Yes | Address selection + PayPal payment |
| `/login` | Login | No | Email/password + Google login |
| `/register` | Register | No | Create account |
| `/verify` | Email Verification | No | OTP verification |
| `/forgot-password` | Forgot Password | No | Reset password with OTP |
| `/my-account` | My Account | Yes | Profile, addresses, password |
| `/my-list` | Wishlist | Yes | Saved favorite items |
| `/my-orders` | Orders | Yes | Order history |
| `/order/success` | Order Success | Yes | Payment confirmation |
| `/order/failed` | Order Failed | Yes | Payment failure |

### Admin Dashboard

| Route | Page | Auth | Description |
|-------|------|:---:|-------------|
| `/` | Dashboard | Yes | Analytics dashboard with stats & charts |
| `/login` | Login | No | Admin login |
| `/sign-up` | Sign Up | No | Admin registration |
| `/products` | Products | Yes | Product listing & management |
| `/product/:id` | Product Details | Yes | View product details |
| `/product/addRams` | Add RAMs | Yes | RAM variant management |
| `/product/addSizes` | Add Sizes | Yes | Size variant management |
| `/product/addWeights` | Add Weights | Yes | Weight variant management |
| `/category/list` | Categories | Yes | Category management |
| `/subCategory/list` | Sub-Categories | Yes | Sub-category management |
| `/homeSlider/list` | Home Sliders | Yes | Slider management |
| `/bannerV1/list` | Banner V1 | Yes | V1 banner management |
| `/bannerV2/list` | Banner V2 | Yes | V2 banner management |
| `/blog/list` | Blog | Yes | Blog management |
| `/orders` | Orders | Yes | Order management |
| `/users` | Users | Yes | User management |
| `/profile` | Profile | Yes | Admin profile |

---

## 🔌 API Endpoints Summary

### Authentication (`/api/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/verifyEmail` | Verify email with OTP |
| POST | `/login` | Login and get tokens |
| POST | `/authWithGoogle` | Google OAuth login |
| GET | `/logout` | Logout |
| GET | `/user-details` | Get current user profile |
| GET | `/getAllUsers` | Get all users (Admin) |
| PUT | `/:id` | Update user profile |
| POST | `/forget-password` | Send forgot password OTP |
| POST | `/reset-password` | Reset password |
| POST | `/addReview` | Add product review |
| GET | `/getReviews` | Get product reviews |

### Products (`/api/product`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Create product |
| GET | `/getAllProducts` | Get all products (paginated) |
| GET | `/getAllFeaturedProducts` | Get featured products |
| GET | `/:id` | Get single product |
| POST | `/filters` | Advanced product filtering |
| POST | `/get/search/` | Search products |
| PUT | `/updateProduct/:id` | Update product |
| DELETE | `/:id` | Delete product |

### Categories (`/api/category`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all categories (tree) |
| POST | `/create` | Create category |
| PUT | `/:id` | Update category |
| DELETE | `/:id` | Delete category (cascade) |

### Cart (`/api/cart`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/add` | Add to cart |
| GET | `/get` | Get cart items |
| PUT | `/update-qty` | Update quantity |
| DELETE | `/delete-cart-item/:id` | Remove cart item |
| DELETE | `/emptyCart/:id` | Empty cart |

### Orders (`/api/order`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Create order |
| GET | `/order-list` | Get user orders |
| GET | `/order-lists` | Get all orders (Admin) |
| PUT | `/order-status/:id` | Update order status |
| GET | `/create-order-paypal` | Create PayPal order |
| POST | `/capture-order-paypal` | Capture PayPal payment |

### Other Endpoints

| Module | Base URL | Operations |
|--------|----------|------------|
| Wishlist | `/api/mylist` | Add, Get, Delete |
| Addresses | `/api/address` | CRUD operations |
| Home Slides | `/api/homeSlides` | CRUD + image upload |
| Blog | `/api/blog` | CRUD + image upload |
| Banner V1 | `/api/bannerV1` | CRUD + image upload |
| Banner V2 | `/api/bannerV2` | CRUD + image upload |

> For detailed API documentation with request/response examples, see the [Server README](./server/README.md).

---

## 🗄️ Database Models

| Model | Collection | Key Fields |
|-------|-----------|------------|
| User | users | name, email, password, avatar, role, address_details[], verify_email, status |
| Product | products | name, price, images[], category, catId, countInStock, isFeatured, rating, sale |
| Category | categories | name, images[], parentId (hierarchical) |
| Cart | carts | userId, productId, quantity, subTotal, size, weight, ram |
| MyList | mylists | userId, productId, productTitle, price |
| Address | addresses | userId, address_line1, city, state, pincode, addressType |
| Order | orders | userId, products[], paymentId, payment_status, order_status, totalAmt |
| Blog | blogs | title, description, images[] |
| HomeSlider | homesliders | images[] |
| BannerV1 | bannerv1s | bannerTitle, productName, images[], catId, price |
| BannerV2 | bannerv2s | bannerTitle, productName, images[], catId, price, alignInfo |
| ProductRAMS | productrams | Ram |
| ProductSIZE | productsizes | size |
| ProductWEIGHT | productweights | weight |
| Reviews | reviews | userId, productId, rating, review, userName |

---

## 📚 Individual READMEs

For detailed documentation of each part:

- 🛍️ [Customer Storefront README](./my-project/README.md)
- ⚙️ [Admin Dashboard README](./Admin/README.md)
- 🖥️ [Server API README](./server/README.md)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

ISC
