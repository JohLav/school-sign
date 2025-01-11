# Electronic Signature Application for Schools

## Project Overview

This project focuses on designing and developing an **electronic signature and administrative management application** tailored to the needs of schools. The platform enables teachers, parents, and administrators to securely and legally sign documents online, manage attendance sheets, define course schedules, and handle teacher-related tasks—all accessible via a web browser.

## Launch Project

- Clone the repository:

```
$ git clone https://github.com/JohLav/school-sign.git
```

- Go to the project directory and install dependencies:

```
$ cd school-sign && npm install
```

- Duplicate `.env.sample` and name it `.env` to associate your environment with security:

```
DATABASE_URL="mysql://me:MyPa$$w0Rd@localhost:3306/school-sign?connection_limit=1"
```

- Create the database locally:

```
CREATE DATABASE `school-sign`;
```

- Generate the Prisma Client based on your schema:

```
npx prisma generate
```

- Seed the database with dummy data:

```
npx prisma db seed
```

<small>In case you need a complete database reset (drop db, create db, apply all migrations and generate prisma client): https://www.basedash.com/blog/how-to-reset-and-seed-a-prisma-database</small>

- To show the School Sign application window with your current build:

```
$ npm run dev
```

## Key Features

### Document Management

- Upload and manage documents for signing (e.g., authorizations, reports, contracts).
- Create custom document templates.
- Secure storage of signed documents.

### Electronic Signatures

- Digital signatures with certified timestamps.
- Authentication of signers (teachers, parents, administrators).
- Status tracking for signatures (pending, signed, rejected).

### Attendance Management

- Virtual attendance sheets for students.
- Electronic marking of attendance by teachers.
- Monitoring attendance and absences.

### Course Scheduling

- Create and manage class schedules.
- Integration with calendars for planning.
- Notifications for schedule updates.

### Teacher Management

- Profile and schedule management.
- Attendance tracking for teachers.

## Future features

### Compliance and Security

- eIDAS-compliant for legal and regulatory standards.
- Encrypted data at rest and in transit.
- Audit logs and user activity tracking.

### Advanced Features

- Integration with school management systems (SMS).
- API for third-party integration.
- Usage analytics and reporting.

## Development Methodology

1. **Needs Analysis**: Study existing solutions (e.g., Edusign, YouSign) and draft requirements with stakeholders.
2. **Design**: Create UI wireframes and system architecture.
3. **Development**: Build the front-end and back-end.
