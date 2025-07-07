🚗 Car Rental - Full Stack MERN Application

A complete Car Rental platform where users can browse cars, book rentals, and make payments. Includes Owner Dashboard, User Authentication (Email/Password & Google Login), Razorpay Integration, and more.

<hr>
🌐 Live Demo

Frontend: https://carrental-ecommerce.vercel.app

Backend API: Deployed via Render
<hr>

⚙️ Tech Stack

| Tech              | Description                          |
| ----------------- | ------------------------------------ |
| **Frontend**      | React.js, Tailwind CSS, React Router |
| **Backend**       | Node.js, Express.js                  |
| **Database**      | MongoDB Atlas                        |
| **Auth**          | Firebase (Email/Password & Google)   |
| **Payments**      | Razorpay Integration                 |
| **Cloud Storage** | ImageKit for optimized car images    |

<hr>

✨ Features

✔️ User Registration & Login (Email/Password + Google OAuth)

✔️ Secure JWT-based session management

✔️ Explore available cars by brand, category, or type

✔️ Car Owners can add, manage, and delete car listings

✔️ Owner Dashboard with Booking Management

✔️ Booking system with status updates (Pending → Confirmed)

✔️ Payment Gateway via Razorpay

✔️ Image optimization with ImageKit

✔️ Responsive Design for all devices

<hr>

📁 Folder Structure

carrental/<br>
├── backend/    // Express.js API, MongoDB models, Routes <br>
├── frontend/   // React.js App with Tailwind CSS <br>
└── .env        // Environment variables <br>

<hr>

🚀 Getting Started (Local Setup)

1️⃣ Clone the repository

git clone https://github.com/YourUsername/carrental.git <br>
cd carrental
 <hr>

 2️⃣ Setup Backend

 cd backend <br>
npm install
<hr>

Create .env inside backend: <br>

PORT=5000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

<hr>
Start Backend:<br>

npm run dev

<hr>

3️⃣ Setup Frontend 

cd frontend

npm install

<hr>

Create .env inside frontend: <br>

VITE_API_URL=http://localhost:5000

VITE_FIREBASE_API_KEY=your_firebase_key

VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain

VITE_FIREBASE_PROJECT_ID=your_project_id

VITE_FIREBASE_APP_ID=your_app_id

VITE_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key

VITE_IMAGEKIT_URL_ENDPOINT=your_imagekit_url

VITE_RAZORPAY_KEY=your_razorpay_key

<hr>

Start Frontend: <br>
npm run dev

<hr>

📝 Environment Variables Reference 

You need the following keys:
<br>
<br>
| Key                    | Usage                    |
| ---------------------- | ------------------------ |
| `MONGO_URL`            | MongoDB Atlas connection |
| `JWT_SECRET`           | JWT Signing Secret       |
| `VITE_API_URL`         | Backend API URL          |
| `Firebase Credentials` | Authentication setup     |
| `ImageKit Keys`        | Car Image optimization   |
| `VITE_RAZORPAY_KEY`    | Payment Gateway          |
<hr>
<hr>
📸 Screenshots
<br>
<br>

| Home Page                     | Owner Dashboard                         | 
| ----------------------------- | --------------------------------------- |
| ![Home](screenshots/home.jpg.png) | ![Dashboard](screenshots/admin.jpg.png) |

<hr>
<hr>

📦 Future Improvements


* Role-based Admin panel

* Booking history for users

* Review & Rating system for cars

* Advanced car filtering options

* Email notifications for bookings

<hr>
<hr>

🙌 Contributing


Pull requests are welcome! For major changes, please open an issue first to discuss.
<hr>

⭐ Acknowledgements

React.js

Node.js

MongoDB

Firebase

Razorpay

ImageKit


<hr>

📬 Contact

Harish K

🔗 [LinkedIn](https://www.linkedin.com/in/harish-k-121735250/)  

💻 [GitHub](https://github.com/Harish-Kuppusamy)  

📧 [Email](mailto:ksharishcs20@gmail.com)  


<hr>


