# SquadHR - Complete HR Solution Application

A comprehensive HR management system similar to Greythr, providing all solutions for employee management.

## Features

### Core Modules

1. **Authentication & Authorization**
   - User registration and login
   - JWT-based authentication
   - Role-based access control (Admin, HR, Manager, Employee)

2. **Employee Management**
   - Complete employee CRUD operations
   - Employee profiles with personal information
   - Department and designation management
   - Manager-subordinate relationships

3. **Leave Management**
   - Apply for leaves (Sick, Casual, Earned, Maternity, Paternity, Comp Off, LOP)
   - Leave approval workflow
   - Leave balance tracking
   - Leave history

4. **Attendance Tracking**
   - Clock in/out functionality
   - Daily attendance records
   - Hours calculation
   - Attendance history

5. **Payroll Management**
   - Salary management
   - Payroll generation
   - Payslip history
   - Tax and deduction calculations

6. **Document Management**
   - Upload and manage employee documents
   - Document categorization
   - Secure document access

7. **Performance Reviews**
   - Performance review creation
   - Rating and feedback system
   - Review history

8. **Dashboard**
   - Admin dashboard with statistics
   - Employee dashboard with personal metrics
   - Department-wise analytics

## Tech Stack

### Backend
- **Node.js** with **Express**
- **TypeScript**
- **Prisma ORM** with **PostgreSQL**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Zod** for validation

### Frontend
- **React** with **TypeScript**
- **Vite** for build tooling
- **React Router** for routing
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Lucide React** for icons
- **date-fns** for date formatting

## Project Structure

```
HR_Solutions/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth middleware
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # State management
│   │   ├── utils/          # Utility functions
│   │   └── App.tsx         # Main app component
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/squadhr?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=development
```

4. Generate Prisma client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Running Both Together

From the root directory:
```bash
npm run install:all  # Install all dependencies
npm run dev          # Run both backend and frontend
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create employee (Admin/HR only)
- `PUT /api/employees/:id` - Update employee (Admin/HR only)
- `DELETE /api/employees/:id` - Delete employee (Admin only)

### Leaves
- `POST /api/leaves` - Apply for leave
- `GET /api/leaves` - Get all leaves (Admin/HR)
- `GET /api/leaves/my-leaves` - Get my leaves
- `GET /api/leaves/balance` - Get leave balance
- `PUT /api/leaves/:id/status` - Update leave status (Admin/HR/Manager)

### Attendance
- `POST /api/attendance/clock-in` - Clock in
- `POST /api/attendance/clock-out` - Clock out
- `GET /api/attendance/my-attendance` - Get my attendance
- `GET /api/attendance/employee/:employeeId` - Get employee attendance

### Payroll
- `GET /api/payroll/my-payrolls` - Get my payrolls
- `POST /api/payroll` - Create payroll (Admin/HR)
- `POST /api/payroll/generate` - Generate payrolls (Admin/HR)

### Documents
- `GET /api/documents/my-documents` - Get my documents
- `POST /api/documents` - Upload document
- `DELETE /api/documents/:id` - Delete document

### Reviews
- `GET /api/reviews/my-reviews` - Get my reviews
- `POST /api/reviews` - Create review (Admin/HR/Manager)

### Dashboard
- `GET /api/dashboard/admin` - Admin dashboard data
- `GET /api/dashboard/employee` - Employee dashboard data

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:
- User (authentication)
- Employee (employee details)
- Leave (leave requests)
- Attendance (attendance records)
- Payroll (salary records)
- Document (employee documents)
- PerformanceReview (performance reviews)
- Notification (notifications)

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control
- Input validation with Zod
- Protected API routes

## Future Enhancements

- Email notifications
- File upload functionality
- Advanced reporting and analytics
- Mobile app support
- Integration with external systems
- Multi-tenant support
- Advanced leave policies
- Shift management
- Expense management

## License

This project is open source and available for use.

## Support

For issues and questions, please create an issue in the repository.

