# Maths Advantage

A Next.js application for managing mathematics tutoring services.

[![Live Site](https://img.shields.io/badge/Live-WIP-yellow)](https://dev.mathsadvantage.com.au)

🌐 **[View Live Site](https://dev.mathsadvantage.com.au)**

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
- **Email Service**: AWS SES (Simple Email Service)
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
5. SES configuration for email handling

#### IAM Role for EC2 (AWS Credentials Best Practice)

- Attach an IAM role to your EC2 instance with the following permissions for Cognito user management:
  - `cognito-idp:ListUsers`
  - `cognito-idp:AdminListGroupsForUser`
  - `cognito-idp:AdminCreateUser`
  - `cognito-idp:AdminDeleteUser`
  - `cognito-idp:AdminUpdateUserAttributes`
  - `cognito-idp:AdminAddUserToGroup`
  - `cognito-idp:AdminSetUserPassword`
- This is the recommended way to provide AWS credentials to your app running in Docker on EC2.
- **Never use IAM user access keys in production for EC2 apps.** Always use IAM roles for secure, temporary credentials.

#### Environment Variables

- `NODE_ENV`: Automatically set based on environment
- `SES_AWS_ACCESS_KEY_ID`: AWS access key for SES
- `SES_AWS_SECRET_ACCESS_KEY`: AWS secret key for SES
- `SES_AWS_REGION`: AWS region for SES (ap-southeast-2)
- `SES_VERIFIED_EMAIL`: Verified sender email for SES
- `CONTACT_EMAIL`: Email for receiving contact form submissions
- `NEXT_PUBLIC_COGNITO_AUTHORITY_PROD`, `NEXT_PUBLIC_COGNITO_CLIENT_ID_PROD`, `NEXT_PUBLIC_COGNITO_AUTHORITY_TEST`, `NEXT_PUBLIC_COGNITO_CLIENT_ID_TEST`, `NEXT_PUBLIC_COGNITO_USER_POOL_ID_PROD`, `NEXT_PUBLIC_COGNITO_USER_POOL_ID_TEST`: Cognito configuration for prod and test environments
- Production URL: http://13.55.185.86
- Development URL: http://localhost:3000

> **Note:** Ensure all `NEXT_PUBLIC_COGNITO_*` environment variables are set in both the build and runner stages of your Dockerfile. These must be available at runtime in the Docker container.

#### Dockerfile & Deployment Notes

- The Dockerfile uses a multi-stage build. Make sure all required environment variables are set in both the build and runner stages for correct operation in production.
- All sensitive environment variables are managed as GitHub Actions secrets and injected at build time. Do not commit secrets to the repository.

## Features

- Admin dashboard with secure authentication
- User management through AWS Cognito
- Contact form with AWS SES email integration
- Responsive design with TailwindCSS
- Form handling with validation
- New users created via the admin UI are automatically added to the `test-users` group.
- Admins can edit user names and passwords from the admin UI.

## Project Structure

```
maths-advantage/
├── app/                 # Next.js app directory
│   ├── admin/          # Admin dashboard
│   ├── api/            # API routes
│   │   └── emails/     # Email handling
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

1. Set up AWS credentials (for SES only; Cognito access is via EC2 IAM role)
2. Configure ECR repository
3. Set up Cognito User Pool
4. Configure EC2 instance
5. Set up Elastic IP
6. Configure SES for email handling
   - Verify sender email
   - Set up IAM user for SES
   - Configure environment variables

## Security

- Admin access controlled through Cognito groups
- HTTPS recommended for production
- Environment variables properly configured
- AWS resources properly secured
- Email sending restricted to verified addresses (SES sandbox mode)
- **Never use IAM user access keys for EC2 app access to AWS services. Use IAM roles instead.**

## Troubleshooting

- **500 Internal Server Error on `/admin/users`**:
  - Ensure the EC2 instance has the correct IAM role attached with Cognito permissions.
  - Check Docker logs for AWS credential errors.
  - Verify all required environment variables are set in the running container.
  - Use `docker exec maths-advantage-app printenv` to verify environment variables.
- **Environment variables not available**:
  - Ensure they are set in both build and runner stages of the Dockerfile.
  - Use `docker exec maths-advantage-app printenv | grep COGNITO` to verify.
- **Cognito user/group management not working**:
  - Ensure the IAM role has all required Cognito permissions as listed above.
