# Sử dụng Node.js 18 để build ứng dụng
FROM node:18 AS builder

# # Khai báo build argument
# ARG NEXT_PUBLIC_API_ENDPOINT

# # Thiết lập biến môi trường cho container
# ENV NEXT_PUBLIC_API_ENDPOINT=$NEXT_PUBLIC_API_ENDPOINT

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# COPY .env .env

# # Debug: Hiển thị nội dung file .env
# RUN cat .env

# # Debug: Hiển thị giá trị biến môi trường (tùy chọn)
# RUN echo "NEXT_PUBLIC_API_ENDPOINT=${NEXT_PUBLIC_API_ENDPOINT}"

# Build ứng dụng Next.js
RUN npm run build

# Sử dụng image Node.js 18 Alpine tối giản cho production
FROM node:18-alpine AS runner

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép các file cần thiết từ giai đoạn build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Thiết lập biến môi trường
ENV NODE_ENV=production
ENV PORT=3000

# Mở cổng 3000
EXPOSE 3000

# Lệnh mặc định để chạy ứng dụng
CMD ["npm", "start"]
