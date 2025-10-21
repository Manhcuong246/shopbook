# 📚 Hướng dẫn nhập sách từ file JSON

## 🎯 Mục đích
File JSON này được tạo để demo chức năng nhập sách hàng loạt vào hệ thống ShopBook.

## 📋 Cách sử dụng

### 1. **Đăng nhập với tài khoản Admin**
- Email: `admin@shopbook.com`
- Password: `admin123`

### 2. **Truy cập trang Admin**
- Vào menu "Admin" trên header
- Chọn tab "Quản lý sách"

### 3. **Nhập file JSON**
- Nhấn nút "Nhập từ Excel/JSON"
- Copy nội dung từ file JSON mẫu
- Paste vào textarea
- Nhấn "Nhập dữ liệu"

## 📁 Files JSON mẫu

### `sample-books.json` - 10 cuốn sách đa dạng
- Sách công nghệ, tâm lý học, kinh doanh
- Giá từ 125,000đ - 180,000đ
- Giảm giá từ 5% - 25%

### `sample-books-2.json` - 5 cuốn sách bổ sung
- Sách lãnh đạo, tư duy, kỹ năng mềm
- Giá từ 95,000đ - 170,000đ
- Giảm giá từ 0% - 18%

## 🔧 Cấu trúc JSON

```json
[
  {
    "title": "Tên sách",
    "author": "Tác giả",
    "price": 150000,
    "description": "Mô tả chi tiết về nội dung sách",
    "category": "Danh mục",
    "stock": 30,
    "discount": 15,
    "image": "URL hình ảnh"
  }
]
```

### 📝 **Các trường bắt buộc:**
- `title` (string): Tên sách
- `author` (string): Tác giả
- `price` (number): Giá sách (VND)
- `description` (string): Mô tả sách
- `category` (string): Danh mục
- `stock` (number): Số lượng tồn kho
- `discount` (number): Phần trăm giảm giá (0-100)
- `image` (string): URL hình ảnh

## 🎨 **Lưu ý về hình ảnh:**
- Sử dụng ảnh từ Unsplash (miễn phí, chất lượng cao)
- Kích thước khuyến nghị: 300x400px
- Format: JPG/PNG
- URL mẫu: `https://images.unsplash.com/photo-xxx?w=300&h=400&fit=crop&crop=center`

## 🚀 **Demo workflow:**

1. **Chuẩn bị dữ liệu:**
   - Mở file `sample-books.json`
   - Copy toàn bộ nội dung

2. **Nhập vào hệ thống:**
   - Đăng nhập Admin
   - Vào Admin Dashboard
   - Chọn "Nhập từ Excel/JSON"
   - Paste JSON vào textarea
   - Nhấn "Nhập dữ liệu"

3. **Kiểm tra kết quả:**
   - Vào trang "Sách" để xem sách mới
   - Kiểm tra thông tin, giá, hình ảnh
   - Test chức năng thêm vào giỏ hàng

## ⚠️ **Lưu ý quan trọng:**

- **Backup dữ liệu:** Luôn backup trước khi nhập
- **Format JSON:** Đảm bảo JSON hợp lệ (có thể dùng JSON validator)
- **Hình ảnh:** Kiểm tra URL hình ảnh có hoạt động
- **Giá cả:** Nhập giá bằng VND (không có dấu phẩy)
- **Tồn kho:** Số lượng phải >= 0

## 🔄 **Cập nhật dữ liệu:**

Nếu muốn thêm sách mới:
1. Chỉnh sửa file JSON
2. Thêm object mới vào array
3. Nhập lại vào hệ thống

## 📊 **Thống kê mẫu:**

- **Tổng sách:** 15 cuốn (10 + 5)
- **Danh mục:** 8 loại khác nhau
- **Giá trung bình:** 140,000đ
- **Giảm giá trung bình:** 12%
- **Tồn kho trung bình:** 28 cuốn

## 🎯 **Mục tiêu demo:**

✅ Test chức năng nhập hàng loạt  
✅ Kiểm tra hiển thị sách mới  
✅ Test tìm kiếm và lọc  
✅ Test thêm vào giỏ hàng  
✅ Test quản lý tồn kho  
✅ Test tính năng giảm giá  

---

**💡 Tip:** Bạn có thể tạo file JSON riêng với dữ liệu thực tế để test chức năng nhập sách!
