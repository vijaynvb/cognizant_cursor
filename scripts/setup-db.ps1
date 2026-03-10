# Setup PostgreSQL via Docker and run Prisma migrations
# Requires: Docker Desktop installed and running

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot

Write-Host "Starting PostgreSQL container..." -ForegroundColor Cyan
docker compose -f "$ProjectRoot\docker-compose.yml" up -d

Write-Host "Waiting for database to be ready..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

# Retry until pg_isready succeeds
$maxAttempts = 30
$attempt = 0
do {
    $result = docker exec todo-app-db pg_isready -U postgres 2>&1
    if ($LASTEXITCODE -eq 0) { break }
    $attempt++
    Write-Host "  Attempt $attempt/$maxAttempts - waiting..."
    Start-Sleep -Seconds 2
} while ($attempt -lt $maxAttempts)

if ($attempt -ge $maxAttempts) {
    Write-Host "Database failed to start." -ForegroundColor Red
    exit 1
}

Write-Host "Running Prisma migrations..." -ForegroundColor Cyan
Push-Location "$ProjectRoot\backend"
npx prisma migrate dev --name init
npx prisma db seed
Pop-Location

Write-Host "Database setup complete." -ForegroundColor Green
