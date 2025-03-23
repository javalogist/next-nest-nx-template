# 🚀 Nest.js Backend Template

This is a **Nest.js Backend Template** configured for high performance, security, and scalability. It supports REST APIs, JWT authentication, role-based authorization, MongoDB, and task scheduling, along with several additional utilities.

---

## 📚 **Project Overview**

### ⚡️ Tech Stack
- **Nest.js** - Backend Framework
- **MongoDB** - Primary Database (Switchable with PlanetScale using Prisma)
- **Swagger** - API Documentation
- **Passport & JWT** - Authentication & Authorization
- **Throttler** - Rate Limiting
- **Winston** - Logging & Monitoring
- **Csurf & Helmet** - Security Enhancements
- **Task Scheduling** - Using `@nestjs/schedule`

---

## 🎯 **Key Features**

✅ **Role-Based Access Control (RBAC)**
- Flexible and hybrid authorization combining hierarchical roles with custom permissions.

✅ **API Versioning**
- Support for multiple API versions with rate limiting.

✅ **Security & CSRF Protection**
- CSRF protection using `csurf`.
- Security headers enforced with `helmet`.

✅ **Rate Limiting**
- Configured using `@nestjs/throttler` with environment-based TTL and request limits.

✅ **Task Scheduling**
- Background task scheduling and cron jobs with `@nestjs/schedule`.

✅ **Swagger API Documentation**
- Automatically generated with `@nestjs/swagger`.

✅ **MongoDB Integration**
- MongoDB with Mongoose ORM (Can be swapped with PlanetScale using Prisma).

✅ **Logger Service**
- Custom logger service with support for MongoDB and daily rotate files.

✅ **Health Check & Monitoring**
- `/health` endpoint configured with `@nestjs/terminus` for system status.

✅ **Docker & CI/CD Ready**
- Ready for containerization and CI/CD pipeline integration.

---

## 📂 **Directory Structure**



/src
├── /auth # Authentication and Authorization
├── /config # Configuration and Environment Setup
├── /core # Core Providers (Logger, Guards, etc.)
├── /health # Health Check and Monitoring
├── /tasks # Task Scheduling and Cron Jobs
├── /throttle # Rate Limiting Configuration
├── /user # User Management
├── /utils # Utility Services and Helpers
├── app.controller.ts
├── app.module.ts
└── main.ts
