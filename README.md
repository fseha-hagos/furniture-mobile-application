# 🛋️ Furniture E-Commerce Mobile App 🚀

![My App](app/assets/images/chair1.png)

Welcome to the **Furniture E-Commerce Mobile App** repository! This is a React Native-based mobile application designed to provide users with a seamless shopping experience for furniture products. The app integrates **Firebase** for real-time database management, **Chapa** for secure payment processing, and **Clerk** for user authentication. Whether you're a developer or a furniture enthusiast, this app has something for everyone!

---

## 🌟 Features

- **User Authentication**: Secure login and registration using **Clerk**.
- **Product Listings**: Browse through a wide variety of furniture products.
- **Product Details**: View detailed descriptions, images, and prices for each product.
- **Shopping Cart**: Add products to your cart and manage quantities.
- **Order Placement**: Place orders and track their status.
- **Payment Integration**: Secure payment processing using **Chapa**.
- **Wishlist**: Save your favorite products for later.
- **User Profiles**: Manage your profile and view order history.
- **Push Notifications**: Receive notifications for order updates (optional).

---

## 🛠️ Tech Stack

- **Frontend Framework**: 
  - React Native (JavaScript/TypeScript)
  - Expo (for development and deployment)

- **Database**: 
  - Firebase Firestore (for real-time data storage)
  - Firebase Storage (for storing product images)

- **Authentication**: 
  - Clerk (for user authentication and session management)

- **Payment Gateway**: 
  - Chapa (for secure payment processing)

- **State Management**: 
  - React Context API or Redux (optional)

- **Other Tools**: 
  - React Navigation (for navigation)
  - Axios (for API calls)
  - Expo Notifications (for push notifications, optional)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI (for running the app)
- Firebase account (for Firestore and Storage)
- Clerk account (for authentication)
- Chapa account (for payment integration)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/furniture-ecommerce-app.git
   cd furniture-ecommerce-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add a new web app to your Firebase project and copy the configuration.
   - Create a `firebaseConfig.js` file in the `src` directory and add your Firebase configuration:

     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     };

     export default firebaseConfig;
     ```

4. **Set up Clerk**

   - Create a Clerk project at [Clerk Dashboard](https://dashboard.clerk.com/).
   - Copy your **Publishable Key** and add it to your app:

     ```javascript
     // In your App.js or a config file
     import { ClerkProvider } from "@clerk/clerk-expo";

     const clerkPublishableKey = "YOUR_CLERK_PUBLISHABLE_KEY";

     export default function App() {
       return (
         <ClerkProvider publishableKey={clerkPublishableKey}>
           {/* Your app components */}
         </ClerkProvider>
       );
     }
     ```

5. **Set up Chapa**

   - Create a Chapa account at [Chapa](https://dashboard.chapa.co/).
   - Copy your **Secret Key** and use it for payment integration in your app.

6. **Run the app**

   ```bash
   expo start
   ```

   Scan the QR code with the Expo Go app on your mobile device to run the app.

---

## 📄 API Documentation

The app integrates with the following APIs:

### Clerk Authentication
- **Sign Up**: Create a new user account.
- **Sign In**: Log in an existing user.
- **Sign Out**: Log out the current user.

### Firebase Firestore
- **Fetch Products**: Retrieve a list of furniture products.
- **Fetch Product Details**: Retrieve details for a specific product.
- **Create Order**: Add a new order to Firestore.
- **Update Order**: Update the status of an order.

### Chapa Payment
- **Create Payment**: Initiate a payment using Chapa.
- **Verify Payment**: Verify the status of a payment.
