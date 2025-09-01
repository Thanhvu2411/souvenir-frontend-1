@echo off
chcp 65001 >nul
title GIFTIE - SOUVENIR STORE

echo 🎁 GIFTIE - SOUVENIR STORE
echo ==========================
echo.

REM Kiểm tra Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js chưa được cài đặt. Vui lòng cài đặt Node.js 18+ trước.
    pause
    exit /b 1
)

echo ✅ Node.js được tìm thấy

:menu
echo.
echo Chọn phương pháp chạy project:
echo 1) 🚀 Node.js (Development)
echo 2) 🐳 Docker (Production)
echo 3) 🐳🐳 Docker Compose (Production)
echo 4) 📦 Cài đặt dependencies
echo 5) 🔨 Build production
echo 6) 🧹 Clean up
echo 7) ❌ Thoát
echo.
set /p choice="Nhập lựa chọn (1-7): "

if "%choice%"=="1" goto run_node
if "%choice%"=="2" goto run_docker
if "%choice%"=="3" goto run_docker_compose
if "%choice%"=="4" goto install_deps
if "%choice%"=="5" goto build_production
if "%choice%"=="6" goto cleanup
if "%choice%"=="7" goto exit
echo ❌ Lựa chọn không hợp lệ. Vui lòng chọn 1-7.
goto menu

:run_node
echo.
echo 🚀 Khởi chạy với Node.js...
cd frontend
if not exist "node_modules" (
    echo 📦 Cài đặt dependencies...
    npm install
)
echo 🔥 Chạy development server...
npm run dev
goto end

:run_docker
echo.
echo 🐳 Khởi chạy với Docker...
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker chưa được cài đặt.
    goto menu
)
if not exist "frontend\Dockerfile" (
    echo ❌ Dockerfile không tồn tại.
    goto menu
)
echo 🔨 Build Docker image...
docker build -t giftie-frontend ./frontend
if %errorlevel% equ 0 (
    echo 🚀 Chạy Docker container...
    docker run -p 3000:3000 giftie-frontend
) else (
    echo ❌ Build Docker thất bại.
)
goto end

:run_docker_compose
echo.
echo 🐳🐳 Khởi chạy với Docker Compose...
where docker-compose >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker Compose chưa được cài đặt.
    goto menu
)
if not exist "docker-compose.yml" (
    echo ❌ docker-compose.yml không tồn tại.
    goto menu
)
echo 🚀 Chạy services...
docker-compose up
goto end

:install_deps
echo.
echo 📦 Cài đặt dependencies...
cd frontend
echo 🔧 Cài đặt với npm...
npm install
echo ✅ Hoàn thành!
cd ..
goto menu

:build_production
echo.
echo 🔨 Build production...
cd frontend
echo 🏗️ Building...
npm run build
if %errorlevel% equ 0 (
    echo ✅ Build thành công!
    echo 🚀 Chạy production server: npm start
) else (
    echo ❌ Build thất bại.
)
cd ..
goto menu

:cleanup
echo.
echo 🧹 Clean up...
if exist "frontend\node_modules" (
    echo 🗑️ Xóa node_modules...
    rmdir /s /q "frontend\node_modules"
)
if exist "frontend\.next" (
    echo 🗑️ Xóa .next...
    rmdir /s /q "frontend\.next"
)
echo 🗑️ Xóa Docker images...
docker rmi giftie-frontend 2>nul
echo ✅ Clean up hoàn thành!
goto menu

:exit
echo 👋 Tạm biệt!
exit /b 0

:end
echo.
echo Nhấn phím bất kỳ để thoát...
pause >nul

