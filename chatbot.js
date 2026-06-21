/**
 * chatbot.js — Widget Chatbot Thông Minh Ban CHQS Xã Bình Mỹ (Bản nâng cấp 2026)
 * Cách dùng: Lưu thành file chatbot.js và nhúng vào cuối trang: <script src="chatbot.js"></script> trước </body>
 */

(function () {

  // ===== 1. INJECT CSS (Giao diện nâng cấp hiện đại, màu sắc Quân đội chuẩn) =====
  const style = document.createElement('style');
  style.textContent = `
    .chat-fab {
      position: fixed; bottom: 24px; right: 24px;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #1B4F72, #117A65); /* Màu xanh áo lính phối xanh đậm */
      border: 2px solid #fff; cursor: pointer;
      box-shadow: 0 4px 24px rgba(17, 122, 101, 0.4);
      display: flex; align-items: center; justify-content: center;
      z-index: 9999; transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      animation: chatPulse 3s infinite;
    }
    .chat-fab:hover { transform: scale(1.1) rotate(5deg); box-shadow: 0 8px 32px rgba(17, 122, 101, 0.6); }
    .chat-fab-icon { font-size: 26px; }
    @keyframes chatPulse {
      0%, 100% { box-shadow: 0 4px 24px rgba(17, 122, 101, 0.4); }
      50%      { box-shadow: 0 4px 32px rgba(17, 122, 101, 0.8); }
    }
    .chat-badge {
      position: absolute; top: -2px; right: -2px;
      background: #E74C3C; color: #fff;
      font-size: 10px; font-weight: bold;
      width: 18px; height: 18px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      border: 1.5px solid #fff;
    }
    .chat-window {
      position: fixed; bottom: 96px; right: 24px;
      width: 360px; height: 550px; max-height: calc(100vh - 120px);
      background: #ffffff; border-radius: 16px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.15);
      display: none; flex-direction: column;
      z-index: 9998; overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .chat-window.open { display: flex; animation: chatSlideUp .3s cubic-bezier(0.25, 0.8, 0.25, 1); }
    @keyframes chatSlideUp {
      from { opacity: 0; transform: translateY(30px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .chat-header {
      background: linear-gradient(135deg, #1B4F72, #117A65);
      padding: 16px; display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .chat-header-left { display: flex; align-items: center; gap: 12px; }
    .chat-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: rgba(255,255,255,0.2); border: 1.5px solid rgba(255,255,255,0.6);
      display: flex; align-items: center; justify-content: center; font-size: 20px;
    }
    .chat-name { font-size: 14px; font-weight: 700; color: #fff; letter-spacing: 0.3px; }
    .chat-status { font-size: 11px; color: #A3E4D7; margin-top: 2px; display: flex; align-items: center; gap: 4px; }
    .chat-status::before { content: "●"; color: #2ECC71; font-size: 12px; }
    .chat-close {
      background: rgba(255,255,255,0.15); border: none; color: #fff;
      width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
      font-size: 12px; display: flex; align-items: center; justify-content: center;
      transition: background .2s;
    }
    .chat-close:hover { background: rgba(255,255,255,0.3); }
    .chat-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 12px; background: #F8F9F9;
      scrollbar-width: thin;
    }
    .chat-msg { display: flex; align-items: flex-end; gap: 8px; }
    .chat-msg.bot  { justify-content: flex-start; }
    .chat-msg.user { justify-content: flex-end; }
    .chat-bubble {
      max-width: 80%; padding: 11px 15px; border-radius: 16px;
      font-size: 13.5px; line-height: 1.5; color: #2C3E50;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    .chat-msg.bot  .chat-bubble { background: #ffffff; border-bottom-left-radius: 4px; border: 1px solid #E5E8E8; }
    .chat-msg.user .chat-bubble { background: #117A65; color: #ffffff; border-bottom-right-radius: 4px; }
    .chat-typing .chat-bubble { display: flex; gap: 4px; align-items: center; padding: 12px 18px; }
    .dot-typing {
      width: 8px; height: 8px; border-radius: 50%; background: #BDC3C7;
      animation: dotBounce 1.4s infinite ease-in-out;
    }
    .dot-typing:nth-child(2) { animation-delay: .2s; }
    .dot-typing:nth-child(3) { animation-delay: .4s; }
    @keyframes dotBounce {
      0%, 80%, 100% { transform: translateY(0); }
      40%         { transform: translateY(-6px); }
    }
    .chat-suggestions-container { display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }
    .chat-suggestions-title { font-size: 11px; font-weight: bold; color: #7F8C8D; text-transform: uppercase; margin-left: 2px;}
    .chat-suggestions { display: flex; flex-wrap: wrap; gap: 6px; }
    .chat-suggestions button {
      font-size: 12.5px; font-weight: 500; padding: 7px 14px; border-radius: 20px;
      border: 1px solid #117A65; color: #117A65; background: #E8F8F5;
      cursor: pointer; transition: all .2s ease;
    }
    .chat-suggestions button:hover { background: #117A65; color: #fff; transform: translateY(-1px); }
    .chat-input-area {
      display: flex; align-items: center; gap: 8px;
      padding: 12px; border-top: 1px solid #EAEDED; background: #ffffff;
    }
    .chat-input-area input {
      flex: 1; border: 1.5px solid #D5DBDB; border-radius: 20px;
      padding: 9px 16px; font-size: 13.5px; color: #2C3E50;
      outline: none; background: #FBFCFC; transition: all .2s;
    }
    .chat-input-area input:focus { border-color: #117A65; background: #ffffff; box-shadow: 0 0 0 3px rgba(17,122,101,0.15); }
    .chat-input-area button {
      width: 38px; height: 38px; border-radius: 50%;
      background: #117A65; border: none; color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background .2s; flex-shrink: 0;
    }
    .chat-input-area button:hover { background: #1B4F72; }
    @media (max-width: 440px) {
      .chat-window { width: calc(100vw - 32px); right: 16px; bottom: 88px; height: 500px; }
      .chat-fab    { right: 16px; bottom: 16px; width: 54px; height: 54px; }
    }
  `;
  document.head.appendChild(style);

  // ===== 2. INJECT HTML (Cấu trúc tối ưu lại phần gợi ý) =====
  const html = `
    <button class="chat-fab" id="chat-fab" title="Hỏi đáp nhanh">
      <span class="chat-fab-icon" id="chat-fab-icon">💬</span>
      <span class="chat-badge" id="chat-badge">1</span>
    </button>

    <div class="chat-window" id="chat-window">
      <div class="chat-header">
        <div class="chat-header-left">
          <div class="chat-avatar">🪖</div>
          <div>
            <div class="chat-name">Trợ lý Số Ban CHQS</div>
            <div class="chat-status">Trực tuyến</div>
          </div>
        </div>
        <button class="chat-close" id="chat-close-btn">✕</button>
      </div>

      <div class="chat-messages" id="chat-messages">
        <div class="chat-msg bot">
          <div class="chat-bubble">
            👋 Kính chào bà con! Đây là hệ thống trả lời tự động của <b>Ban CHQS Xã Bình Mỹ</b>.<br><br>
            Tôi có thể giúp gì cho bà con về thủ tục Nghĩa vụ quân sự, tuyển sinh quân đội hoặc thông tin liên hệ?
          </div>
        </div>
        
        <div class="chat-suggestions-container" id="chat-sugg-container">
          <div class="chat-suggestions-title">Chủ đề phổ biến</div>
          <div class="chat-suggestions" id="chat-suggestions">
            <button data-topic="nvqs">🪖 Đăng ký NVQS (Tuổi 17)</button>
            <button data-topic="tuyen-quan">📋 Tuyển quân năm nay</button>
            <button data-topic="tuyen-sinh">🎓 Tuyển sinh Quân đội</button>
            <button data-topic="hoan-nvqs">❌ Tạm hoãn/Miễn gọi</button>
            <button data-topic="tracuu">🔍 Hướng dẫn tra cứu</button>
            <button data-topic="lienhe">📞 Địa chỉ & Liên hệ</button>
          </div>
        </div>
      </div>

      <div class="chat-input-area">
        <input type="text" id="chat-input" placeholder="Nhập câu hỏi của bà con tại đây...">
        <button id="chat-send-btn">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="width:18px;height:18px;">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  document.body.appendChild(wrap);

  // ===== 3. CƠ SỞ DỮ LIỆU TRI THỨC (Cập nhật chuẩn hóa từ file cũ) =====
  const KB = [
    { keys: ['tuổi', 'đăng ký', 'bao nhiêu tuổi', 'mấy tuổi', '17', '18', 'độ tuổi'],
      ans: '🪖 <b>Về độ tuổi đăng ký & gọi nhập ngũ:</b><br>• Công dân nam <b>đủ 17 tuổi</b> (tính theo năm sinh) phải trực tiếp đến Ban CHQS Xã để đăng ký NVQS lần đầu.<br>• Độ tuổi gọi nhập ngũ thông thường là từ <b>đủ 18 đến hết 25 tuổi</b>. Riêng công dân có trình độ Cao đẳng, Đại học thì kéo dài đến <b>hết 27 tuổi</b>.' },
    { keys: ['thời hạn', 'bao lâu', 'mấy năm', '24 tháng', '2 năm', 'đi mấy năm'],
      ans: '⏱️ Thời hạn phục vụ tại ngũ của hạ sĩ quan, binh sĩ trong thời bình theo Luật Nghĩa vụ quân sự là <b>24 tháng (tương đương 2 năm)</b>.' },
    { keys: ['đại học', 'sinh viên', 'tạm hoãn', 'hoãn', 'đi học', 'cao đẳng'],
      ans: '🎓 <b>Tạm hoãn gọi nhập ngũ đối với học sinh, sinh viên:</b><br>Công dân đang học tập tại các trường cơ sở giáo dục phổ thông, trường trung cấp chuyên nghiệp, cao đẳng, đại học hệ <b>chính quy</b> (văn bằng 1) sẽ được tạm hoãn gọi nhập ngũ trong một khóa đào tạo. Bà con cần nộp <i>Giấy xác nhận sinh viên</i> về Ban CHQS Xã hàng năm khi có đợt kê khai.' },
    { keys: ['trốn', 'phạt', 'xử phạt', 'vi phạm', 'không đi', 'phạt bao nhiêu'],
      ans: '⚠️ <b>Mức xử phạt hành chính (Nghị định 37/2022/NĐ-CP):</b><br>• Không đăng ký NVQS lần đầu: phạt từ <b>8 - 10 triệu đồng</b>.<br>• Không chấp hành lệnh gọi kiểm tra, khám sức khỏe NVQS: phạt từ <b>25 - 35 triệu đồng</b>.<br>• Không chấp hành lệnh gọi nhập ngũ: phạt từ <b>50 - 75 triệu đồng</b>. Trường hợp nghiêm trọng có thể bị truy cứu trách nhiệm hình sự.' },
    { keys: ['nữ', 'phụ nữ', 'con gái', 'nữ giới'],
      ans: '👩 Công dân nữ trong thời bình <b>không bắt buộc</b> phải tham gia nghĩa vụ quân sự. Tuy nhiên, nếu tự nguyện và quân đội có nhu cầu phù hợp với chuyên môn (như Y tế, Thông tin, Kỹ thuật...) thì sẽ được xem xét tiếp nhận.' },
    { keys: ['tuyển quân', 'nhập ngũ', 'giao quân', 'lịch khám', 'khám sức khỏe'],
      ans: '📋 <b>Quy trình công tác tuyển quân hàng năm:</b><br>• <b>Tháng 11 - 12:</b> Sơ tuyển sức khỏe tại cấp Xã.<br>• <b>Tháng 1 - 2:</b> Khám sức khỏe chính thức tại Hội đồng nghĩa vụ quân sự Xã Bình Mỹ.<br>• <b>Tháng 2 - 3:</b> Tổ chức Lễ giao nhận quân. Để biết chi tiết các tiêu chuẩn năm nay, bà con vui lòng truy cập mục <a href="tuyen-quan.html" style="color:#117A65;font-weight:600;">Trang Tuyển Quân</a> trên menu.' },
    { keys: ['hồ sơ', 'giấy tờ', 'cần chuẩn bị', 'nộp những gì', 'thủ tục'],
      ans: '📄 <b>Hồ sơ chuẩn bị bao gồm:</b> CCCD (bản sao), Giấy khai sinh, Giấy khám sức khỏe sơ tuyển, Bằng tốt nghiệp (văn hóa cao nhất), và các văn bản chứng minh diện tạm hoãn (nếu có). Chi tiết và biểu mẫu tải tại: <a href="tuyen-quan.html" style="color:#117A65;font-weight:600;">Trang Tuyển Quân</a>.' },
    { keys: ['sức khỏe', 'chiều cao', 'cân nặng', 'mắt', 'cận thị', 'xăm hình', 'hình xăm'],
      ans: '🏥 <b>Tiêu chuẩn cơ bản:</b><br>• Đạt sức khỏe loại 1, 2, 3 theo quy định liên tịch của Bộ Y tế - Bộ Quốc phòng.<br>• Cận thị từ 1,5 diop trở lên, nghiện ma túy, hoặc có hình xăm, chữ xăm phản cảm, kích động trên cơ thể không phù hợp với môi trường quân ngũ sẽ không được gọi nhập ngũ.' },
    { keys: ['tuyển sinh', 'trường quân đội', 'sĩ quan', 'học viện', 'thi quân đội'],
      ans: '🎓 <b>Tuyển sinh Quân sự:</b><br>Thí sinh muốn thi vào các Học viện, Trường Sĩ quan Quân đội phải thông qua đợt **Sơ tuyển lý lịch và sức khỏe** tại Ban CHQS Xã Bình Mỹ (đăng ký qua Ban CHQS Xã Bình Mỹ trước vào khoảng tháng 3 - tháng 5 hàng năm). Xem chi tiết tại: <a href="tuyen-sinh.html" style="color:#117A65;font-weight:600;">Trang Tuyển Sinh</a>.' },
    { keys: ['tra cứu', 'hồ sơ cá nhân', 'xem thông tin', 'cccd', 'căn cước'],
      ans: '🔍 <b>Tra cứu hồ sơ điện tử:</b><br>Bà con có thể tự tra cứu trạng thái hồ sơ NVQS của con em mình trực tiếp trên web bằng cách vào mục <a href="tracuu.html" style="color:#117A65;font-weight:600;">Trang Tra Cứu</a>, chỉ cần nhập chính xác Số định danh (CCCD 12 số) và Họ tên.' },
    { keys: ['liên hệ', 'địa chỉ', 'ở đâu', 'giờ làm', 'zalo', 'facebook', 'điện thoại', 'số điện thoại', 'trụ sở'],
      ans: '📞 <b>Thông tin liên hệ trực tiếp Ban CHQS Xã Bình Mỹ:</b><br>📍 <b>Địa chỉ:</b> 149, Ấp chợ, Đường Trung An, Xã Bình Mỹ, Thành phố Hồ Chí Minh.<br>⏰ <b>Giờ làm việc:</b> Sáng 07:30 – 11:30, Chiều 13:30 – 17:00 (Từ thứ Hai đến thứ Sáu).<br>👥 <b>Kênh tương tác:</b> <a href="https://www.facebook.com/share/18g8qhhaEB/?mibextid=wwXIfr" target="_blank" style="color:#117A65;font-weight:bold;">Trang Facebook Ban CHQS Xã</a>' },
    { keys: ['xin chào', 'chào', 'hello', 'hi', 'có ai không'],
      ans: '👋 Xin kính chào bà con! Tôi có thể hỗ trợ giải đáp các thắc mắc về Luật nghĩa vụ quân sự, lịch tuyển quân hoặc thông tin liên hệ của Ban CHQS Xã Bình Mỹ. Bà con cần hỏi thông tin nào ạ?' },
    { keys: ['cảm ơn', 'thank', 'ok', 'tốt'],
      ans: '😊 Rất vui được hỗ trợ bà con. Chúc bà con một ngày tốt lành! Nếu cần thêm thông tin, xin cứ nhắn cho tôi.' },
  ];

  const QUICK = {
    'nvqs':       'Độ tuổi đăng ký Nghĩa vụ quân sự quy định thế nào?',
    'tuyen-quan': 'Lịch tuyển quân và khám sức khỏe năm nay như thế nào?',
    'tuyen-sinh': 'Tôi muốn hỏi thủ tục đăng ký tuyển sinh trường quân đội?',
    'hoan-nvqs':  'Trường hợp nào học sinh sinh viên được tạm hoãn NVQS?',
    'tracuu':     'Làm thế nào để tra cứu hồ sơ NVQS trực tuyến?',
    'lienhe':     'Cho tôi xin địa chỉ và cách thức liên hệ Ban CHQS Xã?',
  };

  // ===== 4. LOGIC VẬN HÀNH CHAT =====
  let chatOpen = false;

  function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('chat-window').classList.toggle('open', chatOpen);
    document.getElementById('chat-fab-icon').textContent = chatOpen ? '✕' : '💬';
    document.getElementById('chat-badge').style.display = 'none';
    if (chatOpen) document.getElementById('chat-input').focus();
  }

  function addMsg(text, type) {
    const box = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg ' + type;
    div.innerHTML = `<div class="chat-bubble">${text}</div>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function showTyping() {
    const box = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg bot chat-typing';
    div.id = 'chat-typing';
    div.innerHTML = `<div class="chat-bubble">
      <div class="dot-typing"></div>
      <div class="dot-typing"></div>
      <div class="dot-typing"></div>
    </div>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('chat-typing');
    if (el) el.remove();
  }

  function findAnswer(text) {
    const q = text.toLowerCase();
    for (const item of KB) {
      if (item.keys.some(k => q.includes(k))) return item.ans;
    }
    return null;
  }

  function sendMsg(text) {
    if (!text.trim()) return;
    document.getElementById('chat-input').value = '';
    
    // Ẩn khối gợi ý sau lượt chat đầu tiên để thoáng giao diện
    const sContainer = document.getElementById('chat-sugg-container');
    if (sContainer) sContainer.remove();

    addMsg(text, 'user');
    showTyping();
    
    setTimeout(() => {
      removeTyping();
      const ans = findAnswer(text);
      // Thay đổi thông báo mặc định thân thiện, hướng dẫn rõ ràng
      addMsg(ans || '😔 Trợ lý chưa tìm thấy từ khóa phù hợp với câu hỏi của bà con. Bà con có thể thử nhập ngắn gọn hơn (Ví dụ: "tuổi đăng ký", "hoãn nvqs", "địa chỉ") hoặc liên hệ trực tiếp Ban chỉ huy để được hỗ trợ kỹ hơn nhé!', 'bot');
    }, 700);
  }

  // ===== 5. GẮN SỰ KIỆN =====
  document.getElementById('chat-fab').addEventListener('click', toggleChat);
  document.getElementById('chat-close-btn').addEventListener('click', toggleChat);
  document.getElementById('chat-send-btn').addEventListener('click', () => {
    sendMsg(document.getElementById('chat-input').value.trim());
  });
  document.getElementById('chat-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMsg(e.target.value.trim());
  });
  
  // Ủy quyền sự kiện cho các nút bấm gợi ý nhanh
  document.getElementById('chat-window').addEventListener('click', function(e) {
    if (e.target && e.target.matches('.chat-suggestions button')) {
      const topic = e.target.getAttribute('data-topic');
      if (QUICK[topic]) sendMsg(QUICK[topic]);
    }
  });

})();
