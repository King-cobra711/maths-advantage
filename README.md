# Maths Advantage

A Next.js application for managing mathematics tutoring services.

## Tech Stack

### Frontend

- **Framework**: Next.js 15.2 with React 19
- **Styling**: TailwindCSS 4
- **Authentication**: OpenID Connect with AWS Cognito
- **Components**:
  - Keen Slider for carousels
  - React Hook Form for form management

### Backend & Infrastructure

- **Hosting**: AWS EC2
- **Container Registry**: AWS ECR
- **Authentication**: AWS Cognito
- **CI/CD**: GitHub Actions
- **Containerization**: Docker

### Development

- **Language**: TypeScript
- **Package Manager**: npm
- **Build Tool**: Turbopack (dev mode)

## Getting Started

### Prerequisites

- Node.js
- npm
- Docker
- AWS CLI

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Deployment

The application automatically deploys to AWS EC2 when changes are pushed to the main branch.

#### Infrastructure Setup

1. EC2 instance in ap-southeast-2 (Sydney)
2. Elastic IP for consistent addressing: `13.55.185.86`
3. ECR repository for Docker images
4. Cognito User Pool for authentication

#### Environment Variables

- `NODE_ENV`: Automatically set based on environment
- Production URL: http://13.55.185.86
- Development URL: http://localhost:3000

## Features

- Admin dashboard with secure authentication
- User management through AWS Cognito
- Responsive design with TailwindCSS
- Form handling with validation

## Project Structure

```
maths-advantage/
├── app/                 # Next.js app directory
│   ├── admin/          # Admin dashboard
│   └── providers.tsx   # Auth provider setup
├── components/         # Reusable components
├── public/            # Static assets
└── styles/           # Global styles
```

## Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## AWS Configuration

1. Set up AWS credentials
2. Configure ECR repository
3. Set up Cognito User Pool
4. Configure EC2 instance
5. Set up Elastic IP

## Contributing

1. Create a feature branch
2. Make changes
3. Push to GitHub
4. GitHub Actions will automatically deploy to EC2

## Security

- Admin access controlled through Cognito groups
- HTTPS recommended for production
- Environment variables properly configured
- AWS resources properly secured
