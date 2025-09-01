#!/bin/bash

# GIFTIE - SOUVENIR STORE
# Script khởi chạy project với nhiều phương pháp

echo "🎁 GIFTIE - SOUVENIR STORE"
echo "=========================="
echo ""

# Kiểm tra Node.js
check_node() {
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js chưa được cài đặt. Vui lòng cài đặt Node.js 18+ trước."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo "❌ Node.js version quá cũ. Cần Node.js 18+ (hiện tại: $(node -v))"
        exit 1
    fi
    
    echo "✅ Node.js: $(node -v)"
}

# Kiểm tra Docker
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker chưa được cài đặt."
        return 1
    fi
    
    if ! docker info &> /dev/null; then
        echo "❌ Docker daemon không chạy."
        return 1
    fi
    
    echo "✅ Docker: $(docker --version)"
    return 0
}

# Chạy với Node.js
run_node() {
    echo ""
    echo "🚀 Khởi chạy với Node.js..."
    cd frontend
    
    if [ ! -d "node_modules" ]; then
        echo "📦 Cài đặt dependencies..."
        npm install
    fi
    
    echo "🔥 Chạy development server..."
    npm run dev
}

# Chạy với Docker
run_docker() {
    echo ""
    echo "🐳 Khởi chạy với Docker..."
    
    if [ ! -f "frontend/Dockerfile" ]; then
        echo "❌ Dockerfile không tồn tại."
        return 1
    fi
    
    echo "🔨 Build Docker image..."
    docker build -t giftie-frontend ./frontend
    
    if [ $? -eq 0 ]; then
        echo "🚀 Chạy Docker container..."
        docker run -p 3000:3000 giftie-frontend
    else
        echo "❌ Build Docker thất bại."
        return 1
    fi
}

# Chạy với Docker Compose
run_docker_compose() {
    echo ""
    echo "🐳🐳 Khởi chạy với Docker Compose..."
    
    if [ ! -f "docker-compose.yml" ]; then
        echo "❌ docker-compose.yml không tồn tại."
        return 1
    fi
    
    echo "🚀 Chạy services..."
    docker-compose up
}

# Menu chính
show_menu() {
    echo ""
    echo "Chọn phương pháp chạy project:"
    echo "1) 🚀 Node.js (Development)"
    echo "2) 🐳 Docker (Production)"
    echo "3) 🐳🐳 Docker Compose (Production)"
    echo "4) 📦 Cài đặt dependencies"
    echo "5) 🔨 Build production"
    echo "6) 🧹 Clean up"
    echo "7) ❌ Thoát"
    echo ""
    read -p "Nhập lựa chọn (1-7): " choice
}

# Cài đặt dependencies
install_deps() {
    echo ""
    echo "📦 Cài đặt dependencies..."
    cd frontend
    
    echo "🔧 Cài đặt với npm..."
    npm install
    
    echo "✅ Hoàn thành!"
}

# Build production
build_production() {
    echo ""
    echo "🔨 Build production..."
    cd frontend
    
    echo "🏗️ Building..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build thành công!"
        echo "🚀 Chạy production server: npm start"
    else
        echo "❌ Build thất bại."
    fi
}

# Clean up
cleanup() {
    echo ""
    echo "🧹 Clean up..."
    
    echo "🗑️ Xóa node_modules..."
    rm -rf frontend/node_modules
    
    echo "🗑️ Xóa .next..."
    rm -rf frontend/.next
    
    echo "🗑️ Xóa Docker images..."
    docker rmi giftie-frontend 2>/dev/null || true
    
    echo "✅ Clean up hoàn thành!"
}

# Main script
main() {
    check_node
    
    while true; do
        show_menu
        
        case $choice in
            1)
                run_node
                break
                ;;
            2)
                if check_docker; then
                    run_docker
                else
                    echo "❌ Không thể chạy Docker."
                fi
                break
                ;;
            3)
                if check_docker; then
                    run_docker_compose
                else
                    echo "❌ Không thể chạy Docker Compose."
                fi
                break
                ;;
            4)
                install_deps
                ;;
            5)
                build_production
                ;;
            6)
                cleanup
                ;;
            7)
                echo "👋 Tạm biệt!"
                exit 0
                ;;
            *)
                echo "❌ Lựa chọn không hợp lệ. Vui lòng chọn 1-7."
                ;;
        esac
        
        if [ $choice -ge 1 ] && [ $choice -le 3 ]; then
            break
        fi
    done
}

# Chạy script
main

