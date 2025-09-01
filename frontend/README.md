# 🎁 GIFTIE - SOUVENIR STORE

**Giftie** là một ứng dụng thương mại điện tử chuyên về sản phẩm lưu niệm đặc trưng Việt Nam, được xây dựng bằng công nghệ hiện đại Next.js 15, React 19, TypeScript và Tailwind CSS.

## 🚀 Tính năng chính

- **Hệ thống xác thực:** Đăng ký, đăng nhập, quản lý profile
- **Quản lý sản phẩm:** Hiển thị, tìm kiếm, lọc và sắp xếp sản phẩm
- **Giỏ hàng thông minh:** Thêm, xóa, cập nhật số lượng sản phẩm
- **Thanh toán:** Hỗ trợ COD, chuyển khoản, thẻ tín dụng
- **Quản lý đơn hàng:** Theo dõi trạng thái và lịch sử đơn hàng
- **Tìm kiếm real-time:** Tìm kiếm sản phẩm ngay khi gõ
- **Giao diện responsive:** Hỗ trợ mobile và desktop

## 🛠️ Công nghệ sử dụng

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **State Management:** React Context API + useReducer
- **Development:** ESLint, Turbopack
- **Icons:** Lucide React

## 📋 Yêu cầu hệ thống

- **Node.js:** 18.17.0 hoặc cao hơn
- **npm:** 9.0.0 hoặc cao hơn
- **Git:** Để clone repository

## 🚀 Hướng dẫn chạy project

### 🎯 Cách nhanh nhất (Sử dụng script)

#### Windows
```bash
# Chạy file batch
start.bat
```

#### Linux/macOS
```bash
# Cấp quyền thực thi
chmod +x start.sh

# Chạy script
./start.sh
```

Script sẽ hiển thị menu cho phép bạn chọn phương pháp chạy project một cách dễ dàng.

### Phương pháp 1: Chạy trực tiếp với Node.js (Khuyến nghị cho development)

#### Bước 1: Clone repository
```bash
git clone <repository-url>
cd souvenir-store-2
```

#### Bước 2: Cài đặt dependencies
```bash
cd frontend
npm install
```

#### Bước 3: Chạy development server
```bash
npm run dev
```

Project sẽ chạy tại: **http://localhost:3000**

#### Bước 4: Build production
```bash
npm run build
npm start
```

### Phương pháp 2: Sử dụng Docker (Khuyến nghị cho production)

#### Bước 1: Tạo Dockerfile
Tạo file `Dockerfile` trong thư mục `frontend/`:

```dockerfile
# Sử dụng Node.js 18 Alpine để giảm kích thước image
FROM node:18-alpine AS base

# Cài đặt dependencies chỉ khi cần thiết
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build ứng dụng
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Tự động tạo thư mục .next
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Bước 2: Tạo .dockerignore
Tạo file `.dockerignore` trong thư mục `frontend/`:

```dockerignore
Dockerfile
.dockerignore
node_modules
npm-debug.log
README.md
.env
.env.local
.env.production.local
.env.local
.vercel
.next
.git
```

#### Bước 3: Cập nhật next.config.ts
Cập nhật `next.config.ts` để hỗ trợ Docker:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Cần thiết cho Docker
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
```

#### Bước 4: Build và chạy Docker container
```bash
# Build Docker image
docker build -t giftie-frontend .

# Chạy container
docker run -p 3000:3000 giftie-frontend
```

#### Bước 5: Sử dụng Docker Compose (Tùy chọn)
Tạo file `docker-compose.yml`:

```yaml
version: '3.8'

services:
  giftie-frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

Chạy với Docker Compose:
```bash
docker-compose up -d
```

### Phương pháp 3: Sử dụng Yarn (Thay thế cho npm)

#### Bước 1: Cài đặt Yarn
```bash
npm install -g yarn
```

#### Bước 2: Cài đặt dependencies
```bash
cd frontend
yarn install
```

#### Bước 3: Chạy development server
```bash
yarn dev
```

#### Bước 4: Build production
```bash
yarn build
yarn start
```

### Phương pháp 4: Sử dụng pnpm (Fast và efficient)

#### Bước 1: Cài đặt pnpm
```bash
npm install -g pnpm
```

#### Bước 2: Cài đặt dependencies
```bash
cd frontend
pnpm install
```

#### Bước 3: Chạy development server
```bash
pnpm dev
```

#### Bước 4: Build production
```bash
pnpm build
pnpm start
```

### Phương pháp 5: Sử dụng Bun (Ultra-fast JavaScript runtime)

#### Bước 1: Cài đặt Bun
```bash
curl -fsSL https://bun.sh/install | bash
```

#### Bước 2: Cài đặt dependencies
```bash
cd frontend
bun install
```

#### Bước 3: Chạy development server
```bash
bun run dev
```

#### Bước 4: Build production
```bash
bun run build
bun run start
```

## 🔧 Scripts có sẵn

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy development server với Turbopack |
| `npm run build` | Build ứng dụng cho production |
| `npm run start` | Chạy production server |
| `npm run lint` | Kiểm tra code với ESLint |

## 🌐 Truy cập ứng dụng

- **Development:** http://localhost:3000
- **Production:** http://localhost:3000 (sau khi build)

## 📱 Tài khoản demo

Để test ứng dụng, bạn có thể sử dụng các tài khoản demo:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@giftie.vn | admin123 |
| User | user@giftie.vn | user123 |
| Customer | customer@giftie.vn | customer123 |

## 🐛 Troubleshooting

### Lỗi thường gặp

#### 1. Port 3000 đã được sử dụng
```bash
# Kiểm tra process đang sử dụng port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Hoặc sử dụng port khác
npm run dev -- -p 3001
```

#### 2. Node modules bị lỗi
```bash
# Xóa node_modules và package-lock.json
rm -rf node_modules package-lock.json

# Cài đặt lại
npm install
```

#### 3. Docker build thất bại
```bash
# Xóa cache Docker
docker system prune -a

# Build lại với no-cache
docker build --no-cache -t giftie-frontend .
```

#### 4. TypeScript errors
```bash
# Kiểm tra TypeScript
npx tsc --noEmit

# Cài đặt types nếu cần
npm install --save-dev @types/node @types/react @types/react-dom
```

## 📁 Cấu trúc project

```
frontend/
├── src/
│   ├── app/                    # App Router pages
│   ├── components/             # Reusable components
│   ├── contexts/               # React Context providers
│   ├── lib/                    # Utilities và mock data
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
├── package.json                # Dependencies
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Deployment

### Vercel (Khuyến nghị cho Next.js)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### AWS S3 + CloudFront
```bash
npm run build
aws s3 sync .next s3://your-bucket-name
```

