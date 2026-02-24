@echo off
echo [1/3] Starting Database...
docker-compose up -d

echo [2/3] Starting Backend (Spring Boot)...
start "Backend" /D "backend" cmd /c "gradlew bootRun"

echo [3/3] Starting Frontend (Next.js)...
start "Frontend" /D "frontend" cmd /c "npm run dev"

echo ===================================================
echo  All Services Started! 
echo  - Backend: http://localhost:8080
echo  - Frontend: http://localhost:3000
echo ===================================================
pause