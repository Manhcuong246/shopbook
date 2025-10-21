# ShopBook - Cửa hàng sách trực tuyến

Một ứng dụng web bán sách demo được xây dựng bằng React với đầy đủ chức năng cho các vai trò khác nhau.

## 🚀 Tính năng

### 👤 Khách hàng
- ✅ Đăng ký / Đăng nhập
- ✅ Xem danh sách và chi tiết sách
- ✅ Tìm kiếm và lọc sách
- ✅ Thêm sách vào giỏ hàng
- ✅ Thanh toán đơn hàng
- ✅ Xem lịch sử mua hàng

### 👨‍💼 Nhân viên
- ✅ Đăng nhập
- ✅ Quản lý người dùng (xem, chỉnh sửa thông tin, phân quyền cơ bản)

### 👑 Admin
- ✅ Đăng nhập
- ✅ Nhập sách từ file JSON
- ✅ Quản lý tồn kho và giảm giá
- ✅ Quản lý người dùng & phân quyền
- ✅ Quản lý đơn hàng

## 🛠️ Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 16+ 
- npm hoặc yarn

### Cài đặt
```bash
# Clone repository
git clone <repository-url>
cd shopbook

# Cài đặt dependencies
npm install

# Chạy ứng dụng
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## 👥 Tài khoản demo

### Admin
- **Email:** admin@shopbook.com
- **Password:** admin123
- **Quyền:** Quản lý toàn bộ hệ thống

### Nhân viên
- **Email:** employee@shopbook.com  
- **Password:** emp123
- **Quyền:** Quản lý người dùng

### Khách hàng
- **Email:** customer@shopbook.com
- **Password:** cus123
- **Quyền:** Mua sắm, xem đơn hàng

## 📱 Giao diện

### Trang chủ
- Hero section với thông tin cửa hàng
- Hiển thị sách nổi bật
- Các tính năng nổi bật của cửa hàng

### Danh sách sách
- Lưới sách với hình ảnh, tên, tác giả, giá
- Tìm kiếm theo tên sách/tác giả
- Lọc theo danh mục
- Sắp xếp theo giá, tên, tác giả
- Hiển thị trạng thái tồn kho

### Chi tiết sách
- Thông tin đầy đủ về sách
- Giá gốc và giá khuyến mãi
- Chọn số lượng
- Thêm vào giỏ hàng hoặc mua ngay

### Giỏ hàng
- Danh sách sản phẩm đã chọn
- Thay đổi số lượng
- Xóa sản phẩm
- Tổng tiền và thanh toán

### Thanh toán
- Form thông tin giao hàng
- Chọn phương thức thanh toán
- Xác nhận đơn hàng

### Quản lý (Admin/Employee)
- Dashboard với thống kê
- Quản lý sách (CRUD)
- Quản lý người dùng
- Quản lý đơn hàng
- Nhập sách từ JSON

## 🎨 Thiết kế

- **Responsive:** Tương thích với mọi thiết bị
- **Modern UI:** Giao diện hiện đại với gradient và shadow
- **User-friendly:** Dễ sử dụng, trực quan
- **Fast:** Tải nhanh, mượt mà

## 🔧 Công nghệ sử dụng

- **React 18** - Framework chính
- **React Router** - Điều hướng
- **Context API** - Quản lý state
- **CSS3** - Styling
- **Font Awesome** - Icons
- **LocalStorage** - Lưu trữ dữ liệu

## 📊 Cấu trúc dự án

```
src/
├── components/          # Components tái sử dụng
│   └── Header.js
├── contexts/           # Context providers
│   ├── AuthContext.js
│   └── CartContext.js
├── pages/              # Các trang chính
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── BookList.js
│   ├── BookDetail.js
│   ├── Cart.js
│   ├── Checkout.js
│   ├── OrderHistory.js
│   ├── AdminDashboard.js
│   └── EmployeeDashboard.js
├── App.js              # Component chính
├── index.js            # Entry point
└── index.css           # Global styles
```

## 🚀 Tính năng nâng cao

### Quản lý sách
- Thêm/sửa/xóa sách
- Quản lý tồn kho
- Thiết lập giảm giá
- Nhập hàng loạt từ JSON

### Quản lý người dùng
- Xem danh sách người dùng
- Chỉnh sửa thông tin
- Phân quyền (Admin/Employee/Customer)
- Quản lý trạng thái tài khoản

### Quản lý đơn hàng
- Xem tất cả đơn hàng
- Cập nhật trạng thái
- Thống kê doanh thu

## 🎯 Hướng phát triển

- [ ] Tích hợp API backend
- [ ] Thanh toán online
- [ ] Gửi email xác nhận
- [ ] Báo cáo thống kê chi tiết
- [ ] Tối ưu SEO
- [ ] PWA support

## 📝 Ghi chú

Đây là phiên bản demo với dữ liệu mock. Trong thực tế cần:
- Backend API
- Database
- Authentication thực
- Payment gateway
- Email service

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

