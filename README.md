# FSBO Platform 🏠

A comprehensive **For Sale By Owner (FSBO)** platform that empowers homeowners to sell their properties independently without traditional real estate agents.

## 🚀 Project Overview

This full-stack application provides:
- **Property listing management** with multimedia support
- **Marketing tools** including MLS integration and social sharing
- **Communication system** for buyer-seller interactions
- **Pricing and valuation tools** with CMA and AVM integration
- **Legal documentation** support and e-signature capabilities
- **Transaction management** from offer to closing

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form** for form management

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** database
- **Redis** for caching
- **JWT** authentication

### Infrastructure
- **Docker** for containerization
- **AWS S3** for file storage
- **CI/CD** pipeline ready

## 📁 Project Structure

```
fsbo-platform/
├── frontend/                 # Next.js React application
│   ├── src/
│   │   ├── app/             # Next.js App Router
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/            # Utility functions
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utility functions
│   │   └── config/        # Configuration files
│   └── package.json
├── database/               # Database scripts and migrations
│   └── init/              # Database initialization
├── docs/                  # Documentation
├── scripts/               # Build and deployment scripts
├── docker-compose.yml     # Docker services
└── package.json          # Root package.json
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm 8+
- **Docker** and Docker Compose
- **Git**

### 1. Clone and Install
```bash
git clone <repository-url>
cd fsbo-platform
npm run install:all
```

### 2. Start Database Services
```bash
# Start PostgreSQL and Redis
npm run db:up

# Optional: Start pgAdmin for database management
npm run pgadmin
```

### 3. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:5000
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health
- **pgAdmin**: http://localhost:5050 (admin@fsbo.com / admin123)

## 📊 Database Access

### Using pgAdmin
1. Open http://localhost:5050
2. Login with `admin@fsbo.com` / `admin123`
3. Add server connection:
   - Host: `postgres`
   - Port: `5432`
   - Username: `postgres`
   - Password: `fsbo_password`
   - Database: `fsbo_platform`

### Using Command Line
```bash
# Connect to PostgreSQL
docker exec -it fsbo_postgres psql -U postgres -d fsbo_platform

# View tables
\dt

# Query users
SELECT * FROM users;
```

## 🔧 Development Scripts

### Root Level Commands
```bash
npm run dev              # Start both frontend and backend
npm run build           # Build both applications
npm run start           # Start production servers
npm run db:up           # Start database services
npm run db:down         # Stop database services
npm run db:reset        # Reset database with fresh data
npm run clean           # Clean all node_modules and build files
```

### Frontend Commands
```bash
cd frontend
npm run dev             # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
```

### Backend Commands
```bash
cd backend
npm run dev             # Start development server with nodemon
npm run build           # Compile TypeScript to JavaScript
npm run start           # Start production server
```

## 🌟 Development Progress

### ✅ Completed (Phase 1)
- [x] **Project Setup** - Full-stack structure with TypeScript
- [x] **Database Design** - PostgreSQL with initial schema
- [x] **Authentication Foundation** - JWT and bcrypt setup
- [x] **Development Environment** - Docker, scripts, and tooling

### 🚧 In Progress
- [ ] **Seller Dashboard** - Basic UI and navigation
- [ ] **Listing Creator** - Multi-step property wizard
- [ ] **Media Upload** - Image/video handling with cloud storage

### 📋 Next Steps
1. Complete seller dashboard UI
2. Implement listing creation workflow
3. Add authentication endpoints
4. Set up media upload system
5. Begin MLS integration research

## 🔐 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fsbo_platform
DB_USER=postgres
DB_PASSWORD=fsbo_password
JWT_SECRET=your_jwt_secret_key_here
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📚 API Documentation

### Health Check
```bash
GET /api/health
```

### Authentication (Coming Soon)
```bash
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
```

### Properties (Coming Soon)
```bash
GET /api/properties
POST /api/properties
PUT /api/properties/:id
DELETE /api/properties/:id
```

## 🐳 Docker Services

The project includes these Docker services:

- **postgres**: PostgreSQL database on port 5432
- **redis**: Redis cache on port 6379
- **pgadmin**: Database management tool on port 5050

## 🧪 Testing

```bash
# Run all tests
npm test

# Run frontend tests
cd frontend && npm test

# Run backend tests
cd backend && npm test
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Setup
1. Set production environment variables
2. Configure AWS S3 for file storage
3. Set up production PostgreSQL database
4. Configure Redis for caching
5. Set up SSL certificates

## 📈 Performance Monitoring

- **Database**: PostgreSQL with connection pooling
- **Caching**: Redis for session and data caching
- **CDN**: AWS CloudFront for static assets
- **Monitoring**: Application performance monitoring setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Project Requirements Document](./Product%20Requirements%20Document_%20For%20Sale%20By%20Owner%20(FSBO)%20Platform.md)
- [Development Checklist](./FSBO_Development_Checklist.md)
- [Task Breakdown Analysis](./FSBO_Task_Breakdown_Analysis.md)

---

**Built with ❤️ for the FSBO community** # Force deployment Mon Jul 14 00:36:24 PDT 2025
