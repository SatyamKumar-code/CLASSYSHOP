# 🛒 ClassyShop – E-Commerce Frontend

A modern, full-featured e-commerce storefront built with **React**, **Vite**, **Material-UI**, and **TailwindCSS**. Complete shopping experience with product browsing, advanced filtering, cart management, PayPal checkout, Google OAuth, and order tracking.

---

## 🖥️ Live Demo & Showcase

> **live URL :**
> `https://classyshop.onrender.com`

### 🎬 Homepage GIF Demo

![ClassyShop Homepage Demo](./screenshots/home-scroll.gif)

### 📸 Screenshots

<details>
<summary><b>🏠 Home Page - Hero Slider & Categories</b></summary>

![Home Page](./screenshots/home-page.png)

**Features shown:** Hero banner slider, category carousel, navigation header.

</details>

<details>
<summary><b>🔥 Home Page - Popular Products</b></summary>

![Popular Products](./screenshots/home-popular-products.png)

**Features shown:** Popular products tabs by category, product cards with ratings & prices.

</details>

<details>
<summary><b>⭐ Home Page - Featured Products</b></summary>

![Featured Products](./screenshots/home-featured.png)

**Features shown:** Featured products section, advertisement banners, promotional sections.

</details>

<details>
<summary><b>🛍️ Product Listing</b></summary>

![Product Listing](./screenshots/product-listing.png)

**Features shown:** Grid/List view toggle, sidebar filters (category, price range, rating), sorting, pagination.

![Product Listing GIF](./screenshots/product-listing-scroll.gif)

</details>

<details>
<summary><b>📦 Product Details</b></summary>

![Product Details](./screenshots/product-details.png)

**Features shown:** Image gallery with zoom, variant selection (RAM/Size/Weight), reviews tab, related products.

</details>

<details>
<summary><b>🛒 Shopping Cart</b></summary>

![Cart Page](./screenshots/cart-page.png)

**Features shown:** Cart items with quantity controls, price summary, checkout button.

</details>

<details>
<summary><b>🔑 Login & Register</b></summary>

![Login Page](./screenshots/login-page.png)
![Register Page](./screenshots/register-page.png)

**Features shown:** Email/password login, Google OAuth, registration with OTP verification.

</details>

<details>
<summary><b>📱 Mobile Responsive</b></summary>

![Mobile Home](./screenshots/mobile-home.png)
![Mobile Product Details](./screenshots/mobile-product-details.png)

**Features shown:** Hamburger menu, mobile navigation, responsive product grid, touch-friendly UI.

</details>

---

## ✨ Features

### 🔐 Authentication & User Management
- **Email/Password** registration and login
- **Google OAuth** sign-in via Firebase
- **OTP Email Verification** (6-digit code)
- **Forgot Password** flow with OTP reset
- **Session Management** with JWT access & refresh tokens
- **Protected Routes** for authenticated pages

### 🏠 Home Page
- **Hero Banner Slider** – Auto-rotating promotional banners
- **Category Carousel** – Horizontal scrollable category strip
- **Popular Products** – Tabbed by category with product carousels
- **Featured Products** – Showcase promoted products
- **Advertisement Banners** – V1 & V2 promotional banner placements
- **Blog Section** – Latest blog posts carousel
- **Random Category Sections** – Dynamic category product collections

### 🛍️ Product Browsing
- **Grid & List View** toggle
- **Advanced Filtering** – Category (3 levels), price range slider, rating filter
- **Sorting** – By name (A-Z, Z-A), price (low-high, high-low)
- **Pagination** – Navigate through large product catalogs
- **Full-Text Search** – Debounced search with instant results
- **Product Variants** – RAM, Size, Weight options per product

### 📦 Product Details
- **Image Gallery** with zoom on hover (InnerImageZoom)
- **Keyboard Navigation** for image browsing
- **Product Specifications** – Brand, variants, stock status
- **Expandable Description** – Read more/less toggle
- **Customer Reviews** – View & submit ratings + text reviews
- **Related Products** – Carousel of similar items
- **Add to Cart** with quantity selection
- **Wishlist Toggle** – Heart icon to save favorites

### 🛒 Shopping Cart
- **Cart Drawer** – Slide-in panel from any page
- **Quantity Controls** – Increment/decrement per item
- **Real-time Price Updates** – Subtotal auto-calculation
- **Remove Items** – Individual or empty entire cart
- **Variant Display** – Shows selected size/weight/RAM
- **Empty Cart State** – Friendly message with continue shopping CTA
- **Sticky Price Summary** – Cart totals follow scroll

### 💳 Checkout & Payments
- **Address Selection** – Choose from saved delivery addresses
- **Add/Edit Addresses** – Inline address form
- **Order Summary** – Complete price breakdown
- **PayPal Integration** – Full payment flow (create → approve → capture)
- **Cash on Delivery** – COD payment option
- **Order Confirmation** – Success/failed result pages
- **Auto Cart Clear** – Cart emptied after successful order

### 👤 My Account
- **Profile Management** – Edit name, email, mobile with international phone input
- **Avatar Display** – Profile picture from upload or Google
- **Address Book** – Add, edit, delete delivery addresses
- **Change Password** – Secure password update
- **Order History** – Expandable order details with status badges
- **Wishlist Management** – View and manage saved items

### 🔍 Search
- **Debounced Search** (300ms) – Real-time as you type
- **Full-Text Search** – Across product name, description, brand, category
- **Search Results Page** – With filters, sorting, and pagination
- **Result Caching** – Cached by search query for performance

### 📱 Responsive Design
- **Mobile-First** approach
- **Hamburger Navigation** for mobile
- **Touch-Friendly Filters** with overlay sidebar
- **Responsive Product Grid** (2-5 columns based on screen)
- **Adaptive Header** with condensed mobile layout

### ⚡ Performance
- **Skeleton Loading** – Shimmer placeholders for all content sections
- **Lazy Loading** – Components load as needed
- **Debounced Inputs** – Prevents excessive API calls
- **Swiper.js Carousels** – Optimized touch-friendly sliders

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library |
| **Vite 7** | Build tool + dev server with HMR |
| **React Router DOM 7** | Client-side routing |
| **Material-UI (MUI) 7** | Component library |
| **TailwindCSS 4** | Utility-first CSS |
| **Styled Components** | CSS-in-JS styling |
| **Firebase 12** | Google OAuth authentication |
| **Axios** | HTTP client |
| **Swiper 12** | Touch slider / carousel |
| **React Hot Toast** | Toast notifications |
| **React Icons** | Icon library |
| **React Inner Image Zoom** | Product image zoom |
| **React International Phone** | Phone number input |
| **React Range Slider** | Price range filter |
| **React Collapse** | Collapsible category panels |
| **PayPal JS SDK** | Payment processing |

---

## 📁 Project Structure

```
my-project/
├── public/                          # Static public files
├── src/
│   ├── assets/                      # Static assets (images, icons)
│   ├── components/
│   │   ├── Header/                  # Main navbar + navigation + mobile nav
│   │   ├── Footer/                  # Site footer with links & info
│   │   ├── Sidebar/                 # Product filter sidebar
│   │   ├── CartPanel/               # Slide-in cart drawer
│   │   ├── Search/                  # Debounced search input
│   │   ├── ProductItem/             # Product card (grid view)
│   │   ├── ProductItemListView/     # Product card (list view)
│   │   ├── ProductDetails/          # Product detail component
│   │   ├── ProductZoom/             # Image gallery with zoom
│   │   ├── ProductsSlider/          # Products carousel
│   │   ├── HomeSlider/              # Home banner slider
│   │   ├── HomeSliderV2/            # Alternative home slider
│   │   ├── HomeCatSlider/           # Category carousel
│   │   ├── AdsBannerSlider/         # Banner V1 component
│   │   ├── AdsBannerSliderV2/       # Banner V2 component
│   │   ├── BannerBox/               # Banner display box
│   │   ├── bannerBoxV2/             # Banner V2 display box
│   │   ├── BlogItem/                # Blog post card
│   │   ├── RandomCategorySections/  # Dynamic category sections
│   │   ├── AccountSidebar/          # My Account sidebar nav
│   │   ├── Badge/                   # Status badge component
│   │   ├── OtpBox/                  # 6-digit OTP input
│   │   ├── CategoryCollaose/        # Collapsible category filter
│   │   ├── Qt;yBox/                 # Quantity controls
│   │   └── skeleton/                # Loading skeletons
│   │       ├── BannerLoading/
│   │       ├── HomeSliderSkeleton/
│   │       ├── ProductDetailsSkeleton/
│   │       ├── ProductLoadingGrid/
│   │       └── ProductSliderSkeleton/
│   ├── Pages/
│   │   ├── Home/                    # Home page
│   │   ├── ProductListing/          # Product catalog with filters
│   │   ├── ProductDetails/          # Product detail + reviews
│   │   ├── Search/                  # Search results page
│   │   ├── Cart/                    # Shopping cart page
│   │   ├── Checkout/                # Checkout + PayPal payment
│   │   ├── Login/                   # Login page
│   │   ├── Register/                # Registration page
│   │   ├── Verify/                  # OTP verification page
│   │   ├── ForgotPassword/          # Password reset page
│   │   ├── MyAccount/               # Profile, addresses, password
│   │   ├── MyList/                  # Wishlist page
│   │   └── Orders/                  # Order history + success/failed
│   ├── utils/
│   │   └── api.js                   # Axios API utility functions
│   ├── App.jsx                      # Routes + Context Provider
│   ├── App.css                      # Global styles
│   ├── responsive.css               # Responsive breakpoints
│   ├── firebase.jsx                 # Firebase configuration
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Base styles
├── .env                             # Environment variables
├── index.html                       # HTML entry
├── vite.config.js                   # Vite configuration
├── eslint.config.js                 # ESLint configuration
└── package.json                     # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** or **yarn**
- Backend server running (see [server README](../server/README.md))
- Firebase project (for Google Auth)
- PayPal Developer account (for payments)

### Installation

```bash
cd my-project
npm install
```

### Environment Variables

Create a `.env` file in the root of `my-project/`:

```env
# API Base URL (your backend server)
VITE_API_URL=http://localhost:8000

# Firebase Configuration (Google OAuth)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_API_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_API_PROJECT_ID=your_project_id
VITE_FIREBASE_API_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_API_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_API_APP_ID=your_app_id

# PayPal Client ID
VITE_API_PAPAL_CLIENT_ID=your_paypal_client_id

# Razorpay (optional)
VITE_API_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_API_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Run Development Server

```bash
npm run dev
```

The app runs on `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📄 Pages & Routes

| Route | Page | Auth Required | Description |
|-------|------|:---:|-------------|
| `/` | Home | No | Landing page with sliders, products, banners |
| `/products` | Product Listing | No | Browse & filter products |
| `/products?catId=xxx` | Category Products | No | Products filtered by category |
| `/products?subCatId=xxx` | SubCategory Products | No | Products filtered by sub-category |
| `/product/:id` | Product Details | No | Full product info, reviews, zoom |
| `/search` | Search Results | No | Search results with filters |
| `/cart` | Shopping Cart | No | View & manage cart items |
| `/checkout` | Checkout | Yes | Address selection + PayPal payment |
| `/login` | Login | No | Email/password + Google login |
| `/register` | Register | No | Create account + Google signup |
| `/verify` | Email Verification | No | OTP verification page |
| `/forgot-password` | Forgot Password | No | Reset password with OTP |
| `/my-account` | My Account | Yes | Profile, addresses, password |
| `/my-account/address` | Address Book | Yes | Manage delivery addresses |
| `/my-list` | Wishlist | Yes | Saved favorite items |
| `/my-orders` | Orders | Yes | Order history |
| `/order/success` | Order Success | Yes | Payment confirmation |
| `/order/failed` | Order Failed | Yes | Payment failure |

---

## 🔌 API Integration

The frontend communicates with the backend via these utility functions in `src/utils/api.js`:

```js
// GET request with auth header
fetchDataFromApi(url)

// POST request with auth header
postData(url, data)

// PUT request with auth header
editData(url, data)

// DELETE request with auth header
deleteData(url)

// File upload (multipart/form-data)
uploadImage(url, formData)
```

All requests include `Authorization: Bearer <token>` from `localStorage.accesstoken`.

### Key API Endpoints Used

| Feature | Endpoint | Method |
|---------|----------|--------|
| Login | `/api/user/login` | POST |
| Register | `/api/user/register` | POST |
| Google Auth | `/api/user/authWithGoogle` | POST |
| Verify Email | `/api/user/verifyEmail` | POST |
| User Details | `/api/user/user-details` | GET |
| Categories | `/api/category` | GET |
| All Products | `/api/product/getAllProducts` | GET |
| Featured Products | `/api/product/getAllFeaturedProducts` | GET |
| Product by ID | `/api/product/:id` | GET |
| Filter Products | `/api/product/filters` | POST |
| Search Products | `/api/product/get/search` | POST |
| Cart Items | `/api/cart/get` | GET |
| Add to Cart | `/api/cart/add` | POST |
| Update Cart Qty | `/api/cart/update-qty` | PUT |
| Wishlist | `/api/mylist/` | GET |
| Add to Wishlist | `/api/mylist/add` | POST |
| Addresses | `/api/address/get` | GET |
| My Orders | `/api/order/order-list` | GET |
| Create PayPal Order | `/api/order/create-order-paypal` | GET |
| Capture Payment | `/api/order/capture-order-paypal` | POST |
| Home Slides | `/api/homeSlides` | GET |
| Banners V1 | `/api/bannerV1` | GET |
| Banners V2 | `/api/bannerV2` | GET |
| Blogs | `/api/blog` | GET |
| Add Review | `/api/user/addReview` | POST |
| Get Reviews | `/api/user/getReviews` | GET |

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

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
