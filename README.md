# MentorLagbe – Client Side

MentorLagbe is a Smart Tuition & Mentorship Platform built with Next.js. It connects students with qualified tutors and provides a seamless platform for finding tuition opportunities, managing applications, and accessing personalized academic guidance.

The frontend provides a responsive and user-friendly experience for Students, Tutors, and Admins with role-based dashboards and subscription management.

## 🌐 Live Links

- **Live Website:** https://mentorlagbe-client-xi.vercel.app/
- **Backend API:** https://mentorlagbe-server-zeta.vercel.app/
- **Client Repository:** https://github.com/alhazuddin07/mentorlagbe-client
- **Server Repository:** https://github.com/alhazuddin07/mentorlagbe-server

## 🚀 Key Features

### 🏠 Home Page
- Modern and responsive landing page.
- Hero section with tuition search and navigation.
- Dynamic featured tuition listings.
- Pricing and subscription plans.
- How It Works section.
- Popular subjects and testimonials.

### 🔍 Browse Tuitions
- Browse approved and active tuition listings.
- Search tuitions by title and subject.
- Filter by subject, class level, and learning mode.
- View detailed tuition information.

### 👨‍🎓 Student Dashboard
- View dashboard statistics.
- Browse and apply for tuition opportunities.
- Track application status.
- View all submitted applications.
- Cancel pending applications.
- Upgrade to the Pro subscription plan.

### 👨‍🏫 Tutor Dashboard
- View tuition and applicant statistics.
- Create new tuition listings.
- Upload tuition banner images using ImgBB.
- Manage created tuition posts.
- Edit and delete tuition listings.
- Toggle tuition availability.
- View and manage student applications.
- Accept or reject applications.
- Upgrade to the Pro subscription plan.

### 🛡️ Admin Dashboard
- View platform statistics.
- Manage registered users.
- Manage user roles.
- Approve or reject tuition listings.
- View subscription transactions.
- Monitor platform revenue.

### 👤 Authentication & Profile
- User registration and login.
- Student and Tutor role selection during registration.
- Role-based dashboard navigation.
- Protected routes.
- Profile information update.
- Profile picture upload using ImgBB.
- Sign out functionality.

### 💳 Payment & Subscription
- Free and Pro subscription plans.
- Separate subscription options for Students and Tutors.
- Stripe Checkout integration.
- Payment success and cancellation pages.
- Subscription upgrade after successful payment.

### 🎨 Additional Features
- Responsive design for mobile, tablet, and desktop.
- Dark and Light theme support.
- Toast notifications.
- Loading states and skeleton loaders.
- Custom error and 404 pages.
- Reusable UI components.
- Clean and consistent user interface.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework |
| React | User interface |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Shadcn UI | UI components |
| Lucide React | Icons |
| Better Auth | Authentication |
| Stripe | Subscription payments |
| ImgBB API | Image uploads |
| Sonner | Toast notifications |

## ⚙️ Installation & Setup

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd mentorlagbe-client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## 📁 Project Structure

```text
mentorlagbe-client/
│
├── public/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── types/
│
├── package.json
├── package-lock.json
└── tsconfig.json
```

*The structure above is illustrative. Update it according to your actual project structure.*

## 🌐 Deployment

The frontend is deployed on Vercel.

- **Live Website:** https://mentorlagbe-client-xi.vercel.app/

## 👨‍💻 Author

**Alhaz Uddin**

- GitHub: https://github.com/alhazuddin07
- Project: MentorLagbe

---

⭐ If you find this project useful, consider giving the repository a star!
