# 🏋️ Gym Membership Management System

## 📋 Description

Distributed system for comprehensive gym membership management, developed as an academic project for the Distributed Systems course. The solution includes user administration, membership plans, payments, QR code access control, and report generation.

### ✨ Key Features

docker run -d \--name jenkins \-p 9090:9090 \-p 50001:50001 \-v jenkins_home:/var/jenkins_home \-v /var/run/docker.sock:/var/run/docker.sock \ jenkins/jenkins:lts



- 🔐 **Authentication & Authorization** with JWT and roles (Administrator, Client)
- 👥 **User Management** with registration, login, and profiles
- 💳 **Membership Management** (registration, renewal, suspension)
- 💰 **Payment Processing** with external gateway integration
- 📱 **QR Access Control** for real-time validation
- 📊 **Reports & Analytics** for revenue and attendance
- 🏗️ **Distributed Microservices Architecture** scalable and resilient

## 🏗️ Architecture

### Microservices
- **Auth & Users Service**: Authentication and user management
- **Memberships Service**: Plans and membership management
- **Payments Service**: Payment processing and reconciliation
- **Access Control Service**: QR validation and access logging
- **Reports Service**: Report generation and analytics
- **API Gateway**: Routing and cross-cutting policies

### Tech Stack

#### Backend
- **Framework**: Spring Boot 3.x
- **Security**: Spring Security + JWT/OAuth2
- **Database**: PostgreSQL (main) + MongoDB/Cassandra (analytics)
- **Messaging**: RabbitMQ/Apache Kafka
- **Documentation**: OpenAPI/Swagger

#### Frontend
- **Web Admin**: Vue.js 3 + Vuetify/Tailwind CSS
- **Mobile App**: Ionic + Vue.js (hybrid)
- **State Management**: Pinia/Vuex
- **Testing**: Vitest/Jest + Playwright

#### Infrastructure

## 🚀 Installation & Setup

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Git

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/gym-membership-system.git
cd gym-membership-system
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configurations
```


4. **Access applications**
- Web Admin: http://localhost:3000
- API Gateway: http://localhost:8080
- API Documentation: http://localhost:8080/swagger-ui.html



## 📚 Documentation

### Project Structure
```
gym-membership-system/
├── backend/
│   ├── auth-service/
│   ├── membership-service/
│   ├── payment-service/
│   ├── access-control-service/
│   ├── reports-service/
│   └── api-gateway/
├── frontend/
│   ├── web-admin/
│   └── mobile-app/
├── infrastructure/
├── docs/
│   ├── api/
│   ├── architecture/
│   └── user-stories/
└── scripts/
```

### Main APIs

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh

#### Memberships
- `GET /api/memberships` - List plans
- `POST /api/memberships` - Create membership
- `PUT /api/memberships/{id}` - Update membership

#### Access Control
- `POST /api/access/validate-qr` - Validate QR code
- `GET /api/access/history` - Access history

### Architecture Diagrams
- [Component Diagram](docs/architecture/components.md)
- [Sequence Diagram](docs/architecture/sequence.md)
- [Data Model](docs/architecture/data-model.md)




## 📊 Project Management

### Methodology
- **Framework**: Scrum
- **Management**: JIRA (Epics, User Stories, Sprints)
- **Documentation**: Confluence
- **Version Control**: Git with GitFlow

### Timeline (September - November 2025)
- **Epic 1** (Sep 01-12): Requirements and definition
- **Epic 2** (Sep 13-24): Authentication and users
- **Epic 3** (Sep 25-Oct 04): Memberships and QR access
- **Epic 4** (Oct 05-19): Payments and integration
- **Epic 5** (Oct 20-24): Reports and administration
- **Epic 6** (Oct 25-Nov 10): Distributed infrastructure

## 👥 Development Team

- **Jhon Jamez Nieto Perez** - Backend Developer
- **Johan Sebastian Naranjo Quiroga** - Frontend Developer
- **Juan Felipe Narvaez Amaya** - DevOps/Infrastructure

**Professor**: Jesus Ariel Gonzalez Bonilla  
**Institution**: Corporación Universitaria del Huila  
**Course**: Distributed Systems - 8th Semester

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add: new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

### Commit Conventions
- `feat:` New feature
- `fix:` Bug fixes
- `docs:` Documentation
- `refactor:` Code refactoring
- `test:` Tests
- `chore:` Maintenance

## 🔗 Useful Links

- [📝 JIRA Board](https://gymetra.atlassian.net/jira/software/projects/SCRUM/boards/1)  
- [🎨 Figma Design](https://www.figma.com/design/6wvsYaVryxBWp2NIUM2zci/GYMETRA-PRIN?node-id=0-1&p=f&t=JSPiUM0bfykeal7f-0)  
- [📂 GitHub Repository](https://github.com/Sebas-Quiroga/GYMETRA-V1)  


## 📄 License

This project is developed for academic purposes at Corporación Universitaria del Huila.



---

⭐ **Give the project a star if it was helpful!** ⭐
