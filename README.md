# MentorLagbe – Smart Tuition & Mentorship Platform

MentorLagbe is a full-stack tuition management platform that connects students with qualified tutors for personalized academic guidance. Students can explore tuition opportunities, apply for suitable sessions, and track their applications, while tutors can create tuition listings and manage student applications. Admins can manage users, moderate tuition posts, and monitor subscription payments.

## 🌐 Live Links

- **Live Website:** https://mentorlagbe-client-xi.vercel.app/
- **Backend API:** https://mentorlagbe-server-zeta.vercel.app/
- **Client Repository:** [Add Client GitHub Repository URL]
- **Server Repository:** [Add Server GitHub Repository URL]

## 🚀 Key Features

### 👨‍🎓 Student
- Register and log in as a student.
- Browse and search approved tuition listings.
- Filter tuitions by subject, class level, and learning mode.
- View detailed tuition information.
- Apply for tuition and prevent duplicate applications.
- Track application status: Pending, Accepted, or Rejected.
- Cancel pending applications.
- Upgrade to the Pro plan using Stripe.
- Manage personal profile information.

### 👨‍🏫 Tutor
- Register and log in as a tutor.
- Create and manage tuition listings.
- Upload tuition banner images using ImgBB.
- Edit, delete, and manage tuition posts.
- Track tuition approval status.
- Manage student applications.
- Accept or reject student applications.
- Free plan supports up to 2 tuition posts.
- Pro plan supports unlimited tuition posts.

### 🛡️ Admin
- View platform statistics.
- Manage registered users and user roles.
- Approve or reject tuition listings.
- Monitor tuition activities.
- View Stripe subscription transactions.
- Track platform revenue.

### 💳 Payment & Subscription
- Stripe Checkout integration.
- Separate Pro subscription plans for Students and Tutors.
- Automatic subscription plan updates after successful payment.
- Payment transaction records.
- Payment success and cancellation pages.

### 🎨 Additional Features
- Responsive design for mobile, tablet, and desktop.
- Role-based authentication and authorization.
- JWT-protected backend API routes.
- Image upload using ImgBB API.
- Toast notifications for user actions.
- Custom loading, error, and not-found pages.
- Dark and Light theme support.

## 🛠️ Technology Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- MongoDB Native Driver

### Authentication & Security
- Better Auth
- Better Auth MongoDB Adapter
- JWT
- Role-Based Access Control

### Payment & Media
- Stripe Checkout
- Stripe Webhooks / Session Verification
- ImgBB API

### Deployment
- Vercel

## 🗄️ Database Collections

MentorLagbe uses four primary MongoDB collections:

| Collection | Purpose |
|---|---|
| `users` | Stores user information, roles, profiles, and subscription plans. |
| `tuitions` | Stores tuition listings created by tutors. |
| `applications` | Stores student applications and their statuses. |
| `payments` | Stores Stripe subscription transaction records. |

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB Atlas account
- Stripe account
- ImgBB API key

### 1. Clone the repositories

Clone the client and server repositories separately.

```bash
# Clone Client
git clone YOUR_CLIENT_REPOSITORY_URL

# Clone Server
git clone YOUR_SERVER_REPOSITORY_URL
```

### 2. Install dependencies

For the client:

```bash
cd mentorlagbe-client
npm install
```

For the server:

```bash
cd mentorlagbe-server
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the client project and configure the required variables.

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
MONGODB_URI=your_mongodb_connection_string

NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Configure the server environment variables in its `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

Add any additional environment variables required by your implementation.

**Important:** Never commit `.env` or `.env.local` files to GitHub. Keep all secret keys private.

### 4. Run the Development Servers

Start the client:

```bash
npm run dev
```

Start the server:

```bash
npm start
```

The frontend will run at:

```text
http://localhost:3000
```

The backend will run at:

```text
http://localhost:5000
```

## 🔐 Demo Credentials

Use the following credentials to test the application.

### Admin Account

- **Email:** [Add Admin Email]
- **Password:** [Add Admin Password]

### Tutor Account

- **Email:** [Add Tutor Email]
- **Password:** [Add Tutor Password]

> Replace the placeholders with your actual demo credentials before publishing the README.

## 📁 Project Structure

```text
MentorLagbe/
│
├── mentorlagbe-client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── .env.local
│   └── package.json
│
└── mentorlagbe-server/
    ├── index.js
    ├── .env
    └── package.json
```

*The structure above is illustrative; adjust it to match the actual repositories.*

## 👨‍💻 Author

**Alhaz Uddin**

- GitHub: [Your GitHub Profile]
- Project: MentorLagbe

---

⭐ If you find this project useful, consider giving it a star!
