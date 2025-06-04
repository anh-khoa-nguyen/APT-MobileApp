# 📦 Dự Án: Quản Lý Chung Cư (Frontend - React Native)

## 🧾 Mô tả dự án

Dự án xây dựng hệ thống quản lý chung cư hỗ trợ quản trị viên và cư dân trong việc tương tác, thanh toán, quản lý thông tin và theo dõi các hoạt động trong khu chung cư một cách thuận tiện và hiệu quả.

---

## 🎯 Tính năng chính

### 👨‍💼 Quản trị viên
- Cấp phát tài khoản cho cư dân mới.
- Khóa tài khoản cư dân khi chuyển nhượng nhà cho người khác.
- Cập nhật tài khoản mới khi cư dân mới dọn đến.
- Quản lý các mặt hàng trong tòa nhà (bằng thông báo push hoặc SMS).
- Tạo và quản lý các phiếu khảo sát.
- Nhận và xử lý các phản ánh từ cư dân.

### 🧑‍💼 Cư dân
- Đăng nhập hệ thống, đổi mật khẩu và upload ảnh đại diện (avatar).
- Đóng tiền dịch vụ qua tài khoản ngân hàng hoặc ví điện tử (Momo, VnPay, v.v.).
- Tra cứu hoá đơn thanh toán các loại dịch vụ.
- Đăng ký người đến nhận thẻ gửi xe và ra vào cổng.
- Xem danh sách các món hàng từ người gửi hoặc từ quản trị viên.
- Gửi phản ánh đến ban quản trị.
- Tham gia khảo sát từ ban quản trị.

---

## 🛠️ Công nghệ sử dụng

- **Frontend**: React Native
- **Backend**: Django Rest Framework
- **Realtime Database**: `Firebase` (xử lý thời gian thực giữa quản trị và cư dân)
- **Authentication**: Firebase Auth và OAuth2
- **Push Notification**: Twilio


## 📌 Ghi chú
- Hệ thống có thể mở rộng để tích hợp thêm camera, cảm biến, các dịch vụ tiện ích thông minh khác.
- Các chức năng thanh toán, khảo sát và đăng ký cần bảo đảm tính bảo mật và xác thực.

---
