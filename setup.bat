@echo off
setlocal

echo ==========================================
echo Government Anomaly Detection - Setup
echo ==========================================
echo.

echo [1/8] Checking Python...
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH.
    pause
    exit /b 1
)

echo.
echo [2/8] Checking Node.js...
node --version
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH.
    pause
    exit /b 1
)

echo.
echo [3/8] Checking npm...
call npm --version
if errorlevel 1 (
    echo ERROR: npm is not installed or not in PATH.
    pause
    exit /b 1
)

echo.
echo [4/8] Checking Docker...
docker --version
if errorlevel 1 (
    echo ERROR: Docker is not installed or not in PATH.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo Creating project folders
echo ==========================================

if not exist "backend" mkdir backend
if not exist "database" mkdir database
if not exist "docs" mkdir docs

echo.
echo [5/8] Setting up Python backend...

cd backend

if not exist ".venv" (
    python -m venv .venv
)

call .venv\Scripts\activate.bat

echo.
echo Installing Python dependencies...

python -m pip install --upgrade pip

python -m pip install ^
    fastapi ^
    "uvicorn[standard]" ^
    sqlalchemy ^
    psycopg[binary] ^
    pydantic-settings ^
    python-jose[cryptography] ^
    passlib[bcrypt] ^
    python-multipart

echo.
echo Creating requirements.txt...

python -m pip freeze > requirements.txt

cd ..

echo.
echo ==========================================
echo [6/8] Setting up React frontend
echo ==========================================

if not exist "frontend" (
    call npm create vite@latest frontend -- --template react
)

cd frontend

echo.
echo Installing frontend dependencies...

call npm install
call npm install axios react-router-dom

cd ..

echo.
echo ==========================================
echo [7/8] Creating PostgreSQL configuration
echo ==========================================

(
echo services:
echo   postgres:
echo     image: postgres:17
echo     container_name: government-anomaly-postgres
echo     restart: unless-stopped
echo     environment:
echo       POSTGRES_USER: app_user
echo       POSTGRES_PASSWORD: app_password
echo       POSTGRES_DB: anomaly_db
echo     ports:
echo       - "5432:5432"
echo     volumes:
echo       - postgres_data:/var/lib/postgresql/data
echo.
echo volumes:
echo   postgres_data:
) > docker-compose.yml

echo.
echo ==========================================
echo [8/8] Creating project files
echo ==========================================

if not exist ".gitignore" (
(
echo # Python
echo backend/.venv/
echo __pycache__/
echo *.pyc
echo.
echo # Environment
echo .env
echo backend/.env
echo frontend/.env
echo.
echo # Node
echo frontend/node_modules/
echo frontend/dist/
echo.
echo # IDE
echo .vscode/
echo .idea/
echo.
echo # OS
echo Thumbs.db
echo Desktop.ini
) > .gitignore
)

if not exist "README.md" (
(
echo # Government Anomaly Detection
echo.
echo Prototype for government project anomaly and fraud detection.
echo.
echo ## Tech Stack
echo.
echo - React + Vite
echo - Python + FastAPI
echo - PostgreSQL
echo - SQLAlchemy
echo - JWT Authentication
echo - RBAC
echo - Rule-based Anomaly Detection
) > README.md
)

echo.
echo ==========================================
echo Starting PostgreSQL
echo ==========================================

docker compose up -d

if errorlevel 1 (
    echo.
    echo ERROR: PostgreSQL container could not be started.
    echo Make sure Docker Desktop is running.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo SETUP COMPLETED SUCCESSFULLY!
echo ==========================================
echo.
echo Project structure:
echo.
echo government-anomaly-detection
echo   ^|-- backend
echo   ^|-- frontend
echo   ^|-- database
echo   ^|-- docs
echo   ^|-- docker-compose.yml
echo   ^|-- .gitignore
echo   ^|-- README.md
echo.
echo PostgreSQL is running on port 5432.
echo.
echo Next step will be creating the FastAPI backend.
echo.
pause