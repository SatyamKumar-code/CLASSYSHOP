# 🛒 ClassyShop – Admin Dashboard

A powerful, full-featured admin dashboard for managing ClassyShop e-commerce platform. Built with **React**, **Vite**, **Material-UI**, and **TailwindCSS**. Complete admin experience with product management, category management, order tracking, user management, banner management, blog management, and analytics dashboard.

---

## 🖥️ Live Demo & Showcase


### 🎬 Dashboard GIF Demo

![ClassyShop Admin Dashboard Demo](./screenshots/admin-dashboard.gif)

### 📸 Screenshots

<details>
<summary><b>📊 Dashboard – Analytics & Stats</b></summary>

![Dashboard](./screenshots/dashboard.png)
![Dashboard](./screenshots/dashboard2.png)

**Features shown:** Sales overview, total users, total orders, total products, charts & graphs.

</details>

<details>
<summary><b>📦 Product Management</b></summary>

![Product List](./screenshots/product-list.png)
![Add Product](./screenshots/add-product.png)
![Add Product](./screenshots/add-product2.png)
![Edit Product](./screenshots/edit-product.png)
![Edit Product](./screenshots/edit-product2.png)
![Edit Product](./screenshots/edit-product3.png)

**Features shown:** Product listing table, add/edit product form, image upload, variant selection.

</details>

<details>
<summary><b>📦 Product details</b></summary>

![Product Details](./screenshots/product-details.png)

**Features shown:** Product details page with image zoom, variant information, and product description.

</details>

<details>
<summary><b>📂 Category Management</b></summary>

![Category List](./screenshots/category-list.png)
![Add Category](./screenshots/add-category.png)
![Edit Category](./screenshots/edit-category.png)

**Features shown:** Category & sub-category listing, add/edit category with image upload.

</details>

<details>
<summary><b>📋 Order Management</b></summary>

![Orders](./screenshots/orders.png)
![Orders](./screenshots/orders2.png)

**Features shown:** Order listing with status badges, order details, order status tracking.

</details>

<details>
<summary><b>👥 User Management</b></summary>

![Users](./screenshots/users.png)

**Features shown:** User listing table with avatar, email, phone, registration date.

</details>

<details>
<summary><b>🖼️ Banner & Slider Management</b></summary>

![Home Slider](./screenshots/home-slider.png)
![Banner V1 Management](./screenshots/banner-v1-management.png)
![Add Banner V1](./screenshots/add-banner-v1.png)
![Edit Banner V1](./screenshots/edit-banner-v1.png)
![Banner V2 Management](./screenshots/banner-v2-management.png)
![Add Banner V2](./screenshots/add-banner-v2.png)
![Edit Banner V2](./screenshots/edit-banner-v2.png)


**Features shown:** Banner V1/V2 management, home slider management with image upload.

</details>

<details>
<summary><b>📝 Blog Management</b></summary>

![Blog Management](./screenshots/blog-management.png)
![Add Blog](./screenshots/add-blog.png)
![Edit Blog](./screenshots/edit-blog.png)

**Features shown:** Blog listing, WYSIWYG editor, image upload for blog posts.

</details>

<details>
<summary><b>🔑 Login & Authentication</b></summary>

![Login Page](./screenshots/login-page.png)

**Features shown:** Admin login, Google OAuth, registration, OTP verification.

</details>

<details>
<summary><b>📱 Mobile Responsive</b></summary>

![Mobile Dashboard](./screenshots/mobile-dashboard.png)
![Mobile Dashboard](./screenshots/mobile-dashboard2.png)
![Mobile Dashboard](./screenshots/mobile-dashboard3.png)
![Mobile Dashboard](./screenshots/mobile-dashboard4.png)
![Mobile Sidebar](./screenshots/mobile-sidebar.png)

**Features shown:** Collapsible sidebar, responsive layout, mobile-friendly admin access.

</details>

---

## ✨ Features

### 🔐 Authentication & Access Control
- **Email/Password** admin login
- **Google OAuth** sign-in via Firebase
- **OTP Email Verification** (6-digit code)
- **Forgot Password** flow with OTP reset
- **Change Password** – Secure password update
- **Session Management** with JWT access & refresh tokens
- **Protected Routes** – All admin pages require authentication

### 📊 Dashboard
- **Analytics Overview** – Sales, users, orders, products summary boxes
- **Charts & Graphs** – Visual data representation with Recharts
- **Progress Bars** – Performance indicators
- **Quick Stats** – At-a-glance key metrics

### 📦 Product Management
- **Product Listing** – Paginated table with search
- **Add Product** – Full product creation with images, variants, pricing
- **Edit Product** – Update all product details
- **Product Details** – View complete product information with image zoom
- **Image Upload** – Multi-image upload for products
- **Product Variants** – Manage RAM, Size, Weight options
- **Add RAMs** – Create/manage RAM variant options
- **Add Sizes** – Create/manage Size variant options
- **Add Weights** – Create/manage Weight variant options
- **Bulk Delete** – Delete multiple products at once

### 📂 Category Management
- **Category List** – View all categories with images
- **Add Category** – Create new product categories with image upload
- **Edit Category** – Update category details and image
- **Sub-Category List** – View sub-categories under parent categories
- **Add Sub-Category** – Create sub-categories linked to parent
- **Edit Sub-Category** – Update sub-category details
- **Delete Categories** – Remove categories and sub-categories

### 🖼️ Banner Management
- **Banner V1 List** – Manage type 1 promotional banners
- **Add Banner V1** – Create new V1 banners with image upload
- **Edit Banner V1** – Update V1 banner details
- **Banner V2 List** – Manage type 2 promotional banners
- **Add Banner V2** – Create new V2 banners with image upload
- **Edit Banner V2** – Update V2 banner details
- **Delete Banners** – Remove banners

### 🎠 Home Slider Management
- **Home Slider List** – Manage homepage slider banners
- **Add Home Slide** – Create new slider with image upload
- **Edit Home Slide** – Update slider details
- **Delete Slides** – Remove slider banners

### 📝 Blog Management
- **Blog List** – View all blog posts
- **Add Blog** – Create new blog post with WYSIWYG editor & image upload
- **Edit Blog** – Update blog content and images
- **Delete Blog** – Remove blog posts

### 📋 Order Management
- **Order List** – View all customer orders with status
- **Order Details** – Order items, customer info, delivery address
- **Order Status** – Track and update order status with badges

### 👥 User Management
- **User List** – View all registered users
- **User Details** – Name, email, phone, avatar
- **User Table** – Paginated user table with loading skeletons

### 👤 Profile Management
- **View Profile** – Admin profile information
- **Edit Profile** – Update name, email, mobile with international phone input
- **Avatar Upload** – Profile picture management

### 🔍 Search
- **Global Search** – Search across products, categories, and more
- **Table Search** – Filter table data in real-time

### 📱 Responsive Design
- **Collapsible Sidebar** – Toggle sidebar open/close
- **Responsive Layout** – Adapts to different screen sizes
- **Mobile-Friendly** – Full admin access on mobile devices

### ⚡ Performance
- **Skeleton Loading** – Table & user loading skeletons
- **Lazy Loading** – Components load as needed
- **Toast Notifications** – Real-time feedback with React Hot Toast
- **Full Screen Modals** – Add/Edit forms in full-screen panels

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library |
| **Vite 7** | Build tool + dev server with HMR |
| **React Router DOM 7** | Client-side routing |
| **Material-UI (MUI) 7** | Component library + MUI Lab |
| **TailwindCSS 4** | Utility-first CSS |
| **Emotion** | CSS-in-JS styling (MUI) |
| **Firebase 12** | Google OAuth authentication |
| **Axios** | HTTP client |
| **Recharts** | Charts & data visualization |
| **Swiper 12** | Touch slider / carousel |
| **React Hot Toast** | Toast notifications |
| **React Icons** | Icon library |
| **React Inner Image Zoom** | Product image zoom |
| **React International Phone** | Phone number input |
| **React Simple WYSIWYG** | Rich text editor for blogs |
| **React Collapse** | Collapsible panels |
| **React Lazy Load Image** | Lazy image loading |

---

## 📁 Project Structure

```
Admin/
├── public/                          # Static public files
├── src/
│   ├── assets/                      # Static assets (images, icons)
│   ├── Components/
│   │   ├── Badge/                   # Status badge component
│   │   ├── DashboardBoxes/          # Dashboard stat cards
│   │   ├── Header/                  # Admin header + navigation
│   │   ├── OtpBox/                  # 6-digit OTP input
│   │   ├── ProgressBar/             # Progress indicator
│   │   ├── ProtectedRoute/          # Auth route guard
│   │   ├── SearchBox/               # Global search component
│   │   ├── Sidebar/                 # Admin sidebar navigation
│   │   ├── Skeleton/                # Loading skeletons
│   │   │   ├── TableSkeleton.jsx    # Table loading placeholder
│   │   │   └── UserTableSkeleton.jsx # User table loading placeholder
│   │   └── UploadBox/               # File/image upload component
│   ├── Pages/
│   │   ├── Address/                 # Address management
│   │   │   └── addAddress.jsx
│   │   ├── Banners/                 # Banner management
│   │   │   ├── addBannerV1.jsx
│   │   │   ├── addBannerV2.jsx
│   │   │   ├── bannerV1List.jsx
│   │   │   ├── bannerV2List.jsx
│   │   │   ├── editBannerV1.jsx
│   │   │   └── editBannerV2.jsx
│   │   ├── Blog/                    # Blog management
│   │   │   ├── addBlog.jsx
│   │   │   ├── editBlog.jsx
│   │   │   └── index.jsx
│   │   ├── Categegory/              # Category management
│   │   │   ├── addCategory.jsx
│   │   │   ├── addSubCategory.jsx
│   │   │   ├── editCategory.jsx
│   │   │   ├── EditSubCatBox.jsx
│   │   │   ├── index.jsx
│   │   │   └── subCatList.jsx
│   │   ├── ChangePassword/          # Password change page
│   │   ├── Dashboard/               # Analytics dashboard
│   │   ├── ForgotPassword/          # Password reset page
│   │   ├── HomeSliderBanners/       # Home slider management
│   │   │   ├── addHomeSlide.jsx
│   │   │   ├── editHomeSlide.jsx
│   │   │   └── index.jsx
│   │   ├── Login/                   # Admin login page
│   │   ├── Orders/                  # Order management
│   │   ├── Products/                # Product management
│   │   │   ├── addProduct.jsx
│   │   │   ├── addRAMS.jsx
│   │   │   ├── addSIZES.jsx
│   │   │   ├── addWEIGHT.jsx
│   │   │   ├── editProduct.jsx
│   │   │   ├── index.jsx
│   │   │   └── productDetails.jsx
│   │   ├── Profile/                 # Admin profile page
│   │   ├── SignUp/                  # Admin registration
│   │   ├── Users/                   # User management
│   │   └── VerifyAccount/           # Email verification
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

### Installation

```bash
cd Admin
npm install
```

### Environment Variables

Create a `.env` file in the root of `Admin/`:

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
| `/` | Dashboard | Yes | Analytics dashboard with stats & charts |
| `/login` | Login | No | Admin email/password + Google login |
| `/sign-up` | Sign Up | No | Admin registration |
| `/forgot-password` | Forgot Password | No | Password reset with OTP |
| `/verify-account` | Verify Account | No | OTP email verification |
| `/change-password` | Change Password | No | Update password |
| `/products` | Products | Yes | Product listing & management |
| `/product/:id` | Product Details | Yes | View product details with image zoom |
| `/product/addRams` | Add RAMs | Yes | Manage RAM variant options |
| `/product/addSizes` | Add Sizes | Yes | Manage Size variant options |
| `/product/addWeights` | Add Weights | Yes | Manage Weight variant options |
| `/category/list` | Categories | Yes | Category listing & management |
| `/subCategory/list` | Sub-Categories | Yes | Sub-category listing & management |
| `/homeSlider/list` | Home Sliders | Yes | Home banner slider management |
| `/bannerV1/list` | Banner V1 | Yes | V1 banner management |
| `/bannerV2/list` | Banner V2 | Yes | V2 banner management |
| `/blog/list` | Blog | Yes | Blog post management |
| `/orders` | Orders | Yes | Order listing & tracking |
| `/users` | Users | Yes | User listing & management |
| `/profile` | Profile | Yes | Admin profile management |

---

## 🔌 API Integration

The admin panel communicates with the backend via these utility functions in `src/utils/api.js`:

```js
// GET request with auth header
fetchDataFromApi(url)

// POST request with auth header
postData(url, data)

// PUT request with auth header
editData(url, data)

// DELETE request with auth header
deleteData(url)

// DELETE with body data (bulk delete)
deleteMultipleData(url, data)

// Single image upload (PUT multipart/form-data)
uploadImage(url, formData)

// Multiple images upload (POST multipart/form-data)
uploadImages(url, formData)

// DELETE images
deleteImages(url, image)
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
| All Users | `/api/user/getAllUsers` | GET |
| Categories | `/api/category` | GET |
| Create Category | `/api/category/create` | POST |
| Edit Category | `/api/category/:id` | PUT |
| Delete Category | `/api/category/:id` | DELETE |
| All Products | `/api/product/getAllProducts` | GET |
| Create Product | `/api/product/create` | POST |
| Edit Product | `/api/product/:id` | PUT |
| Delete Product | `/api/product/:id` | DELETE |
| Product RAMs | `/api/product/productRAMS` | GET/POST |
| Product Sizes | `/api/product/productSIZE` | GET/POST |
| Product Weights | `/api/product/productWEIGHT` | GET/POST |
| Home Slides | `/api/homeSlides` | GET |
| Create Home Slide | `/api/homeSlides/create` | POST |
| Edit Home Slide | `/api/homeSlides/:id` | PUT |
| Delete Home Slide | `/api/homeSlides/:id` | DELETE |
| Banners V1 | `/api/bannerV1` | GET |
| Create Banner V1 | `/api/bannerV1/create` | POST |
| Banners V2 | `/api/bannerV2` | GET |
| Create Banner V2 | `/api/bannerV2/create` | POST |
| Blogs | `/api/blog` | GET |
| Create Blog | `/api/blog/create` | POST |
| Orders | `/api/order/order-list` | GET |
| Update Order Status | `/api/order/:id` | PUT |

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
