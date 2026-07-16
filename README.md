# SmartCrop Recommendation

A Django-based crop recommendation web app that predicts the best crop based on soil and climate inputs.

## Project Overview

- Built with Django 5.x
- Uses a pre-trained scikit-learn model to recommend crops
- Collects user inputs for: Nitrogen, Phosphorus, Potassium, Temperature, Humidity, Soil pH, and Rainfall
- Supports containerization with Docker and local PostgreSQL via Docker Compose

## Project Structure

- `manage.py` - Django management script
- `requirements.txt` - Python dependencies
- `smartcrop/` - Django project settings and configuration
- `recommendation/` - main app with views, templates, and static assets
- `templates/` - shared base and included templates
- `static/` - CSS and JavaScript assets
- `ml/` - machine learning model files and training utilities
- `Dockerfile` - container build definition
- `docker-compose.yml` - local Docker Compose setup with PostgreSQL
- `.env.example` - example environment variables

## Setup Instructions

### 1. Local environment

1. Clone the repository.
2. Create a Python virtual environment:
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
3. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```powershell
   python manage.py migrate
   ```
5. Run development server:
   ```powershell
   python manage.py runserver
   ```
6. Open the app at:
   ```text
   http://localhost:8000
   ```

### 2. Docker containerization

#### Create environment file

Copy the example:
```powershell
copy .env.example .env
```

Update `.env` values as needed.

#### Build and run with Docker Compose

```powershell
docker compose up --build
```

#### Run migrations inside the container

```powershell
docker compose exec web python manage.py migrate
```

#### Verify the app

Open:
```text
http://localhost:8000
```

## Docker / AWS Deployment Notes

### Docker files included

- `Dockerfile` - builds the app image and collects static files
- `.dockerignore` - excludes local files from the image
- `docker-compose.yml` - launches the app with PostgreSQL locally
- `.env.example` - example environment variables

### AWS deployment path

1. Create an AWS account
2. Create an ECR repository and push the Docker image
3. Create an RDS PostgreSQL database
4. Deploy the image using ECS/Fargate or Elastic Beanstalk
5. Configure environment variables for production

### Environment variables used

- `DJANGO_SECRET_KEY`
- `DJANGO_ALLOWED_HOSTS`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`

## What was improved

- Added Dockerfile and `.dockerignore`
- Added Docker Compose support for local PostgreSQL
- Added `.env.example` for environment configuration
- Improved the prediction page with interactive sample input cards and reset behavior
- Fixed `predict.html` template loading and static tags

## Notes

- The current app does not require database-backed models for prediction, but production configuration uses PostgreSQL.
- The `production.py` settings file is configured for AWS-ready database settings.
- Use RDS for AWS deployment and keep secrets in AWS Secrets Manager if possible.
