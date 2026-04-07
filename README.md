<div align="center">

# SafetyNet 🚨

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.21%2B-000000?&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.13%2B-47A248?&logo=mongodb)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-FF6B6B?)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-ISC-blue?)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen?)](package.json)

**An intelligent multi-department emergency response management system** connecting citizens with first responders in real-time

[📖 Documentation](#getting-started) · [🐛 Report Bug](https://github.com/kapvm4444/safetynet-git/issues)

</div>

---

## 📌 About the Project

SafetyNet is a comprehensive emergency management platform designed to bridge the gap between citizens in distress and first responders across multiple departments. Rather than a one-size-fits-all approach, SafetyNet intelligently routes emergency requests to the appropriate departments (police, medical, fire, women's safety, animal safety) with precise location tracking and real-time notifications.

**The Problem:** During emergencies, precious seconds are wasted navigating multiple systems or getting transferred between departments. Citizens often don't know which service to contact, and responders lack organized, prioritized access to incidents.

**Our Solution:** A unified platform where users create emergency cards with critical health/safety information, submit real-time requests with location data, and first responders (operators, admins) can track and resolve emergencies efficiently.

**Who It's For:**
- 👥 Citizens needing emergency assistance
- 🚓 Police departments and officers
- 🏥 Medical teams and paramedics
- 🚒 Fire departments
- 👩‍⚕️ Women's safety coordinators
- 🐾 Animal rescue services

---

## ✨ Features

- **👤 User Authentication & Profiles**
  - Secure signup/login with JWT tokens
  - Role-based access control (user, operator, admin, super-admin)
  - Password encryption with bcryptjs
  - Emergency contact management
  - Health information storage (blood type, past diseases, Aadhaar)

- **🆘 Emergency Request System**
  - Create emergency requests with geolocation tracking
  - Multi-department routing (police, medical, fire, women-safety, animal-safety)
  - Request status tracking and resolution marking
  - Automatic email notifications to emergency contacts

- **🏷️ Emergency Cards**
  - Create personalized emergency cards with critical information
  - Store medical and personal safety details
  - Department-specific categorization
  - Quick access during emergencies

- **🔐 Security & Data Protection**
  - XSS attack prevention with xss-clean
  - MongoDB injection prevention with express-mongo-sanitize
  - HTTP Parameter Pollution (HPP) protection
  - CORS enabled for cross-origin requests
  - Password change tracking and JWT re-authentication

- **👨‍💼 Administrative Dashboard**
  - Super-admin: User management, department admin creation
  - Admin: Department-level oversight and operator management
  - Operator: Real-time request handling and resolution
  - Role-based resource access control

- **📧 Smart Notifications**
  - Email alerts sent to emergency contacts via Brevo SMTP
  - Request status updates
  - Extensible for SMS notifications (SMS API integrated)

- **📱 API-First Architecture**
  - RESTful endpoints for seamless mobile/web integration
  - Comprehensive error handling and validation
  - Query filtering and sorting capabilities

---

## 💡 Use Cases

| Use Case | Description |
|----------|-------------|
| **Traffic Accident Response** | User reports accident with location → police + medical departments receive real-time alert → operator marks resolved when handled |
| **Medical Emergency** | User with stored medical history triggers request → paramedics receive health info + location → emergency contacts are auto-notified |
| **Women's Safety Incident** | Woman feels threatened → sends SOS → women-safety dept + police + emergency contacts alerted simultaneously |
| **Animal Rescue** | User spots injured animal → creates request → animal safety team responds with location data |
| **Multi-Department Coordination** | Complex emergency (fire + medical required) → system routes to multiple departments for coordinated response |

---

## 🎯 Benefits

- ⚡ **Faster Response Times** — Direct routing eliminates department transfers
- 🎯 **Precise Location Tracking** — Geolocation data gets responders to the right place instantly
- 🏥 **Medical Context** — Emergency contacts + health history available to paramedics before arrival
- 🔒 **Enterprise-Grade Security** — Protection against common web vulnerabilities out of the box
- 📊 **Complete Audit Trail** — All requests timestamped and trackable for accountability
- 🌐 **Scalable Architecture** — RESTful API ready for mobile apps, web dashboards, integrations
- 👥 **Multi-Role Management** — Supports hierarchical team structures from operators to super-admins

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Node.js 18+ | JavaScript runtime environment |
| **Framework** | Express.js 4.21+ | Web application framework |
| **Database** | MongoDB 5.13+ | NoSQL document database |
| **Auth** | JWT (jsonwebtoken) | Stateless authentication |
| **Password Security** | bcryptjs | Password hashing & salting |
| **Email Service** | Nodemailer + Brevo SMTP | Transactional emails |
| **Security** | xss-clean, hpp, mongo-sanitize | Threat protection |
| **HTTP** | CORS, Cookie-Parser | Request handling |
| **Logging** | Morgan | HTTP request logging |
| **Validation** | validator.js | Input validation |
| **Dev Tools** | Nodemon, NDB | Development experience |
| **Deployment** | Vercel (serverless) | Production hosting |

---
<div id="getting-started"></div>

## 🚀 Getting Started (For Developers)

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** v8.0.0 or higher (comes with Node.js)
- **MongoDB Account** ([Create Free Cluster](https://www.mongodb.com/cloud/atlas)) or local MongoDB installation
- **Git** for version control
- **Email Service Account** — Brevo (Sendinblue) or similar SMTP provider ([Brevo Free Tier](https://www.brevo.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kapvm4444/safetynet-git.git
   cd safetynet-git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables file**
   ```bash
   cp .env.example .env
   ```
   > Note: If `.env.example` doesn't exist, create a `.env` file with the variables listed below

4. **Configure environment variables**
   
   Edit `.env` with your settings:
   ```dotenv
   # Server Configuration
   NODE_ENV=
   PORT=

   # Database
   DATABASE_URL=mongodb-connection-url
   DATABASE_PASSWORD=your_mongodb_password

   # JWT Authentication
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=60

   # Email Service (Brevo/Sendinblue)
   EMAIL_USERNAME=your_brevo_smtp_username
   EMAIL_PASSWORD=your_brevo_smtp_password
   ```

   **Environment Variable Descriptions:**
   - `NODE_ENV` — Application environment (`development` or `production`)
   - `PORT` — Server port (default: 3000)
   - `DATABASE_URL` — MongoDB connection string with Atlas credentials
   - `DATABASE_PASSWORD` — MongoDB password (replace `<PASSWORD>` placeholder)
   - `JWT_SECRET` — Secret key for signing JWT tokens (use a strong random string)
   - `JWT_EXPIRE` — Token expiration duration (e.g., `30d`, `7d`)
   - `JWT_COOKIE_EXPIRE` — Cookie expiration in days
   - `EMAIL_USERNAME` — SMTP username for email notifications
   - `EMAIL_PASSWORD` — SMTP password for email notifications

### Run Locally

**Development Mode (with auto-reload)**
```bash
npm run start:dev
```
The server will start on `http://localhost:3000` and watch for file changes using Nodemon.

**Production Mode**
```bash
npm start
```

**Debug Mode (Node Inspector)**
```bash
npm run debug
```
Opens Node Debugger (ndb) for stepping through code.

### Build for Production

SafetyNet is already optimized for production. For deployment to Vercel:

1. Push your code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy with `vercel deploy` or via GitHub push

The `vercel.json` configuration automatically handles serverless function setup.

---

## 📖 How to Use (For Mobile App Users) (Coming Soon)

### Signing Up & Creating Your Profile

1. **Open SafetyNet App** and tap "Sign Up"
2. **Enter your details:**
   - Full name, email, date of birth
   - Mobile number, address
   - Gender and blood type
   - Past medical conditions (optional)
   - Emergency contacts (name + phone)
3. **Create a strong password** (min 8 characters)
4. **Tap "Create Account"** — you're now registered!

### Creating an Emergency Card

Emergency Cards store your critical health & safety information for responders to access instantly.

1. **Go to "My Cards"** section
2. **Tap "Create New Card"**
3. **Enter card details:**
   - Card name (e.g., "Heart Condition", "Allergy Alert")
   - Description of condition or allergy
   - Select relevant department(s)
4. **Save Card** — responders will see this during emergencies

### Sending an Emergency Request

When you need immediate help:

1. **Tap the SOS button** (large red button on home screen)
2. **Select emergency type** (police, medical, fire, women-safety, animal-safety)
3. **Add description** (what's happening, any injuries, etc.)
4. **Confirm location** — app automatically sends your GPS coordinates
5. **Your emergency contacts are notified** — they receive an email alert
6. **Wait for responder** — track their status in real-time

### For First Responders (Admins/Operators)

1. **Login with your operator/admin account**
2. **View incoming emergency requests** on your dashboard
3. **See request details:** user's health info, location, emergency type
4. **Navigate to location** using built-in map
5. **Update request status** as you respond
6. **Mark as "Resolved"** when emergency is handled

---

## 📁 Project Structure

```
safetynet-git/
│
├── server.js                 # Main server entry point with error handling
├── app.js                    # Express app configuration & middleware setup
├── package.json              # Dependencies and npm scripts
├── vercel.json               # Serverless deployment configuration
├── .env                      # Environment variables (NOT in git)
│
├── controllers/              # Business logic layer
│   ├── authController.js     # JWT, signup, login, password management
│   ├── userController.js     # User profile CRUD operations
│   ├── cardController.js     # Emergency card management
│   ├── requestController.js  # Emergency request handling
│   ├── errorController.js    # Global error handler
│   └── handlerFactory.js     # Reusable CRUD handler factory
│
├── models/                   # MongoDB schemas
│   ├── userModel.js          # User schema with auth methods
│   ├── cardModel.js          # Emergency card schema
│   └── requestModel.js       # Emergency request schema with email hook
│
├── routes/                   # API endpoint definitions
│   ├── userRouter.js         # /api/v1/users endpoints
│   ├── cardRouter.js         # /api/v1/cards endpoints
│   └── requestRouter.js      # /api/v1/requests endpoints
│
├── utils/                    # Helper utilities
│   ├── catchAsync.js         # Async error wrapper
│   ├── appError.js           # Custom error class
│   ├── apiFeature.js         # Query filtering & pagination
│   ├── email.js              # Email notification service
│   └── data/                 # Development data
│       ├── import-data.js    # Database seed script
│       ├── user-data.json    # Sample user data
│       ├── card-data.json    # Sample emergency cards
│       └── request-data.json # Sample requests
│
├── public/                   # Static files
│   ├── img/users/            # User profile pictures
│   └── secret/               # Protected assets
│
└── node_modules/             # Dependencies (auto-generated)
```

**Key Architectural Patterns:**
- **MVC Architecture** — Separation of models, views (API responses), and controllers
- **Factory Pattern** — Reusable CRUD handlers in `handlerFactory.js`
- **Middleware Chain** — Security and validation middleware in `app.js`
- **Error Handling** — Centralized error handler with custom `AppError` class
- **Async Wrapper** — `catchAsync()` eliminates repetitive try-catch blocks

---

## API Quick Reference

### Authentication
```bash
# Signup
POST /api/v1/users/signup

# Login
POST /api/v1/users/login

# Change Password (requires auth)
PATCH /api/v1/users/change-password
```

### User Management
```bash
# Get current user profile
GET /api/v1/users/me

# Update profile
PATCH /api/v1/users/update-info

# Get user's emergency cards
GET /api/v1/users/cards

# Admin: Get all users
GET /api/v1/users

# Admin: Manage specific user
GET|PATCH|DELETE /api/v1/users/:id

# Admin: Create new operator/admin
POST /api/v1/users/create/:role
```

### Emergency Cards
```bash
# Get all cards
GET /api/v1/cards

# Create card
POST /api/v1/cards

# Get/Update/Delete specific card
GET|PATCH|DELETE /api/v1/cards/:id
```

### Emergency Requests
```bash
# Get all requests
GET /api/v1/requests

# Create emergency request (SOS)
POST /api/v1/requests

# Get/Update/Delete request
GET|PATCH|DELETE /api/v1/requests/:id

# Mark request as resolved (operator/admin only)
PATCH /api/v1/requests/:id/resolve
```

---

## 🤝 Contributing

Contributions are welcome! SafetyNet is built by the community, for the community.

### How to Contribute

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and commit
   ```bash
   git add .
   git commit -m "Add: brief description of your feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** on GitHub
   - Describe what you changed and why
   - Link any related issues
   - Wait for review and feedback

### Development Guidelines
- Follow existing code style (check `.prettierrc`)
- Add comments for complex logic
- Test your changes before submitting
- Update documentation if needed

---

## 👤 Author

Made with ❤️ by [Khush Vachhani](https://github.com/kapvm4444)

- 🔗 **GitHub:** [github.com/kapvm4444](https://github.com/kapvm4444)
- 🌐 **Portfolio:** [khush.pro](https://khush.pro)
- 💼 **LinkedIn:** [linkedin.com/in/khushvachhani](https://linkedin.com/in/khushvachhani)

---

<div align="center">

### ⭐ Found SafetyNet helpful? Give it a star!

**Have questions?** [Open an issue](https://github.com/kapvm4444/safetynet-git/issues) or reach out on LinkedIn.

---

**SafetyNet — Emergency Response. Simplified.** 🚨

</div>

