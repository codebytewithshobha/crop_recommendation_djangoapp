# SmartCrop Recommendation

A Django-based crop recommendation web app that recommends crops based on soil and climate inputs.

## Project Overview

- Built with Django 5.x
- Uses a pre-trained scikit-learn model for crop prediction
- Collects inputs for: Nitrogen, Phosphorus, Potassium, Temperature, Humidity, Soil pH, and Rainfall
- Includes Docker and Docker Compose support for local development
- AWS-ready containerization with PostgreSQL production configuration

## Repository Structure

- `manage.py` - Django management script
- `requirements.txt` - Python dependencies
- `smartcrop/` - Django project settings and configuration
- `recommendation/` - main app, views, templates, and static assets
- `ml/` - machine learning model files and training utilities
- `templates/` - shared base templates
- `static/` - CSS and JavaScript files
- `Dockerfile` - Docker image build definition
- `docker-compose.yml` - local Docker Compose stack with web + PostgreSQL
- `.env.example` - example environment variable file

## Quick Start

### Local setup

1. Clone the repository:
   ```powershell
   git clone https://github.com/codebytewithshobha/crop_recommendation_djangoapp.git
   cd crop_recommendation_djangoapp
   ```
2. Create and activate a virtual environment:
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
3. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
4. Apply Django migrations:
   ```powershell
   python manage.py migrate
   ```
5. Run the development server:
   ```powershell
   python manage.py runserver
   ```
6. Open the app in your browser:
   ```text
   http://localhost:8000
   ```

### Docker setup

1. Copy environment variables:
   ```powershell
   copy .env.example .env
   ```
2. Build and start the Docker Compose stack:
   ```powershell
   docker compose up --build
   ```
3. Run migrations inside the container:
   ```powershell
   docker compose exec web python manage.py migrate
   ```
4. Visit the app at:
   ```text
   http://localhost:8000
   ```

## Environment Variables

Set the following in `.env` or your deployment environment:

- `DJANGO_SECRET_KEY`
- `DJANGO_ALLOWED_HOSTS`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`

## Docker and AWS Deployment

### Docker files included

- `Dockerfile` - builds the application image and collects static files
- `docker-compose.yml` - starts the app and PostgreSQL for local development
- `.dockerignore` - excludes local files from Docker builds
- `.env.example` - example environment variables

### AWS deployment recommendations

1. Create an AWS account.
2. Create an ECR repository and push the Docker image.
3. Create an Amazon RDS PostgreSQL database.
4. Deploy the image to ECS/Fargate or Elastic Beanstalk.
5. Use environment variables or AWS Secrets Manager for production configuration.

### Example AWS commands

```powershell
aws ecr create-repository --repository-name smartcrop-recommendation
aws ecr get-login-password --region YOUR_REGION | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com
docker tag smartcrop-recommendation:latest YOUR_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com/smartcrop-recommendation:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com/smartcrop-recommendation:latest
```

## Notes

- The current predict page uses form values and a machine learning model, but it does not require saved Django models for prediction.
- The production settings are configured for PostgreSQL.
- The local Docker Compose stack uses PostgreSQL so the containerized app matches production.

## GitHub Repository

https://github.com/codebytewithshobha/crop_recommendation_djangoapp
