# ShopifyShop Server API

A RESTful API server for the ShopifyShop e-commerce platform built with **Express.js**, **MongoDB**, and **JWT** authentication.

## Tech Stack

- **Express.js v5** – Web framework
- **MongoDB / Mongoose** – Database & ODM
- **JWT** – Authentication (access + refresh tokens)
- **Cloudinary** – Image storage & CDN
- **PayPal SDK** – Payment processing
- **Multer** – File upload handling
- **Bcrypt** – Password hashing
- **Nodemailer + SendGrid** – Email service
- **Helmet** – Security headers
- **Morgan** – HTTP request logging

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Cloudinary account
- PayPal Developer account (for payments)
- SendGrid account (for emails)

### Installation

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file in the `server/` directory:

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

# PayPal Config
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID_SANDBOX=your_sandbox_client_id
PAYPAL_CLIENT_SECRET_SANDBOX=your_sandbox_client_secret
PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com
PAYPAL_CLIENT_ID_LIVE=
PAYPAL_CLIENT_SECRET_LIVE=
```

### Run the Server

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

The server runs on `http://localhost:8000` by default.

---

## Base URL

```
http://localhost:8000/api
```

## Authentication

The API uses **JWT Bearer tokens**. Protected routes require an `Authorization` header:

```
Authorization: Bearer <accessToken>
```

Tokens are also set as HTTP-only cookies on login:
- `accessToken` – Short-lived access token
- `refreshToken` – Long-lived refresh token

---

## API Endpoints

### Table of Contents

1. [User / Auth](#1-user--auth-apiuser)
2. [Category](#2-category-apicategory)
3. [Products](#3-products-apiproduct)
4. [Cart](#4-cart-apicart)
5. [My List (Wishlist)](#5-my-list--wishlist-apimylist)
6. [Address](#6-address-apiaddress)
7. [Orders](#7-orders-apiorder)
8. [Home Slides](#8-home-slides-apihomeslides)
9. [Blog](#9-blog-apiblog)
10. [Banner V1](#10-banner-v1-apibannerv1)
11. [Banner V2](#11-banner-v2-apibannerv2)

---

### 1. User / Auth (`/api/user`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | No | Register a new user |
| POST | `/verifyEmail` | No | Verify email with OTP |
| POST | `/login` | No | Login and get tokens |
| POST | `/authWithGoogle` | No | Google OAuth login/register |
| GET | `/logout` | Yes | Logout and clear tokens |
| GET | `/user-details` | Yes | Get current user profile |
| GET | `/getAllUsers` | No | Get all users (Admin) |
| PUT | `/:id` | Yes | Update user profile |
| PUT | `/user-avatar` | Yes | Upload user avatar |
| PUT | `/updateUserStatus/:id` | Yes | Update user status (Admin) |
| DELETE | `/deleteImage` | Yes | Delete image from Cloudinary |
| POST | `/forget-password` | No | Send forgot password OTP |
| POST | `/verify-forgot-password-otp` | No | Verify forgot password OTP |
| POST | `/reset-password` | No | Reset password (with old password) |
| POST | `/reset-passwordwithotp` | No | Reset password (with OTP) |
| POST | `/refresh-token` | No | Refresh access token |
| POST | `/addReview` | Yes | Add a product review |
| GET | `/getReviews` | No | Get reviews for a product |
| GET | `/getAllReviews` | No | Get all reviews |

#### Register User

```http
POST /api/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully. Please verify your email.",
  "error": false,
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Verify Email

```http
POST /api/user/verifyEmail
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### Login

```http
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successfully",
  "error": false,
  "success": true,
  "data": {
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci...",
    "role": "USER"
  }
}
```

#### Google Authentication

```http
POST /api/user/authWithGoogle
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@gmail.com",
  "avatar": "https://lh3.googleusercontent.com/...",
  "mobile": 1234567890,
  "role": "USER"
}
```

#### Logout

```http
GET /api/user/logout
Authorization: Bearer <accessToken>
```

#### Get User Details

```http
GET /api/user/user-details
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "message": "User details",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://res.cloudinary.com/...",
    "mobile": 1234567890,
    "role": "USER",
    "address_details": [...]
  }
}
```

#### Upload User Avatar

```http
PUT /api/user/user-avatar
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data

images: [file]
```

#### Update User Profile

```http
PUT /api/user/:id
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john@example.com",
  "mobile": 9876543210
}
```

#### Update User Status (Admin)

```http
PUT /api/user/updateUserStatus/:id
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "status": "Active"  // "Active" | "Inactive" | "Suspended"
}
```

#### Forgot Password

```http
POST /api/user/forget-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Verify Forgot Password OTP

```http
POST /api/user/verify-forgot-password-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### Reset Password

```http
POST /api/user/reset-password
Content-Type: application/json

{
  "email": "john@example.com",
  "oldPassword": "oldpassword123",
  "newPassword": "newpassword456",
  "confirmPassword": "newpassword456"
}
```

#### Reset Password with OTP

```http
POST /api/user/reset-passwordwithotp
Content-Type: application/json

{
  "email": "john@example.com",
  "newPassword": "newpassword456",
  "confirmPassword": "newpassword456"
}
```

#### Refresh Token

```http
POST /api/user/refresh-token
```

Reads `refreshToken` from cookies or `Authorization` header. Returns a new `accessToken`.

#### Add Review

```http
POST /api/user/addReview
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "productId": "product_object_id",
  "review": "Great product!",
  "rating": 5,
  "userName": "John Doe",
  "image": "https://avatar-url.com/img.jpg"
}
```

#### Get Reviews for a Product

```http
GET /api/user/getReviews?productId=product_object_id
```

#### Get All Reviews

```http
GET /api/user/getAllReviews
```

#### Get All Users (Admin)

```http
GET /api/user/getAllUsers
```

---

### 2. Category (`/api/category`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | Get all categories (hierarchical tree) |
| GET | `/get/count` | No | Get root categories count |
| GET | `/get/count/subCat` | No | Get sub-categories count |
| GET | `/:id` | No | Get single category |
| POST | `/create` | Yes | Create a category |
| POST | `/uploadImages` | Yes | Upload category images |
| PUT | `/:id` | Yes | Update a category |
| DELETE | `/:id` | Yes | Delete category (cascade) |
| DELETE | `/deleteImage` | Yes | Delete image from Cloudinary |

#### Get All Categories (Tree Structure)

```http
GET /api/category/
```

**Response (200):**
```json
{
  "error": false,
  "success": true,
  "categories": [
    {
      "_id": "...",
      "name": "Electronics",
      "images": ["https://res.cloudinary.com/..."],
      "Children": [
        {
          "_id": "...",
          "name": "Mobile Phones",
          "Children": [
            {
              "_id": "...",
              "name": "Smartphones"
            }
          ]
        }
      ]
    }
  ]
}
```

#### Upload Category Images

```http
POST /api/category/uploadImages
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data

images: [file1, file2, ...]
```

**Response (200):**
```json
{
  "images": [
    "https://res.cloudinary.com/...",
    "https://res.cloudinary.com/..."
  ]
}
```

#### Create Category

```http
POST /api/category/create
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "Smartphones",
  "parentId": "parent_category_id",
  "parentCatName": "Electronics"
}
```

> **Note:** Upload images first via `/uploadImages`, then create the category. Images are stored in a server-side variable.

#### Get Category Count

```http
GET /api/category/get/count
```

**Response:** `{ "categoryCount": 15 }`

#### Get Sub-Category Count

```http
GET /api/category/get/count/subCat
```

**Response:** `{ "subCategoriesCount": 45 }`

#### Update Category

```http
PUT /api/category/:id
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "Updated Category Name"
}
```

#### Delete Category

```http
DELETE /api/category/:id
Authorization: Bearer <accessToken>
```

> Cascade deletes all child categories and removes images from Cloudinary.

#### Delete Image from Cloudinary

```http
DELETE /api/category/deleteImage?img=https://res.cloudinary.com/...
Authorization: Bearer <accessToken>
```

---

### 3. Products (`/api/product`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/create` | Yes | Create a product |
| POST | `/uploadImages` | Yes | Upload product images |
| POST | `/uploadBannerImages` | Yes | Upload product banner images |
| POST | `/filters` | No | Filter products (advanced) |
| POST | `/sortBy` | No | Sort products |
| POST | `/get/search/` | No | Search products |
| GET | `/getAllProducts` | No | Get all products (paginated) |
| GET | `/getAllProductsCount` | No | Get total product count |
| GET | `/getAllFeaturedProducts` | No | Get featured products |
| GET | `/getAllProductsBanner` | No | Get home banner products |
| GET | `/getAllFashionProducts` | No | Get fashion products by category |
| GET | `/getRandomCategorySections` | No | Get random category sections |
| GET | `/getAllProductsByCatId/:id` | No | Get products by category ID |
| GET | `/getAllProductsByCatName` | No | Get products by category name |
| GET | `/getAllProductsBySubCatId/:id` | No | Get products by sub-category ID |
| GET | `/getAllProductsBySubCatName` | No | Get products by sub-category name |
| GET | `/getAllProductsByThirdLavelCat/:id` | No | Get products by third-level category ID |
| GET | `/getAllProductsByThirdLavelCatName` | No | Get products by third-level category name |
| GET | `/getAllProductsByPrice` | No | Get products by price range |
| GET | `/getAllProductsByRating` | No | Get products by rating |
| GET | `/:id` | No | Get single product |
| PUT | `/updateProduct/:id` | Yes | Update a product |
| DELETE | `/:id` | Yes | Delete a product |
| DELETE | `/deleteMultiple` | Yes | Delete multiple products |
| DELETE | `/deleteImage` | Yes | Delete product image |

#### Product Variants – RAM

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/productRAMS/create` | Yes | Create RAM option |
| GET | `/productRAMS/get` | No | Get all RAM options |
| GET | `/productRAMS/:id` | No | Get single RAM option |
| PUT | `/productRAMS/:id` | Yes | Update RAM option |
| DELETE | `/productRAMS/:id` | Yes | Delete RAM option |

#### Product Variants – Weight

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/productWEIGHT/create` | Yes | Create weight option |
| GET | `/productWEIGHT/get` | No | Get all weight options |
| GET | `/productWEIGHT/:id` | No | Get single weight option |
| PUT | `/productWEIGHT/:id` | Yes | Update weight option |
| DELETE | `/productWEIGHT/:id` | Yes | Delete weight option |

#### Product Variants – Size

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/productSize/create` | Yes | Create size option |
| GET | `/productSize/get` | No | Get all size options |
| GET | `/productSize/:id` | No | Get single size option |
| PUT | `/productSize/:id` | Yes | Update size option |
| DELETE | `/productSize/:id` | Yes | Delete size option |

#### Upload Product Images

```http
POST /api/product/uploadImages
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data

images: [file1, file2, ...]
```

#### Create Product

```http
POST /api/product/create
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with A17 chip",
  "brand": "Apple",
  "price": 999,
  "oldPrice": 1099,
  "countInStock": 50,
  "rating": 4.5,
  "discount": 10,
  "isFeatured": true,
  "catId": "category_id",
  "catName": "Electronics",
  "category": "category_object_id",
  "subCatId": "subcategory_id",
  "subCat": "Mobile Phones",
  "thirdsubCatId": "third_cat_id",
  "thirdsubCat": "Smartphones",
  "isDisplayOnHomeBanner": false,
  "productRam": ["8GB", "12GB"],
  "size": [],
  "productWeight": []
}
```

#### Get All Products (Paginated)

```http
GET /api/product/getAllProducts?page=1&perPage=20
```

Optional query: `latest=true` – returns products from the last 30 days only.

#### Get Products by Category ID

```http
GET /api/product/getAllProductsByCatId/:catId?page=1&perPage=10
```

#### Get Products by Category Name

```http
GET /api/product/getAllProductsByCatName?catName=Electronics&page=1&perPage=10
```

#### Get Products by Sub-Category

```http
GET /api/product/getAllProductsBySubCatId/:subCatId
GET /api/product/getAllProductsBySubCatName?subCatName=Phones
```

#### Get Products by Third-Level Category

```http
GET /api/product/getAllProductsByThirdLavelCat/:thirdCatId
GET /api/product/getAllProductsByThirdLavelCatName?thirdsubCat=Smartphones
```

#### Get Products by Price Range

```http
GET /api/product/getAllProductsByPrice?catId=xxx&minPrice=100&maxPrice=500
```

Use one of `catId`, `subCatId`, or `thirdsubCatId` as a filter alongside price range.

#### Get Products by Rating

```http
GET /api/product/getAllProductsByRating?rating=4&catId=xxx
```

#### Get Featured Products

```http
GET /api/product/getAllFeaturedProducts
```

Returns up to 20 random featured products.

#### Get Home Banner Products

```http
GET /api/product/getAllProductsBanner
```

Returns products with `isDisplayOnHomeBanner: true`.

#### Get Fashion Products

```http
GET /api/product/getAllFashionProducts?category=Fashion
```

Returns up to 50 random products for the given category name.

#### Get Random Category Sections

```http
GET /api/product/getRandomCategorySections?limit=6
```

**Response (200):**
```json
{
  "error": false,
  "success": true,
  "sections": [
    {
      "sectionName": "Electronics",
      "type": "catName",
      "products": [/* up to 15 products */]
    }
  ]
}
```

#### Filter Products (Advanced)

```http
POST /api/product/filters
Content-Type: application/json

{
  "catId": ["cat_id_1", "cat_id_2"],
  "subCatId": ["subcat_id_1"],
  "thirdsubCatId": [],
  "minPrice": 100,
  "maxPrice": 5000,
  "rating": [4, 5],
  "page": 1,
  "limit": 25
}
```

#### Sort Products

```http
POST /api/product/sortBy
Content-Type: application/json

{
  "products": [/* array of product objects */],
  "sortBy": "price",
  "order": "asc"
}
```

`sortBy`: `"name"` or `"price"` | `order`: `"asc"` or `"desc"`

#### Search Products

```http
POST /api/product/get/search/
Content-Type: application/json

{
  "query": "iphone",
  "page": 1,
  "limit": 10
}
```

Searches across name, description, brand, and category fields. Results are sorted by relevance.

#### Get Single Product

```http
GET /api/product/:id
```

#### Update Product

```http
PUT /api/product/updateProduct/:id
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 899,
  "countInStock": 25
}
```

#### Delete Product

```http
DELETE /api/product/:id
Authorization: Bearer <accessToken>
```

Removes all associated images from Cloudinary.

#### Delete Multiple Products

```http
DELETE /api/product/deleteMultiple
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "ids": ["product_id_1", "product_id_2"]
}
```

#### Create RAM Option

```http
POST /api/product/productRAMS/create
Authorization: Bearer <accessToken>
Content-Type: application/json

{ "Ram": "8GB" }
```

#### Create Weight Option

```http
POST /api/product/productWEIGHT/create
Authorization: Bearer <accessToken>
Content-Type: application/json

{ "weight": "500g" }
```

#### Create Size Option

```http
POST /api/product/productSize/create
Authorization: Bearer <accessToken>
Content-Type: application/json

{ "size": "XL" }
```

---

### 4. Cart (`/api/cart`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/add` | Yes | Add item to cart |
| GET | `/get` | Yes | Get cart items |
| PUT | `/update-qty` | Yes | Update cart item quantity |
| DELETE | `/delete-cart-item/:id` | Yes | Delete cart item |
| DELETE | `/emptyCart/:id` | Yes | Empty entire cart |

#### Add to Cart

```http
POST /api/cart/add
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "productTitle": "iPhone 15 Pro",
  "image": "https://res.cloudinary.com/...",
  "rating": 4.5,
  "price": 999,
  "oldPrice": 1099,
  "quantity": 1,
  "subTotal": 999,
  "countInStock": 50,
  "productId": "product_object_id",
  "discount": 10,
  "brand": "Apple",
  "size": "",
  "weight": "",
  "ram": "8GB"
}
```

> Duplicate items (same `productId` for the same user) are rejected.

#### Get Cart Items

```http
GET /api/cart/get
Authorization: Bearer <accessToken>
```

#### Update Cart Item Quantity

```http
PUT /api/cart/update-qty
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "_id": "cart_item_id",
  "qty": 3,
  "subTotal": 2997
}
```

#### Delete Cart Item

```http
DELETE /api/cart/delete-cart-item/:cartItemId
Authorization: Bearer <accessToken>
```

#### Empty Cart

```http
DELETE /api/cart/emptyCart/:userId
Authorization: Bearer <accessToken>
```

---

### 5. My List / Wishlist (`/api/mylist`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/add` | Yes | Add item to wishlist |
| GET | `/` | Yes | Get wishlist items |
| DELETE | `/:id` | Yes | Remove item from wishlist |

#### Add to Wishlist

```http
POST /api/mylist/add
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "productId": "product_object_id",
  "productTitle": "iPhone 15 Pro",
  "image": "https://res.cloudinary.com/...",
  "rating": 4.5,
  "price": 999,
  "oldPrice": 1099,
  "brand": "Apple",
  "discount": 10
}
```

> Duplicate items are rejected.

#### Get Wishlist

```http
GET /api/mylist/
Authorization: Bearer <accessToken>
```

#### Remove from Wishlist

```http
DELETE /api/mylist/:itemId
Authorization: Bearer <accessToken>
```

---

### 6. Address (`/api/address`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/add` | Yes | Add new address |
| GET | `/get` | No | Get all addresses (by userId) |
| GET | `/:id` | Yes | Get single address |
| PUT | `/:id` | Yes | Update address |
| DELETE | `/:id` | Yes | Delete address |

#### Add Address

```http
POST /api/address/add
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "address_line1": "123 Main Street",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "country": "India",
  "mobile": 9876543210,
  "landmark": "Near City Mall",
  "addressType": "Home"
}
```

`addressType`: `"Home"` or `"Office"`

The address ID is automatically added to the user's `address_details` array.

#### Get All Addresses

```http
GET /api/address/get?userId=user_object_id
```

#### Get Single Address

```http
GET /api/address/:addressId
Authorization: Bearer <accessToken>
```

#### Update Address

```http
PUT /api/address/:addressId
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "address_line1": "456 New Street",
  "city": "Delhi",
  "state": "Delhi",
  "pincode": "110001",
  "country": "India",
  "mobile": 9876543210,
  "landmark": "Near Metro Station",
  "addressType": "Office"
}
```

#### Delete Address

```http
DELETE /api/address/:addressId
Authorization: Bearer <accessToken>
```

---

### 7. Orders (`/api/order`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/create` | Yes | Create a new order |
| GET | `/order-list` | Yes | Get user's orders |
| GET | `/order-lists` | Yes | Get all orders (Admin, paginated) |
| GET | `/count` | Yes | Get total orders count |
| GET | `/sales` | Yes | Get total sales revenue |
| GET | `/users` | Yes | Get total users count |
| PUT | `/order-status/:id` | Yes | Update order status |
| GET | `/create-order-paypal` | Yes | Create PayPal order |
| POST | `/capture-order-paypal` | Yes | Capture PayPal payment |

#### Create Order

```http
POST /api/order/create
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "userId": "user_object_id",
  "products": [
    {
      "productId": "product_object_id",
      "productTitle": "iPhone 15 Pro",
      "quantity": 1,
      "price": 999,
      "image": "https://res.cloudinary.com/...",
      "subTotal": 999,
      "countInStock": 50
    }
  ],
  "paymentId": "paypal_payment_id",
  "payment_status": "completed",
  "delivery_address": "address_object_id",
  "totalAmt": 999,
  "date": "2025-01-15T10:00:00.000Z"
}
```

`payment_status`: `"completed"` | `"CASH ON DELIVERY"` | `"pending"`

> Automatically decrements `countInStock` for each product.

#### Get User's Orders

```http
GET /api/order/order-list
Authorization: Bearer <accessToken>
```

Returns orders sorted newest first with populated address and user details.

#### Get All Orders (Admin)

```http
GET /api/order/order-lists?page=1&limit=5
Authorization: Bearer <accessToken>
```

#### Get Total Orders Count

```http
GET /api/order/count
Authorization: Bearer <accessToken>
```

**Response:** `{ "count": 150 }`

#### Get Total Sales Revenue

```http
GET /api/order/sales
Authorization: Bearer <accessToken>
```

#### Get Total Users Count

```http
GET /api/order/users
Authorization: Bearer <accessToken>
```

#### Update Order Status

```http
PUT /api/order/order-status/:orderId
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "order_status": "confirm"
}
```

**Allowed status transitions:**

| From | To |
|------|----|
| `pending` | `confirm`, `cancelled` |
| `confirm` | `shipped`, `cancelled` |
| `shipped` | `delivered`, `cancelled` |
| `delivered` | `refund` (paid orders only) |
| `cancelled` | `refund` (paid orders only) |

> When status becomes `delivered`, the product `sale` count is incremented.

#### Create PayPal Order

```http
GET /api/order/create-order-paypal?totalAmount=5000
Authorization: Bearer <accessToken>
```

Converts INR to USD using an exchange rate API, then creates a PayPal order.

**Response (200):**
```json
{
  "error": false,
  "success": true,
  "paypalOrderId": "PAYPAL_ORDER_ID"
}
```

#### Capture PayPal Payment

```http
POST /api/order/capture-order-paypal
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "paymentId": "PAYPAL_ORDER_ID",
  "products": [
    {
      "productId": "...",
      "productTitle": "...",
      "quantity": 1,
      "price": 999,
      "image": "...",
      "subTotal": 999,
      "countInStock": 50
    }
  ],
  "delivery_address": "address_object_id",
  "totalAmt": 999,
  "payment_status": "completed",
  "date": "2025-01-15T10:00:00.000Z"
}
```

---

### 8. Home Slides (`/api/homeSlides`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/uploadImages` | Yes | Upload slide images |
| POST | `/add` | Yes | Add a home slide |
| GET | `/` | No | Get all home slides |
| GET | `/:id` | No | Get single slide |
| PUT | `/:id` | Yes | Update slide |
| DELETE | `/:id` | Yes | Delete slide |
| DELETE | `/deleteMultiple` | Yes | Delete multiple slides |
| DELETE | `/deleteImage` | Yes | Delete image from Cloudinary |

#### Upload Slide Images

```http
POST /api/homeSlides/uploadImages
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data

images: [file1, file2]
```

#### Add Home Slide

```http
POST /api/homeSlides/add
Authorization: Bearer <accessToken>
```

> Upload images first, then call add. Images are taken from server-side stored array.

#### Get All Home Slides

```http
GET /api/homeSlides/
```

Returns all slides sorted by newest first.

#### Update Home Slide

```http
PUT /api/homeSlides/:id
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data

images: [file]
```

#### Delete Home Slide

```http
DELETE /api/homeSlides/:id
Authorization: Bearer <accessToken>
```

#### Delete Multiple Slides

```http
DELETE /api/homeSlides/deleteMultiple
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "ids": ["slide_id_1", "slide_id_2"]
}
```

---

### 9. Blog (`/api/blog`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/uploadImages` | Yes | Upload blog images |
| POST | `/add` | Yes | Create a blog post |
| GET | `/` | No | Get all blogs (paginated) |
| GET | `/:id` | No | Get single blog |
| PUT | `/:id` | Yes | Update blog |
| DELETE | `/:id` | Yes | Delete blog |

#### Upload Blog Images

```http
POST /api/blog/uploadImages
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data

images: [file1, file2]
```

#### Create Blog Post

```http
POST /api/blog/add
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "title": "Top 10 Smartphones in 2025",
  "description": "Here are the best smartphones..."
}
```

> Upload images first via `/uploadImages`.

#### Get All Blogs

```http
GET /api/blog/?page=1&perPage=10
```

#### Get Single Blog

```http
GET /api/blog/:id
```

#### Update Blog

```http
PUT /api/blog/:id
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated content...",
  "images": ["https://res.cloudinary.com/..."]
}
```

#### Delete Blog

```http
DELETE /api/blog/:id
Authorization: Bearer <accessToken>
```

---

### 10. Banner V1 (`/api/bannerV1`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/uploadImages` | Yes | Upload banner images |
| POST | `/add` | Yes | Create a banner |
| GET | `/` | No | Get all banners |
| GET | `/:id` | No | Get single banner |
| PUT | `/:id` | Yes | Update banner |
| DELETE | `/:id` | Yes | Delete banner |

#### Create Banner V1

```http
POST /api/bannerV1/add
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "bannerTitle": "Summer Sale",
  "productName": "iPhone 15 Pro",
  "catId": "category_id",
  "subCatId": "subcategory_id",
  "thirdsubCatId": "third_cat_id",
  "price": 999
}
```

> Upload images first via `/uploadImages`.

#### Get All Banners

```http
GET /api/bannerV1/
```

#### Update Banner

```http
PUT /api/bannerV1/:id
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "bannerTitle": "Updated Title",
  "productName": "Product Name",
  "price": 899
}
```

#### Delete Banner

```http
DELETE /api/bannerV1/:id
Authorization: Bearer <accessToken>
```

---

### 11. Banner V2 (`/api/bannerV2`)

Same endpoints as Banner V1 with an additional required field:

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/uploadImages` | Yes | Upload banner images |
| POST | `/add` | Yes | Create a banner |
| GET | `/` | No | Get all banners |
| GET | `/:id` | No | Get single banner |
| PUT | `/:id` | Yes | Update banner |
| DELETE | `/:id` | Yes | Delete banner |

#### Create Banner V2

```http
POST /api/bannerV2/add
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "bannerTitle": "Winter Collection",
  "productName": "Wool Jacket",
  "catId": "category_id",
  "subCatId": "subcategory_id",
  "thirdsubCatId": "third_cat_id",
  "price": 199,
  "alignInfo": "left"
}
```

`alignInfo`: `"left"` | `"right"` | `"center"` (required)

---

## Database Models

| Model | Collection | Key Fields |
|-------|-----------|------------|
| User | users | name, email, password, avatar, role, address_details[], verify_email, status |
| Product | products | name, price, images[], category, catId, subCatId, countInStock, isFeatured, rating, sale |
| Category | categories | name, images[], parentId |
| Cart | carts | userId, productId, quantity, subTotal, size, weight, ram |
| MyList | mylists | userId, productId, productTitle, price |
| Address | addresses | userId, address_line1, city, state, pincode, addressType, landmark |
| Order | orders | userId, products[], paymentId, payment_status, order_status, delivery_address, totalAmt |
| Blog | blogs | title, description, images[] |
| HomeSlider | homesliders | images[] |
| BannerV1 | bannerv1s | bannerTitle, productName, images[], catId, price |
| BannerV2 | bannerv2s | bannerTitle, productName, images[], catId, price, alignInfo |
| ProductRAMS | productrams | Ram |
| ProductWEIGHT | productweights | weight |
| ProductSIZE | productsizes | size |
| Reviews | reviews | userId, productId, rating, review, userName, image |

---

## Error Response Format

All error responses follow this structure:

```json
{
  "error": true,
  "success": false,
  "status": 400,
  "message": "Error description"
}
```

---

## Project Structure

```
server/
├── index.js                     # Express app setup, middleware, route mounting
├── package.json
├── .env                         # Environment variables
├── config/
│   ├── connectDB.js             # MongoDB connection
│   ├── emailService.js          # Email transport configuration
│   └── sendEmail.js             # Email sending utility
├── middlewares/
│   ├── auth.js                  # JWT authentication middleware
│   └── multer.js                # File upload configuration
├── models/                      # Mongoose schemas (16 models)
├── controllers/                 # Business logic (11 controllers)
├── router/                      # Route definitions (11 routers)
├── uploads/                     # Temporary file uploads
└── utils/
    ├── generatedAccessToken.js  # Access token generator
    ├── generatedRefreshToken.js # Refresh token generator
    └── verifyEmailTemplate.js   # Email verification HTML template
```

---

## License

ISC
