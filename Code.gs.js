function doPost(e) {
  try {
    // 1. Nhận và giải mã dữ liệu JSON được gửi từ Trình duyệt (Frontend)
    var jsonString = e.postData.contents;
    var data = JSON.parse(jsonString);
    
    // 2. Kết nối tới Google Sheet hiện tại (Nơi nhúng Script này)
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Xác định loại form để phân chia Tab dữ liệu tự động
    var loaiForm = data.loai || "Phản ánh";
    var sheetName = "";
    var headers = [];
    var rowData = [];
    
    // Khởi tạo mốc thời gian người dân nộp hồ sơ
    var timestamp = new Date();
    var timeStr = timestamp.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    
    // 3. Cấu trúc cấu hình phân loại Tab dựa theo trường "loai" từ Frontend
    if (loaiForm === "Tuyển quân") {
      sheetName = "Đăng Ký Tuyển Quân";
      headers = ["Thời gian nộp", "Họ và tên", "Số CCCD", "Ngày sinh", "Số điện thoại", "Địa chỉ thường trú", "Trình độ học vấn", "Nghề nghiệp", "Ghi chú thêm"];
      rowData = [timeStr, data.hoten, data.cccd, data.dob, data.phone, data.addr, data.edu, data.job, data.note];
      
    } else if (loaiForm === "Tuyển sinh") {
      sheetName = "Đăng Ký Tuyển Sinh QS";
      headers = ["Thời gian nộp", "Họ và tên", "Số CCCD", "Ngày sinh", "Số điện thoại", "Địa chỉ thường trú", "Trường quân đội đăng ký", "Điểm số ước tính / Khối", "Ghi chú thêm"];
      rowData = [timeStr, data.hoten, data.cccd, data.dob, data.phone, data.addr, data.edu, data.job, data.note];
      
    } else if (loaiForm === "DQTV" || loaiForm === "Đăng ký DQTV") {
      sheetName = "Đăng Ký Dân Quân Tự Vệ";
      headers = ["Thời gian nộp", "Họ và tên", "Số CCCD", "Ngày sinh", "Số điện thoại", "Địa chỉ thường trú", "Ghi chú thêm"];
      rowData = [timeStr, data.hoten, data.cccd, data.dob, data.phone, data.addr, data.note || ""];
      
    } else {
      // Mặc định xử lý cho phần Hộp thư góp ý / Phản ánh từ Trang chủ
      sheetName = "Phản Ánh Người Dân";
      headers = ["Thời gian gửi", "Họ và tên", "Số điện thoại", "Nội dung phản ánh"];
      rowData = [timeStr, data.hoten, data.phone, data.msg || data.note];
    }
    
    // 4. Lấy Tab sheet hiện tại hoặc tự động tạo mới nếu Tab chưa tồn tại
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(headers); // Thêm dòng tiêu đề
      
      // Định dạng dòng tiêu đề cho chuyên nghiệp (Chữ đậm, nền đỏ đô, chữ trắng)
      sheet.getRange(1, 1, 1, headers.length)
           .setFontWeight("bold")
           .setBackground("#8B1A1A")
           .setFontColor("#FFFFFF")
           .setHorizontalAlignment("center");
    }
    
    // 5. Ghi dữ liệu mới vào hàng tiếp theo của Trang tính
    sheet.appendRow(rowData);
    sheet.autoResizeColumns(1, headers.length); // Tự động co giãn độ rộng cột cho vừa chữ
    
    // 6. Tự động gửi Email thông báo Realtime về cho Ban chỉ huy
    var emailNhan = "huynhtri2192003@gmail.com"; // ⚠️ Email nhận thông báo của bạn
    var tieuDeMail = "🚨 [HỆ THỐNG SỐ] CÓ HỒ SƠ " + loaiForm.toUpperCase() + " MỚI";
    
    var noiDungMail = "Kính gửi Ban Chỉ huy Quân sự xã Bình Mỹ,\n\n" +
                      "Hệ thống trang tin điện tử vừa tiếp nhận một biểu mẫu trực tuyến mới từ người dân:\n" +
                      "• Phân loại hồ sơ: " + loaiForm + "\n" +
                      "• Thời gian ghi nhận: " + timeStr + "\n" +
                      "───────────────────────────────────────\n";
    
    // Vòng lặp tự động ghép cặp Tiêu đề cột và Nội dung tương ứng để hiển thị trong Email
    for (var i = 1; i < headers.length; i++) {
      noiDungMail += "• " + headers[i] + ": " + (rowData[i] ? rowData[i] : "Không khai báo") + "\n";
    }
    
    noiDungMail += "───────────────────────────────────────\n" +
                   "Ban chỉ huy vui lòng truy cập hệ thống quản lý Google Sheet tập trung để xử lý.\n" +
                   "Trân trọng!";
    
    MailApp.sendEmail(emailNhan, tieuDeMail, noiDungMail);
    
    // 7. Trả về phản hồi JSON báo thành công cho phía Frontend
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "Dữ liệu hồ sơ đã được mã hóa và lưu trữ thành công!" }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    // Trả về log lỗi chi tiết nếu quá trình xử lý gặp sự cố kỹ thuật
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}